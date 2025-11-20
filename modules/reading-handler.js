


import * as ui from './ui-manager.js';
import * as state from './state.js';
import * as settings from './settings.js';
import * as statistics from './statistics-handler.js';
import { allTopics } from '../topics-data.js';

// Local state for the current reading session
let currentSessionState = {
    story: null,
    answers: {}, // Map question index to answer status { correct: boolean, userAnswer: string }
    startTime: 0
};

export const showReadingOptions = (topic) => {
    state.setCurrentTopicForQuiz(topic);
    ui.showScreen(ui.readingListScreen);
    
    ui.readingListContainer.innerHTML = '';
    
    if (!topic.stories || topic.stories.length === 0) {
        ui.readingListContainer.innerHTML = '<p class="text-center text-gray-500">No hay historias disponibles aún.</p>';
        return;
    }

    topic.stories.forEach(story => {
        const storyButton = document.createElement('button');
        storyButton.className = 'w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left flex justify-between items-center group';
        
        const badgeClass = story.level === 'A1' ? 'bg-green-100 text-green-800' : (story.level === 'A2' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800');

        storyButton.innerHTML = `
            <div>
                <div class="flex items-center mb-1">
                    <h3 class="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">${story.title}</h3>
                    <span class="ml-3 text-xs font-bold px-2 py-1 rounded ${badgeClass}">${story.level}</span>
                </div>
                <p class="text-sm text-gray-500">${story.questions.length} preguntas</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        `;
        
        storyButton.onclick = () => startReadingSession(story);
        ui.readingListContainer.appendChild(storyButton);
    });
};

const startReadingSession = (story) => {
    // Reset Session State
    currentSessionState = {
        story: story,
        answers: {},
        startTime: Date.now()
    };

    // Populate Header & Audio
    ui.rsStoryTitle.textContent = story.title;
    if (story.audioUrl) {
        ui.rsAudioPlayer.src = story.audioUrl;
        ui.rsAudioPlayer.parentElement.classList.remove('hidden');
    } else {
        ui.rsAudioPlayer.src = "";
        ui.rsAudioPlayer.parentElement.classList.add('hidden');
    }

    // Populate Text (Visible by default)
    ui.rsTextContent.textContent = story.text;
    ui.rsTextContent.classList.remove('hidden');
    
    // Reset Toggle Icon
    const chevron = ui.rsToggleTextBtn.querySelector('svg');
    if (chevron) chevron.classList.remove('rotate-180');

    // Add Toggle Logic
    ui.rsToggleTextBtn.onclick = () => {
        ui.rsTextContent.classList.toggle('hidden');
        ui.rsTextChevron.classList.toggle('rotate-180');
    };
    
    // Update sound toggle
    ui.updateSoundToggleUI();

    // Render Questions List
    renderQuestions(story.questions);

    // Setup Finish Button
    ui.rsFinishBtn.onclick = finishReadingSession;

    ui.showScreen(ui.readingSessionScreen);
    
    // Ensure we scroll to top
    window.scrollTo(0, 0);
};

const renderQuestions = (questions) => {
    ui.rsQuestionsList.innerHTML = '';
    
    questions.forEach((q, qIndex) => {
        const qContainer = document.createElement('div');
        qContainer.className = 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm';
        qContainer.id = `rs-q-${qIndex}`;

        const qText = document.createElement('p');
        qText.className = 'font-bold text-lg text-gray-800 mb-3';
        qText.textContent = `${qIndex + 1}. ${q.questionText}`;
        qContainer.appendChild(qText);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-2';
        
        // Shuffle options logic if needed, but usually reading questions follow order. 
        // Assuming options are fixed or we just render them. Let's stick to indices.
        
        q.options.forEach((opt, optIndex) => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between group';
            btn.innerHTML = `<span>${opt}</span>`;
            btn.dataset.qIndex = qIndex;
            btn.dataset.optIndex = optIndex;
            
            btn.onclick = () => handleAnswer(btn, q, qIndex, optIndex);
            optionsContainer.appendChild(btn);
        });

        qContainer.appendChild(optionsContainer);

        // Placeholder for explanation
        const explanationDiv = document.createElement('div');
        explanationDiv.id = `rs-feedback-${qIndex}`;
        explanationDiv.className = 'hidden mt-3 pt-3 border-t border-gray-100 text-sm';
        qContainer.appendChild(explanationDiv);

        ui.rsQuestionsList.appendChild(qContainer);
    });
};

const handleAnswer = (btn, question, qIndex, optIndex) => {
    // Prevent re-answering
    if (currentSessionState.answers[qIndex]) return;

    const isCorrect = optIndex === question.correctAnswerIndex;
    currentSessionState.answers[qIndex] = { isCorrect: isCorrect };

    // Visual Feedback
    const container = document.getElementById(`rs-q-${qIndex}`);
    const buttons = container.querySelectorAll('button');
    
    buttons.forEach(b => {
        b.disabled = true;
        b.classList.add('disabled');
        const bOptIndex = parseInt(b.dataset.optIndex);
        
        if (bOptIndex === question.correctAnswerIndex) {
            b.classList.remove('hover:bg-gray-50', 'border-gray-200');
            b.classList.add('bg-green-100', 'border-green-300', 'text-green-800');
            b.innerHTML += `<span class="ml-2 text-green-600 font-bold">✓</span>`;
        } else if (bOptIndex === optIndex && !isCorrect) {
            b.classList.remove('hover:bg-gray-50', 'border-gray-200');
            b.classList.add('bg-red-100', 'border-red-300', 'text-red-800');
            b.innerHTML += `<span class="ml-2 text-red-600 font-bold">✗</span>`;
        }
    });

    // Play Sound
    if (isCorrect) {
        settings.playCorrectSound();
    } else {
        settings.playIncorrectSound();
    }

    // Show Explanation
    const feedbackDiv = document.getElementById(`rs-feedback-${qIndex}`);
    feedbackDiv.className = 'block mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 bg-gray-50 p-3 rounded';
    feedbackDiv.innerHTML = `<strong class="text-blue-600">Explicación:</strong> ${question.explanation}`;
};

const finishReadingSession = () => {
    const totalQuestions = currentSessionState.story.questions.length;
    const answeredCount = Object.keys(currentSessionState.answers).length;
    
    // Calculate score
    let correctCount = 0;
    Object.values(currentSessionState.answers).forEach(ans => {
        if (ans.isCorrect) correctCount++;
    });

    // Prepare results data
    const timeTaken = Math.floor((Date.now() - currentSessionState.startTime) / 1000);
    
    // We can reuse the standard Results Screen but populate it manually
    // or create a specific one. Reusing is efficient.
    
    // Update Stats
    statistics.addTestResult({
        correct: correctCount,
        incorrect: totalQuestions - correctCount, // Count unanswered as incorrect effectively for stats
        time: timeTaken,
        questionCount: totalQuestions
    });

    // Show Results
    ui.showScreen(ui.resultsScreen);
    
    const lang = settings.getSettings().language;
    
    // Customize Results Screen
    ui.resultsTitle.textContent = "Lectura Completada";
    ui.resultsMessage.textContent = `Has leído "${currentSessionState.story.title}".`;
    
    ui.scoreDisplay.textContent = `${correctCount}/${totalQuestions}`;
    ui.scorePercentage.textContent = `${Math.round((correctCount / totalQuestions) * 100)}%`;
    ui.finalTimeEl.textContent = `Tiempo de lectura: ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;

    // Clear buttons and add a simple "Back to Readings" button
    ui.resultsButtons.innerHTML = '';
    
    const backBtn = document.createElement('button');
    backBtn.textContent = "Volver a la lista";
    backBtn.className = 'w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
    backBtn.onclick = () => {
        showReadingOptions(state.getCurrentTopicForQuiz()); // Go back to list
    };
    ui.resultsButtons.appendChild(backBtn);
    
    // Hide review section from standard quiz
    ui.reviewSection.classList.add('hidden');
};

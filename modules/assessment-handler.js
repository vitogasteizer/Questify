




import * as state from './state.js';
import * as ui from './ui-manager.js';
import * as settings from './settings.js';
import { assessmentPools, readingStoriesByLevel, levelsOrder } from './language-assessment-data.js';

const STANDARD_QUESTIONS_PER_LEVEL = 10;
const STANDARD_PASS_PERCENT = 70; // 70% for standard questions
const STORY_PASS_PERCENT = 51;    // 51% for story questions

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const showAssessmentStartScreen = () => {
    ui.showScreen(document.getElementById('assessment-start-screen'));
    state.setIsAssessmentMode(true);
};

export const startAssessment = () => {
    state.resetAssessmentStats();
    state.getAssessmentStats().startTime = Date.now();
    state.setIsAssessmentMode(true);

    // Start with A1
    loadLevel('A1');
};

const loadLevel = (level) => {
    state.setCurrentAssessmentLevel(level);
    
    const standardPool = assessmentPools[level] || [];
    const storiesPool = readingStoriesByLevel[level] || [];
    
    let selectedStandardQuestions = [];
    let selectedStoryQuestions = [];

    // 1. Get 10 Standard Questions
    if (standardPool.length > 0) {
        selectedStandardQuestions = shuffleArray([...standardPool]).slice(0, STANDARD_QUESTIONS_PER_LEVEL);
    }

    // 2. Get 1 Random Story
    if (storiesPool.length > 0) {
        const randomStoryIndex = Math.floor(Math.random() * storiesPool.length);
        const story = storiesPool[randomStoryIndex];
        
        // Add all questions from that story, marking them as Story questions
        selectedStoryQuestions = story.questions.map(q => ({
            ...q,
            readingText: story.text,
            audioUrl: story.audioUrl,
            storyTitle: story.title,
            isStoryQuestion: true 
        }));
    }

    // Combine: Standard first, then Story
    const finalQuestions = [...selectedStandardQuestions, ...selectedStoryQuestions];

    if (finalQuestions.length === 0) {
        console.error(`No questions found for level ${level}`);
        finishAssessment();
        return;
    }

    state.setCurrentQuestions(finalQuestions);
    state.setCurrentQuestionIndex(0);
    
    // Initialize granular level tracking
    state.getAssessmentStats().levelScores[level] = { 
        standard: { correct: 0, total: selectedStandardQuestions.length },
        story: { correct: 0, total: selectedStoryQuestions.length }
    };
    
    // UI Setup
    ui.showScreen(ui.quizScreen);
    updateAssessmentUI();
    
    // Start Timer (Global Stopwatch)
    clearInterval(state.getTimerInterval());
    ui.timerContainer.classList.remove('hidden');
    state.setStopwatchSeconds(Math.floor((Date.now() - state.getAssessmentStats().startTime) / 1000));
    state.setTimerInterval(setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.getAssessmentStats().startTime) / 1000);
        ui.timerEl.textContent = formatTime(elapsed);
    }, 1000));

    loadQuestion();
};

const updateAssessmentUI = () => {
    // Show Level Badge
    const badge = document.getElementById('assessment-level-badge');
    badge.classList.remove('hidden');
    badge.textContent = `Nivel ${state.getCurrentAssessmentLevel()}`;
    
    // Hide features not used in assessment
    ui.bookmarkBtn.classList.add('hidden');
    ui.chooseAnswerSubtitle.classList.remove('hidden');
};

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const loadQuestion = () => {
    ui.optionsContainer.innerHTML = '';
    ui.questionImageContainer.innerHTML = '';
    ui.explanationContainer.innerHTML = '';
    ui.nextButtonContainer.innerHTML = '';

    const currentLevel = state.getCurrentAssessmentLevel();
    const currentQuestions = state.getCurrentQuestions();
    const currentIndex = state.getCurrentQuestionIndex();
    
    if (currentIndex >= currentQuestions.length) {
        // End of level
        evaluateLevelProgress();
        return;
    }

    const question = currentQuestions[currentIndex];
    
    // Update progress text: Level Question X / Total
    ui.progressText.textContent = `Nivel ${currentLevel} - ${currentIndex + 1} / ${currentQuestions.length}`;
    
    // Progress bar (local to level)
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
    ui.progressBar.style.width = `${progress}%`;

    // Render Reading Text if available
    if (question.readingText) {
        const readingBox = document.createElement('div');
        readingBox.className = 'reading-text-box';
        readingBox.innerHTML = question.readingText; 
        ui.questionImageContainer.appendChild(readingBox);
        
        // If audio is present, add a small player
        if (question.audioUrl) {
             const audioDiv = document.createElement('div');
             audioDiv.className = 'mb-4 bg-amber-50 p-2 rounded border border-amber-200';
             audioDiv.innerHTML = `<audio controls class="w-full h-8" src="${question.audioUrl}"></audio>`;
             // Insert audio before text
             ui.questionImageContainer.insertBefore(audioDiv, readingBox);
        }
    }

    // Render Text
    const parts = question.questionText.split(':');
    const hasInstruction = parts.length > 1 && parts[1].trim() !== '';

    if (hasInstruction) {
        ui.questionInstruction.textContent = parts[0].trim() + ':';
        ui.questionInstruction.classList.remove('hidden');
        ui.questionTextEl.innerHTML = parts.slice(1).join(':').trim();
    } else {
        ui.questionInstruction.textContent = '';
        ui.questionInstruction.classList.add('hidden');
        ui.questionTextEl.innerHTML = question.questionText;
    }

    if (question.imageUrl) {
        const img = document.createElement('img');
        img.src = question.imageUrl;
        img.className = 'mx-auto rounded-lg max-h-60 mb-4';
        ui.questionImageContainer.appendChild(img);
    }

    // Render Options
    if (question.type === 'fill-in-the-blank') {
        renderFillInBlank(question);
    } else if (question.type === 'order-words') {
        renderOrderWords(question);
    } else {
        const shuffledOptions = shuffleArray([...question.options.keys()]);
        shuffledOptions.forEach(optionIndex => {
            const option = question.options[optionIndex];
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.dataset.index = optionIndex;
            button.onclick = () => handleAssessmentAnswer(button, question);
            
            button.innerHTML = `
                <span class="flex-grow">${option}</span>
                <span class="answer-icon-container"></span>
            `;
            ui.optionsContainer.appendChild(button);
        });
    }
};

const renderFillInBlank = (question) => {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'col-span-1 md:col-span-2 flex flex-col items-center';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe tu respuesta...';
    input.className = 'w-full max-w-sm px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500';
    
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Comprobar';
    submitBtn.className = 'mt-4 px-8 py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md';
    submitBtn.onclick = () => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswers = (Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]).map(s => String(s).toLowerCase());
        const isCorrect = correctAnswers.includes(userAnswer);
        
        input.disabled = true;
        submitBtn.disabled = true;
        input.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        recordAnswer(isCorrect, question, userAnswer);
        showNextButton();
    };
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(submitBtn);
    ui.optionsContainer.appendChild(inputContainer);
    input.addEventListener('keyup', (e) => { if (e.key === 'Enter') submitBtn.click(); });
};

const renderOrderWords = (question) => {
    const container = document.createElement('div');
    container.className = 'col-span-1 md:col-span-2 flex flex-col items-center gap-4';
    const answerArea = document.createElement('div');
    answerArea.className = 'answer-area w-full';
    const wordBank = document.createElement('div');
    wordBank.className = 'word-bank w-full';
    
    shuffleArray([...question.words]).forEach(word => {
        const tile = document.createElement('div');
        tile.textContent = word;
        tile.className = 'word-tile';
        tile.dataset.word = word;
        tile.onclick = () => {
             if (tile.parentElement === wordBank) answerArea.appendChild(tile);
             else wordBank.appendChild(tile);
        };
        wordBank.appendChild(tile);
    });

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Comprobar';
    submitBtn.className = 'mt-4 px-8 py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md';
    submitBtn.onclick = () => {
        const userAnswer = Array.from(answerArea.children).map(t => t.dataset.word).join(' ');
        const isCorrect = userAnswer === question.correctAnswer;
        
        answerArea.classList.add(isCorrect ? 'correct' : 'incorrect');
        answerArea.style.borderStyle = 'solid';
        document.querySelectorAll('.word-tile').forEach(t => t.onclick = null);
        submitBtn.disabled = true;

        recordAnswer(isCorrect, question, userAnswer);
        showNextButton();
    };

    container.appendChild(answerArea);
    container.appendChild(wordBank);
    container.appendChild(submitBtn);
    ui.optionsContainer.appendChild(container);
};

const handleAssessmentAnswer = (button, question) => {
    const selectedIndex = parseInt(button.dataset.index);
    const isCorrect = selectedIndex === question.correctAnswerIndex;
    const userAnswerText = question.options[selectedIndex];

    // Disable buttons
    Array.from(ui.optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
        const btnIndex = parseInt(btn.dataset.index);
        const iconContainer = btn.querySelector('.answer-icon-container');

        if (btnIndex === question.correctAnswerIndex) {
            btn.classList.add('correct');
            if (iconContainer) iconContainer.innerHTML = `<span class="answer-icon icon-correct">✓</span>`;
        } else if (btnIndex === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
            if (iconContainer) iconContainer.innerHTML = `<span class="answer-icon icon-incorrect">✗</span>`;
        }
    });

    recordAnswer(isCorrect, question, userAnswerText);
    showNextButton();
};

const recordAnswer = (isCorrect, question, userAnswer) => {
    const stats = state.getAssessmentStats();
    const level = state.getCurrentAssessmentLevel();
    const levelStats = stats.levelScores[level];
    
    stats.totalQuestionsAnswered++;
    if (isCorrect) stats.totalCorrect++;

    // Granular tracking based on question type
    if (question.isStoryQuestion) {
        if (isCorrect) levelStats.story.correct++;
        // Total was already set during loadLevel, but good to be safe or for dynamic counting
    } else {
        if (isCorrect) levelStats.standard.correct++;
    }

    if (isCorrect) {
        settings.playCorrectSound();
    } else {
        settings.playIncorrectSound();
        stats.mistakes.push({
            question: question.questionText,
            userAnswer: userAnswer,
            correctAnswer: question.type === 'fill-in-the-blank' || question.type === 'order-words' ? question.correctAnswer : question.options[question.correctAnswerIndex],
            explanation: question.explanation,
            level: level
        });
    }
};

const showNextButton = () => {
    const nextButton = document.createElement('button');
    nextButton.textContent = "Siguiente";
    nextButton.className = 'w-full px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
    nextButton.onclick = () => {
        settings.playNavigationSound();
        state.incrementCurrentQuestionIndex();
        loadQuestion();
    };
    ui.nextButtonContainer.innerHTML = '';
    ui.nextButtonContainer.appendChild(nextButton);
};

const evaluateLevelProgress = () => {
    const level = state.getCurrentAssessmentLevel();
    const stats = state.getAssessmentStats();
    const levelStats = stats.levelScores[level];

    // Calculate percentages for each section
    const standardPercent = levelStats.standard.total > 0 
        ? (levelStats.standard.correct / levelStats.standard.total) * 100 
        : 100; // If no questions, assume pass (e.g. just story)
        
    const storyPercent = levelStats.story.total > 0 
        ? (levelStats.story.correct / levelStats.story.total) * 100 
        : 100; // If no story, assume pass (e.g. just grammar)

    // Strict logic: MUST pass both thresholds
    if (standardPercent >= STANDARD_PASS_PERCENT && storyPercent >= STORY_PASS_PERCENT) {
        // Passed level
        const currentLevelIndex = levelsOrder.indexOf(level);
        if (currentLevelIndex < levelsOrder.length - 1) {
            // Move to next level
            const nextLevel = levelsOrder[currentLevelIndex + 1];
            loadLevel(nextLevel);
        } else {
            // Finished C2
            finishAssessment(true);
        }
    } else {
        // Failed level
        finishAssessment(false);
    }
};

const finishAssessment = (completedAll = false) => {
    clearInterval(state.getTimerInterval());
    state.getAssessmentStats().endTime = Date.now();
    
    const stats = state.getAssessmentStats();
    const lastLevel = state.getCurrentAssessmentLevel();
    
    // Just basic logic for final label based on where they stopped
    // (Detailed scoring logic used during evaluateLevelProgress determined if they PASSED this level)
    
    let finalLevelLabel = '';
    let levelDescription = '';
    
    if (completedAll) {
        finalLevelLabel = 'C2';
        levelDescription = 'Proficient / Maestría';
    } else {
        // Failed the current level. Result is the previous level.
        const currentLevelIndex = levelsOrder.indexOf(lastLevel);
        if (currentLevelIndex === 0) {
            finalLevelLabel = 'Below A1';
            levelDescription = 'Beginner / Principiante';
        } else {
            const achievedLevel = levelsOrder[currentLevelIndex - 1];
            finalLevelLabel = achievedLevel;
            levelDescription = getLevelDescription(achievedLevel);
        }
    }

    // Render Results Screen
    renderAssessmentResults(finalLevelLabel, levelDescription);
};

const getLevelDescription = (level) => {
    const descs = {
        'A1': 'Acceso / Beginner',
        'A2': 'Plataforma / Elementary',
        'B1': 'Umbral / Intermediate',
        'B2': 'Avanzado / Upper Intermediate',
        'C1': 'Dominio / Advanced',
        'C2': 'Maestría / Proficient'
    };
    return descs[level] || '';
};

const renderAssessmentResults = (levelLabel, description) => {
    ui.showScreen(document.getElementById('assessment-results-screen'));
    
    const stats = state.getAssessmentStats();
    const totalTimeSeconds = Math.floor((stats.endTime - stats.startTime) / 1000);
    const avgTime = stats.totalQuestionsAnswered > 0 ? (totalTimeSeconds / stats.totalQuestionsAnswered).toFixed(1) : 0;
    const accuracy = stats.totalQuestionsAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100) : 0;

    document.getElementById('assessment-final-level').textContent = levelLabel;
    document.getElementById('assessment-level-desc').textContent = description;
    
    document.getElementById('assessment-score-display').textContent = `${stats.totalCorrect}/${stats.totalQuestionsAnswered}`;
    document.getElementById('assessment-accuracy-display').textContent = `${accuracy}%`;
    document.getElementById('assessment-time-display').textContent = `${formatTime(totalTimeSeconds)}`;

    // Render Improvements
    const improvementsList = document.getElementById('assessment-improvements-list');
    improvementsList.innerHTML = '';
    
    if (stats.mistakes.length > 0) {
        stats.mistakes.slice(0, 3).forEach(mistake => {
            const item = document.createElement('div');
            item.className = 'bg-red-50 p-3 rounded-lg border border-red-100 text-sm';
            item.innerHTML = `
                <span class="font-bold text-red-700 block mb-1">[${mistake.level}] ${mistake.question}</span>
                <span class="text-gray-600">Tu respuesta: <span class="line-through">${mistake.userAnswer}</span></span>
                <br>
                <span class="text-green-600 font-semibold">Correcta: ${mistake.correctAnswer}</span>
            `;
            improvementsList.appendChild(item);
        });
    } else {
        improvementsList.innerHTML = '<p class="text-green-600 font-medium text-center">¡Increíble! No has cometido errores.</p>';
    }
    
    // Populate Review Modal
    const reviewList = document.getElementById('assessment-review-list');
    reviewList.innerHTML = '';
    stats.mistakes.forEach(mistake => {
        const item = document.createElement('div');
        item.className = 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm';
        item.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase">${mistake.level}</span>
            </div>
            <p class="font-bold text-gray-800 mb-3">${mistake.question}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div class="bg-red-50 p-2 rounded border border-red-100 text-red-700">
                    <strong>Tu respuesta:</strong> ${mistake.userAnswer}
                </div>
                <div class="bg-green-50 p-2 rounded border border-green-100 text-green-700">
                    <strong>Correcta:</strong> ${mistake.correctAnswer}
                </div>
            </div>
            <p class="text-gray-500 text-xs mt-2 italic">${mistake.explanation || ''}</p>
        `;
        reviewList.appendChild(item);
    });
};
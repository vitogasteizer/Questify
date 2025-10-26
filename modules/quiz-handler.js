import * as state from './state.js';
import * as ui from './ui-manager.js';
import * as settings from './settings.js';
import * as statistics from './statistics-handler.js';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// --- Progress Tracking ---
export const loadQuizProgress = () => {
    const storedProgress = localStorage.getItem(state.QUIZ_PROGRESS_STORAGE_KEY);
    if (storedProgress) {
        try {
            state.setQuizProgress(JSON.parse(storedProgress));
        } catch (e) {
            console.error('Failed to parse quiz progress from localStorage', e);
            state.setQuizProgress({});
        }
    }
};

const saveQuizProgress = () => {
    localStorage.setItem(state.QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(state.getQuizProgress()));
};

const updateQuizProgress = () => {
    const topicId = state.getCurrentTopicForQuiz()?.id;
    // Only track progress for quizzes started from a specific topic
    if (!topicId) return;

    const progress = state.getQuizProgress();
    if (!progress[topicId]) {
        progress[topicId] = { seenQuestions: [], incorrectlyAnswered: [] };
    }

    const topicProgress = progress[topicId];
    // Use Sets for efficient duplicate handling
    const seenSet = new Set(topicProgress.seenQuestions);
    const incorrectSet = new Set(topicProgress.incorrectlyAnswered);

    const answers = state.getSelectedAnswers();
    const questions = state.getCurrentQuestions();

    answers.forEach(answer => {
        const question = questions[answer.questionIndex];
        // Ensure question and originalIndex exist
        if (question && typeof question.originalIndex !== 'undefined') {
            seenSet.add(question.originalIndex);
            if (answer.isCorrect) {
                // If answered correctly, remove from incorrect list
                incorrectSet.delete(question.originalIndex);
            } else {
                // If incorrect, add to incorrect list
                incorrectSet.add(question.originalIndex);
            }
        }
    });

    // Convert Sets back to arrays for JSON serialization
    topicProgress.seenQuestions = Array.from(seenSet);
    topicProgress.incorrectlyAnswered = Array.from(incorrectSet);
    
    state.setQuizProgress(progress);
    saveQuizProgress();
};


// Wake Lock API
const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            state.setWakeLock(await navigator.wakeLock.request('screen'));
            state.getWakeLock().addEventListener('release', () => {});
        } catch (err) {
            console.error('Screen Wake Lock request failed:', err);
        }
    }
};

const releaseWakeLock = async () => {
    if (state.getWakeLock() !== null) {
        try {
            await state.getWakeLock().release();
            state.setWakeLock(null);
        } catch (err) {
            console.error('Screen Wake Lock release failed:', err);
        }
    }
};

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !ui.quizScreen.classList.contains('hidden')) {
        requestWakeLock();
    }
});


// Bookmark Functions
export const loadBookmarks = () => {
    const storedBookmarks = localStorage.getItem(state.BOOKMARKS_STORAGE_KEY);
    if (storedBookmarks) {
        try {
            state.setBookmarkedQuestions(new Set(JSON.parse(storedBookmarks)));
        } catch (e) {
            console.error('Failed to parse bookmarks from localStorage', e);
            state.setBookmarkedQuestions(new Set());
        }
    }
};

const saveBookmarks = () => {
    localStorage.setItem(state.BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(state.getBookmarkedQuestions())));
};

const removeBookmark = (originalIndex) => {
    state.getBookmarkedQuestions().delete(originalIndex);
    saveBookmarks();
    renderBookmarksSection();
};

const startBookmarkedQuiz = () => {
    const bookmarkedQuizQuestions = state.allQuestionsWithIndex.filter(q => state.getBookmarkedQuestions().has(q.originalIndex));
    if (bookmarkedQuizQuestions.length > 0) {
        showQuizOptionsScreen({ name: settings.translations[settings.getSettings().language].bookmarks_title }, bookmarkedQuizQuestions);
    }
};

export const renderBookmarksSection = () => {
    ui.bookmarksList.innerHTML = '';
    ui.bookmarkQuizButtonContainer.innerHTML = '';
    const lang = settings.getSettings().language;

    if (state.getBookmarkedQuestions().size > 0) {
        const questionsToRender = state.allQuestionsWithIndex.filter(q => state.getBookmarkedQuestions().has(q.originalIndex));

        questionsToRender.forEach(q => {
            const li = document.createElement('li');
            li.className = 'p-3 bg-gray-100 rounded-md flex justify-between items-center';
            li.innerHTML = `<p class="text-gray-800 text-sm mr-2">${q.questionText}</p>`;

            const removeButton = document.createElement('button');
            removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 hover:text-red-700" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`;
            removeButton.className = 'ml-4 p-1 rounded-full hover:bg-red-100 flex-shrink-0';
            removeButton.setAttribute('aria-label', settings.translations[lang].remove_bookmark_aria);
            removeButton.onclick = () => removeBookmark(q.originalIndex);

            li.appendChild(removeButton);
            ui.bookmarksList.appendChild(li);
        });

        if (questionsToRender.length > 0) {
            const startBtn = document.createElement('button');
            startBtn.textContent = settings.translations[lang].start_bookmarked_quiz_button.replace('{{count}}', questionsToRender.length);
            startBtn.className = 'px-6 py-3 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md';
            startBtn.onclick = startBookmarkedQuiz;
            ui.bookmarkQuizButtonContainer.appendChild(startBtn);
        }

    } else {
        ui.bookmarksList.innerHTML = `<p class="text-center text-gray-500">${settings.translations[lang].no_saved_questions_message}</p>`;
    }
};

export const handleBookmarkToggle = () => {
    const question = state.getCurrentQuestions()[state.getCurrentQuestionIndex()];
    if (!question) return;
    
    settings.playBookmarkSound();
    const lang = settings.getSettings().language;
    const { originalIndex } = question;
    if (state.getBookmarkedQuestions().has(originalIndex)) {
        state.getBookmarkedQuestions().delete(originalIndex);
        ui.bookmarkBtn.innerHTML = state.bookmarkIconSVG;
        ui.bookmarkBtn.setAttribute('aria-label', settings.translations[lang].bookmark_question_aria);
    } else {
        state.getBookmarkedQuestions().add(originalIndex);
        ui.bookmarkBtn.innerHTML = state.bookmarkedIconSVG;
        ui.bookmarkBtn.setAttribute('aria-label', settings.translations[lang].bookmarked_question_aria);
    }
    saveBookmarks();
};


// Quiz Logic

const selectQuestionsForQuiz = (topicId, allTopicQuestions, numQuestions, questionOrder) => {
    let questionsToChooseFrom;

    if (topicId) {
        const progress = state.getQuizProgress()[topicId] || { seenQuestions: [], incorrectlyAnswered: [] };
        const incorrectIndices = new Set(progress.incorrectlyAnswered);
        const seenIndices = new Set(progress.seenQuestions);

        const incorrectPool = allTopicQuestions.filter(q => incorrectIndices.has(q.originalIndex));
        const unseenPool = allTopicQuestions.filter(q => !seenIndices.has(q.originalIndex));
        
        // The primary pool of questions is incorrect + unseen
        let primaryPool = [...incorrectPool, ...unseenPool];
        
        // Remove duplicates that might arise from edge cases
        primaryPool = Array.from(new Map(primaryPool.map(item => [item.originalIndex, item])).values());
        
        // If the primary pool is large enough, we use it
        if (primaryPool.length >= numQuestions) {
            questionsToChooseFrom = primaryPool;
        } else {
            // Not enough, so we need to add seen/correct questions as fallback
            const seenCorrectPool = allTopicQuestions.filter(q => seenIndices.has(q.originalIndex) && !incorrectIndices.has(q.originalIndex));
            questionsToChooseFrom = [...primaryPool, ...seenCorrectPool];
        }
    } else {
        // Non-topic quiz (bookmarks, search), use all questions provided
        questionsToChooseFrom = [...allTopicQuestions];
    }
    
    if (questionOrder === 'random') {
        shuffleArray(questionsToChooseFrom);
    }
    
    return questionsToChooseFrom.slice(0, numQuestions);
};

export const showQuizOptionsScreen = (topic, questions) => {
    state.setCurrentTopicForQuiz(topic);
    state.setCurrentQuestionPool(questions);
    ui.quizTopicTitle.textContent = topic.name;
    
    ui.quizQuestionsCountSlider.max = questions.length;
    ui.quizQuestionsCountSlider.value = Math.min(20, questions.length); // Default to 20 or max available
    ui.quizQuestionsCountValue.textContent = ui.quizQuestionsCountSlider.value;
    
    document.getElementById('quiz-timer-on-radio').checked = true;
    document.getElementById('quiz-timer-duration-input').value = 15;
    document.getElementById('quiz-timer-duration-input').disabled = false;
    document.getElementById('quiz-order-random-radio').checked = true;

    ui.showScreen(ui.quizOptionsScreen);
};

const startQuiz = (isTimerEnabled, durationInSeconds) => {
    settings.playNavigationSound();
    state.setCurrentQuestionIndex(0);
    state.setScore(0);
    state.setSelectedAnswers([]);
    state.setStartTime(Date.now());
    clearInterval(state.getTimerInterval());
    
    ui.timerContainer.classList.toggle('hidden', !isTimerEnabled);

    if (isTimerEnabled) {
        state.setTimeRemaining(durationInSeconds);
        ui.timerEl.textContent = formatTime(state.getTimeRemaining());
        state.setTimerInterval(setInterval(updateCountdown, 1000));
    } else {
        state.setStopwatchSeconds(0);
        ui.timerEl.textContent = formatTime(state.getStopwatchSeconds());
        state.setTimerInterval(setInterval(updateStopwatch, 1000));
    }

    ui.showScreen(ui.quizScreen);
    ui.updateSoundToggleUI();
    loadQuestion();
    requestWakeLock();
};

const restartQuiz = () => {
    const config = state.getLastQuizConfig();
    if (!config) {
        // Fallback to go home if no config is saved
        ui.goHome();
        return;
    }
    
    const selectedQuestions = selectQuestionsForQuiz(
        config.topicId,
        config.questionPool,
        config.numQuestions,
        config.questionOrder
    );
    state.setCurrentQuestions(selectedQuestions);


    startQuiz(config.isTimerEnabled, config.timerDuration * 60);
};


const loadQuestion = () => {
    ui.optionsContainer.innerHTML = '';
    ui.questionImageContainer.innerHTML = '';
    ui.nextButtonContainer.innerHTML = '';

    if (state.getCurrentQuestionIndex() >= state.getCurrentQuestions().length) {
        finishQuiz();
        return;
    }

    const question = state.getCurrentQuestions()[state.getCurrentQuestionIndex()];
    const lang = settings.getSettings().language;
    
    ui.questionTextEl.textContent = question.questionText;

    if (question.imageUrl) {
        const img = document.createElement('img');
        img.src = question.imageUrl;
        img.alt = `Imagen para la pregunta ${state.getCurrentQuestionIndex() + 1}`;
        img.className = 'mx-auto rounded-lg max-h-60 mb-4';
        ui.questionImageContainer.appendChild(img);
    }
    
    const progress = ((state.getCurrentQuestionIndex() + 1) / state.getCurrentQuestions().length) * 100;
    ui.progressBar.style.width = `${progress}%`;
    ui.progressBar.setAttribute('aria-valuenow', progress);
    
    ui.progressText.textContent = settings.translations[lang].progress_text_template
        .replace('{{current}}', state.getCurrentQuestionIndex() + 1)
        .replace('{{total}}', state.getCurrentQuestions().length);

    if (state.getBookmarkedQuestions().has(question.originalIndex)) {
        ui.bookmarkBtn.innerHTML = state.bookmarkedIconSVG;
        ui.bookmarkBtn.setAttribute('aria-label', settings.translations[lang].bookmarked_question_aria);
    } else {
        ui.bookmarkBtn.innerHTML = state.bookmarkIconSVG;
        ui.bookmarkBtn.setAttribute('aria-label', settings.translations[lang].bookmark_question_aria);
    }

    const shuffledOptions = shuffleArray([...question.options.keys()]);

    shuffledOptions.forEach(optionIndex => {
        const option = question.options[optionIndex];
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'w-full text-left p-4 border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200';
        button.dataset.index = optionIndex;
        button.onclick = () => selectAnswer(button);
        ui.optionsContainer.appendChild(button);
    });
};

const selectAnswer = (button) => {
    const selectedIndex = parseInt(button.dataset.index);
    const question = state.getCurrentQuestions()[state.getCurrentQuestionIndex()];
    const isCorrect = selectedIndex === question.correctAnswerIndex;

    Array.from(ui.optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
        const btnIndex = parseInt(btn.dataset.index);
        if (btnIndex === question.correctAnswerIndex) {
            btn.classList.add('correct');
        } else if (btnIndex === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        state.incrementScore();
        settings.playCorrectSound();
    } else {
        settings.playIncorrectSound();
    }

    state.addSelectedAnswer({
        questionIndex: state.getCurrentQuestionIndex(),
        selectedIndex: selectedIndex,
        isCorrect: isCorrect
    });
    
    const lang = settings.getSettings().language;
    const nextButton = document.createElement('button');
    if(state.getCurrentQuestionIndex() === state.getCurrentQuestions().length - 1) {
        nextButton.textContent = settings.translations[lang].finish_quiz_button;
    } else {
        nextButton.textContent = settings.translations[lang].next_question_button;
    }
    
    nextButton.className = 'px-8 py-3 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
    nextButton.onclick = () => {
        settings.playNavigationSound();
        state.incrementCurrentQuestionIndex();
        loadQuestion();
    };
    ui.nextButtonContainer.appendChild(nextButton);
};

const finishQuiz = () => {
    clearInterval(state.getTimerInterval());
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - state.getStartTime()) / 1000);
    const lang = settings.getSettings().language;
    const currentQuestions = state.getCurrentQuestions();
    
    // Update statistics
    statistics.addTestResult({
        correct: state.getScore(),
        incorrect: currentQuestions.length - state.getScore(),
        time: timeTaken,
        questionCount: currentQuestions.length
    });

    updateQuizProgress();

    ui.resultsMessage.textContent = settings.translations[lang].results_message_completed.replace('{{username}}', state.getUsername());
    ui.resultsTitle.textContent = settings.translations[lang].results_title_completed;
    
    const percentage = Math.round((state.getScore() / currentQuestions.length) * 100);
    if (percentage === 100) {
        ui.resultsTitle.textContent = settings.translations[lang].results_title_perfect;
        ui.resultsMessage.textContent = settings.translations[lang].results_message_perfect.replace('{{username}}', state.getUsername());
    }
    
    ui.scoreDisplay.textContent = `${state.getScore()}/${currentQuestions.length}`;
    ui.scorePercentage.textContent = `${percentage}%`;
    ui.finalTimeEl.textContent = `${settings.translations[lang].total_time_label} ${formatTime(timeTaken)}`;
    
    renderResultsButtons();
    renderReviewSection();

    ui.showScreen(ui.resultsScreen);
    releaseWakeLock();
};

const renderResultsButtons = () => {
    ui.resultsButtons.innerHTML = '';
    const lang = settings.getSettings().language;

    const incorrectAnswers = state.getSelectedAnswers().filter(a => !a.isCorrect);

    if (incorrectAnswers.length > 0) {
        const retryButton = document.createElement('button');
        retryButton.textContent = settings.translations[lang].retry_mistakes_button.replace('{{count}}', incorrectAnswers.length);
        retryButton.className = 'w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg';
        retryButton.onclick = () => {
            state.setCurrentQuestions(incorrectAnswers.map(a => state.getCurrentQuestions()[a.questionIndex]));
            const timerOn = document.getElementById('quiz-timer-on-radio').checked;
            const duration = parseInt(document.getElementById('quiz-timer-duration-input').value, 10);
            startQuiz(timerOn, duration * 60);
        };
        ui.resultsButtons.appendChild(retryButton);
    }

    const newQuizButton = document.createElement('button');
    newQuizButton.textContent = settings.translations[lang].start_new_quiz_button;
    newQuizButton.className = 'w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg';
    newQuizButton.onclick = restartQuiz;
    ui.resultsButtons.appendChild(newQuizButton);
};

const renderReviewSection = () => {
    ui.incorrectList.innerHTML = '';
    const incorrectAnswers = state.getSelectedAnswers().filter(a => !a.isCorrect);
    const lang = settings.getSettings().language;

    if (incorrectAnswers.length > 0) {
        ui.reviewSection.classList.remove('hidden');
        incorrectAnswers.forEach(answer => {
            const question = state.getCurrentQuestions()[answer.questionIndex];
            const li = document.createElement('li');
            li.className = 'p-3 border-b border-gray-200';
            li.innerHTML = `
                <p class="font-semibold text-gray-800">${question.questionText}</p>
                <p class="text-sm mt-1 text-red-600">${settings.translations[lang].correct_answer_label} ${question.options[question.correctAnswerIndex]}</p>
            `;
            ui.incorrectList.appendChild(li);
        });
    } else {
        ui.reviewSection.classList.add('hidden');
    }
};

const updateCountdown = () => {
    if (state.getTimeRemaining() > 0) {
        state.decrementTimeRemaining();
        ui.timerEl.textContent = formatTime(state.getTimeRemaining());
    } else {
        clearInterval(state.getTimerInterval());
        finishQuiz();
    }
};

const updateStopwatch = () => {
    state.incrementStopwatchSeconds();
    ui.timerEl.textContent = formatTime(state.getStopwatchSeconds());
};

export const showSavedQuestions = () => {
    settings.playNavigationSound();
    state.setSavedScreenState('questions');

    ui.savedCategorySelection.classList.add('hidden');
    ui.flashcardBookmarksContainer.classList.add('hidden');
    ui.bookmarksContainer.classList.remove('hidden');
    
    const lang = settings.getSettings().language;
    ui.savedScreenHeaderTitle.textContent = settings.translations[lang].bookmarks_title;
    ui.backFromSavedBtn.setAttribute('aria-label', settings.translations[lang].back_button);
    ui.backFromSavedBtn.setAttribute('title', settings.translations[lang].back_button);

    renderBookmarksSection();
};

export const initQuizOptionsListeners = () => {
    ui.quizQuestionsCountSlider.addEventListener('input', (e) => {
        ui.quizQuestionsCountValue.textContent = e.target.value;
    });
    document.getElementById('quiz-timer-on-radio').addEventListener('change', (e) => {
        document.getElementById('quiz-timer-duration-input').disabled = !e.target.checked;
    });
     document.getElementById('quiz-timer-off-radio').addEventListener('change', (e) => {
        document.getElementById('quiz-timer-duration-input').disabled = e.target.checked;
    });
    ui.startQuizFromOptionsBtn.addEventListener('click', () => {
        settings.playNavigationSound();
        const numQuestions = parseInt(ui.quizQuestionsCountSlider.value, 10);
        const isTimerEnabled = document.getElementById('quiz-timer-on-radio').checked;
        const timerDuration = parseInt(document.getElementById('quiz-timer-duration-input').value, 10);
        const questionOrder = document.querySelector('input[name="quiz-question-order"]:checked').value;
        const topicId = state.getCurrentTopicForQuiz()?.id;
        
        state.setLastQuizConfig({
            topicId: topicId,
            numQuestions,
            isTimerEnabled,
            timerDuration,
            questionOrder,
            questionPool: state.getCurrentQuestionPool()
        });

        const selectedQuestions = selectQuestionsForQuiz(
            topicId,
            state.getCurrentQuestionPool(),
            numQuestions,
            questionOrder
        );
        state.setCurrentQuestions(selectedQuestions);
        
        startQuiz(isTimerEnabled, timerDuration * 60);
    });
}
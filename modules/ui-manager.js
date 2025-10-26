import { allTopics, categories } from '../topics-data.js';
import * as state from './state.js';
import { translations, isSoundEnabled, soundOnIconSVG, soundOffIconSVG, getSettings, playNavigationSound } from './settings.js';
import { renderBookmarksSection } from './quiz-handler.js';
import { renderBookmarkedFlashcardsSection } from './flashcard-handler.js';
import { getStatistics } from './statistics-handler.js';

// DOM Elements
export const nameScreen = document.getElementById('name-screen');
export const nameInput = document.getElementById('name-input');
export const submitNameBtn = document.getElementById('submit-name-btn');
export const welcomeMessage = document.getElementById('welcome-message');
export const startScreen = document.getElementById('start-screen');
export const startScreenDefaultContent = document.getElementById('start-screen-default-content');
export const quizScreen = document.getElementById('quiz-screen');
export const resultsScreen = document.getElementById('results-screen');
export const backToHomeBtn = document.getElementById('back-to-home-btn');
export const progressText = document.getElementById('progress-text');
export const progressBar = document.getElementById('progress-bar');
export const timerContainer = document.getElementById('timer-container');
export const timerEl = document.getElementById('timer');
export const questionImageContainer = document.getElementById('question-image-container');
export const questionTextEl = document.getElementById('question-text');
export const optionsContainer = document.getElementById('options-container');
export const nextButtonContainer = document.getElementById('next-button-container');
export const resultsTitle = document.getElementById('results-title');
export const resultsMessage = document.getElementById('results-message');
export const finalTimeEl = document.getElementById('final-time');
export const scoreDisplay = document.getElementById('score-display');
export const scorePercentage = document.getElementById('score-percentage');
export const resultsButtons = document.getElementById('results-buttons');
export const reviewSection = document.getElementById('review-section');
export const incorrectList = document.getElementById('incorrect-questions-list');
export const soundToggleBtn = document.getElementById('sound-toggle-btn');
export const searchInput = document.getElementById('search-input');
export const searchFilterSelect = document.getElementById('search-filter-select');
export const categoryCardsContainer = document.getElementById('category-cards-container');
export const searchResultsContainer = document.getElementById('search-results-container');
export const searchResultsList = document.getElementById('search-results-list');
export const noResultsMessage = document.getElementById('no-results-message');
export const topicQuizButtonContainer = document.getElementById('topic-quiz-button-container');
export const bookmarkBtn = document.getElementById('bookmark-btn');
export const bookmarksContainer = document.getElementById('bookmarks-container');
export const bookmarksList = document.getElementById('bookmarks-list');
export const bookmarkQuizButtonContainer = document.getElementById('bookmark-quiz-button-container');
export const appHeader = document.getElementById('app-header');
export const homeLinkHeader = document.getElementById('home-link-header');
export const menuBtn = document.getElementById('menu-btn');
export const settingsModal = document.getElementById('settings-modal');
export const settingsGreeting = document.getElementById('settings-greeting');
export const closeSettingsBtn = document.getElementById('close-settings-btn');
export const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
export const saveSettingsBtn = document.getElementById('save-settings-btn');
export const languageSelect = document.getElementById('language-select');
export const quizOptionsScreen = document.getElementById('quiz-options-screen');
export const quizTopicTitle = document.getElementById('quiz-topic-title');
export const quizQuestionsCountSlider = document.getElementById('quiz-questions-count-slider');
export const quizQuestionsCountValue = document.getElementById('quiz-questions-count-value');
export const startQuizFromOptionsBtn = document.getElementById('start-quiz-from-options-btn');
export const backToStartFromQuizOptionsBtn = document.getElementById('back-to-start-from-quiz-options-btn');
export const flashcardOptionsScreen = document.getElementById('flashcard-options-screen');
export const flashcardTopicTitle = document.getElementById('flashcard-topic-title');
export const flashcardsCountSlider = document.getElementById('flashcards-count-slider');
export const flashcardsCountValue = document.getElementById('flashcards-count-value');
export const startFlashcardsBtn = document.getElementById('start-flashcards-btn');
export const backToStartFromFlashcardsBtn = document.getElementById('back-to-start-from-flashcards-btn');
export const flashcardScreen = document.getElementById('flashcard-screen');
export const backToHomeFromFlashcardBtn = document.getElementById('back-to-home-from-flashcard-btn');
export const flashcardSoundToggleBtn = document.getElementById('flashcard-sound-toggle-btn');
export const flashcardContainer = document.getElementById('flashcard-container');
export const flashcardFrontText = document.getElementById('flashcard-front-text');
export const flashcardBackText = document.getElementById('flashcard-back-text');
export const prevFlashcardBtn = document.getElementById('prev-flashcard-btn');
export const nextFlashcardBtn = document.getElementById('next-flashcard-btn');
export const flashcardProgressText = document.getElementById('flashcard-progress-text');
export const flashcardBookmarkBtn = document.getElementById('flashcard-bookmark-btn');
export const flashcardAssessmentContainer = document.getElementById('flashcard-assessment-container');
export const flashcardKnownBtn = document.getElementById('flashcard-known-btn');
export const flashcardUnknownBtn = document.getElementById('flashcard-unknown-btn');
export const flashcardFlipHint = document.getElementById('flashcard-flip-hint');
export const flashcardResultsScreen = document.getElementById('flashcard-results-screen');
export const flashcardResultsMessage = document.getElementById('flashcard-results-message');
export const flashcardResultsButtons = document.getElementById('flashcard-results-buttons');
export const flashcardBookmarksContainer = document.getElementById('flashcard-bookmarks-container');
export const flashcardBookmarksList = document.getElementById('flashcard-bookmarks-list');
export const flashcardBookmarkQuizButtonContainer = document.getElementById('flashcard-bookmark-quiz-button-container');
export const learningScreen = document.getElementById('learning-screen');
export const learningTopicTitle = document.getElementById('learning-topic-title');
export const backToHomeFromLearningBtn = document.getElementById('back-to-home-from-learning-btn');
export const learningSummaryView = document.getElementById('learning-summary-view');
export const learningSummaryContent = document.getElementById('learning-summary-content');
export const startScenariosBtn = document.getElementById('start-scenarios-btn');
export const learningScenarioView = document.getElementById('learning-scenario-view');
export const scenarioProgressText = document.getElementById('scenario-progress-text');
export const scenarioTitle = document.getElementById('scenario-title');
export const scenarioSituation = document.getElementById('scenario-situation');
export const scenarioChoicesContainer = document.getElementById('scenario-choices-container');
export const scenarioFeedbackContainer = document.getElementById('scenario-feedback-container');
export const scenarioFeedbackText = document.getElementById('scenario-feedback-text');
export const scenarioNextBtnContainer = document.getElementById('scenario-next-btn-container');
export const learningCompletionView = document.getElementById('learning-completion-view');
export const retryScenariosBtn = document.getElementById('retry-scenarios-btn');
export const learningHomeBtn = document.getElementById('learning-home-btn');
export const savedScreen = document.getElementById('saved-screen');
export const showSavedBtn = document.getElementById('show-saved-btn');
export const backFromSavedBtn = document.getElementById('back-from-saved-btn');
export const savedScreenHeaderTitle = document.getElementById('saved-screen-header-title');
export const savedCategorySelection = document.getElementById('saved-category-selection');
export const showSavedQuestionsBtn = document.getElementById('show-saved-questions-btn');
export const showSavedFlashcardsBtn = document.getElementById('show-saved-flashcards-btn');
export const statisticsScreen = document.getElementById('statistics-screen');
export const showStatisticsBtn = document.getElementById('show-statistics-btn');
export const backFromStatisticsBtn = document.getElementById('back-from-statistics-btn');


export function showScreen(screen) {
    nameScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    quizOptionsScreen.classList.add('hidden');
    flashcardOptionsScreen.classList.add('hidden');
    flashcardScreen.classList.add('hidden');
    flashcardResultsScreen.classList.add('hidden');
    savedScreen.classList.add('hidden');
    learningScreen.classList.add('hidden');
    statisticsScreen.classList.add('hidden');
    screen.classList.remove('hidden');

    const appContainer = document.getElementById('app');

    if (screen === nameScreen) {
        appHeader.classList.add('hidden');
        appContainer.classList.add('justify-center');
        appContainer.classList.remove('pt-20');
    } else {
        appHeader.classList.remove('hidden');
        appContainer.classList.remove('justify-center');
        appContainer.classList.add('pt-20');
    }

    if (screen === startScreen) {
        renderCategories();
        renderTopicsOnStartScreen();
    }
};

export function goHome() {
    playNavigationSound();
    clearInterval(state.getTimerInterval());
    showScreen(startScreen);
    if (state.getWakeLock()) {
        state.getWakeLock().release();
        state.setWakeLock(null);
    }
};

const updateSearchPlaceholder = () => {
    const lang = getSettings().language;
    const filter = state.getCurrentSearchFilter();
    let placeholderKey = 'search_placeholder_all';
    if (filter === 'tests') placeholderKey = 'search_placeholder_tests';
    else if (filter === 'flashcards') placeholderKey = 'search_placeholder_flashcards';
    else if (filter === 'topics') placeholderKey = 'search_placeholder_topics';
    
    searchInput.placeholder = translations[lang][placeholderKey] || 'Search...';
};

export const applyTranslations = (lang) => {
    if (!translations[lang]) lang = 'es'; // Fallback to Spanish
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-i18n-key]');
    elements.forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = translations[lang][key];
        
        if (translation) {
            if (el.tagName === 'INPUT' && el.placeholder !== undefined && el.id !== 'search-input') {
                el.placeholder = translation;
            } else if (el.hasAttribute('title')) {
                 el.setAttribute('title', translation);
            } else if (el.hasAttribute('aria-label')) {
                 el.setAttribute('aria-label', translation);
            } else {
                el.innerHTML = translation;
            }
        }
    });
    updateSearchPlaceholder();
};

export const updateSoundToggleUI = () => {
    const lang = getSettings().language;
    const buttons = [soundToggleBtn, flashcardSoundToggleBtn];
    buttons.forEach(btn => {
        if (btn) {
            if (isSoundEnabled()) {
                btn.innerHTML = soundOnIconSVG;
                btn.setAttribute('aria-label', translations[lang].sound_off_aria);
            } else {
                btn.innerHTML = soundOffIconSVG;
                btn.setAttribute('aria-label', translations[lang].sound_on_aria);
            }
        }
    });
};

export const renderCategories = () => {
    categoryCardsContainer.innerHTML = '';
    const lang = getSettings().language;

    const allCategoryOptions = [
        { 
            id: 'all', 
            nameKey: 'category_all',
            colorClass: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 hover:border-slate-400', 
            activeColorClass: 'bg-slate-600 text-white border-slate-700'
        },
        ...categories
    ];
    
    allCategoryOptions.forEach(cat => {
        const btn = document.createElement('button');
        btn.dataset.categoryId = cat.id;
        btn.textContent = translations[lang][cat.nameKey];
        btn.className = 'category-card flex-shrink-0 w-36 h-24 flex items-center justify-center p-2 text-center font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer border-2';
        
        if (state.getCurrentCategoryId() === cat.id) {
            btn.classList.add(...cat.activeColorClass.split(' '), 'scale-105');
        } else {
            btn.classList.add(...cat.colorClass.split(' '));
        }
        categoryCardsContainer.appendChild(btn);
    });
};

export const renderTopicsOnStartScreen = () => {
    const container = document.getElementById('topics-accordion-container');
    if (!container) return;
    container.innerHTML = '';
    const lang = getSettings().language;

    const topicsToRender = state.getCurrentCategoryId() === 'all' 
        ? allTopics 
        : allTopics.filter(topic => topic.categoryId === state.getCurrentCategoryId());
    
    if (topicsToRender.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 mt-8">${translations[lang].no_topics_in_category}</p>`;
        return;
    }

    topicsToRender.forEach(topic => {
        const topicId = `topic-accordion-${topic.id}`;

        const topicWrapper = document.createElement('div');
        topicWrapper.className = 'border border-gray-200 rounded-lg shadow-sm bg-white';

        const topicHeader = document.createElement('button');
        topicHeader.className = 'w-full p-4 text-center md:text-left font-bold transition-colors hover:bg-gray-50 flex flex-col md:flex-row items-center rounded-lg';
        topicHeader.setAttribute('aria-expanded', 'false');
        topicHeader.setAttribute('aria-controls', `${topicId}-content`);
        topicHeader.innerHTML = `
            <div class="w-full h-32 md:w-24 md:h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                <img src="${topic.imageUrl}" alt="${topic.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
                <h3 class="text-xl text-blue-600">${topic.name}</h3>
                <p class="text-sm text-gray-500 font-normal mt-1">${topic.description}</p>
            </div>
            <svg class="w-6 h-6 transform transition-transform mt-4 md:mt-0 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        `;

        const topicContent = document.createElement('div');
        topicContent.id = `${topicId}-content`;
        topicContent.className = 'hidden p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg';
        topicContent.innerHTML = `
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button class="topic-action-btn learn-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md ${!topic.hasLearning ? 'hidden' : ''}" data-i18n-key="learn_topic" data-topic-id="${topic.id}" data-action="learn">
                    ${translations[lang].learn_topic}
                </button>
                <button class="topic-action-btn flashcard-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md ${(!topic.flashcards || topic.flashcards.length === 0) ? 'hidden' : ''}" data-topic-id="${topic.id}" data-action="flashcards">
                    ${translations[lang].flashcards}
                </button>
                <button class="topic-action-btn test-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md" data-topic-id="${topic.id}" data-action="test">
                    ${translations[lang].testing}
                </button>
            </div>
        `;
        
        topicWrapper.appendChild(topicHeader);
        topicWrapper.appendChild(topicContent);
        container.appendChild(topicWrapper);

        topicHeader.addEventListener('click', () => {
            const isExpanded = topicHeader.getAttribute('aria-expanded') === 'true';
            topicHeader.setAttribute('aria-expanded', !isExpanded);
            topicContent.classList.toggle('hidden');
            topicHeader.querySelector('svg').classList.toggle('rotate-180');
        });
    });
};

export const initCategorySlider = () => {
    const slider = categoryCardsContainer;
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast multiplier
            slider.scrollLeft = scrollLeft - walk;
        });
    }
};

export const showSavedScreen = () => {
    settingsModal.classList.add('hidden');
    import('./settings.js').then(settings => settings.playNavigationSound());
    state.setSavedScreenState('categories');
    
    savedCategorySelection.classList.remove('hidden');
    bookmarksContainer.classList.add('hidden');
    flashcardBookmarksContainer.classList.add('hidden');

    const lang = getSettings().language;
    savedScreenHeaderTitle.textContent = translations[lang].saved_screen_title;
    backFromSavedBtn.setAttribute('aria-label', translations[lang].back_to_home_title);
    backFromSavedBtn.setAttribute('title', translations[lang].back_to_home_title);

    showScreen(savedScreen);
};

export const handleBackFromSaved = () => {
    import('./settings.js').then(settings => settings.playNavigationSound());
    if (state.getSavedScreenState() === 'questions' || state.getSavedScreenState() === 'flashcards') {
        state.setSavedScreenState('categories');
        bookmarksContainer.classList.add('hidden');
        flashcardBookmarksContainer.classList.add('hidden');
        savedCategorySelection.classList.remove('hidden');
        
        const lang = getSettings().language;
        savedScreenHeaderTitle.textContent = translations[lang].saved_screen_title;
        backFromSavedBtn.setAttribute('aria-label', translations[lang].back_to_home_title);
        backFromSavedBtn.setAttribute('title', translations[lang].back_to_home_title);

    } else { // state is 'categories'
        goHome();
    }
};

export const showStatisticsScreen = () => {
    settingsModal.classList.add('hidden');
    import('./settings.js').then(settings => settings.playNavigationSound());
    const stats = getStatistics();

    // Time spent
    const hours = Math.floor(stats.timeSpentInSeconds / 3600);
    const minutes = Math.floor((stats.timeSpentInSeconds % 3600) / 60);
    document.getElementById('stat-time-spent').textContent = `${hours}h ${minutes}m`;

    // Avg Test Time
    const totalTime = stats.testHistory.reduce((acc, test) => acc + test.time, 0);
    const totalQuestions = stats.testHistory.reduce((acc, test) => acc + test.questionCount, 0);
    const avgTimePerQuestion = totalQuestions > 0 ? totalTime / totalQuestions : 0;
    const avgTimeFor10Questions = Math.round(avgTimePerQuestion * 10);
    document.getElementById('stat-avg-test-time').textContent = `${avgTimeFor10Questions}s`;

    // Total Tests
    document.getElementById('stat-total-tests').textContent = stats.testsCompleted;
    
    // Total Flashcards
    document.getElementById('stat-total-flashcards').textContent = stats.totalFlashcardsSeen;

    // Test Accuracy
    document.getElementById('stat-correct-answers').textContent = stats.totalCorrectAnswers;
    document.getElementById('stat-incorrect-answers').textContent = stats.totalIncorrectAnswers;
    const totalAnswers = stats.totalCorrectAnswers + stats.totalIncorrectAnswers;
    const accuracyPercentage = totalAnswers > 0 ? Math.round((stats.totalCorrectAnswers / totalAnswers) * 100) : 0;
    document.getElementById('accuracy-bar').style.width = `${accuracyPercentage}%`;
    document.getElementById('accuracy-percentage').textContent = `${accuracyPercentage}%`;

    // Flashcard Knowledge
    document.getElementById('stat-known-flashcards').textContent = stats.totalKnownFlashcards;
    document.getElementById('stat-unknown-flashcards').textContent = stats.totalUnknownFlashcards;
    const totalFlashcardsAssessed = stats.totalKnownFlashcards + stats.totalUnknownFlashcards;
    const knowledgePercentage = totalFlashcardsAssessed > 0 ? Math.round((stats.totalKnownFlashcards / totalFlashcardsAssessed) * 100) : 0;
    document.getElementById('knowledge-bar').style.width = `${knowledgePercentage}%`;
    document.getElementById('knowledge-percentage').textContent = `${knowledgePercentage}%`;

    showScreen(statisticsScreen);
};
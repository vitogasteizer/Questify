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
export const topicsViewContainer = document.getElementById('topics-view-container');
export const quizScreen = document.getElementById('quiz-screen');
export const resultsScreen = document.getElementById('results-screen');
export const progressText = document.getElementById('progress-text');
export const progressBar = document.getElementById('progress-bar');
export const timerContainer = document.getElementById('timer-container');
export const timerEl = document.getElementById('timer');
export const questionInstruction = document.getElementById('question-instruction');
export const questionImageContainer = document.getElementById('question-image-container');
export const questionTextEl = document.getElementById('question-text');
export const chooseAnswerSubtitle = document.getElementById('choose-answer-subtitle');
export const optionsContainer = document.getElementById('options-container');
export const explanationContainer = document.getElementById('explanation-container');
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
export const startScreenDefaultContent = document.getElementById('start-screen-default-content');
export const bookmarkBtn = document.getElementById('bookmark-btn');
export const bookmarksContainer = document.getElementById('bookmarks-container');
export const bookmarksList = document.getElementById('bookmarks-list');
export const bookmarkQuizButtonContainer = document.getElementById('bookmark-quiz-button-container');
export const appHeader = document.getElementById('app-header');
export const homeLinkHeader = document.getElementById('home-link-header');
export const menuBtn = document.getElementById('menu-btn');
export const sideMenu = document.getElementById('side-menu');
export const menuBackdrop = document.getElementById('menu-backdrop');
export const settingsGreeting = document.getElementById('settings-greeting');
export const closeSettingsBtn = document.getElementById('close-settings-btn');
export const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
export const saveSettingsBtn = document.getElementById('save-settings-btn');
export const languageSwitcher = document.getElementById('language-switcher');
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
export const flashcardFooter = document.getElementById('flashcard-footer');
export const learningFooter = document.getElementById('learning-footer');
export const summaryNextBtnContainer = document.getElementById('summary-next-btn-container');

// Reading Elements
export const readingListScreen = document.getElementById('reading-list-screen');
export const readingListContainer = document.getElementById('reading-list-container');
export const backFromReadingListBtn = document.getElementById('back-from-reading-list-btn');
export const readingContentContainer = document.getElementById('reading-content-container');
export const readingAudioPlayer = document.getElementById('reading-audio-player');
export const readingTextDisplay = document.getElementById('reading-text-display');

// NEW Reading Session Elements
export const readingSessionScreen = document.getElementById('reading-session-screen');
export const rsAudioPlayer = document.getElementById('rs-audio-player');
export const rsSoundToggleBtn = document.getElementById('rs-sound-toggle-btn');
export const rsStoryTitle = document.getElementById('rs-story-title');
export const rsTextContent = document.getElementById('rs-text-content');
export const rsToggleTextBtn = document.getElementById('rs-toggle-text-btn');
export const rsTextChevron = document.getElementById('rs-text-chevron');
export const rsQuestionsList = document.getElementById('rs-questions-list');
export const rsFinishBtn = document.getElementById('rs-finish-btn');


// Assessment Elements
export const startAssessmentFlowBtn = document.getElementById('start-assessment-flow-btn');
export const assessmentStartScreen = document.getElementById('assessment-start-screen');
export const startSpanishAssessmentBtn = document.getElementById('start-spanish-assessment-btn');
export const backFromAssessmentStartBtn = document.getElementById('back-from-assessment-start-btn');
export const assessmentLevelBadge = document.getElementById('assessment-level-badge');
export const assessmentResultsScreen = document.getElementById('assessment-results-screen');
export const assessmentReviewBtn = document.getElementById('assessment-review-btn');
export const assessmentRetryBtn = document.getElementById('assessment-retry-btn');
export const assessmentHomeBtn = document.getElementById('assessment-home-btn');
export const assessmentReviewModal = document.getElementById('assessment-review-modal');
export const closeAssessmentReviewBtn = document.getElementById('close-assessment-review-btn');
export const closeAssessmentReviewBtn2 = document.getElementById('close-assessment-review-btn-2');


export const openSideMenu = () => {
    sideMenu.classList.add('is-open');
    menuBackdrop.classList.add('is-open');
    
    const currentLang = getSettings().language;
    state.setStagedLanguage(currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    settingsGreeting.textContent = translations[currentLang].settings_greeting.replace('{{username}}', state.getUsername());
};

export const closeSideMenu = () => {
    sideMenu.classList.remove('is-open');
    menuBackdrop.classList.remove('is-open');
};


export function updateHeaderBackground() {
    // List of screens that might have internal scrolling and need a solid header background.
    const screensWithSolidHeader = [
        'statistics-screen',
        'saved-screen',
        'results-screen',
        'learning-screen',
        'assessment-results-screen',
        'reading-list-screen',
        'reading-session-screen'
    ];

    const currentVisibleScreen = document.querySelector('#app > div:not(.hidden)');
    const isSearchVisible = !document.getElementById('search-results-container').classList.contains('hidden');
    
    const isScrolled = window.scrollY > 10;
    
    let needsSolidHeader = false;
    if (currentVisibleScreen) {
        needsSolidHeader = screensWithSolidHeader.includes(currentVisibleScreen.id) || 
                           (currentVisibleScreen.id === 'start-screen' && isSearchVisible);
    }

    if (isScrolled || needsSolidHeader) {
        appHeader.classList.add('bg-white', 'shadow-md');
    } else {
        appHeader.classList.remove('bg-white', 'shadow-md');
    }
}

export const showCategoryView = () => {
    categoryCardsContainer.classList.remove('hidden');
    topicsViewContainer.classList.add('hidden');
    topicsViewContainer.innerHTML = '';
};

export const showTopicsForCategory = (categoryId) => {
    categoryCardsContainer.classList.add('hidden');
    topicsViewContainer.classList.remove('hidden');
    topicsViewContainer.innerHTML = ''; // Clear everything inside
    
    const wrapper = document.createElement('div');
    wrapper.className = 'w-full max-w-2xl mx-auto';

    const lang = getSettings().language;

    const backButton = document.createElement('button');
    backButton.className = 'mb-6 flex items-center text-blue-600 font-semibold hover:underline';
    backButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        ${translations[lang].back_to_categories}
    `;
    backButton.onclick = () => {
        showCategoryView();
    };
    wrapper.appendChild(backButton);

    const accordionContainer = document.createElement('div');
    accordionContainer.id = 'topics-accordion-container';
    accordionContainer.className = 'space-y-4 mb-8';
    wrapper.appendChild(accordionContainer);

    topicsViewContainer.appendChild(wrapper);

    renderTopicsOnStartScreen(accordionContainer);
};

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
    assessmentStartScreen.classList.add('hidden');
    assessmentResultsScreen.classList.add('hidden');
    readingListScreen.classList.add('hidden');
    readingSessionScreen.classList.add('hidden');

    // Also hide footers by default
    nextButtonContainer.classList.add('hidden');
    flashcardFooter.classList.add('hidden');
    learningFooter.classList.add('hidden');
    if (summaryNextBtnContainer) summaryNextBtnContainer.classList.add('hidden');
    if (scenarioNextBtnContainer) scenarioNextBtnContainer.classList.add('hidden');
    
    // Hide Assessment Specifics on quiz screen default
    if (assessmentLevelBadge) assessmentLevelBadge.classList.add('hidden');
    if (bookmarkBtn) bookmarkBtn.classList.remove('hidden');
    
    screen.classList.remove('hidden');

    // Handle body background color
    if (screen === quizScreen || screen === flashcardScreen) {
        document.body.classList.add('white-bg');
    } else {
        document.body.classList.remove('white-bg');
    }

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

    // Show specific footers if needed
    if (screen === quizScreen) {
        nextButtonContainer.classList.remove('hidden');
    } else if (screen === flashcardScreen) {
        flashcardFooter.classList.remove('hidden');
    } else if (screen === learningScreen) {
        learningFooter.classList.remove('hidden');
    }


    updateHeaderBackground();

    if (screen === startScreen) {
        showCategoryView();
        renderCategories();
    }
};

export function goHome() {
    clearInterval(state.getTimerInterval());
    state.setIsAssessmentMode(false);
    // Stop reading audio if playing
    if (readingAudioPlayer) {
        readingAudioPlayer.pause();
        readingAudioPlayer.currentTime = 0;
    }
    if (rsAudioPlayer) {
        rsAudioPlayer.pause();
        rsAudioPlayer.currentTime = 0;
    }

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
    const buttons = [soundToggleBtn, flashcardSoundToggleBtn, rsSoundToggleBtn];
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

    const categoryQuestionCounts = {};
    allTopics.forEach(topic => {
        if (topic.isCombined) {
            categoryQuestionCounts[topic.categoryId] = topic.questions.length;
        }
    });

    categories.forEach(cat => {
        const questionCount = categoryQuestionCounts[cat.id] || 0;
        
        const card = document.createElement('button');
        card.dataset.categoryId = cat.id;
        card.className = `p-4 text-center font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer border-2 flex flex-col justify-between items-center h-32 ${cat.colorClass}`;

        card.innerHTML = `
            <span class="text-lg">${translations[lang][cat.nameKey]}</span>
            <span class="text-sm font-normal opacity-80 mt-2">${questionCount} ${translations[lang].questions_label}</span>
        `;
        
        categoryCardsContainer.appendChild(card);
    });
};

export const renderTopicsOnStartScreen = (container) => {
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
        topicWrapper.className = 'border rounded-lg shadow-sm'; // Common classes

        const topicHeader = document.createElement('button');
        topicHeader.className = 'w-full p-4 text-center md:text-left font-bold transition-colors flex flex-col md:flex-row items-center rounded-lg';
        topicHeader.setAttribute('aria-expanded', 'false');
        topicHeader.setAttribute('aria-controls', `${topicId}-content`);

        // Level Badge Logic
        const levelBadge = topic.level ? `<span class="level-badge-common level-${topic.level}">${topic.level}</span>` : '';

        if (topic.isCombined) {
            topicWrapper.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600', 'text-white', 'border-transparent');
            topicHeader.classList.add('hover:bg-white/10');
            topicHeader.innerHTML = `
                <div class="w-full h-32 md:w-24 md:h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-white/20 rounded-lg overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <div class="flex-grow">
                    <h3 class="text-xl text-white flex items-center justify-center md:justify-start">${topic.name} ${levelBadge}</h3>
                    <p class="text-sm text-blue-100 font-normal mt-1">${topic.description}</p>
                </div>
                <svg class="w-6 h-6 text-white transform transition-transform mt-4 md:mt-0 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            `;
        } else {
            topicWrapper.classList.add('bg-white', 'border-gray-200');
            topicHeader.classList.add('hover:bg-gray-50');
            topicHeader.innerHTML = `
                <div class="w-full h-32 md:w-24 md:h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                    <img src="${topic.imageUrl}" alt="${topic.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow">
                    <h3 class="text-xl text-blue-600 flex items-center justify-center md:justify-start">${topic.name} ${levelBadge}</h3>
                    <p class="text-sm text-gray-500 font-normal mt-1">${topic.description}</p>
                </div>
                <svg class="w-6 h-6 transform transition-transform mt-4 md:mt-0 ml-auto flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            `;
        }
        
        const topicContent = document.createElement('div');
        topicContent.id = `${topicId}-content`;
        topicContent.className = 'hidden p-4 border-t rounded-b-lg';
        
        if (topic.isCombined) {
            topicContent.classList.add('bg-white/10', 'border-white/20');
        } else {
            topicContent.classList.add('bg-gray-50', 'border-gray-200');
        }

        let buttonsHTML = '';

        // Reading Comprehension Topic (special case)
        if (topic.type === 'reading') {
            buttonsHTML = `
                <button class="topic-action-btn reading-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md" data-topic-id="${topic.id}" data-action="reading">
                    Ver Historias
                </button>
            `;
        } else {
            // Standard Topic Buttons
            buttonsHTML = `
                <button class="topic-action-btn learn-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md ${!topic.hasLearning ? 'hidden' : ''}" data-i18n-key="learn_topic" data-topic-id="${topic.id}" data-action="learn">
                    ${translations[lang].learn_topic}
                </button>
                <button class="topic-action-btn flashcard-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md ${(!topic.flashcards || topic.flashcards.length === 0) ? 'hidden' : ''}" data-topic-id="${topic.id}" data-action="flashcards">
                    ${translations[lang].flashcards}
                </button>
                <button class="topic-action-btn test-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md" data-topic-id="${topic.id}" data-action="test">
                    ${translations[lang].testing}
                </button>
            `;
        }

        topicContent.innerHTML = `<div class="flex flex-col sm:flex-row justify-center items-center gap-4">${buttonsHTML}</div>`;
        
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

export const showSavedScreen = () => {
    closeSideMenu();
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
    if (state.getSavedScreenState() === 'questions' || state.getSavedScreenState() === 'flashcards') {
        state.setSavedScreenState('categories');
        bookmarksContainer.classList.add('hidden');
        flashcardBookmarksContainer.classList.add('hidden');
        savedCategorySelection.classList.remove('hidden');
        
        const lang = getSettings().language;
        savedScreenHeaderTitle.textContent = translations[lang].saved_screen_title;
        backFromSavedBtn.setAttribute('aria-label', translations[lang].back_button);
        backFromSavedBtn.setAttribute('title', translations[lang].back_button);

    } else { // state is 'categories'
        goHome();
    }
};

export const showStatisticsScreen = () => {
    closeSideMenu();
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
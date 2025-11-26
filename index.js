

import { allTopics, categories } from './topics-data.js';
import * as state from './modules/state.js';
import * as ui from './modules/ui-manager.js';
import * as settings from './modules/settings.js';
import * as search from './modules/search.js';
import * as quiz from './modules/quiz-handler.js';
import * as flashcard from './modules/flashcard-handler.js';
import * as learning from './modules/learning-module.js';
import * as statistics from './modules/statistics-handler.js';
import * as assessment from './modules/assessment-handler.js';
import * as reading from './modules/reading-handler.js';

const learningModules = {
    'operador-carretilla': learning.operadorCarretillaLearning
};

// Initial data processing
let questionCounter = 0;
allTopics.forEach(topic => {
    if (topic.questions) {
        topic.questions.forEach(q => {
            state.allQuestionsWithIndex.push({
                ...q,
                originalIndex: questionCounter++,
                topicId: topic.id
            });
        });
    }
});

let flashcardCounter = 0;
allTopics.forEach(topic => {
    if (topic.flashcards) {
        topic.flashcards.forEach(f => {
            state.allFlashcardsWithIndex.push({
                ...f,
                originalIndex: flashcardCounter++,
                topicId: topic.id
            });
        });
    }
});

const handleNameSubmit = () => {
    const name = ui.nameInput.value.trim();
    const lang = settings.getSettings().language;
    state.setUsername(name || (lang === 'ka' ? 'მეგობარო' : 'Amigo'));
    localStorage.setItem(state.USERNAME_STORAGE_KEY, state.getUsername());
    ui.welcomeMessage.textContent = settings.translations[lang].welcome_user_message.replace('{{username}}', state.getUsername());
    document.title = `${state.getUsername()} - ${settings.translations[lang].main_app_title}`;
    settings.initAudio(); // Initialize audio context on first user interaction
    statistics.startTimeTracking();
    ui.showScreen(ui.startScreen);
};

const handleTopicAction = (e) => {
    const button = e.target.closest('.topic-action-btn');
    if (!button) return;

    const topicId = button.dataset.topicId;
    const action = button.dataset.action;
    const topic = allTopics.find(t => t.id === topicId);
    
    if (!topic) return;

    settings.initAudio();

    switch (action) {
        case 'test':
            const fullQuestionsForQuiz = state.allQuestionsWithIndex.filter(q => q.topicId === topic.id);
            quiz.showQuizOptionsScreen(topic, fullQuestionsForQuiz);
            break;
        case 'learn':
            const learningData = learningModules[topic.id];
            if (learningData) {
                learning.startLearningSession(topic, learningData);
            } else {
                alert(`'Learn Topic' functionality for "${topic.name}" is coming soon!`);
            }
            break;
        case 'flashcards':
             const topicFlashcards = state.allFlashcardsWithIndex.filter(f => f.topicId === topic.id);
            if (topicFlashcards && topicFlashcards.length > 0) {
                flashcard.showFlashcardOptionsScreen(topic, topicFlashcards);
            } else {
                alert(`'Flashcards' functionality for "${topic.name}" is coming soon!`);
            }
            break;
        case 'reading':
            reading.showReadingOptions(topic);
            break;
    }
};

// --- NEW --- Saved Content Tab Switching
const showSavedContent = (type) => {
    if (type === 'questions') {
        ui.savedQuestionsTab.classList.add('border-blue-600', 'text-blue-600');
        ui.savedQuestionsTab.classList.remove('border-transparent', 'text-gray-500');
        ui.savedFlashcardsTab.classList.remove('border-blue-600', 'text-blue-600');
        ui.savedFlashcardsTab.classList.add('border-transparent', 'text-gray-500');

        ui.bookmarksContainer.classList.remove('hidden');
        ui.flashcardBookmarksContainer.classList.add('hidden');
        
        quiz.renderBookmarksSection();
    } else { // flashcards
        ui.savedQuestionsTab.classList.remove('border-blue-600', 'text-blue-600');
        ui.savedQuestionsTab.classList.add('border-transparent', 'text-gray-500');
        ui.savedFlashcardsTab.classList.add('border-blue-600', 'text-blue-600');
        ui.savedFlashcardsTab.classList.remove('border-transparent', 'text-gray-500');

        ui.bookmarksContainer.classList.add('hidden');
        ui.flashcardBookmarksContainer.classList.remove('hidden');
        
        flashcard.renderBookmarkedFlashcardsSection();
    }
};


const init = () => {
    // Reset session-specific state on each new load
    state.resetSessionSeenQuestions();

    // Load preferences
    settings.loadSettings();
    ui.applyTranslations(settings.getSettings().language);
    settings.loadSoundPreference();
    quiz.loadBookmarks();
    quiz.loadQuizProgress();
    flashcard.loadFlashcardBookmarks();
    statistics.init();

    // Check for existing user
    const storedUsername = localStorage.getItem(state.USERNAME_STORAGE_KEY);
    if (storedUsername) {
        state.setUsername(storedUsername);
        const lang = settings.getSettings().language;
        ui.welcomeMessage.textContent = settings.translations[lang].welcome_user_message.replace('{{username}}', state.getUsername());
        document.title = `${state.getUsername()} - ${settings.translations[lang].main_app_title}`;
        statistics.startTimeTracking();
        ui.showScreen(ui.startScreen);
    } else {
        ui.showScreen(ui.nameScreen);
    }
    
    // Initial UI Setup
    ui.updateSoundToggleUI();
    
    // Event Listeners
    ui.submitNameBtn.addEventListener('click', handleNameSubmit);
    ui.nameInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleNameSubmit(); });
    
    // Main Navigation
    ui.homeLinkHeader.addEventListener('click', (e) => {
        e.preventDefault();
        ui.goHome();
    });
    // This listener is now on a dynamically created container, so we delegate it to a static parent.
    document.getElementById('topics-view-container').addEventListener('click', handleTopicAction);
    ui.backFromReadingListBtn.addEventListener('click', ui.goHome);
    
    // Saved Screen
    ui.showSavedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ui.closeSideMenu();
        ui.showScreen(ui.savedScreen);
        showSavedContent('questions'); // Default to questions tab
    });
    ui.savedQuestionsTab.addEventListener('click', () => showSavedContent('questions'));
    ui.savedFlashcardsTab.addEventListener('click', () => showSavedContent('flashcards'));
    ui.backFromSavedBtn.addEventListener('click', () => {
        ui.showScreen(ui.startScreen);
        ui.openSideMenu();
    });

    // Statistics Screen
    ui.showStatisticsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ui.showStatisticsScreen();
    });
    ui.backFromStatisticsBtn.addEventListener('click', () => {
        ui.showScreen(ui.startScreen);
        ui.openSideMenu();
    });

    // Info Links
    if(ui.menuAboutLink) {
        ui.menuAboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            ui.showAboutScreen();
        });
    }
    if(ui.menuStyleLink) {
        ui.menuStyleLink.addEventListener('click', (e) => {
            e.preventDefault();
            ui.showStyleGuideScreen();
        });
    }
    if(ui.backFromAboutBtn) {
        ui.backFromAboutBtn.addEventListener('click', () => {
            ui.showScreen(ui.startScreen);
            ui.openSideMenu();
        });
    }
    if(ui.backFromStyleBtn) {
        ui.backFromStyleBtn.addEventListener('click', () => {
            ui.showScreen(ui.startScreen);
            ui.openSideMenu();
        });
    }

    // Assessment Flow Listeners
    ui.startAssessmentFlowBtn.addEventListener('click', assessment.showAssessmentStartScreen);
    ui.startSpanishAssessmentBtn.addEventListener('click', assessment.startAssessment);
    ui.backFromAssessmentStartBtn.addEventListener('click', ui.goHome);
    ui.assessmentHomeBtn.addEventListener('click', ui.goHome);
    ui.assessmentRetryBtn.addEventListener('click', assessment.startAssessment);
    
    // Assessment Review Modal
    ui.assessmentReviewBtn.addEventListener('click', () => ui.assessmentReviewModal.classList.remove('hidden'));
    ui.closeAssessmentReviewBtn.addEventListener('click', () => ui.assessmentReviewModal.classList.add('hidden'));
    ui.closeAssessmentReviewBtn2.addEventListener('click', () => ui.assessmentReviewModal.classList.add('hidden'));

    // Side Menu
    ui.menuBtn.addEventListener('click', ui.openSideMenu);
    ui.closeSettingsBtn.addEventListener('click', ui.closeSideMenu);
    ui.menuBackdrop.addEventListener('click', ui.closeSideMenu);
    
    // Language Switcher - Immediate Action
    ui.languageSwitcher.addEventListener('click', (e) => {
        const button = e.target.closest('.lang-btn');
        if (!button) return;

        const newLang = button.dataset.lang;
        const currentLang = settings.getSettings().language;

        if (newLang === currentLang) return;

        // Apply and Save
        settings.setLanguage(newLang);
        settings.saveSettings();
        
        ui.applyTranslations(newLang);
        
        // Update UI Active State
        ui.languageSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === newLang);
        });

        // Update Dynamic Titles
        const currentUsername = state.getUsername();
        if (currentUsername) {
            document.title = `${currentUsername} - ${settings.translations[newLang].main_app_title}`;
            ui.welcomeMessage.textContent = settings.translations[newLang].welcome_user_message.replace('{{username}}', currentUsername);
            ui.settingsGreeting.textContent = settings.translations[newLang].settings_greeting.replace('{{username}}', currentUsername);
        }
        
        // Refresh categories if visible to update labels
        if (!ui.startScreen.classList.contains('hidden')) {
             if (!ui.categoryCardsContainer.classList.contains('hidden')) {
                ui.renderCategories();
             }
        }

        // Close menu immediately
        ui.closeSideMenu();
    });

    // Quiz Options
    quiz.initQuizOptionsListeners();
    ui.backToStartFromQuizOptionsBtn.addEventListener('click', ui.goHome);
    
    // Flashcard Options
    flashcard.initFlashcardOptionsListeners();
    ui.backToStartFromFlashcardsBtn.addEventListener('click', ui.goHome);

    // Learning Module Actions
    ui.startScenariosBtn.addEventListener('click', learning.showScenarioView);
    ui.retryScenariosBtn.addEventListener('click', () => {
        state.setCurrentScenarioIndex(0);
        learning.showScenarioView();
    });
    ui.learningHomeBtn.addEventListener('click', ui.goHome);

    // In-Quiz Actions
    ui.soundToggleBtn.addEventListener('click', settings.toggleSound);
    ui.bookmarkBtn.addEventListener('click', quiz.handleBookmarkToggle);

    // Flashcard Screen Actions
    ui.flashcardSoundToggleBtn.addEventListener('click', settings.toggleSound);
    ui.flashcardBookmarkBtn.addEventListener('click', flashcard.handleFlashcardBookmarkToggle);
    ui.flashcardContainer.addEventListener('click', flashcard.flipFlashcard);
    ui.prevFlashcardBtn.addEventListener('click', flashcard.handlePrevFlashcard);
    ui.nextFlashcardBtn.addEventListener('click', flashcard.handleNextFlashcard);
    ui.flashcardKnownBtn.addEventListener('click', () => flashcard.handleFlashcardAssessment(true));
    ui.flashcardUnknownBtn.addEventListener('click', () => flashcard.handleFlashcardAssessment(false));
    flashcard.initFlashcardGestures();
    
    // Reading Session Actions
    if (ui.rsSoundToggleBtn) {
        ui.rsSoundToggleBtn.addEventListener('click', settings.toggleSound);
    }

    // Search and Filtering
    ui.searchInput.addEventListener('input', (e) => search.search(e.target.value));
    ui.searchFilterSelect.addEventListener('change', search.handleSearchFilterChange);

    // Header scroll effect
    window.addEventListener('scroll', ui.updateHeaderBackground);

    // Category selection
    ui.categoryCardsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('[data-category-id]');
        if (target) {
            const categoryId = target.dataset.categoryId;
            state.setCurrentCategoryId(categoryId);
            ui.showTopicsForCategory(categoryId);
        }
    });
    
    // Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }

    // Save stats on page leave
    window.addEventListener('beforeunload', () => {
        statistics.saveStatistics();
    });
};

init();
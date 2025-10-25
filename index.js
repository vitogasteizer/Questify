import { allTopics, categories } from './topics-data.js';
import * as state from './modules/state.js';
import * as ui from './modules/ui-manager.js';
import * as settings from './modules/settings.js';
import * as search from './modules/search.js';
import * as quiz from './modules/quiz-handler.js';
import * as flashcard from './modules/flashcard-handler.js';
import * as learning from './modules/learning-module.js';

const learningModules = {
    'operador-carretilla': learning.operadorCarretillaLearning
};

// Initial data processing
let questionCounter = 0;
allTopics.forEach(topic => {
    topic.questions.forEach(q => {
        state.allQuestionsWithIndex.push({
            ...q,
            originalIndex: questionCounter++,
            topicId: topic.id
        });
    });
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
    settings.playNavigationSound();

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
    }
};

const handleSaveSettings = () => {
    const originalLang = settings.getSettings().language;
    const newLang = ui.languageSelect.value;
    
    settings.setLanguage(newLang);
    settings.saveSettings();
    
    if (originalLang !== newLang) {
        ui.applyTranslations(newLang);
        // If we are on the start screen, we need to re-render the topics and categories
        if (!ui.startScreen.classList.contains('hidden')) {
            ui.renderCategories();
            ui.renderTopicsOnStartScreen();
        }
         // Update title
         const currentUsername = state.getUsername();
         if (currentUsername) {
            document.title = `${currentUsername} - ${settings.translations[newLang].main_app_title}`;
            ui.welcomeMessage.textContent = settings.translations[newLang].welcome_user_message.replace('{{username}}', currentUsername);
        }
    }
    
    ui.settingsModal.classList.add('hidden');
};

const openSettingsModal = () => {
    ui.languageSelect.value = settings.getSettings().language;
    const lang = settings.getSettings().language;
    ui.settingsGreeting.textContent = settings.translations[lang].settings_greeting.replace('{{username}}', state.getUsername());
    ui.settingsModal.classList.remove('hidden');
};

const handleSoundToggle = () => {
    settings.toggleSound();
    ui.updateSoundToggleUI();
};

const init = () => {
    // Load preferences
    settings.loadSettings();
    ui.applyTranslations(settings.getSettings().language);
    settings.loadSoundPreference();
    quiz.loadBookmarks();
    flashcard.loadFlashcardBookmarks();

    // Check for existing user
    const storedUsername = localStorage.getItem(state.USERNAME_STORAGE_KEY);
    if (storedUsername) {
        state.setUsername(storedUsername);
        const lang = settings.getSettings().language;
        ui.welcomeMessage.textContent = settings.translations[lang].welcome_user_message.replace('{{username}}', state.getUsername());
        document.title = `${state.getUsername()} - ${settings.translations[lang].main_app_title}`;
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
    ui.backToHomeBtn.addEventListener('click', ui.goHome);
    ui.backToHomeFromFlashcardBtn.addEventListener('click', flashcard.closeFlashcards);
    ui.backToHomeFromLearningBtn.addEventListener('click', ui.goHome);
    document.getElementById('topics-accordion-container').addEventListener('click', handleTopicAction);
    
    // Saved Screen
    ui.showSavedBtn.addEventListener('click', ui.showSavedScreen);
    ui.showSavedQuestionsBtn.addEventListener('click', quiz.showSavedQuestions);
    ui.showSavedFlashcardsBtn.addEventListener('click', flashcard.showSavedFlashcards);
    ui.backFromSavedBtn.addEventListener('click', ui.handleBackFromSaved);

    // Settings Modal
    ui.menuBtn.addEventListener('click', openSettingsModal);
    ui.closeSettingsBtn.addEventListener('click', () => ui.settingsModal.classList.add('hidden'));
    ui.cancelSettingsBtn.addEventListener('click', () => ui.settingsModal.classList.add('hidden'));
    ui.saveSettingsBtn.addEventListener('click', handleSaveSettings);
    
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
    ui.soundToggleBtn.addEventListener('click', handleSoundToggle);
    ui.bookmarkBtn.addEventListener('click', quiz.handleBookmarkToggle);

    // Flashcard Screen Actions
    ui.flashcardSoundToggleBtn.addEventListener('click', handleSoundToggle);
    ui.flashcardBookmarkBtn.addEventListener('click', flashcard.handleFlashcardBookmarkToggle);
    ui.flashcardContainer.addEventListener('click', flashcard.flipFlashcard);
    ui.prevFlashcardBtn.addEventListener('click', flashcard.handlePrevFlashcard);
    ui.nextFlashcardBtn.addEventListener('click', flashcard.handleNextFlashcard);
    ui.flashcardKnownBtn.addEventListener('click', () => flashcard.handleFlashcardAssessment(true));
    ui.flashcardUnknownBtn.addEventListener('click', () => flashcard.handleFlashcardAssessment(false));
    flashcard.initFlashcardGestures();

    // Search and Filtering
    ui.searchInput.addEventListener('input', (e) => search.search(e.target.value));
    ui.searchFilterSelect.addEventListener('change', search.handleSearchFilterChange);

    // Category selection and dragging
    ui.categoryCardsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.category-card');
        if (target && target.dataset.categoryId !== state.getCurrentCategoryId()) {
            state.setCurrentCategoryId(target.dataset.categoryId);
            settings.playNavigationSound();
            ui.renderCategories(); 
            ui.renderTopicsOnStartScreen();
        }
    });
    ui.initCategorySlider();
    
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
};

init();
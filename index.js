import { allTopics, categories } from './topics-data.js';

let allQuestionsWithIndex = [];
let questionCounter = 0;
allTopics.forEach(topic => {
    topic.questions.forEach(q => {
        allQuestionsWithIndex.push({
            ...q,
            originalIndex: questionCounter++,
            topicId: topic.id
        });
    });
});

let allFlashcardsWithIndex = [];
let flashcardCounter = 0;
allTopics.forEach(topic => {
    if(topic.flashcards) {
        topic.flashcards.forEach(f => {
            allFlashcardsWithIndex.push({
                ...f,
                originalIndex: flashcardCounter++,
                topicId: topic.id
            });
        });
    }
});


// DOM Elements
const nameScreen = document.getElementById('name-screen');
const nameInput = document.getElementById('name-input');
const submitNameBtn = document.getElementById('submit-name-btn');
const welcomeMessage = document.getElementById('welcome-message');
const startScreen = document.getElementById('start-screen');
const startScreenDefaultContent = document.getElementById('start-screen-default-content');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const timerContainer = document.getElementById('timer-container');
const timerEl = document.getElementById('timer');
const questionImageContainer = document.getElementById('question-image-container');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButtonContainer = document.getElementById('next-button-container');
const resultsTitle = document.getElementById('results-title');
const resultsMessage = document.getElementById('results-message');
const finalTimeEl = document.getElementById('final-time');
const scoreDisplay = document.getElementById('score-display');
const scorePercentage = document.getElementById('score-percentage');
const resultsButtons = document.getElementById('results-buttons');
const reviewSection = document.getElementById('review-section');
const incorrectList = document.getElementById('incorrect-questions-list');
const soundToggleBtn = document.getElementById('sound-toggle-btn');

// Search and filter elements
const searchInput = document.getElementById('search-input');
const searchFilterSelect = document.getElementById('search-filter-select');
const categoryCardsContainer = document.getElementById('category-cards-container');
const searchResultsContainer = document.getElementById('search-results-container');
const searchResultsList = document.getElementById('search-results-list');
const noResultsMessage = document.getElementById('no-results-message');
const topicQuizButtonContainer = document.getElementById('topic-quiz-button-container');

// Bookmark elements
const bookmarkBtn = document.getElementById('bookmark-btn');
const bookmarksContainer = document.getElementById('bookmarks-container');
const bookmarksList = document.getElementById('bookmarks-list');
const bookmarkQuizButtonContainer = document.getElementById('bookmark-quiz-button-container');

// Settings elements
const appHeader = document.getElementById('app-header');
const menuBtn = document.getElementById('menu-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsGreeting = document.getElementById('settings-greeting');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const languageSelect = document.getElementById('language-select');

// Quiz Options elements
const quizOptionsScreen = document.getElementById('quiz-options-screen');
const quizTopicTitle = document.getElementById('quiz-topic-title');
const quizQuestionsCountSlider = document.getElementById('quiz-questions-count-slider');
const quizQuestionsCountValue = document.getElementById('quiz-questions-count-value');
const startQuizFromOptionsBtn = document.getElementById('start-quiz-from-options-btn');
const backToStartFromQuizOptionsBtn = document.getElementById('back-to-start-from-quiz-options-btn');


// Flashcard elements
const flashcardOptionsScreen = document.getElementById('flashcard-options-screen');
const flashcardTopicTitle = document.getElementById('flashcard-topic-title');
const flashcardsCountSlider = document.getElementById('flashcards-count-slider');
const flashcardsCountValue = document.getElementById('flashcards-count-value');
const startFlashcardsBtn = document.getElementById('start-flashcards-btn');
const backToStartFromFlashcardsBtn = document.getElementById('back-to-start-from-flashcards-btn');

const flashcardScreen = document.getElementById('flashcard-screen');
const backToHomeFromFlashcardBtn = document.getElementById('back-to-home-from-flashcard-btn');
const flashcardSoundToggleBtn = document.getElementById('flashcard-sound-toggle-btn');
const flashcardContainer = document.getElementById('flashcard-container');
const flashcardFrontText = document.getElementById('flashcard-front-text');
const flashcardBackText = document.getElementById('flashcard-back-text');
const prevFlashcardBtn = document.getElementById('prev-flashcard-btn');
const nextFlashcardBtn = document.getElementById('next-flashcard-btn');
const flashcardProgressText = document.getElementById('flashcard-progress-text');

// Flashcard new elements
const flashcardBookmarkBtn = document.getElementById('flashcard-bookmark-btn');
const flashcardAssessmentContainer = document.getElementById('flashcard-assessment-container');
const flashcardKnownBtn = document.getElementById('flashcard-known-btn');
const flashcardUnknownBtn = document.getElementById('flashcard-unknown-btn');
const flashcardFlipHint = document.getElementById('flashcard-flip-hint');
const flashcardResultsScreen = document.getElementById('flashcard-results-screen');
const flashcardResultsMessage = document.getElementById('flashcard-results-message');
const flashcardResultsButtons = document.getElementById('flashcard-results-buttons');
const flashcardBookmarksContainer = document.getElementById('flashcard-bookmarks-container');
const flashcardBookmarksList = document.getElementById('flashcard-bookmarks-list');
const flashcardBookmarkQuizButtonContainer = document.getElementById('flashcard-bookmark-quiz-button-container');

// Saved Screen elements
const savedScreen = document.getElementById('saved-screen');
const showSavedBtn = document.getElementById('show-saved-btn');
const backFromSavedBtn = document.getElementById('back-from-saved-btn');
const savedScreenHeaderTitle = document.getElementById('saved-screen-header-title');
const savedCategorySelection = document.getElementById('saved-category-selection');
const showSavedQuestionsBtn = document.getElementById('show-saved-questions-btn');
const showSavedFlashcardsBtn = document.getElementById('show-saved-flashcards-btn');


// State
let username = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswers = [];
let score = 0;
let startTime = 0;
let timeRemaining = 0;
let stopwatchSeconds = 0;
let timerInterval;
let wakeLock = null;
let bookmarkedQuestions = new Set();
let currentSearchFilter = 'all'; // 'all', 'tests', 'flashcards', 'topics'
let currentCategoryId = 'all';
let currentQuestionPool = [];
let currentFlashcardPool = [];
let currentTopicForQuiz = null;
let savedScreenState = 'categories'; // 'categories', 'questions', 'flashcards'


// Flashcard State
let currentTopicForFlashcards = null;
let currentFlashcards = [];
let currentFlashcardIndex = 0;
let flashcardSettings = {
    startSide: 'front' // 'front' or 'back'
};
let bookmarkedFlashcards = new Set();
const FLASHCARDS_BOOKMARKS_STORAGE_KEY = 'logisticsQuizFlashcardBookmarks';
let flashcardSessionStats = {
    known: [],
    unknown: []
};


const USERNAME_STORAGE_KEY = 'logisticsQuizUsername';
const BOOKMARKS_STORAGE_KEY = 'logisticsQuizBookmarks';
const bookmarkIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>`;
const bookmarkedIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>`;

// Settings State
const SETTINGS_STORAGE_KEY = 'logisticsQuizSettings';
let settings = {
    language: 'es'
};

// Audio State and Elements
let audioCtx = null;
let masterGainNode = null;
let isSoundEnabled = true;
const SOUND_ENABLED_KEY = 'logisticsQuizSoundEnabled';
const soundOnIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
const soundOffIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" /><path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`;

// i18n Translations
const translations = {
    es: {
        welcome_title: "¡Bienvenido!",
        welcome_subtitle: "Por favor, introduce tu nombre para empezar.",
        name_placeholder: "Escribe tu nombre aquí...",
        continue_button: "Continuar",
        main_title: "Tests Interactivos",
        main_subtitle_prefix: "Pon a prueba tus conocimientos",
        welcome_user_message: "¡Hola, {{username}}! Pon a prueba tus conocimientos.",
        bookmarks_title: "Preguntas Guardadas",
        search_placeholder: "Buscar por tema o pregunta...",
        start_quiz_button: "Iniciar Test",
        menu_button_aria: "Abrir menú",
        search_results_title: "Resultados de la Búsqueda",
        no_results_message: "No se encontraron resultados. Intenta con otra búsqueda.",
        start_bookmarked_quiz_button: "Iniciar Test de Preguntas Guardadas ({{count}})",
        start_topic_quiz_button: "Iniciar Test del Tema \"{{topic}}\" ({{count}} preguntas)",
        back_button: "Volver",
        back_to_home_title: "Volver al Inicio",
        progress_text_template: "Pregunta {{current}} / {{total}}",
        sound_on_aria: "Activar sonidos",
        sound_off_aria: "Desactivar sonidos",
        bookmark_question_aria: "Guardar pregunta",
        bookmarked_question_aria: "Pregunta guardada",
        remove_bookmark_aria: "Eliminar marcador",
        finish_quiz_button: "Finalizar Test",
        next_question_button: "Siguiente Pregunta",
        results_title_perfect: "¡Excelente!",
        results_title_completed: "Test Completado",
        results_message_perfect: "¡Felicidades, {{username}}! Has respondido correctamente a todas las preguntas.",
        results_message_completed: "¡Buen trabajo, {{username}}! Tu resultado final es:",
        total_time_label: "Tiempo total:",
        retry_mistakes_button: "Repetir Errores ({{count}})",
        start_new_quiz_button: "Empezar Nuevo Test",
        review_section_title: "Preguntas para repasar:",
        correct_answer_label: "Respuesta correcta:",
        settings_modal_title: "Menú",
        close_settings_aria: "Cerrar configuración",
        questions_count_label: "Número de preguntas:",
        timer_label: "Temporizador",
        timer_on_label: "Activado",
        timer_off_label: "Desactivado",
        minutes_label: "minutos",
        question_order_label: "Orden de las preguntas",
        order_random_label: "Aleatorio",
        order_sequential_label: "Secuencial",
        language_label: "Idioma",
        language_desc: "Selecciona el idioma de la aplicación.",
        cancel_button: "Cancelar",
        save_changes_button: "Guardar Cambios",
        filter_all: "Todos",
        filter_tests: "Tests",
        filter_flashcards: "Flashcards",
        filter_topics: "Temas",
        search_placeholder_all: "Buscar todo...",
        search_placeholder_tests: "Buscar pregunta...",
        search_placeholder_flashcards: "Buscar flashcard...",
        search_placeholder_topics: "Buscar tema...",
        no_results_flashcards: "No se encontraron flashcards.",
        no_results_topics: "No se encontraron temas.",
        result_tag_test: "Test",
        result_tag_topic: "Tema",
        learn_topic: "Aprender Tema",
        flashcards: "Flashcards",
        testing: "Realizar Test",
        quiz_options_title: "Configurar Test",
        quiz_topic_title_prefix: "Tema:",
        flashcard_options_title: "Configurar Flashcards",
        flashcard_topic_title_prefix: "Tema:",
        flashcards_count_label: "Número de flashcards:",
        flashcard_order_label: "Orden de las flashcards",
        flashcard_start_side_label: "Empezar por",
        flashcard_start_front: "Cara frontal (Pregunta)",
        flashcard_start_back: "Cara trasera (Respuesta)",
        start_flashcards_button: "Iniciar Flashcards",
        flashcard_progress_text: "Flashcard {{current}} / {{total}}",
        flashcard_click_to_flip: "Haz clic en el centro o desliza arriba para girar. Usa las flechas laterales para navegar.",
        flashcard_prev_aria: "Flashcard anterior",
        flashcard_next_aria: "Siguiente flashcard",
        flashcard_known_btn: "Lo sé",
        flashcard_unknown_btn: "No lo sé",
        flashcard_results_title: "Sesión Completada",
        flashcard_results_message: "Sabías {{known}} de {{total}} flashcards. ¡Buen trabajo!",
        flashcard_review_unknown_button: "Repasar 'No lo sé' ({{count}})",
        flashcard_bookmarks_title: "Flashcards Guardados",
        start_bookmarked_flashcards_button: "Iniciar Flashcards Guardados ({{count}})",
        save_flashcard_aria: "Guardar flashcard",
        saved_flashcard_aria: "Flashcard guardado",
        remove_flashcard_bookmark_aria: "Eliminar marcador de flashcard",
        saved_button: "Guardados",
        saved_screen_title: "Elementos Guardados",
        saved_questions_category_button: "Preguntas Guardadas",
        saved_flashcards_category_button: "Flashcards Guardados",
        no_saved_questions_message: "No tienes preguntas guardadas.",
        no_saved_flashcards_message: "No tienes flashcards guardados.",
        start_search_quiz_button: "Iniciar Test con Resultados ({{count}} preguntas)",
        start_search_flashcards_button: "Iniciar Flashcards con Resultados ({{count}} tarjetas)",
        search_results_topic_title: "Resultados de Búsqueda",
        main_app_title: "Test Interactivo",
        saved_items_label: "Contenido Guardado",
        saved_items_desc: "Accede a tus preguntas y flashcards guardadas.",
        settings_greeting: "¡Hola, {{username}}!",
        category_all: "Todos",
        category_logistica: "Logística",
        category_espanol: "Español",
        category_matematicas: "Matemáticas",
        category_historia: "Historia",
        category_georgian: "Georgiano",
        no_topics_in_category: "No hay temas en esta categoría todavía.",
        app_creator_credit: "Aplicación creada por <strong>Avtandil Machitadze</strong>.",
    },
    ka: {
        welcome_title: "კეთილი იყოს თქვენი მობრძანება!",
        welcome_subtitle: "გთხოვთ, დასაწყებად შეიყვანეთ თქვენი სახელი.",
        name_placeholder: "დაწერეთ თქვენი სახელი აქ...",
        continue_button: "გაგრძელება",
        main_title: "ინტერაქტიული ტესტები",
        main_subtitle_prefix: "შეამოწმეთ თქვენი ცოდნა",
        welcome_user_message: "გამარჯობა, {{username}}! შეამოწმეთ თქვენი ცოდნა.",
        bookmarks_title: "შენახული კითხვები",
        search_placeholder: "მოძებნეთ თემის ან კითხვის მიხედვით...",
        start_quiz_button: "ტესტის დაწყება",
        menu_button_aria: "მენიუს გახსნა",
        search_results_title: "ძიების შედეგები",
        no_results_message: "შედეგები არ მოიძებნა. სცადეთ სხვა საძიებო სიტყვით.",
        start_bookmarked_quiz_button: "შენახული კითხვების ტესტის დაწყება ({{count}})",
        start_topic_quiz_button: "თემის \"{{topic}}\" ტესტის დაწყება ({{count}} კითხვა)",
        back_button: "უკან",
        back_to_home_title: "მთავარზე დაბრუნება",
        progress_text_template: "კითხვა {{current}} / {{total}}",
        sound_on_aria: "ხმის ჩართვა",
        sound_off_aria: "ხმის გამორთვა",
        bookmark_question_aria: "კითხვის შენახვა",
        bookmarked_question_aria: "კითხვა შენახულია",
        remove_bookmark_aria: "სანიშნის წაშლა",
        finish_quiz_button: "ტესტის დასრულება",
        next_question_button: "შემდეგი კითხვა",
        results_title_perfect: "შესანიშნავია!",
        results_title_completed: "ტესტი დასრულებულია",
        results_message_perfect: "გილოცავთ, {{username}}! თქვენ სწორად უპასუხეთ ყველა კითხვას.",
        results_message_completed: "კარგი ნამუშევარია, {{username}}! თქვენი საბოლოო შედეგია:",
        total_time_label: "საერთო დრო:",
        retry_mistakes_button: "შეცდომებზე მუშაობა ({{count}})",
        start_new_quiz_button: "ახალი ტესტის დაწყება",
        review_section_title: "გასამეორებელი კითხვები:",
        correct_answer_label: "სწორი პასუხი:",
        settings_modal_title: "მენიუ",
        close_settings_aria: "პარამეტრების დახურვა",
        questions_count_label: "კითხვების რაოდენობა:",
        timer_label: "ტაიმერი",
        timer_on_label: "ჩართულია",
        timer_off_label: "გამორთულია",
        minutes_label: "წუთი",
        question_order_label: "კითხვების თანმიმდევრობა",
        order_random_label: "შემთხვევითი",
        order_sequential_label: "თანმიმდევრული",
        language_label: "ენა",
        language_desc: "აირჩიეთ აპლიკაციის ენა.",
        cancel_button: "გაუქმება",
        save_changes_button: "ცვლილებების შენახვა",
        filter_all: "ყველა",
        filter_tests: "ტესტები",
        filter_flashcards: "ფლეშბარათები",
        filter_topics: "თემები",
        search_placeholder_all: "მოძებნეთ ყველაფერი...",
        search_placeholder_tests: "მოძებნეთ კითხვა...",
        search_placeholder_flashcards: "მოძებნეთ ფლეშბარათი...",
        search_placeholder_topics: "მოძებნეთ თემა...",
        no_results_flashcards: "ფლეშბარათები არ მოიძებნა.",
        no_results_topics: "თემები არ მოიძებნა.",
        result_tag_test: "ტესტი",
        result_tag_topic: "თემა",
        learn_topic: "თემის სწავლა",
        flashcards: "ფლეშბარათები",
        testing: "ტესტირება",
        quiz_options_title: "ტესტის პარამეტრები",
        quiz_topic_title_prefix: "თემა:",
        flashcard_options_title: "ფლეშბარათების პარამეტრები",
        flashcard_topic_title_prefix: "თემა:",
        flashcards_count_label: "ფლეშბარათების რაოდენობა:",
        flashcard_order_label: "ბარათების თანმიმდევრობა",
        flashcard_start_side_label: "დაწყება",
        flashcard_start_front: "წინა მხრიდან (კითხვა)",
        flashcard_start_back: "უკანა მხრიდან (პასუხი)",
        start_flashcards_button: "ფლეშბარათების დაწყება",
        flashcard_progress_text: "ფლეშბარათი {{current}} / {{total}}",
        flashcard_click_to_flip: "ბარათის ამოსატრიალებლად დააჭირეთ ცენტრში ან ასრიალეთ ზემოთ. გამოიყენეთ გვერდითი ისრები ნავიგაციისთვის.",
        flashcard_prev_aria: "წინა ბარათი",
        flashcard_next_aria: "შემდეგი ბარათი",
        flashcard_known_btn: "ვიცი",
        flashcard_unknown_btn: "არ ვიცი",
        flashcard_results_title: "სესია დასრულებულია",
        flashcard_results_message: "თქვენ იცოდით {{total}}-დან {{known}} ფლეშბარათი. კარგი ნამუშევარია!",
        flashcard_review_unknown_button: "'არ ვიცი' ბარათების გამეორება ({{count}})",
        flashcard_bookmarks_title: "შენახული ფლეშბარათები",
        start_bookmarked_flashcards_button: "შენახული ფლეშბარათების დაწყება ({{count}})",
        save_flashcard_aria: "ფლეშბარათის შენახვა",
        saved_flashcard_aria: "ფლეშბარათი შენახულია",
        remove_flashcard_bookmark_aria: "ფლეშბარათის სანიშნის წაშლა",
        saved_button: "შენახული",
        saved_screen_title: "შენახული",
        saved_questions_category_button: "შენახული კითხვები",
        saved_flashcards_category_button: "შენახული ფლეშბარათები",
        no_saved_questions_message: "შენახული კითხვები არ გაქვთ.",
        no_saved_flashcards_message: "შენახული ფლეშბარათები არ გაქვთ.",
        start_search_quiz_button: "ტესტის დაწყება შედეგებით ({{count}} კითხვა)",
        start_search_flashcards_button: "ფლეშბარათების დაწყება შედეგებით ({{count}} ბარათი)",
        search_results_topic_title: "ძიების შედეგები",
        main_app_title: "ინტერაქტიული ტესტი",
        saved_items_label: "შენახული მასალა",
        saved_items_desc: "შენახულ კითხვებსა და ფლეშბარათებზე წვდომა.",
        settings_greeting: "გამარჯობა, {{username}}!",
        category_all: "ყველა",
        category_logistica: "ლოგისტიკა",
        category_espanol: "ესპანური",
        category_matematicas: "მათემატიკა",
        category_historia: "ისტორია",
        category_georgian: "ქართული",
        no_topics_in_category: "ამ კატეგორიაში თემები ჯერ არ არის.",
        app_creator_credit: "აპლიკაცია შექმნილია <strong>ავთანდილ მაჩიტაძის</strong> მიერ.",
    }
};

const updateSearchPlaceholder = () => {
    const lang = settings.language;
    let placeholderKey = 'search_placeholder_all';
    if (currentSearchFilter === 'tests') placeholderKey = 'search_placeholder_tests';
    else if (currentSearchFilter === 'flashcards') placeholderKey = 'search_placeholder_flashcards';
    else if (currentSearchFilter === 'topics') placeholderKey = 'search_placeholder_topics';
    
    searchInput.placeholder = translations[lang][placeholderKey] || 'Search...';
};


const setLanguage = (lang) => {
    if (!translations[lang]) lang = 'es'; // Fallback to Spanish
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-i18n-key]');
    elements.forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = translations[lang][key];
        
        if (translation) {
            if (el.tagName === 'INPUT' && el.placeholder !== undefined && el.id !== 'search-input') { // Exclude search input from this generic update
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

// Settings Functions
const saveSettings = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

const loadSettings = () => {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (storedSettings) {
        try {
            const loaded = JSON.parse(storedSettings);
            // Only load language, ignore legacy quiz settings
            if (loaded && loaded.language) {
                settings.language = loaded.language;
            }
        } catch (e) {
            console.error('Failed to parse settings from localStorage', e);
        }
    }
};

// Audio Functions
const initAudio = () => {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            masterGainNode = audioCtx.createGain();
            masterGainNode.connect(audioCtx.destination);
            masterGainNode.gain.value = isSoundEnabled ? 1 : 0;
        } catch (e) {
            console.error('Web Audio API is not supported in this browser');
            isSoundEnabled = false; // Disable sound if not supported
        }
    }
};

const playSound = (type, freq, duration, wave = 'sine') => {
    if (!isSoundEnabled || !audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscillator.connect(masterGainNode);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
};

const playCorrectSound = () => {
    if (!isSoundEnabled || !audioCtx) return;
    const now = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.linearRampToValueAtTime(800, now + 0.1);
    oscillator.connect(masterGainNode);
    oscillator.start(now);
    oscillator.stop(now + 0.1);
};

const playIncorrectSound = () => {
    if (!isSoundEnabled || !audioCtx) return;
    const now = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.linearRampToValueAtTime(100, now + 0.2);
    oscillator.connect(masterGainNode);
    oscillator.start(now);
    oscillator.stop(now + 0.2);
};

const playNavigationSound = () => {
    const isQuizActive = !quizScreen.classList.contains('hidden');
    const isFlashcardActive = !flashcardScreen.classList.contains('hidden');
    if (isQuizActive || isFlashcardActive) {
        playSound('nav', 800, 0.05, 'triangle');
    }
};
const playBookmarkSound = () => playSound('bookmark', 500, 0.07, 'sine');

const toggleSound = () => {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem(SOUND_ENABLED_KEY, isSoundEnabled);
    updateSoundToggleUI();
    if (masterGainNode) {
        masterGainNode.gain.value = isSoundEnabled ? 1 : 0;
    }
};

const updateSoundToggleUI = () => {
    const lang = settings.language;
    const buttons = [soundToggleBtn, flashcardSoundToggleBtn];
    buttons.forEach(btn => {
        if (btn) {
            if (isSoundEnabled) {
                btn.innerHTML = soundOnIconSVG;
                btn.setAttribute('aria-label', translations[lang].sound_off_aria);
            } else {
                btn.innerHTML = soundOffIconSVG;
                btn.setAttribute('aria-label', translations[lang].sound_on_aria);
            }
        }
    });
};

const loadSoundPreference = () => {
    const savedPref = localStorage.getItem(SOUND_ENABLED_KEY);
    isSoundEnabled = savedPref === null ? true : savedPref === 'true';
    updateSoundToggleUI();
};


// Bookmark Functions (Questions)
const loadBookmarks = () => {
    const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (storedBookmarks) {
        try {
            bookmarkedQuestions = new Set(JSON.parse(storedBookmarks));
        } catch (e) {
            console.error('Failed to parse bookmarks from localStorage', e);
            bookmarkedQuestions = new Set();
        }
    }
};

const saveBookmarks = () => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(bookmarkedQuestions)));
};

const removeBookmark = (originalIndex) => {
    bookmarkedQuestions.delete(originalIndex);
    saveBookmarks();
    renderBookmarksSection();
};

const startBookmarkedQuiz = () => {
    const bookmarkedQuizQuestions = allQuestionsWithIndex.filter(q => bookmarkedQuestions.has(q.originalIndex));
    if (bookmarkedQuizQuestions.length > 0) {
        showQuizOptionsScreen({ name: translations[settings.language].bookmarks_title }, bookmarkedQuizQuestions);
    }
};

const renderBookmarksSection = () => {
    bookmarksList.innerHTML = '';
    bookmarkQuizButtonContainer.innerHTML = '';
    const lang = settings.language;

    if (bookmarkedQuestions.size > 0) {
        const questionsToRender = allQuestionsWithIndex.filter(q => bookmarkedQuestions.has(q.originalIndex));

        questionsToRender.forEach(q => {
            const li = document.createElement('li');
            li.className = 'p-3 bg-gray-100 rounded-md flex justify-between items-center';
            li.innerHTML = `<p class="text-gray-800 text-sm mr-2">${q.questionText}</p>`;

            const removeButton = document.createElement('button');
            removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 hover:text-red-700" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`;
            removeButton.className = 'ml-4 p-1 rounded-full hover:bg-red-100 flex-shrink-0';
            removeButton.setAttribute('aria-label', translations[lang].remove_bookmark_aria);
            removeButton.onclick = () => removeBookmark(q.originalIndex);

            li.appendChild(removeButton);
            bookmarksList.appendChild(li);
        });

        if (questionsToRender.length > 0) {
            const startBtn = document.createElement('button');
            startBtn.textContent = translations[lang].start_bookmarked_quiz_button.replace('{{count}}', questionsToRender.length);
            startBtn.className = 'px-6 py-3 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md';
            startBtn.onclick = startBookmarkedQuiz;
            bookmarkQuizButtonContainer.appendChild(startBtn);
        }

    } else {
        bookmarksList.innerHTML = `<p class="text-center text-gray-500">${translations[lang].no_saved_questions_message}</p>`;
    }
};

const handleBookmarkToggle = () => {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;
    
    playBookmarkSound();
    const lang = settings.language;
    const { originalIndex } = question;
    if (bookmarkedQuestions.has(originalIndex)) {
        bookmarkedQuestions.delete(originalIndex);
        bookmarkBtn.innerHTML = bookmarkIconSVG;
        bookmarkBtn.setAttribute('aria-label', translations[lang].bookmark_question_aria);
    } else {
        bookmarkedQuestions.add(originalIndex);
        bookmarkBtn.innerHTML = bookmarkedIconSVG;
        bookmarkBtn.setAttribute('aria-label', translations[lang].bookmarked_question_aria);
    }
    saveBookmarks();
};

// Screen Wake Lock API
const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {});
        } catch (err) {
            console.error('Screen Wake Lock request failed:', err);
        }
    }
};

const releaseWakeLock = async () => {
    if (wakeLock !== null) {
        try {
            await wakeLock.release();
            wakeLock = null;
        } catch (err) {
            console.error('Screen Wake Lock release failed:', err);
        }
    }
};

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !quizScreen.classList.contains('hidden')) {
        requestWakeLock();
    }
});

// Utility Functions
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

const updateCountdown = () => {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerEl.textContent = formatTime(timeRemaining);
    } else {
        clearInterval(timerInterval);
        finishQuiz();
    }
};

const updateStopwatch = () => {
    stopwatchSeconds++;
    timerEl.textContent = formatTime(stopwatchSeconds);
};

const showScreen = (screen) => {
    nameScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    quizOptionsScreen.classList.add('hidden');
    flashcardOptionsScreen.classList.add('hidden');
    flashcardScreen.classList.add('hidden');
    flashcardResultsScreen.classList.add('hidden');
    savedScreen.classList.add('hidden');
    screen.classList.remove('hidden');

    if (screen === nameScreen) {
        appHeader.classList.add('hidden');
    } else {
        appHeader.classList.remove('hidden');
    }

    if (screen === startScreen) {
        renderCategories();
        renderTopicsOnStartScreen();
    }
};

const handleNameSubmit = () => {
    const name = nameInput.value.trim();
    const lang = settings.language;
    username = name || (lang === 'ka' ? 'მეგობარო' : 'Amigo');
    localStorage.setItem(USERNAME_STORAGE_KEY, username);
    welcomeMessage.textContent = translations[lang].welcome_user_message.replace('{{username}}', username);
    document.title = `${username} - ${translations[lang].main_app_title}`;
    initAudio(); // Initialize audio context on first user interaction
    showScreen(startScreen);
};

// Topic and Main Screen Logic
const handleTopicAction = (e) => {
    const button = e.target.closest('.topic-action-btn');
    if (!button) return;

    const topicId = button.dataset.topicId;
    const action = button.dataset.action;
    const topic = allTopics.find(t => t.id === topicId);
    
    if (!topic) return;

    initAudio();
    playNavigationSound();

    switch (action) {
        case 'test':
            const fullQuestionsForQuiz = allQuestionsWithIndex.filter(q => q.topicId === topic.id);
            showQuizOptionsScreen(topic, fullQuestionsForQuiz);
            break;
        case 'learn':
            alert(`'Learn Topic' functionality for "${topic.name}" is coming soon!`);
            break;
        case 'flashcards':
             const topicFlashcards = allFlashcardsWithIndex.filter(f => f.topicId === topic.id);
            if (topicFlashcards && topicFlashcards.length > 0) {
                showFlashcardOptionsScreen(topic);
            } else {
                alert(`'Flashcards' functionality for "${topic.name}" is coming soon!`);
            }
            break;
    }
};

const renderCategories = () => {
    categoryCardsContainer.innerHTML = '';
    const lang = settings.language;

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
        // Base class list for the card style
        btn.className = 'category-card flex-shrink-0 w-36 h-24 flex items-center justify-center p-2 text-center font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer border-2';
        
        if (currentCategoryId === cat.id) {
            // Active state classes from data
            btn.classList.add(...cat.activeColorClass.split(' '), 'scale-105');
        } else {
            // Inactive state classes from data
            btn.classList.add(...cat.colorClass.split(' '));
        }
        categoryCardsContainer.appendChild(btn);
    });
};


const renderTopicsOnStartScreen = () => {
    const container = document.getElementById('topics-accordion-container');
    if (!container) return;
    container.innerHTML = '';
    const lang = settings.language;

    const topicsToRender = currentCategoryId === 'all' 
        ? allTopics 
        : allTopics.filter(topic => topic.categoryId === currentCategoryId);
    
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
                <button class="topic-action-btn learn-btn w-full sm:w-auto px-6 py-3 text-md font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md" data-topic-id="${topic.id}" data-action="learn">
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

    container.removeEventListener('click', handleTopicAction);
    container.addEventListener('click', handleTopicAction);
};

// Flashcard Logic
const showFlashcardOptionsScreen = (topic, flashcardsToShow) => {
    currentTopicForFlashcards = topic;
    const topicFlashcards = flashcardsToShow || allFlashcardsWithIndex.filter(f => f.topicId === topic.id);
    currentFlashcardPool = topicFlashcards;
    flashcardTopicTitle.textContent = topic.name;
    
    flashcardsCountSlider.max = topicFlashcards.length;
    flashcardsCountSlider.value = topicFlashcards.length;
    flashcardsCountValue.textContent = topicFlashcards.length;

    document.getElementById('flashcard-order-random-radio').checked = true;
    document.getElementById('flashcard-start-front-radio').checked = true;

    showScreen(flashcardOptionsScreen);
};

const handleStartFlashcards = () => {
    const order = document.querySelector('input[name="flashcard-order"]:checked').value;
    const startSide = document.querySelector('input[name="flashcard-start-side"]:checked').value;
    const count = parseInt(flashcardsCountSlider.value, 10);

    let flashcardsToStart = [...currentFlashcardPool];
    if (order === 'random') {
        flashcardsToStart = shuffleArray(flashcardsToStart);
    }
    flashcardsToStart = flashcardsToStart.slice(0, count);

    flashcardSettings.startSide = startSide;
    
    startFlashcards(flashcardsToStart);
};

const startFlashcards = (flashcards) => {
    playNavigationSound();
    currentFlashcards = flashcards;
    currentFlashcardIndex = 0;
    flashcardSessionStats = { known: [], unknown: [] };
    showScreen(flashcardScreen);
    updateSoundToggleUI();
    renderFlashcard();
};

const renderFlashcard = () => {
    if (currentFlashcards.length === 0) {
        closeFlashcards();
        return;
    }

    const card = currentFlashcards[currentFlashcardIndex];
    const frontText = flashcardSettings.startSide === 'front' ? card.front : card.back;
    const backText = flashcardSettings.startSide === 'front' ? card.back : card.front;
    
    flashcardFrontText.innerHTML = frontText;
    flashcardBackText.innerHTML = backText;
    
    flashcardContainer.classList.remove('is-flipped');
    flashcardAssessmentContainer.classList.add('hidden');
    flashcardFlipHint.classList.remove('hidden');

    const lang = settings.language;
    flashcardProgressText.textContent = translations[lang].flashcard_progress_text
        .replace('{{current}}', currentFlashcardIndex + 1)
        .replace('{{total}}', currentFlashcards.length);

    if (bookmarkedFlashcards.has(card.originalIndex)) {
        flashcardBookmarkBtn.innerHTML = bookmarkedIconSVG;
        flashcardBookmarkBtn.setAttribute('aria-label', translations[lang].saved_flashcard_aria);
    } else {
        flashcardBookmarkBtn.innerHTML = bookmarkIconSVG;
        flashcardBookmarkBtn.setAttribute('aria-label', translations[lang].save_flashcard_aria);
    }

    prevFlashcardBtn.disabled = currentFlashcardIndex === 0;
    nextFlashcardBtn.disabled = currentFlashcardIndex === currentFlashcards.length - 1;
};

const handleNextFlashcard = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking arrow
    if (currentFlashcardIndex < currentFlashcards.length - 1) {
        playNavigationSound();
        currentFlashcardIndex++;
        renderFlashcard();
    } else {
        showFlashcardResults();
    }
};

const handlePrevFlashcard = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking arrow
    if (currentFlashcardIndex > 0) {
        playNavigationSound();
        currentFlashcardIndex--;
        renderFlashcard();
    }
};

const handleFlashcardAssessment = (isKnown) => {
    const card = currentFlashcards[currentFlashcardIndex];
    if (isKnown) {
        if (!flashcardSessionStats.known.find(c => c.originalIndex === card.originalIndex)) {
            flashcardSessionStats.known.push(card);
        }
        flashcardSessionStats.unknown = flashcardSessionStats.unknown.filter(c => c.originalIndex !== card.originalIndex);
        playCorrectSound();
    } else {
        if (!flashcardSessionStats.unknown.find(c => c.originalIndex === card.originalIndex)) {
            flashcardSessionStats.unknown.push(card);
        }
        flashcardSessionStats.known = flashcardSessionStats.known.filter(c => c.originalIndex !== card.originalIndex);
        playIncorrectSound();
    }
    handleNextFlashcard({ stopPropagation: () => {} }); // Pass a dummy event to avoid errors
};

const showFlashcardResults = () => {
    const total = currentFlashcards.length;
    const knownCount = flashcardSessionStats.known.length;
    const unknownCount = flashcardSessionStats.unknown.length;
    const lang = settings.language;
    
    flashcardResultsMessage.textContent = translations[lang].flashcard_results_message
        .replace('{{known}}', knownCount)
        .replace('{{total}}', total);
    
    flashcardResultsButtons.innerHTML = '';

    if (unknownCount > 0) {
        const reviewBtn = document.createElement('button');
        reviewBtn.textContent = translations[lang].flashcard_review_unknown_button.replace('{{count}}', unknownCount);
        reviewBtn.className = "w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg";
        reviewBtn.onclick = () => {
            const cardsToReview = [...flashcardSessionStats.unknown];
            startFlashcards(cardsToReview);
        };
        flashcardResultsButtons.appendChild(reviewBtn);
    }

    const homeBtn = document.createElement('button');
    homeBtn.textContent = translations[lang].start_new_quiz_button;
    homeBtn.className = "w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg";
    homeBtn.onclick = closeFlashcards;
    flashcardResultsButtons.appendChild(homeBtn);
    
    showScreen(flashcardResultsScreen);
};

const closeFlashcards = () => {
    playNavigationSound();
    showScreen(startScreen);
    currentFlashcards = [];
    currentFlashcardIndex = 0;
};

const flipFlashcard = () => {
    flashcardContainer.classList.toggle('is-flipped');
    const isFlipped = flashcardContainer.classList.contains('is-flipped');
    if (isFlipped) {
        flashcardAssessmentContainer.classList.remove('hidden');
        flashcardFlipHint.classList.add('hidden');
    } else {
        flashcardAssessmentContainer.classList.add('hidden');
        flashcardFlipHint.classList.remove('hidden');
    }
};

// Flashcard Bookmark Logic
const loadFlashcardBookmarks = () => {
    const stored = localStorage.getItem(FLASHCARDS_BOOKMARKS_STORAGE_KEY);
    if (stored) {
        try {
            bookmarkedFlashcards = new Set(JSON.parse(stored));
        } catch (e) {
            console.error('Failed to parse flashcard bookmarks from localStorage', e);
            bookmarkedFlashcards = new Set();
        }
    }
};

const saveFlashcardBookmarks = () => {
    localStorage.setItem(FLASHCARDS_BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(bookmarkedFlashcards)));
};

const handleFlashcardBookmarkToggle = () => {
    const card = currentFlashcards[currentFlashcardIndex];
    if (!card) return;
    
    playBookmarkSound();
    const lang = settings.language;
    const { originalIndex } = card;

    if (bookmarkedFlashcards.has(originalIndex)) {
        bookmarkedFlashcards.delete(originalIndex);
        flashcardBookmarkBtn.innerHTML = bookmarkIconSVG;
        flashcardBookmarkBtn.setAttribute('aria-label', translations[lang].save_flashcard_aria);
    } else {
        bookmarkedFlashcards.add(originalIndex);
        flashcardBookmarkBtn.innerHTML = bookmarkedIconSVG;
        flashcardBookmarkBtn.setAttribute('aria-label', translations[lang].saved_flashcard_aria);
    }
    saveFlashcardBookmarks();
};

const renderBookmarkedFlashcardsSection = () => {
    flashcardBookmarksList.innerHTML = '';
    flashcardBookmarkQuizButtonContainer.innerHTML = '';
    const lang = settings.language;

    if (bookmarkedFlashcards.size > 0) {
        const flashcardsToRender = allFlashcardsWithIndex.filter(f => bookmarkedFlashcards.has(f.originalIndex));

        flashcardsToRender.forEach(f => {
            const li = document.createElement('li');
            li.className = 'p-3 bg-gray-100 rounded-md flex justify-between items-center';
            li.innerHTML = `<p class="text-gray-800 text-sm mr-2">${f.front}</p>`;
            
            const removeButton = document.createElement('button');
            removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 hover:text-red-700" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`;
            removeButton.className = 'ml-4 p-1 rounded-full hover:bg-red-100 flex-shrink-0';
            removeButton.setAttribute('aria-label', translations[lang].remove_flashcard_bookmark_aria);
            removeButton.onclick = () => {
                bookmarkedFlashcards.delete(f.originalIndex);
                saveFlashcardBookmarks();
                renderBookmarkedFlashcardsSection();
            };
            li.appendChild(removeButton);

            flashcardBookmarksList.appendChild(li);
        });

        if (flashcardsToRender.length > 0) {
            const startBtn = document.createElement('button');
            startBtn.textContent = translations[lang].start_bookmarked_flashcards_button.replace('{{count}}', flashcardsToRender.length);
            startBtn.className = 'px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md';
            startBtn.onclick = () => startFlashcards(flashcardsToRender);
            flashcardBookmarkQuizButtonContainer.appendChild(startBtn);
        }
    } else {
        flashcardBookmarksList.innerHTML = `<p class="text-center text-gray-500">${translations[lang].no_saved_flashcards_message}</p>`;
    }
};

// Quiz Logic
const showQuizOptionsScreen = (topic, questions) => {
    currentTopicForQuiz = topic;
    currentQuestionPool = questions;
    quizTopicTitle.textContent = topic.name;
    
    quizQuestionsCountSlider.max = questions.length;
    quizQuestionsCountSlider.value = Math.min(20, questions.length); // Default to 20 or max available
    quizQuestionsCountValue.textContent = quizQuestionsCountSlider.value;
    
    document.getElementById('quiz-timer-on-radio').checked = true;
    document.getElementById('quiz-timer-duration-input').value = 15;
    document.getElementById('quiz-timer-duration-input').disabled = false;
    document.getElementById('quiz-order-random-radio').checked = true;

    showScreen(quizOptionsScreen);
};


const startQuiz = (isTimerEnabled, durationInSeconds) => {
    playNavigationSound();
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    startTime = Date.now();
    clearInterval(timerInterval);
    
    timerContainer.classList.toggle('hidden', !isTimerEnabled);

    if (isTimerEnabled) {
        timeRemaining = durationInSeconds;
        timerEl.textContent = formatTime(timeRemaining);
        timerInterval = setInterval(updateCountdown, 1000);
    } else {
        stopwatchSeconds = 0;
        timerEl.textContent = formatTime(stopwatchSeconds);
        timerInterval = setInterval(updateStopwatch, 1000);
    }

    showScreen(quizScreen);
    updateSoundToggleUI();
    loadQuestion();
    requestWakeLock();
};


const loadQuestion = () => {
    optionsContainer.innerHTML = '';
    questionImageContainer.innerHTML = '';
    nextButtonContainer.innerHTML = '';

    if (currentQuestionIndex >= currentQuestions.length) {
        finishQuiz();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    const lang = settings.language;
    
    questionTextEl.textContent = question.questionText;

    if (question.imageUrl) {
        const img = document.createElement('img');
        img.src = question.imageUrl;
        img.alt = `Imagen para la pregunta ${currentQuestionIndex + 1}`;
        img.className = 'mx-auto rounded-lg max-h-60 mb-4';
        questionImageContainer.appendChild(img);
    }
    
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    
    progressText.textContent = translations[lang].progress_text_template
        .replace('{{current}}', currentQuestionIndex + 1)
        .replace('{{total}}', currentQuestions.length);

    if (bookmarkedQuestions.has(question.originalIndex)) {
        bookmarkBtn.innerHTML = bookmarkedIconSVG;
        bookmarkBtn.setAttribute('aria-label', translations[lang].bookmarked_question_aria);
    } else {
        bookmarkBtn.innerHTML = bookmarkIconSVG;
        bookmarkBtn.setAttribute('aria-label', translations[lang].bookmark_question_aria);
    }

    const shuffledOptions = shuffleArray([...question.options.keys()]);

    shuffledOptions.forEach(optionIndex => {
        const option = question.options[optionIndex];
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'w-full text-left p-4 border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200';
        button.dataset.index = optionIndex;
        button.onclick = () => selectAnswer(button);
        optionsContainer.appendChild(button);
    });
};

const selectAnswer = (button) => {
    const selectedIndex = parseInt(button.dataset.index);
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswerIndex;

    Array.from(optionsContainer.children).forEach(btn => {
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
        score++;
        playCorrectSound();
    } else {
        playIncorrectSound();
    }

    selectedAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedIndex: selectedIndex,
        isCorrect: isCorrect
    });
    
    const lang = settings.language;
    const nextButton = document.createElement('button');
    if(currentQuestionIndex === currentQuestions.length - 1) {
        nextButton.textContent = translations[lang].finish_quiz_button;
    } else {
        nextButton.textContent = translations[lang].next_question_button;
    }
    
    nextButton.className = 'px-8 py-3 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
    nextButton.onclick = () => {
        playNavigationSound();
        currentQuestionIndex++;
        loadQuestion();
    };
    nextButtonContainer.appendChild(nextButton);
};

const finishQuiz = () => {
    clearInterval(timerInterval);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const lang = settings.language;
    
    resultsMessage.textContent = translations[lang].results_message_completed.replace('{{username}}', username);
    resultsTitle.textContent = translations[lang].results_title_completed;
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    if (percentage === 100) {
        resultsTitle.textContent = translations[lang].results_title_perfect;
        resultsMessage.textContent = translations[lang].results_message_perfect.replace('{{username}}', username);
    }
    
    scoreDisplay.textContent = `${score}/${currentQuestions.length}`;
    scorePercentage.textContent = `${percentage}%`;
    finalTimeEl.textContent = `${translations[lang].total_time_label} ${formatTime(timeTaken)}`;
    
    renderResultsButtons();
    renderReviewSection();

    showScreen(resultsScreen);
    releaseWakeLock();
};

const renderResultsButtons = () => {
    resultsButtons.innerHTML = '';
    const lang = settings.language;

    const incorrectAnswers = selectedAnswers.filter(a => !a.isCorrect);

    if (incorrectAnswers.length > 0) {
        const retryButton = document.createElement('button');
        retryButton.textContent = translations[lang].retry_mistakes_button.replace('{{count}}', incorrectAnswers.length);
        retryButton.className = 'w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg';
        retryButton.onclick = () => {
            currentQuestions = incorrectAnswers.map(a => currentQuestions[a.questionIndex]);
            const timerOn = document.getElementById('quiz-timer-on-radio').checked;
            const duration = parseInt(document.getElementById('quiz-timer-duration-input').value, 10);
            startQuiz(timerOn, duration * 60);
        };
        resultsButtons.appendChild(retryButton);
    }

    const newQuizButton = document.createElement('button');
    newQuizButton.textContent = translations[lang].start_new_quiz_button;
    newQuizButton.className = 'w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg';
    newQuizButton.onclick = goHome;
    resultsButtons.appendChild(newQuizButton);
};

const renderReviewSection = () => {
    incorrectList.innerHTML = '';
    const incorrectAnswers = selectedAnswers.filter(a => !a.isCorrect);
    const lang = settings.language;

    if (incorrectAnswers.length > 0) {
        reviewSection.classList.remove('hidden');
        incorrectAnswers.forEach(answer => {
            const question = currentQuestions[answer.questionIndex];
            const li = document.createElement('li');
            li.className = 'p-3 border-b border-gray-200';
            li.innerHTML = `
                <p class="font-semibold text-gray-800">${question.questionText}</p>
                <p class="text-sm mt-1 text-red-600">${translations[lang].correct_answer_label} ${question.options[question.correctAnswerIndex]}</p>
            `;
            incorrectList.appendChild(li);
        });
    } else {
        reviewSection.classList.add('hidden');
    }
};

const goHome = () => {
    playNavigationSound();
    clearInterval(timerInterval);
    showScreen(startScreen);
    releaseWakeLock();
};

const search = (query) => {
    query = query.toLowerCase().trim();
    if (query === '') {
        searchResultsContainer.classList.add('hidden');
        startScreenDefaultContent.classList.remove('hidden');
        topicQuizButtonContainer.innerHTML = ''; // Clear buttons when search is cleared
        topicQuizButtonContainer.className = 'mt-4 text-center';
        return;
    }

    startScreenDefaultContent.classList.add('hidden');
    searchResultsContainer.classList.remove('hidden');
    searchResultsList.innerHTML = '';
    topicQuizButtonContainer.innerHTML = '';
    
    let resultsFound = false;
    const lang = settings.language;
    
    const foundQuestions = [];
    const foundFlashcards = [];
    const addedIndices = {
        questions: new Set(),
        flashcards: new Set()
    };
    
    const matchingTopics = [];
    const matchingQuestions = [];
    const matchingFlashcards = [];

    // Search Topics
    if (currentSearchFilter === 'all' || currentSearchFilter === 'topics') {
        allTopics.forEach(topic => {
            if (topic.name.toLowerCase().includes(query) || topic.description.toLowerCase().includes(query)) {
                matchingTopics.push(topic);
                resultsFound = true;
                
                allQuestionsWithIndex.filter(q => q.topicId === topic.id).forEach(q => {
                    if (!addedIndices.questions.has(q.originalIndex)) {
                        foundQuestions.push(q);
                        addedIndices.questions.add(q.originalIndex);
                    }
                });

                allFlashcardsWithIndex.filter(f => f.topicId === topic.id).forEach(f => {
                    if (!addedIndices.flashcards.has(f.originalIndex)) {
                        foundFlashcards.push(f);
                        addedIndices.flashcards.add(f.originalIndex);
                    }
                });
            }
        });
    }

    // Search Questions
    if (currentSearchFilter === 'all' || currentSearchFilter === 'tests') {
        allQuestionsWithIndex.forEach(q => {
            if (q.questionText.toLowerCase().includes(query)) {
                if (!addedIndices.questions.has(q.originalIndex)) {
                    matchingQuestions.push(q);
                    foundQuestions.push(q);
                    addedIndices.questions.add(q.originalIndex);
                }
                resultsFound = true;
            }
        });
    }
    
    // Search Flashcards
    if (currentSearchFilter === 'all' || currentSearchFilter === 'flashcards') {
        allFlashcardsWithIndex.forEach(f => {
             if (f.front.toLowerCase().includes(query) || f.back.toLowerCase().includes(query)) {
                if (!addedIndices.flashcards.has(f.originalIndex)) {
                    matchingFlashcards.push(f);
                    foundFlashcards.push(f);
                    addedIndices.flashcards.add(f.originalIndex);
                }
                resultsFound = true;
             }
        });
    }

    // Render results
    matchingTopics.forEach(topic => {
        const topicQuestions = allQuestionsWithIndex.filter(q => q.topicId === topic.id);
        const resultItem = createSearchResultItem(topic.name, topic.description, 'topic', () => showQuizOptionsScreen(topic, topicQuestions));
        searchResultsList.appendChild(resultItem);
    });

    matchingQuestions.forEach(q => {
        const topic = allTopics.find(t => t.id === q.topicId);
        const resultItem = createSearchResultItem(q.questionText, topic.name, 'test', () => showQuizOptionsScreen(topic, [q]));
        searchResultsList.appendChild(resultItem);
    });

    matchingFlashcards.forEach(f => {
        const topic = allTopics.find(t => t.id === f.topicId);
        const resultItem = createSearchResultItem(f.front, topic.name, 'flashcards', () => showFlashcardOptionsScreen(topic, [f]));
        searchResultsList.appendChild(resultItem);
    });

    noResultsMessage.classList.toggle('hidden', !resultsFound);

    // Render combined action buttons
    if (resultsFound) {
        topicQuizButtonContainer.className = 'mt-4 flex flex-wrap justify-center gap-4';
        if (foundQuestions.length > 0) {
            const startQuizBtn = document.createElement('button');
            startQuizBtn.textContent = translations[lang].start_search_quiz_button.replace('{{count}}', foundQuestions.length);
            startQuizBtn.className = 'w-full sm:w-auto mt-2 px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
            startQuizBtn.onclick = () => showQuizOptionsScreen({ name: translations[lang].search_results_topic_title }, foundQuestions);
            topicQuizButtonContainer.appendChild(startQuizBtn);
        }
        if (foundFlashcards.length > 0) {
            const startFlashcardsBtn = document.createElement('button');
            startFlashcardsBtn.textContent = translations[lang].start_search_flashcards_button.replace('{{count}}', foundFlashcards.length);
            startFlashcardsBtn.className = 'w-full sm:w-auto mt-2 px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md';
            startFlashcardsBtn.onclick = () => showFlashcardOptionsScreen({ name: translations[lang].search_results_topic_title }, foundFlashcards);
            topicQuizButtonContainer.appendChild(startFlashcardsBtn);
        }
    } else {
        topicQuizButtonContainer.className = 'mt-4 text-center';
    }
};

const createSearchResultItem = (title, subtitle, type, onClick) => {
    const item = document.createElement('div');
    item.className = 'p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-blue-100 transition-colors flex justify-between items-center';
    item.onclick = onClick;
    const lang = settings.language;
    let tagText = '';
    let tagClass = '';
    if (type === 'test') { tagText = translations[lang].result_tag_test; tagClass = 'bg-blue-100 text-blue-800'; }
    else if (type === 'topic') { tagText = translations[lang].result_tag_topic; tagClass = 'bg-green-100 text-green-800'; }
    else if (type === 'flashcards') { tagText = translations[lang].flashcards; tagClass = 'bg-yellow-100 text-yellow-800'; }

    item.innerHTML = `
        <div>
            <p class="font-semibold text-gray-800">${title}</p>
            <p class="text-sm text-gray-500">${subtitle}</p>
        </div>
        <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${tagClass}">${tagText}</span>
    `;
    return item;
};

const handleSearchFilterChange = (e) => {
    currentSearchFilter = e.target.value;
    updateSearchPlaceholder();
    if (searchInput.value.trim() !== '') {
        search(searchInput.value);
    }
};


// Event Listeners
const init = () => {
    // Load preferences
    loadSettings();
    setLanguage(settings.language);
    loadSoundPreference();
    loadBookmarks();
    loadFlashcardBookmarks();

    // Check for existing user
    const storedUsername = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (storedUsername) {
        username = storedUsername;
        const lang = settings.language;
        welcomeMessage.textContent = translations[lang].welcome_user_message.replace('{{username}}', username);
        document.title = `${username} - ${translations[lang].main_app_title}`;
        showScreen(startScreen);
    }
    
    // Initial UI Setup
    updateSoundToggleUI();
    
    // Screen navigation
    submitNameBtn.addEventListener('click', handleNameSubmit);
    nameInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleNameSubmit(); });
    backToHomeBtn.addEventListener('click', goHome);
    backToHomeFromFlashcardBtn.addEventListener('click', closeFlashcards);

    // New Saved Screen listeners
    showSavedBtn.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
        playNavigationSound();
        savedScreenState = 'categories';
        
        savedCategorySelection.classList.remove('hidden');
        bookmarksContainer.classList.add('hidden');
        flashcardBookmarksContainer.classList.add('hidden');

        const lang = settings.language;
        savedScreenHeaderTitle.textContent = translations[lang].saved_screen_title;
        backFromSavedBtn.setAttribute('aria-label', translations[lang].back_to_home_title);
        backFromSavedBtn.setAttribute('title', translations[lang].back_to_home_title);

        showScreen(savedScreen);
    });

    showSavedQuestionsBtn.addEventListener('click', () => {
        playNavigationSound();
        savedScreenState = 'questions';

        savedCategorySelection.classList.add('hidden');
        flashcardBookmarksContainer.classList.add('hidden');
        bookmarksContainer.classList.remove('hidden');
        
        const lang = settings.language;
        savedScreenHeaderTitle.textContent = translations[lang].bookmarks_title;
        backFromSavedBtn.setAttribute('aria-label', translations[lang].back_button);
        backFromSavedBtn.setAttribute('title', translations[lang].back_button);

        renderBookmarksSection();
    });

    showSavedFlashcardsBtn.addEventListener('click', () => {
        playNavigationSound();
        savedScreenState = 'flashcards';

        savedCategorySelection.classList.add('hidden');
        bookmarksContainer.classList.add('hidden');
        flashcardBookmarksContainer.classList.remove('hidden');

        const lang = settings.language;
        savedScreenHeaderTitle.textContent = translations[lang].flashcard_bookmarks_title;
        backFromSavedBtn.setAttribute('aria-label', translations[lang].back_button);
        backFromSavedBtn.setAttribute('title', translations[lang].back_button);

        renderBookmarkedFlashcardsSection();
    });

    backFromSavedBtn.addEventListener('click', () => {
        playNavigationSound();
        if (savedScreenState === 'questions' || savedScreenState === 'flashcards') {
            savedScreenState = 'categories';
            bookmarksContainer.classList.add('hidden');
            flashcardBookmarksContainer.classList.add('hidden');
            savedCategorySelection.classList.remove('hidden');
            
            const lang = settings.language;
            savedScreenHeaderTitle.textContent = translations[lang].saved_screen_title;
            backFromSavedBtn.setAttribute('aria-label', translations[lang].back_to_home_title);
            backFromSavedBtn.setAttribute('title', translations[lang].back_to_home_title);

        } else { // state is 'categories'
            goHome();
        }
    });

    // Settings Modal
    menuBtn.addEventListener('click', () => {
        languageSelect.value = settings.language;
        const lang = settings.language;
        settingsGreeting.textContent = translations[lang].settings_greeting.replace('{{username}}', username);
        settingsModal.classList.remove('hidden');
    });
    closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
    cancelSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
    saveSettingsBtn.addEventListener('click', () => {
        const originalLang = settings.language;
        settings.language = languageSelect.value;
        saveSettings();
        
        if (originalLang !== settings.language) {
            setLanguage(settings.language);
            if (!startScreen.classList.contains('hidden')) {
                renderCategories();
                renderTopicsOnStartScreen();
            }
             if (username) {
                document.title = `${username} - ${translations[settings.language].main_app_title}`;
            }
        }
        
        settingsModal.classList.add('hidden');
    });


    // Quiz Options
    quizQuestionsCountSlider.addEventListener('input', (e) => {
        quizQuestionsCountValue.textContent = e.target.value;
    });
    document.getElementById('quiz-timer-on-radio').addEventListener('change', (e) => {
        document.getElementById('quiz-timer-duration-input').disabled = !e.target.checked;
    });
     document.getElementById('quiz-timer-off-radio').addEventListener('change', (e) => {
        document.getElementById('quiz-timer-duration-input').disabled = e.target.checked;
    });
    startQuizFromOptionsBtn.addEventListener('click', () => {
        playNavigationSound();
        const numQuestions = parseInt(quizQuestionsCountSlider.value, 10);
        const isTimerEnabled = document.getElementById('quiz-timer-on-radio').checked;
        const timerDuration = parseInt(document.getElementById('quiz-timer-duration-input').value, 10);
        const questionOrder = document.querySelector('input[name="quiz-question-order"]:checked').value;
        
        let questionsToStart = [...currentQuestionPool];

        if (questionOrder === 'random') {
            shuffleArray(questionsToStart);
        }

        currentQuestions = questionsToStart.slice(0, numQuestions);

        startQuiz(isTimerEnabled, timerDuration * 60);
    });
    backToStartFromQuizOptionsBtn.addEventListener('click', goHome);
    
    // Flashcard Options
    flashcardsCountSlider.addEventListener('input', (e) => {
        flashcardsCountValue.textContent = e.target.value;
    });
    startFlashcardsBtn.addEventListener('click', handleStartFlashcards);
    backToStartFromFlashcardsBtn.addEventListener('click', goHome);

    // In-Quiz Actions
    soundToggleBtn.addEventListener('click', toggleSound);
    bookmarkBtn.addEventListener('click', handleBookmarkToggle);

    // Flashcard Screen Actions
    flashcardSoundToggleBtn.addEventListener('click', toggleSound);
    flashcardBookmarkBtn.addEventListener('click', handleFlashcardBookmarkToggle);
    flashcardContainer.addEventListener('click', flipFlashcard);
    prevFlashcardBtn.addEventListener('click', handlePrevFlashcard);
    nextFlashcardBtn.addEventListener('click', handleNextFlashcard);
    flashcardKnownBtn.addEventListener('click', () => handleFlashcardAssessment(true));
    flashcardUnknownBtn.addEventListener('click', () => handleFlashcardAssessment(false));
    
    // Gestures for flashcards
    let touchStartY = 0;
    let touchStartX = 0;
    flashcardContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    flashcardContainer.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].screenY;
        const touchEndX = e.changedTouches[0].screenX;
        const deltaY = touchStartY - touchEndY;
        const deltaX = touchEndX - touchStartX;

        // Prioritize vertical swipe for flip
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 40) {
            if (deltaY > 0) { // Swipe Up
                flipFlashcard();
            }
        } 
        // Horizontal swipe for known/unknown, only if card is flipped
        else if (flashcardContainer.classList.contains('is-flipped') && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
             if (deltaX > 0) { // Swipe Right
                handleFlashcardAssessment(true);
             } else { // Swipe Left
                handleFlashcardAssessment(false);
             }
        }
    }, { passive: true });


    // Search and Filtering
    searchInput.addEventListener('input', (e) => search(e.target.value));
    searchFilterSelect.addEventListener('change', handleSearchFilterChange);

    categoryCardsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.category-card');
        if (target && target.dataset.categoryId !== currentCategoryId) {
            currentCategoryId = target.dataset.categoryId;
            playNavigationSound();
            renderCategories(); // Update UI
            renderTopicsOnStartScreen(); // Filter and render topics
        }
    });

    // Drag to scroll for category container
    const slider = document.querySelector('#category-cards-container');
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
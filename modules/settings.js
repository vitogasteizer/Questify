// Settings State
const SETTINGS_STORAGE_KEY = 'logisticsQuizSettings';
let settings = {
    language: 'es'
};
export const getSettings = () => settings;

// Audio State and Elements
let audioCtx = null;
let masterGainNode = null;
let _isSoundEnabled = true;
export const isSoundEnabled = () => _isSoundEnabled;
export const setIsSoundEnabled = (enabled) => { _isSoundEnabled = enabled; };
const SOUND_ENABLED_KEY = 'logisticsQuizSoundEnabled';
export const soundOnIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
export const soundOffIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" /><path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`;

export const translations = {
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
        back_to_home_short: "Volver al Inicio",
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
        start_scenarios_button: "Continuar al Escenario Práctico",
        scenario_progress_text: "Escenario {{current}} / {{total}}",
        next_scenario_button: "Siguiente Escenario",
        finish_scenarios_button: "Finalizar",
        learning_completion_title: "¡Escenarios completados!",
        learning_completion_message: "Has repasado los conceptos clave de este tema. ¡Buen trabajo!",
        retry_scenarios_button: "Repetir Escenarios",
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
        back_to_home_short: "მთავარზე",
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
        learn_topic: "თემის შესწავლა",
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
        start_scenarios_button: "პრაქტიკულ სცენარზე გადასვლა",
        scenario_progress_text: "სცენარი {{current}} / {{total}}",
        next_scenario_button: "შემდეგი სცენარი",
        finish_scenarios_button: "დასრულება",
        learning_completion_title: "სცენარები დასრულებულია!",
        learning_completion_message: "თქვენ გაიმეორეთ ამ თემის ძირითადი კონცეფციები. კარგი ნამუშევარია!",
        retry_scenarios_button: "სცენარების გამეორება",
    }
};

export const setLanguage = (lang) => {
    if (translations[lang]) {
        settings.language = lang;
    }
};

export const saveSettings = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

export const loadSettings = () => {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (storedSettings) {
        try {
            const loaded = JSON.parse(storedSettings);
            if (loaded && loaded.language) {
                settings.language = loaded.language;
            }
        } catch (e) {
            console.error('Failed to parse settings from localStorage', e);
        }
    }
};

export const initAudio = () => {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            masterGainNode = audioCtx.createGain();
            masterGainNode.connect(audioCtx.destination);
            masterGainNode.gain.value = _isSoundEnabled ? 1 : 0;
        } catch (e) {
            console.error('Web Audio API is not supported in this browser');
            setIsSoundEnabled(false);
        }
    }
};

export const playSound = (type, freq, duration, wave = 'sine') => {
    if (!_isSoundEnabled || !audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscillator.connect(masterGainNode);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
};

export const playCorrectSound = () => {
    if (!_isSoundEnabled || !audioCtx) return;
    const now = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.linearRampToValueAtTime(800, now + 0.1);
    oscillator.connect(masterGainNode);
    oscillator.start(now);
    oscillator.stop(now + 0.1);
};

export const playIncorrectSound = () => {
    if (!_isSoundEnabled || !audioCtx) return;
    const now = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.linearRampToValueAtTime(100, now + 0.2);
    oscillator.connect(masterGainNode);
    oscillator.start(now);
    oscillator.stop(now + 0.2);
};

export const playNavigationSound = () => {
    // This function will now be called from the UI manager or index.js, so we don't need to check screen visibility here
    playSound('nav', 800, 0.05, 'triangle');
};
export const playBookmarkSound = () => playSound('bookmark', 500, 0.07, 'sine');

export const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled());
    localStorage.setItem(SOUND_ENABLED_KEY, isSoundEnabled());
    if (masterGainNode) {
        masterGainNode.gain.value = isSoundEnabled() ? 1 : 0;
    }
};

export const loadSoundPreference = () => {
    const savedPref = localStorage.getItem(SOUND_ENABLED_KEY);
    setIsSoundEnabled(savedPref === null ? true : savedPref === 'true');
};

export const openSettingsModal = (username) => {
    const lang = settings.language;
    // The greeting is now set from ui-manager, which has access to the state.
};

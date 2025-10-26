// State
let username = '';
export const getUsername = () => username;
export const setUsername = (name) => { username = name; };

let currentQuestions = [];
export const getCurrentQuestions = () => currentQuestions;
export const setCurrentQuestions = (questions) => { currentQuestions = questions; };

let currentQuestionIndex = 0;
export const getCurrentQuestionIndex = () => currentQuestionIndex;
export const setCurrentQuestionIndex = (index) => { currentQuestionIndex = index; };
export const incrementCurrentQuestionIndex = () => { currentQuestionIndex++; };

let selectedAnswers = [];
export const getSelectedAnswers = () => selectedAnswers;
export const setSelectedAnswers = (answers) => { selectedAnswers = answers; };
export const addSelectedAnswer = (answer) => { selectedAnswers.push(answer); };

let score = 0;
export const getScore = () => score;
export const setScore = (newScore) => { score = newScore; };
export const incrementScore = () => { score++; };

let startTime = 0;
export const getStartTime = () => startTime;
export const setStartTime = (time) => { startTime = time; };

let timeRemaining = 0;
export const getTimeRemaining = () => timeRemaining;
export const setTimeRemaining = (time) => { timeRemaining = time; };
export const decrementTimeRemaining = () => { timeRemaining--; };

let stopwatchSeconds = 0;
export const getStopwatchSeconds = () => stopwatchSeconds;
export const setStopwatchSeconds = (seconds) => { stopwatchSeconds = seconds; };
export const incrementStopwatchSeconds = () => { stopwatchSeconds++; };

let timerInterval;
export const getTimerInterval = () => timerInterval;
export const setTimerInterval = (interval) => { timerInterval = interval; };

let wakeLock = null;
export const getWakeLock = () => wakeLock;
export const setWakeLock = (lock) => { wakeLock = lock; };

let bookmarkedQuestions = new Set();
export const getBookmarkedQuestions = () => bookmarkedQuestions;
export const setBookmarkedQuestions = (bookmarks) => { bookmarkedQuestions = bookmarks; };

let currentSearchFilter = 'all'; // 'all', 'tests', 'flashcards', 'topics'
export const getCurrentSearchFilter = () => currentSearchFilter;
export const setCurrentSearchFilter = (filter) => { currentSearchFilter = filter; };

let currentCategoryId = 'all';
export const getCurrentCategoryId = () => currentCategoryId;
export const setCurrentCategoryId = (id) => { currentCategoryId = id; };

let currentQuestionPool = [];
export const getCurrentQuestionPool = () => currentQuestionPool;
export const setCurrentQuestionPool = (pool) => { currentQuestionPool = pool; };

let currentFlashcardPool = [];
export const getCurrentFlashcardPool = () => currentFlashcardPool;
export const setCurrentFlashcardPool = (pool) => { currentFlashcardPool = pool; };

let currentTopicForQuiz = null;
export const getCurrentTopicForQuiz = () => currentTopicForQuiz;
export const setCurrentTopicForQuiz = (topic) => { currentTopicForQuiz = topic; };

let savedScreenState = 'categories'; // 'categories', 'questions', 'flashcards'
export const getSavedScreenState = () => savedScreenState;
export const setSavedScreenState = (state) => { savedScreenState = state; };

// Learning Module State
let currentLearningTopic = null;
export const getCurrentLearningTopic = () => currentLearningTopic;
export const setCurrentLearningTopic = (topic) => { currentLearningTopic = topic; };

let currentLearningData = null;
export const getCurrentLearningData = () => currentLearningData;
export const setCurrentLearningData = (data) => { currentLearningData = data; };

let currentScenarioIndex = 0;
export const getCurrentScenarioIndex = () => currentScenarioIndex;
export const setCurrentScenarioIndex = (index) => { currentScenarioIndex = index; };
export const incrementCurrentScenarioIndex = () => { currentScenarioIndex++; };


// Flashcard State
let currentTopicForFlashcards = null;
export const getCurrentTopicForFlashcards = () => currentTopicForFlashcards;
export const setCurrentTopicForFlashcards = (topic) => { currentTopicForFlashcards = topic; };

let currentFlashcards = [];
export const getCurrentFlashcards = () => currentFlashcards;
export const setCurrentFlashcards = (flashcards) => { currentFlashcards = flashcards; };

let currentFlashcardIndex = 0;
export const getCurrentFlashcardIndex = () => currentFlashcardIndex;
export const setCurrentFlashcardIndex = (index) => { currentFlashcardIndex = index; };
export const incrementCurrentFlashcardIndex = () => { currentFlashcardIndex++; };
export const decrementCurrentFlashcardIndex = () => { currentFlashcardIndex--; };

let flashcardSettings = {
    startSide: 'front' // 'front' or 'back'
};
export const getFlashcardSettings = () => flashcardSettings;

let bookmarkedFlashcards = new Set();
export const getBookmarkedFlashcards = () => bookmarkedFlashcards;
export const setBookmarkedFlashcards = (bookmarks) => { bookmarkedFlashcards = bookmarks; };

export const FLASHCARDS_BOOKMARKS_STORAGE_KEY = 'logisticsQuizFlashcardBookmarks';
let flashcardSessionStats = {
    known: [],
    unknown: []
};
export const getFlashcardSessionStats = () => flashcardSessionStats;
export const setFlashcardSessionStats = (stats) => { flashcardSessionStats = stats; };

let lastQuizConfig = null;
export const getLastQuizConfig = () => lastQuizConfig;
export const setLastQuizConfig = (config) => { lastQuizConfig = config; };


export const USERNAME_STORAGE_KEY = 'logisticsQuizUsername';
export const BOOKMARKS_STORAGE_KEY = 'logisticsQuizBookmarks';
export const QUIZ_PROGRESS_STORAGE_KEY = 'logisticsQuizProgress';
export const STATISTICS_STORAGE_KEY = 'logisticsQuizStatistics';
export const bookmarkIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>`;
export const bookmarkedIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>`;

export let allQuestionsWithIndex = [];
export let allFlashcardsWithIndex = [];

let quizProgress = {};
export const getQuizProgress = () => quizProgress;
export const setQuizProgress = (progress) => { quizProgress = progress; };
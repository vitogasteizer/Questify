import { STATISTICS_STORAGE_KEY } from './state.js';

let stats = {};
let timeTrackingInterval = null;

const defaultStats = {
    timeSpentInSeconds: 0,
    testsCompleted: 0,
    totalCorrectAnswers: 0,
    totalIncorrectAnswers: 0,
    testHistory: [], // { time: seconds, questionCount: count }
    totalFlashcardsSeen: 0,
    totalKnownFlashcards: 0,
    totalUnknownFlashcards: 0,
};

export const init = () => {
    const storedStats = localStorage.getItem(STATISTICS_STORAGE_KEY);
    if (storedStats) {
        try {
            stats = { ...defaultStats, ...JSON.parse(storedStats) };
        } catch (e) {
            console.error('Failed to parse statistics from localStorage', e);
            stats = { ...defaultStats };
        }
    } else {
        stats = { ...defaultStats };
    }
};

export const saveStatistics = () => {
    localStorage.setItem(STATISTICS_STORAGE_KEY, JSON.stringify(stats));
};

export const getStatistics = () => {
    return { ...stats };
};

export const startTimeTracking = () => {
    if (timeTrackingInterval) {
        clearInterval(timeTrackingInterval);
    }
    // Update every second, save every 30 seconds
    timeTrackingInterval = setInterval(() => {
        stats.timeSpentInSeconds = (stats.timeSpentInSeconds || 0) + 1;
        if (stats.timeSpentInSeconds % 30 === 0) {
            saveStatistics();
        }
    }, 1000);
};

export const addTestResult = (result) => {
    stats.testsCompleted = (stats.testsCompleted || 0) + 1;
    stats.totalCorrectAnswers = (stats.totalCorrectAnswers || 0) + result.correct;
    stats.totalIncorrectAnswers = (stats.totalIncorrectAnswers || 0) + result.incorrect;
    
    if (!stats.testHistory) {
        stats.testHistory = [];
    }
    stats.testHistory.push({
        time: result.time,
        questionCount: result.questionCount
    });

    saveStatistics();
};

export const addFlashcardSessionResult = (result) => {
    stats.totalFlashcardsSeen = (stats.totalFlashcardsSeen || 0) + result.seen;
    stats.totalKnownFlashcards = (stats.totalKnownFlashcards || 0) + result.known;
    stats.totalUnknownFlashcards = (stats.totalUnknownFlashcards || 0) + result.unknown;
    saveStatistics();
};
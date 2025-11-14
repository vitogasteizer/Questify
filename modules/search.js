import * as state from './state.js';
import * as ui from './ui-manager.js';
import { allTopics } from '../topics-data.js';
import { translations, getSettings } from './settings.js';
import { showQuizOptionsScreen } from './quiz-handler.js';
import { showFlashcardOptionsScreen } from './flashcard-handler.js';

export const search = (query) => {
    query = query.toLowerCase().trim();
    if (query === '') {
        if (!ui.searchResultsContainer.classList.contains('hidden')) {
            ui.searchResultsContainer.classList.add('hidden');
            ui.startScreenDefaultContent.classList.remove('hidden');
            ui.topicQuizButtonContainer.innerHTML = '';
            ui.topicQuizButtonContainer.className = 'mt-4 text-center';
            ui.updateHeaderBackground();
        }
        return;
    }

    if (ui.searchResultsContainer.classList.contains('hidden')) {
        ui.startScreenDefaultContent.classList.add('hidden');
        ui.searchResultsContainer.classList.remove('hidden');
        ui.updateHeaderBackground();
    }
    
    ui.searchResultsList.innerHTML = '';
    ui.topicQuizButtonContainer.innerHTML = '';
    
    let resultsFound = false;
    const lang = getSettings().language;
    
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
    if (state.getCurrentSearchFilter() === 'all' || state.getCurrentSearchFilter() === 'topics') {
        allTopics.forEach(topic => {
            if (topic.name.toLowerCase().includes(query) || topic.description.toLowerCase().includes(query)) {
                matchingTopics.push(topic);
                resultsFound = true;
                
                state.allQuestionsWithIndex.filter(q => q.topicId === topic.id).forEach(q => {
                    if (!addedIndices.questions.has(q.originalIndex)) {
                        foundQuestions.push(q);
                        addedIndices.questions.add(q.originalIndex);
                    }
                });

                state.allFlashcardsWithIndex.filter(f => f.topicId === topic.id).forEach(f => {
                    if (!addedIndices.flashcards.has(f.originalIndex)) {
                        foundFlashcards.push(f);
                        addedIndices.flashcards.add(f.originalIndex);
                    }
                });
            }
        });
    }

    // Search Questions
    if (state.getCurrentSearchFilter() === 'all' || state.getCurrentSearchFilter() === 'tests') {
        state.allQuestionsWithIndex.forEach(q => {
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
    if (state.getCurrentSearchFilter() === 'all' || state.getCurrentSearchFilter() === 'flashcards') {
        state.allFlashcardsWithIndex.forEach(f => {
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
        const topicQuestions = state.allQuestionsWithIndex.filter(q => q.topicId === topic.id);
        const resultItem = createSearchResultItem(topic.name, topic.description, 'topic', () => showQuizOptionsScreen(topic, topicQuestions));
        ui.searchResultsList.appendChild(resultItem);
    });

    matchingQuestions.forEach(q => {
        const topic = allTopics.find(t => t.id === q.topicId);
        const resultItem = createSearchResultItem(q.questionText, topic.name, 'test', () => showQuizOptionsScreen(topic, [q]));
        ui.searchResultsList.appendChild(resultItem);
    });

    matchingFlashcards.forEach(f => {
        const topic = allTopics.find(t => t.id === f.topicId);
        const resultItem = createSearchResultItem(f.front, topic.name, 'flashcards', () => showFlashcardOptionsScreen(topic, [f]));
        ui.searchResultsList.appendChild(resultItem);
    });

    ui.noResultsMessage.classList.toggle('hidden', resultsFound);

    // Render combined action buttons
    if (resultsFound) {
        ui.topicQuizButtonContainer.className = 'mt-4 flex flex-wrap justify-center gap-4';
        if (foundQuestions.length > 0) {
            const startQuizBtn = document.createElement('button');
            startQuizBtn.textContent = translations[lang].start_search_quiz_button.replace('{{count}}', foundQuestions.length);
            startQuizBtn.className = 'w-full sm:w-auto mt-2 px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
            startQuizBtn.onclick = () => showQuizOptionsScreen({ name: translations[lang].search_results_topic_title }, foundQuestions);
            ui.topicQuizButtonContainer.appendChild(startQuizBtn);
        }
        if (foundFlashcards.length > 0) {
            const startFlashcardsBtn = document.createElement('button');
            startFlashcardsBtn.textContent = translations[lang].start_search_flashcards_button.replace('{{count}}', foundFlashcards.length);
            startFlashcardsBtn.className = 'w-full sm:w-auto mt-2 px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md';
            startFlashcardsBtn.onclick = () => showFlashcardOptionsScreen({ name: translations[lang].search_results_topic_title }, foundFlashcards);
            ui.topicQuizButtonContainer.appendChild(startFlashcardsBtn);
        }
    } else {
        ui.topicQuizButtonContainer.className = 'mt-4 text-center';
    }
};

export const createSearchResultItem = (title, subtitle, type, onClick) => {
    const item = document.createElement('div');
    item.className = 'p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-blue-100 transition-colors flex justify-between items-center';
    item.onclick = onClick;
    const lang = getSettings().language;
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

export const handleSearchFilterChange = (e) => {
    state.setCurrentSearchFilter(e.target.value);
    import('./settings.js').then(settings => settings.updateSearchPlaceholder());
    if (ui.searchInput.value.trim() !== '') {
        search(ui.searchInput.value);
    }
};
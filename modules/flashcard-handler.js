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

export const showFlashcardOptionsScreen = (topic, flashcardsToShow) => {
    state.setCurrentTopicForFlashcards(topic);
    const topicFlashcards = flashcardsToShow || state.allFlashcardsWithIndex.filter(f => f.topicId === topic.id);
    state.setCurrentFlashcardPool(topicFlashcards);
    ui.flashcardTopicTitle.textContent = topic.name;
    
    ui.flashcardsCountSlider.max = topicFlashcards.length;
    ui.flashcardsCountSlider.value = topicFlashcards.length;
    ui.flashcardsCountValue.textContent = topicFlashcards.length;

    document.getElementById('flashcard-order-random-radio').checked = true;
    document.getElementById('flashcard-start-front-radio').checked = true;

    ui.showScreen(ui.flashcardOptionsScreen);
};

const handleStartFlashcards = () => {
    const order = document.querySelector('input[name="flashcard-order"]:checked').value;
    const startSide = document.querySelector('input[name="flashcard-start-side"]:checked').value;
    const count = parseInt(ui.flashcardsCountSlider.value, 10);

    let flashcardsToStart = [...state.getCurrentFlashcardPool()];
    if (order === 'random') {
        flashcardsToStart = shuffleArray(flashcardsToStart);
    }
    flashcardsToStart = flashcardsToStart.slice(0, count);

    state.getFlashcardSettings().startSide = startSide;
    
    startFlashcards(flashcardsToStart);
};

const startFlashcards = (flashcards) => {
    state.setCurrentFlashcards(flashcards);
    state.setCurrentFlashcardIndex(0);
    state.setFlashcardSessionStats({ known: [], unknown: [] });
    ui.showScreen(ui.flashcardScreen);
    ui.updateSoundToggleUI();
    renderFlashcard();
};

const renderFlashcard = () => {
    if (state.getCurrentFlashcards().length === 0) {
        closeFlashcards();
        return;
    }

    const card = state.getCurrentFlashcards()[state.getCurrentFlashcardIndex()];
    const startSide = state.getFlashcardSettings().startSide;
    const frontText = startSide === 'front' ? card.front : card.back;
    const backText = startSide === 'front' ? card.back : card.front;
    
    ui.flashcardFrontText.innerHTML = frontText;
    ui.flashcardBackText.innerHTML = backText;
    
    ui.flashcardContainer.classList.remove('is-flipped');
    ui.flashcardAssessmentContainer.classList.add('hidden');
    ui.flashcardFlipHint.classList.remove('hidden');

    const lang = settings.getSettings().language;
    ui.flashcardProgressText.textContent = settings.translations[lang].flashcard_progress_text
        .replace('{{current}}', state.getCurrentFlashcardIndex() + 1)
        .replace('{{total}}', state.getCurrentFlashcards().length);

    if (state.getBookmarkedFlashcards().has(card.originalIndex)) {
        ui.flashcardBookmarkBtn.innerHTML = state.bookmarkedIconSVG;
        ui.flashcardBookmarkBtn.setAttribute('aria-label', settings.translations[lang].saved_flashcard_aria);
    } else {
        ui.flashcardBookmarkBtn.innerHTML = state.bookmarkIconSVG;
        ui.flashcardBookmarkBtn.setAttribute('aria-label', settings.translations[lang].save_flashcard_aria);
    }

    ui.prevFlashcardBtn.disabled = state.getCurrentFlashcardIndex() === 0;
    ui.nextFlashcardBtn.disabled = state.getCurrentFlashcardIndex() === state.getCurrentFlashcards().length - 1;
};

export const handleNextFlashcard = (e) => {
    e.stopPropagation(); 
    if (state.getCurrentFlashcardIndex() < state.getCurrentFlashcards().length - 1) {
        settings.playNavigationSound();
        state.incrementCurrentFlashcardIndex();
        renderFlashcard();
    } else {
        showFlashcardResults();
    }
};

export const handlePrevFlashcard = (e) => {
    e.stopPropagation(); 
    if (state.getCurrentFlashcardIndex() > 0) {
        settings.playNavigationSound();
        state.decrementCurrentFlashcardIndex();
        renderFlashcard();
    }
};

export const handleFlashcardAssessment = (isKnown) => {
    const card = state.getCurrentFlashcards()[state.getCurrentFlashcardIndex()];
    const stats = state.getFlashcardSessionStats();
    if (isKnown) {
        if (!stats.known.find(c => c.originalIndex === card.originalIndex)) {
            stats.known.push(card);
        }
        stats.unknown = stats.unknown.filter(c => c.originalIndex !== card.originalIndex);
        settings.playCorrectSound();
    } else {
        if (!stats.unknown.find(c => c.originalIndex === card.originalIndex)) {
            stats.unknown.push(card);
        }
        stats.known = stats.known.filter(c => c.originalIndex !== card.originalIndex);
        settings.playIncorrectSound();
    }
    handleNextFlashcard({ stopPropagation: () => {} });
};

const showFlashcardResults = () => {
    const total = state.getCurrentFlashcards().length;
    const stats = state.getFlashcardSessionStats();
    const knownCount = stats.known.length;
    const unknownCount = stats.unknown.length;
    const lang = settings.getSettings().language;
    
    // Update statistics
    statistics.addFlashcardSessionResult({
        seen: total,
        known: knownCount,
        unknown: unknownCount
    });

    ui.flashcardResultsMessage.textContent = settings.translations[lang].flashcard_results_message
        .replace('{{known}}', knownCount)
        .replace('{{total}}', total);
    
    ui.flashcardResultsButtons.innerHTML = '';

    if (unknownCount > 0 && stats.unknown.length > 0) {
        const reviewBtn = document.createElement('button');
        reviewBtn.textContent = settings.translations[lang].flashcard_review_unknown_button.replace('{{count}}', stats.unknown.length);
        reviewBtn.className = "w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg";
        reviewBtn.onclick = () => {
            const cardsToReview = [...stats.unknown];
            startFlashcards(cardsToReview);
        };
        ui.flashcardResultsButtons.appendChild(reviewBtn);
    }

    const homeBtn = document.createElement('button');
    homeBtn.textContent = settings.translations[lang].start_new_quiz_button;
    homeBtn.className = "w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg";
    homeBtn.onclick = closeFlashcards;
    ui.flashcardResultsButtons.appendChild(homeBtn);
    
    ui.showScreen(ui.flashcardResultsScreen);
};

export const closeFlashcards = () => {
    ui.showScreen(ui.startScreen);
    state.setCurrentFlashcards([]);
    state.setCurrentFlashcardIndex(0);
};

export const flipFlashcard = () => {
    ui.flashcardContainer.classList.toggle('is-flipped');
    const isFlipped = ui.flashcardContainer.classList.contains('is-flipped');
    if (isFlipped) {
        ui.flashcardAssessmentContainer.classList.remove('hidden');
        ui.flashcardFlipHint.classList.add('hidden');
    } else {
        ui.flashcardAssessmentContainer.classList.add('hidden');
        ui.flashcardFlipHint.classList.remove('hidden');
    }
};

export const loadFlashcardBookmarks = () => {
    const stored = localStorage.getItem(state.FLASHCARDS_BOOKMARKS_STORAGE_KEY);
    if (stored) {
        try {
            state.setBookmarkedFlashcards(new Set(JSON.parse(stored)));
        } catch (e) {
            console.error('Failed to parse flashcard bookmarks from localStorage', e);
            state.setBookmarkedFlashcards(new Set());
        }
    }
};

const saveFlashcardBookmarks = () => {
    localStorage.setItem(state.FLASHCARDS_BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(state.getBookmarkedFlashcards())));
};

export const handleFlashcardBookmarkToggle = () => {
    const card = state.getCurrentFlashcards()[state.getCurrentFlashcardIndex()];
    if (!card) return;
    
    settings.playBookmarkSound();
    const lang = settings.getSettings().language;
    const { originalIndex } = card;

    if (state.getBookmarkedFlashcards().has(originalIndex)) {
        state.getBookmarkedFlashcards().delete(originalIndex);
        ui.flashcardBookmarkBtn.innerHTML = state.bookmarkIconSVG;
        ui.flashcardBookmarkBtn.setAttribute('aria-label', settings.translations[lang].save_flashcard_aria);
    } else {
        state.getBookmarkedFlashcards().add(originalIndex);
        ui.flashcardBookmarkBtn.innerHTML = state.bookmarkedIconSVG;
        ui.flashcardBookmarkBtn.setAttribute('aria-label', settings.translations[lang].saved_flashcard_aria);
    }
    saveFlashcardBookmarks();
};

export const renderBookmarkedFlashcardsSection = () => {
    ui.flashcardBookmarksList.innerHTML = '';
    ui.flashcardBookmarkQuizButtonContainer.innerHTML = '';
    const lang = settings.getSettings().language;

    if (state.getBookmarkedFlashcards().size > 0) {
        const flashcardsToRender = state.allFlashcardsWithIndex.filter(f => state.getBookmarkedFlashcards().has(f.originalIndex));

        flashcardsToRender.forEach(f => {
            const li = document.createElement('li');
            li.className = 'p-4 flex items-center justify-between hover:bg-gray-50 transition-colors';
            li.innerHTML = `<p class="text-gray-800 text-sm mr-2 flex-grow">${f.front}</p>`;
            
            const removeButton = document.createElement('button');
            removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 hover:text-red-700" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`;
            removeButton.className = 'ml-4 p-1 rounded-full hover:bg-red-100 flex-shrink-0';
            removeButton.setAttribute('aria-label', settings.translations[lang].remove_flashcard_bookmark_aria);
            removeButton.onclick = () => {
                state.getBookmarkedFlashcards().delete(f.originalIndex);
                saveFlashcardBookmarks();
                renderBookmarkedFlashcardsSection();
            };
            li.appendChild(removeButton);

            ui.flashcardBookmarksList.appendChild(li);
        });

        if (flashcardsToRender.length > 0) {
            const startBtn = document.createElement('button');
            startBtn.textContent = settings.translations[lang].start_bookmarked_flashcards_button.replace('{{count}}', flashcardsToRender.length);
            startBtn.className = 'px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md';
            startBtn.onclick = () => startFlashcards(flashcardsToRender);
            ui.flashcardBookmarkQuizButtonContainer.appendChild(startBtn);
        }
    } else {
        ui.flashcardBookmarksList.innerHTML = `<p class="text-center text-gray-500 p-6">${settings.translations[lang].no_saved_flashcards_message}</p>`;
    }
};

export const initFlashcardOptionsListeners = () => {
    ui.flashcardsCountSlider.addEventListener('input', (e) => {
        ui.flashcardsCountValue.textContent = e.target.value;
    });
    ui.startFlashcardsBtn.addEventListener('click', handleStartFlashcards);
};

export const initFlashcardGestures = () => {
    let touchStartY = 0;
    let touchStartX = 0;
    ui.flashcardContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    ui.flashcardContainer.addEventListener('touchend', (e) => {
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
        else if (ui.flashcardContainer.classList.contains('is-flipped') && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
             if (deltaX > 0) { // Swipe Right
                handleFlashcardAssessment(true);
             } else { // Swipe Left
                handleFlashcardAssessment(false);
             }
        }
    }, { passive: true });
};
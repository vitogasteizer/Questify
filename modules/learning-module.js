import { learningContent as operadorCarretillaLearning } from '../temas/tema4/learn.js';
import * as state from './state.js';
import * as ui from './ui-manager.js';
import * as settings from './settings.js';

export { operadorCarretillaLearning };

export const startLearningSession = (topic, learningData) => {
    state.setCurrentLearningTopic(topic);
    state.setCurrentLearningData(learningData);
    state.setCurrentScenarioIndex(0);

    ui.showScreen(ui.learningScreen);
    ui.summaryNextBtnContainer.classList.remove('hidden');
    ui.scenarioNextBtnContainer.classList.add('hidden');

    // Reset views
    ui.learningSummaryView.classList.remove('hidden');
    ui.learningScenarioView.classList.add('hidden');
    ui.learningCompletionView.classList.add('hidden');

    renderLearningSummary();
};

const renderLearningSummary = () => {
    ui.learningTopicTitle.textContent = state.getCurrentLearningTopic().name;
    ui.learningSummaryContent.innerHTML = '';
    
    state.getCurrentLearningData().summary.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'bg-white p-5 rounded-xl shadow-sm mb-4';
        
        const title = document.createElement('h4');
        title.className = 'text-lg font-bold text-blue-700 mb-2';
        title.textContent = section.title;
        sectionDiv.appendChild(title);
        
        const ul = document.createElement('ul');
        ul.className = 'list-disc list-inside space-y-1 text-gray-700';
        section.points.forEach(point => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${point}</span>`;
            ul.appendChild(li);
        });
        sectionDiv.appendChild(ul);
        
        ui.learningSummaryContent.appendChild(sectionDiv);
    });
};

export const showScenarioView = () => {
    ui.learningSummaryView.classList.add('hidden');
    ui.learningCompletionView.classList.add('hidden');
    ui.learningScenarioView.classList.remove('hidden');
    
    ui.learningFooter.classList.remove('hidden');
    ui.summaryNextBtnContainer.classList.add('hidden');
    ui.scenarioNextBtnContainer.classList.remove('hidden');
    renderScenario();
};

const renderScenario = () => {
    const learningData = state.getCurrentLearningData();
    const scenario = learningData.scenarios[state.getCurrentScenarioIndex()];
    const lang = settings.getSettings().language;

    ui.scenarioProgressText.textContent = settings.translations[lang].scenario_progress_text
        .replace('{{current}}', state.getCurrentScenarioIndex() + 1)
        .replace('{{total}}', learningData.scenarios.length);
    ui.scenarioTitle.textContent = scenario.title;
    ui.scenarioSituation.textContent = scenario.situation;

    ui.scenarioChoicesContainer.innerHTML = '';
    scenario.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<span class="font-bold mr-2">${String.fromCharCode(65 + index)})</span> <span class="flex-grow">${choice.text}</span>`;
        button.className = 'w-full text-left p-4 border border-gray-200 bg-white rounded-xl shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 flex items-center';
        button.dataset.correct = choice.isCorrect;
        button.onclick = () => handleScenarioChoice(button, scenario);
        ui.scenarioChoicesContainer.appendChild(button);
    });
    
    ui.scenarioFeedbackContainer.classList.add('hidden');
    ui.scenarioNextBtnContainer.innerHTML = '';
};

const handleScenarioChoice = (button, scenario) => {
    const isCorrect = button.dataset.correct === 'true';

    Array.from(ui.scenarioChoicesContainer.children).forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    button.classList.add(isCorrect ? 'correct' : 'incorrect');
    if(isCorrect) {
        settings.playCorrectSound();
    } else {
        settings.playIncorrectSound();
    }
    
    ui.scenarioFeedbackText.textContent = scenario.feedback;
    ui.scenarioFeedbackContainer.classList.remove('hidden');
    ui.scenarioFeedbackContainer.className = `mt-6 p-4 rounded-lg explanation-box ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;

    const lang = settings.getSettings().language;
    const isLastScenario = state.getCurrentScenarioIndex() === state.getCurrentLearningData().scenarios.length - 1;
    const nextButton = document.createElement('button');
    nextButton.textContent = isLastScenario ? settings.translations[lang].finish_scenarios_button : settings.translations[lang].next_scenario_button;
    nextButton.className = 'w-full sm:w-auto px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md';
    nextButton.onclick = () => {
        if (isLastScenario) {
            showLearningCompletion();
        } else {
            state.incrementCurrentScenarioIndex();
            renderScenario();
        }
    };
    ui.scenarioNextBtnContainer.appendChild(nextButton);
};

const showLearningCompletion = () => {
    ui.learningSummaryView.classList.add('hidden');
    ui.learningScenarioView.classList.add('hidden');
    ui.learningCompletionView.classList.remove('hidden');
    ui.learningFooter.classList.add('hidden');
};
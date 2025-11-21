
import { casaAbuelos } from './stories/casa-abuelos.js';
import { cocinarPadres } from './stories/cocinar-padres.js';
import { vacacionesVerano } from './stories/vacaciones-verano.js';
import { casaNueva } from './stories/casa-nueva.js';
import { granjaBeatriz } from './stories/granja-beatriz.js';
import { miFamilia } from './stories/mi-familia.js';

// Import additional stories here as you create them
// import { storyName } from './stories/story-name.js';

export const stories = [
    casaAbuelos,
    cocinarPadres,
    vacacionesVerano,
    casaNueva,
    granjaBeatriz,
    miFamilia
];

export const getAllReadingQuestions = () => {
    const allQuestions = [];
    stories.forEach(story => {
        story.questions.forEach(q => {
            allQuestions.push({
                ...q,
                readingText: story.text,
                audioUrl: story.audioUrl,
                storyTitle: story.title
            });
        });
    });
    return allQuestions;
};

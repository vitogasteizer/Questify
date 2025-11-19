
import { questions as porParaQuestions } from '../temas/tema5/test.js';
import { questions as serEstarQuestions } from '../temas/tema6/test.js';
import { questions as muyMuchoQuestions } from '../temas/tema7/test.js';
import { questions as queQuienQuestions } from '../temas/tema8/test.js';
import { questions as interrogativosQuestions } from '../temas/tema9/test.js';
import { questions as hayAhiAyQuestions } from '../temas/tema10/test.js';
import { questions as comparativosQuestions } from '../temas/tema11/test.js';
import { questions as cuantificadoresQuestions } from '../temas/tema12/test.js';
import { questions as demostrativosQuestions } from '../temas/tema13/test.js';
import { questions as tenerQueQuestions } from '../temas/tema14/test.js';
import { questions as generalAssessmentQuestions } from '../temas/general/spanish-assessment.js';

// Combine all questions strictly from the Spanish Language category
const allSpanishQuestions = [
    ...porParaQuestions,
    ...serEstarQuestions,
    ...muyMuchoQuestions,
    ...queQuienQuestions,
    ...interrogativosQuestions,
    ...hayAhiAyQuestions,
    ...comparativosQuestions,
    ...cuantificadoresQuestions,
    ...demostrativosQuestions,
    ...tenerQueQuestions,
    ...generalAssessmentQuestions // Include the new general assessment questions
];

// Create Assessment Pools dynamically by filtering the 'level' property
// assigned in the individual test files.
export const assessmentPools = {
    'A1': allSpanishQuestions.filter(q => q.level === 'A1'),
    'A2': allSpanishQuestions.filter(q => q.level === 'A2'),
    'B1': allSpanishQuestions.filter(q => q.level === 'B1'),
    'B2': allSpanishQuestions.filter(q => q.level === 'B2'),
    'C1': allSpanishQuestions.filter(q => q.level === 'C1'),
    'C2': allSpanishQuestions.filter(q => q.level === 'C2')
};

export const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];





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
import { stories } from '../temas/reading/reading-data.js';

// Combine all STANDARD questions strictly from the Spanish Language category
// We do NOT include reading questions here anymore to handle them separately
const allSpanishStandardQuestions = [
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
    ...generalAssessmentQuestions
];

// Create Assessment Pools for standard questions
export const assessmentPools = {
    'A1': allSpanishStandardQuestions.filter(q => q.level === 'A1'),
    'A2': allSpanishStandardQuestions.filter(q => q.level === 'A2'),
    'B1': allSpanishStandardQuestions.filter(q => q.level === 'B1'),
    'B2': allSpanishStandardQuestions.filter(q => q.level === 'B2'),
    'C1': allSpanishStandardQuestions.filter(q => q.level === 'C1'),
    'C2': allSpanishStandardQuestions.filter(q => q.level === 'C2')
};

// Create Pools for Stories
export const readingStoriesByLevel = {
    'A1': stories.filter(s => s.level === 'A1'),
    'A2': stories.filter(s => s.level === 'A2'),
    'B1': stories.filter(s => s.level === 'B1'),
    'B2': stories.filter(s => s.level === 'B2'),
    'C1': stories.filter(s => s.level === 'C1'),
    'C2': stories.filter(s => s.level === 'C2')
};

export const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
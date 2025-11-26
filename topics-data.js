
import { questions as logisticaQuestions } from './temas/tema1/test.js';
import { questions as preparacionPedidosQuestions } from './temas/tema2/test.js';
import { questions as preparacionPedidos2Questions } from './temas/tema3/test.js';
import { flashcards as preparacionPedidos2Flashcards } from './temas/tema3/flashcards.js';
import { flashcards as operadorCarretillaFlashcards } from './temas/tema4/flashcards.js';
import { questions as operadorCarretillaQuestions } from './temas/tema4/test.js';
import { questions as porParaQuestions } from './temas/tema5/test.js';
import { questions as serEstarQuestions } from './temas/tema6/test.js';
import { questions as muyMuchoQuestions } from './temas/tema7/test.js';
import { flashcards as muyMuchoFlashcards } from './temas/tema7/flashcards.js';
import { questions as queQuienQuestions } from './temas/tema8/test.js';
import { questions as interrogativosQuestions } from './temas/tema9/test.js';
import { flashcards as interrogativosFlashcards } from './temas/tema9/flashcards.js';
import { questions as hayAhiAyQuestions } from './temas/tema10/test.js';
import { questions as comparativosQuestions } from './temas/tema11/test.js';
import { questions as cuantificadoresQuestions } from './temas/tema12/test.js';
import { questions as demostrativosQuestions } from './temas/tema13/test.js';
import { questions as tenerQueQuestions } from './temas/tema14/test.js';
import { questions as verbosIrregularesQuestions } from './temas/tema15/test.js';
import { questions as posesivosQuestions } from './temas/tema16/test.js';
import { getAllReadingQuestions, stories } from './temas/reading/reading-data.js';
import { topicImageUrls } from './temas/image-links.js';

export const categories = [
    { id: 'logistica', nameKey: 'category_logistica', colorClass: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:border-blue-400', activeColorClass: 'bg-blue-600 text-white border-blue-700' },
    { id: 'espanol', nameKey: 'category_espanol', colorClass: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:border-red-400', activeColorClass: 'bg-red-600 text-white border-red-700' },
    { id: 'ingles', nameKey: 'category_all', colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200 hover:border-indigo-400', activeColorClass: 'bg-indigo-600 text-white border-indigo-700' },
    { id: 'matematicas', nameKey: 'category_matematicas', colorClass: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-400', activeColorClass: 'bg-green-600 text-white border-green-700' },
    { id: 'historia', nameKey: 'category_historia', colorClass: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 hover:border-amber-400', activeColorClass: 'bg-amber-500 text-white border-amber-600' },
    { id: 'georgian', nameKey: 'category_georgian', colorClass: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 hover:border-purple-400', activeColorClass: 'bg-purple-600 text-white border-purple-700' },
];

const individualTopics = [
    {
      id: 'logistica',
      categoryId: 'logistica',
      name: 'Test de Logística',
      description: `Preguntas sobre la gestión y operativa de almacenes. (${logisticaQuestions.length} preguntas)`,
      questions: logisticaQuestions,
      imageUrl: topicImageUrls.logistica
    },
    {
      id: 'preparacion-pedidos',
      categoryId: 'logistica',
      name: 'Preparación de Pedidos',
      description: `Preguntas sobre el proceso de picking y empaquetado. (${preparacionPedidosQuestions.length} preguntas)`,
      questions: preparacionPedidosQuestions,
      imageUrl: topicImageUrls['preparacion-pedidos']
    },
    {
      id: 'preparacion-pedidos-2',
      categoryId: 'logistica',
      name: 'Preparación de Pedidos, parte 2',
      description: `Preguntas sobre manutención, picking, inventario y prevención de riesgos. (${preparacionPedidos2Questions.length} preguntas)`,
      questions: preparacionPedidos2Questions,
      flashcards: preparacionPedidos2Flashcards,
      imageUrl: topicImageUrls['preparacion-pedidos-2']
    },
    {
      id: 'operador-carretilla',
      categoryId: 'logistica',
      name: 'Operador de Carretilla',
      description: `Preguntas y flashcards sobre la operación segura y características de las carretillas elevadoras. (${operadorCarretillaQuestions.length} preguntas, ${operadorCarretillaFlashcards.length} flashcards)`,
      questions: operadorCarretillaQuestions,
      flashcards: operadorCarretillaFlashcards,
      imageUrl: topicImageUrls['operador-carretilla'],
      hasLearning: true
    },
    {
        id: 'lectura-espanol',
        categoryId: 'espanol',
        level: 'Mix',
        name: 'Comprensión de Lectura',
        description: `Lee textos, escucha los audios y responde a las preguntas. (${stories.length} historias)`,
        questions: getAllReadingQuestions(),
        stories: stories,
        type: 'reading',
        imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'por-vs-para',
      categoryId: 'espanol',
      level: 'B1',
      name: 'Uso de "Por" y "Para"',
      description: `Aprende la diferencia entre "por" y "para" con ejercicios prácticos. (${porParaQuestions.length} preguntas)`,
      questions: porParaQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'ser-vs-estar',
      categoryId: 'espanol',
      level: 'A1',
      name: 'Uso de "Ser" y "Estar"',
      description: `Aprende cuándo usar "ser" y "estar" con ejercicios prácticos. (${serEstarQuestions.length} preguntas)`,
      questions: serEstarQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'muy-vs-mucho',
      categoryId: 'espanol',
      level: 'A2',
      name: 'Uso de "Muy" y "Mucho"',
      description: `Aprende la diferencia entre "muy" y "mucho" con ejercicios prácticos. (${muyMuchoQuestions.length} preguntas, ${muyMuchoFlashcards.length} flashcards)`,
      questions: muyMuchoQuestions,
      flashcards: muyMuchoFlashcards,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'que-vs-quien',
      categoryId: 'espanol',
      level: 'A2',
      name: 'Interrogativos "¿Qué?" y "¿Quién?"',
      description: `Practica la formulación de preguntas con "¿qué?" y "¿quién?". (${queQuienQuestions.length} preguntas)`,
      questions: queQuienQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'interrogativos-espanoles',
      categoryId: 'espanol',
      level: 'A1',
      name: 'Palabras Interrogativas',
      description: `Aprende y practica las palabras para hacer preguntas en español. (${interrogativosQuestions.length} preguntas, ${interrogativosFlashcards.length} flashcards)`,
      questions: interrogativosQuestions,
      flashcards: interrogativosFlashcards,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'hay-ahi-ay',
      categoryId: 'espanol',
      level: 'A1',
      name: 'Uso de "Hay", "Ahí" y "Ay"',
      description: `Domina la diferencia entre estas tres palabras homófonas. (${hayAhiAyQuestions.length} preguntas)`,
      questions: hayAhiAyQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'comparativos',
      categoryId: 'espanol',
      level: 'A2',
      name: 'Comparativos',
      description: `Practica las estructuras comparativas como "más que" y "tan como". (${comparativosQuestions.length} preguntas)`,
      questions: comparativosQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'cuantificadores',
      categoryId: 'espanol',
      level: 'B1',
      name: 'Cuantificadores',
      description: `Aprende a usar cuantificadores como "mucho", "poco", "demasiado" y "nada". (${cuantificadoresQuestions.length} preguntas)`,
      questions: cuantificadoresQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'demostrativos',
      categoryId: 'espanol',
      level: 'A1',
      name: 'Demostrativos',
      description: `Ejercicios para usar correctamente "este", "ese", "aquel" y sus variantes. (${demostrativosQuestions.length} preguntas)`,
      questions: demostrativosQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'tener-que',
      categoryId: 'espanol',
      level: 'A2',
      name: 'Tener que + Infinitivo',
      description: `Practica la expresión de obligación con la estructura "tener que". (${tenerQueQuestions.length} preguntas)`,
      questions: tenerQueQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'verbos-irregulares',
      categoryId: 'espanol',
      level: 'A2',
      name: 'Verbos Irregulares',
      description: `Domina los verbos irregulares, cambios de raíz y formas especiales en presente y futuro. (${verbosIrregularesQuestions.length} preguntas)`,
      questions: verbosIrregularesQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    },
    {
      id: 'posesivos',
      categoryId: 'espanol',
      level: 'A1',
      name: 'Los Posesivos',
      description: `Aprende a usar los adjetivos y pronombres posesivos (mi, tu, su, mío, tuyo...). (${posesivosQuestions.length} preguntas)`,
      questions: posesivosQuestions,
      imageUrl: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png'
    }
];

const finalTopics = [];

const categoryImageMap = {
    logistica: topicImageUrls.logistica,
    espanol: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png',
    ingles: 'https://i.postimg.cc/k4x134dZ/logistics-concept.png' // Placeholder
};

categories.forEach(category => {
    const topicsForCategory = individualTopics.filter(t => t.categoryId === category.id);

    if (topicsForCategory.length > 0) {
        const combinedQuestions = topicsForCategory.flatMap(topic => topic.questions || []);

        if (combinedQuestions.length > 0) {
            const categoryName = category.nameKey.replace('category_', '');
            const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
            
            const combinedTopic = {
                id: `${category.id}-combinado`,
                categoryId: category.id,
                level: (category.id === 'espanol' || category.id === 'ingles') ? 'Mix' : undefined,
                name: `Test Combinado de ${capitalizedCategoryName}`,
                description: `Preguntas aleatorias de todos los temas de ${capitalizedCategoryName}. (${combinedQuestions.length} preguntas)`,
                questions: combinedQuestions,
                imageUrl: categoryImageMap[category.id] || topicsForCategory[0].imageUrl,
                isCombined: true
            };
            finalTopics.push(combinedTopic);
        }
    }
    
    finalTopics.push(...topicsForCategory);
});

export const allTopics = finalTopics;

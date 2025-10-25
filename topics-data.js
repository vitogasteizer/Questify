

import { questions as logisticaQuestions } from './temas/tema1/test.js';
import { questions as preparacionPedidosQuestions } from './temas/tema2/test.js';
import { questions as preparacionPedidos2Questions } from './temas/tema3/test.js';
import { flashcards as preparacionPedidos2Flashcards } from './temas/tema3/flashcards.js';
import { flashcards as operadorCarretillaFlashcards } from './temas/tema4/flashcards.js';
import { questions as operadorCarretillaQuestions } from './temas/tema4/test.js';
import { topicImageUrls } from './temas/image-links.js';

export const categories = [
    { id: 'logistica', nameKey: 'category_logistica', colorClass: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:border-blue-400', activeColorClass: 'bg-blue-600 text-white border-blue-700' },
    { id: 'espanol', nameKey: 'category_espanol', colorClass: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:border-red-400', activeColorClass: 'bg-red-600 text-white border-red-700' },
    { id: 'matematicas', nameKey: 'category_matematicas', colorClass: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-400', activeColorClass: 'bg-green-600 text-white border-green-700' },
    { id: 'historia', nameKey: 'category_historia', colorClass: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 hover:border-amber-400', activeColorClass: 'bg-amber-500 text-white border-amber-600' },
    { id: 'georgian', nameKey: 'category_georgian', colorClass: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 hover:border-purple-400', activeColorClass: 'bg-purple-600 text-white border-purple-700' },
];

export const allTopics = [
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
    }
];
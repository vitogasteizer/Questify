
export const stories = [
    {
        id: 'casa-abuelos',
        title: 'La casa de mis abuelos',
        level: 'A1',
        audioUrl: 'https://od.lk/s/OTFfMjk4MDY4NjVf/la-casa-de-mis-abuelos.mp3', // Placeholder audio
        text: `Mi casa es muy pequeña, pero la de mis abuelos es enorme, parece una mansión. Su casa está situada en lo alto de una montaña. Tiene seis habitaciones, tres baños y un comedor muy grande. También tiene una gran sala con un sofá, una televisión de grandes dimensiones y una chimenea, perfecta para disfrutar los días más fríos del año.

Cada dormitorio tiene grandes ventanales con vistas a la montaña. La cocina tiene una despensa donde almacenar toda la comida. Además, mis abuelos tienen una biblioteca de gran tamaño, llena de libros y mesas para estudiar y leer.

En el exterior de la casa hay un precioso jardín lleno de árboles y flores de todos los colores.`,
        questions: [
            {
                type: 'multiple-choice',
                questionText: "¿Cómo es mi casa?",
                options: ["Grande", "Pequeña", "Mediana", "No tengo casa, tengo un chalet"],
                correctAnswerIndex: 1,
                explanation: "El texto dice: 'Mi casa es muy pequeña'.",
                level: 'A1'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Dónde está la casa de mis abuelos?",
                options: ["En la ciudad", "Frente al mar", "En la montaña", "En una ladera"],
                correctAnswerIndex: 2,
                explanation: "El texto dice: 'Su casa está situada en lo alto de una montaña'.",
                level: 'A1'
            },
            {
                type: 'multiple-choice',
                questionText: "¿En qué estancia está la chimenea?",
                options: ["En la cocina", "En la sala", "En el jardín", "No tienen"],
                correctAnswerIndex: 1,
                explanation: "El texto dice: 'También tiene una gran sala con... una chimenea'.",
                level: 'A1'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Qué tienen los dormitorios?",
                options: ["Ventanas muy grandes", "Chimeneas", "Sofás", "Televisión"],
                correctAnswerIndex: 0,
                explanation: "El texto dice: 'Cada dormitorio tiene grandes ventanales'.",
                level: 'A1'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Para qué usan la despensa?",
                options: ["Para almacenar libros y mesas", "Para almacenar flores", "Para almacenar herramientas de jardín", "Para almacenar comida"],
                correctAnswerIndex: 3,
                explanation: "El texto dice: 'La cocina tiene una despensa donde almacenar toda la comida'.",
                level: 'A1'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Cómo son las flores?",
                options: ["De muchos colores", "De muchas especies diferentes", "Rojas y azules", "No hay flores de colores"],
                correctAnswerIndex: 0,
                explanation: "El texto dice: '...flores de todos los colores'.",
                level: 'A1'
            }
        ]
    }
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

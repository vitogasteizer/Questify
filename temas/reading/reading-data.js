
export const stories = [
    {
        id: 'casa-abuelos',
        title: 'La casa de mis abuelos',
        level: 'A1',
        audioUrl: 'https://cdn.jsdelivr.net/gh/vitogasteizer/Drive@main/Questify/audio/es-la-casa-de-mis-abuelos-77.mp3', 
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
    },
    {
        id: 'cocinar-padres',
        title: 'Ayudando a cocinar con mis padres',
        level: 'A2',
        audioUrl: 'https://cdn.jsdelivr.net/gh/vitogasteizer/Drive@main/Questify/audio/es-ayudando-a-cocinar-con-mis-padres-77.mp3',
        text: `En mi casa, me gusta ayudar en la cocina, sobre todo los fines de semana. Mis padres me enseñan cómo preparar platos sencillos, como ensaladas, bocadillos o arroz. Me gusta escoger los ingredientes frescos y aprender a cortarlos con cuidado. Cocinar juntos es divertido y todos colaboramos. Mientras preparamos la comida, hablamos y escuchamos música en la cocina.

Después de cocinar, ponemos la mesa y todos comemos juntos. Me siento orgulloso cuando mis padres dicen que la comida está rica. Ayudar en la cocina me enseña nuevas recetas y a trabajar en equipo. Además, creo que es importante saber cocinar para el futuro. Disfruto mucho estos momentos en familia y cada vez aprendo algo nuevo en la cocina.`,
        questions: [
            {
                type: 'multiple-choice',
                questionText: "¿En qué momento de la semana la persona ayuda más en la cocina?",
                options: [
                    "Solamente los días festivos",
                    "Principalmente los lunes por la mañana",
                    "Casi siempre antes de dormir",
                    "Sobre todo los fines de semana"
                ],
                correctAnswerIndex: 3,
                explanation: "El texto dice: '...sobre todo los fines de semana'.",
                level: 'A2'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Qué tipo de platos aprende a preparar la persona?",
                options: [
                    "Platos sencillos como ensaladas, bocadillos o arroz",
                    "Platos tradicionales de otros países",
                    "Carnes a la brasa todos los días",
                    "Postres complicados como tartas elaboradas"
                ],
                correctAnswerIndex: 0,
                explanation: "El texto menciona: 'preparar platos sencillos, como ensaladas, bocadillos o arroz'.",
                level: 'A2'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Qué actividad hacen mientras preparan la comida?",
                options: [
                    "Hablan y escuchan música en la cocina",
                    "Juegan a juegos de mesa en el comedor",
                    "Salen a pasear al perro",
                    "Ven películas en el salón"
                ],
                correctAnswerIndex: 0,
                explanation: "El texto dice: 'hablamos y escuchamos música en la cocina'.",
                level: 'A2'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Cómo se siente la persona cuando sus padres elogian la comida?",
                options: [
                    "Se siente orgulloso",
                    "Se enfada y deja de cocinar",
                    "Se pone triste y no dice nada",
                    "Se avergüenza y no contesta"
                ],
                correctAnswerIndex: 0,
                explanation: "El texto dice: 'Me siento orgulloso cuando mis padres dicen que la comida está rica'.",
                level: 'A2'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Qué aprende la persona ayudando en la cocina?",
                options: [
                    "Nuevas recetas y a trabajar en equipo",
                    "Cómo limpiar toda la casa rápidamente",
                    "A hacer deporte mientras cocina",
                    "A organizar fiestas todos los fines de semana"
                ],
                correctAnswerIndex: 0,
                explanation: "El texto dice: 'Ayudar en la cocina me enseña nuevas recetas y a trabajar en equipo'.",
                level: 'A2'
            },
            {
                type: 'multiple-choice',
                questionText: "¿Por qué la persona cree que es importante saber cocinar?",
                options: [
                    "Para impresionar a los vecinos",
                    "Porque es útil para el futuro",
                    "Para no pasar tiempo con la familia",
                    "Porque quiere ir a restaurantes todos los días"
                ],
                correctAnswerIndex: 1,
                explanation: "El texto dice: 'creo que es importante saber cocinar para el futuro'.",
                level: 'A2'
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

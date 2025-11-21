
export const granjaBeatriz = {
    id: 'granja-beatriz',
    title: 'La granja de Beatriz',
    level: 'B1',
    audioUrl: 'https://cdn.jsdelivr.net/gh/vitogasteizer/Drive@main/Questify/audio/es-la-granja-de-beatriz-77.mp3',
    text: `¿Te gustan los animales? Los animales domésticos se llaman mascotas y a mí personalmente me encantan. Mi amiga Beatriz es granjera y tiene un gato llamado Cascabel, a este le encanta cazar ratones y ver volar a los pájaros, sobre todo, a los gorriones. También tiene gallinas que le dan muchos huevos y vacas que le dan mucha leche.

En un pequeño establo tiene dos cabras y cuatro ovejas, y a Cascabel le encanta jugar con ellas. Sus patos te vienen a saludar cada vez que atraviesas la verja, al igual que los pavos y las gallinas. Y por la noche, en la granja, se pueden observar murciélagos y escuchar todo tipo de insectos.

<small>Fuente: lingua.com</small>`,
    questions: [
        {
            type: 'multiple-choice',
            questionText: "¿Dónde vive Beatriz?",
            options: [
                "Casa",
                "Granja",
                "Piso",
                "Estudio"
            ],
            correctAnswerIndex: 1,
            explanation: "El texto dice: 'Mi amiga Beatriz es granjera'.",
            level: 'B1'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Qué le gusta hacer a Cascabel?",
            options: [
                "Correr detrás de las gallinas",
                "Observar a los murciélagos",
                "Jugar con las cabras y ovejas",
                "Observar a los patos"
            ],
            correctAnswerIndex: 2,
            explanation: "El texto dice: 'a Cascabel le encanta jugar con ellas [dos cabras y cuatro ovejas]'.",
            level: 'B1'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Qué dan las vacas?",
            options: [
                "Leche",
                "Agua",
                "Pan",
                "Aceite"
            ],
            correctAnswerIndex: 0,
            explanation: "El texto dice: 'vacas que le dan mucha leche'.",
            level: 'B1'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Cuántos huevos ponen las gallinas?",
            options: [
                "Pocos",
                "Bastantes",
                "Muchos",
                "Ninguno"
            ],
            correctAnswerIndex: 2,
            explanation: "El texto dice: 'gallinas que le dan muchos huevos'.",
            level: 'B1'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Quiénes te vienen a saludar al cruzar la verja?",
            options: [
                "Patos, pavos y jabalís",
                "Pavos, ovejas y Cascabel",
                "Pavos, cabras y murciélagos",
                "Patos, pavos y gallinas"
            ],
            correctAnswerIndex: 3,
            explanation: "El texto dice: 'Sus patos te vienen a saludar... al igual que los pavos y las gallinas'.",
            level: 'B1'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Qué sonidos se escuchan por la noche?",
            options: [
                "El de los insectos",
                "El de las cabras",
                "El de Cascabel ronroneando",
                "El de las gallinas"
            ],
            correctAnswerIndex: 0,
            explanation: "El texto dice: 'se pueden... escuchar todo tipo de insectos'.",
            level: 'B1'
        }
    ]
};

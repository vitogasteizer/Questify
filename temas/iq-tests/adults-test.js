export const questions = [
    {
        type: 'multiple-choice',
        questionText: "¿Qué número sigue en la serie: 2, 4, 8, 16, ...?",
        options: ["24", "32", "64"],
        correctAnswerIndex: 1,
        explanation: "Cada número se obtiene multiplicando el anterior por 2.",
        level: 'B2'
    },
    {
        type: 'multiple-choice',
        questionText: "Un coche recorre 180 km en 3 horas. ¿Cuál es su velocidad media?",
        options: ["60 km/h", "90 km/h", "50 km/h"],
        correctAnswerIndex: 0,
        explanation: "Velocidad = Distancia / Tiempo. 180 km / 3 horas = 60 km/h.",
        level: 'B1'
    },
    {
        type: 'multiple-choice',
        questionText: "Si todos los Zips son Zaps y algunos Zaps son Zops, ¿qué afirmación es necesariamente cierta?",
        options: ["Todos los Zips son Zops", "Algunos Zips son Zops", "Ninguna conclusión es segura"],
        correctAnswerIndex: 2,
        explanation: "No hay una conexión directa garantizada entre Zips y Zops. Es posible que ningún Zip sea un Zop.",
        level: 'C1'
    },
    {
        type: 'multiple-choice',
        questionText: "ENCENDER es a APAGAR como ABRIR es a...",
        options: ["CERRAR", "ENTRAR", "SALIR"],
        correctAnswerIndex: 0,
        explanation: "La relación es de antónimos (opuestos). Lo opuesto a ABRIR es CERRAR.",
        level: 'A2'
    },
    {
        type: 'multiple-choice',
        questionText: "María es mayor que Juan. Juan es mayor que Pedro. ¿Quién es el menor de los tres?",
        options: ["María", "Juan", "Pedro"],
        correctAnswerIndex: 2,
        explanation: "La relación es María > Juan > Pedro. Por lo tanto, Pedro es el menor.",
        level: 'A2'
    },
    {
        type: 'multiple-choice',
        questionText: "Elija la palabra que mejor complete la analogía: LIBRO es a BIBLIOTECA como ÁRBOL es a...",
        options: ["HOJA", "BOSQUE", "FRUTA"],
        correctAnswerIndex: 1,
        explanation: "Un libro es parte de una biblioteca, así como un árbol es parte de un bosque.",
        level: 'B1'
    }
];

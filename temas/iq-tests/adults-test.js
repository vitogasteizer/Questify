export const questions = [
    {
        id: 'iq-a-1',
        type: 'multiple-choice',
        questionText: "¿Qué número sigue en la serie: 2, 4, 8, 16, ...?",
        options: ["24", "32", "64"],
        correctAnswerIndex: 1,
        explanation: "Cada número se obtiene multiplicando el anterior por 2."
    },
    {
        id: 'iq-a-2',
        type: 'multiple-choice',
        questionText: "Un coche recorre 180 km en 3 horas. ¿Cuál es su velocidad media?",
        options: ["60 km/h", "90 km/h", "50 km/h"],
        correctAnswerIndex: 0,
        explanation: "Velocidad = Distancia / Tiempo. 180 km / 3 horas = 60 km/h."
    },
    {
        id: 'iq-a-3',
        type: 'multiple-choice',
        questionText: "Si todos los Zips son Zaps y algunos Zaps son Zops, ¿qué afirmación es necesariamente cierta?",
        options: ["Todos los Zips son Zops", "Algunos Zips son Zops", "Ninguna conclusión es segura"],
        correctAnswerIndex: 2,
        explanation: "No hay una conexión directa garantizada entre Zips y Zops. Es posible que ningún Zip sea un Zop."
    },
    {
        id: 'iq-a-4',
        type: 'multiple-choice',
        questionText: "ENCENDER es a APAGAR como ABRIR es a...",
        options: ["CERRAR", "ENTRAR", "SALIR"],
        correctAnswerIndex: 0,
        explanation: "La relación es de antónimos (opuestos). Lo opuesto a ABRIR es CERRAR."
    },
    {
        id: 'iq-a-5',
        type: 'multiple-choice',
        questionText: "María es mayor que Juan. Juan es mayor que Pedro. ¿Quién es el menor de los tres?",
        options: ["María", "Juan", "Pedro"],
        correctAnswerIndex: 2,
        explanation: "La relación es María > Juan > Pedro. Por lo tanto, Pedro es el menor."
    },
    {
        id: 'iq-a-6',
        type: 'multiple-choice',
        questionText: "Elija la palabra que mejor complete la analogía: LIBRO es a BIBLIOTECA como ÁRBOL es a...",
        options: ["HOJA", "BOSQUE", "FRUTA"],
        correctAnswerIndex: 1,
        explanation: "Un libro es parte de una biblioteca, así como un árbol es parte de un bosque."
    },
    {
        id: 'iq-a-7',
        type: 'image-choice',
        difficulty: 'medium',
        points: 2,
        questionText: "რომელი არ ეკუთვნის ჯგუფს?",
        options: [
            "https://i.postimg.cc/RhWbJ648/clock.png",     // Clock
            "https://i.postimg.cc/QdG7dFp3/hourglass.png", // Hourglass
            "https://i.postimg.cc/kXZc3bNf/calendar.png",  // Calendar
            "https://i.postimg.cc/c1N2b49J/thermometer.png" // Thermometer
        ],
        correctAnswerIndex: 3,
        explanation: "თერმომეტრი ზომავს ტემპერატურას, დანარჩენი სამი კი დროს."
    },
    {
        id: 'iq-a-8',
        type: 'image-choice',
        difficulty: 'hard',
        points: 3,
        questionText: "რომელი ფიგურა აკლია?",
        questionImageUrl: "https://i.postimg.cc/KYbVfQdD/pattern-iq.png",
        options: [
            "https://i.postimg.cc/QdK6Yj59/blue-circle.png",    // Blue circle
            "https://i.postimg.cc/HxbV8X5y/blue-diamond.png",   // Blue diamond
            "https://i.postimg.cc/Zq7T8j4r/red-triangle.png"    // Red triangle
        ],
        correctAnswerIndex: 0,
        explanation: "თითოეულ რიგსა და სვეტში უნდა იყოს თითოეული ფიგურა (წრე, რომბი, სამკუთხედი) მხოლოდ ერთხელ. ბოლო რიგს აკლია წრე."
    },
    {
        id: 'iq-a-9',
        type: 'image-choice',
        difficulty: 'hard',
        points: 3,
        questionText: "რომელი 3D ფორმის აწყობა შეიძლება ამ შლილისგან?",
        questionImageUrl: "https://i.postimg.cc/x8x0VpS3/cube-net.png",
        options: [
            "https://i.postimg.cc/NfK7q0D4/cube-folded.png",    // Correct cube
            "https://i.postimg.cc/hGv5s6Yt/pyramid.png",     // Pyramid
            "https://i.postimg.cc/kX4B7vQz/sphere.png"       // Sphere
        ],
        correctAnswerIndex: 0,
        explanation: "მოცემული შლილი არის კუბის შლილი."
    }
];
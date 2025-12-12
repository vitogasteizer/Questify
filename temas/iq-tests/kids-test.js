export const questions = [
    {
        id: 'iq-k-1',
        type: 'multiple-choice',
        questionText: "¿Qué animal no pertenece al grupo?",
        options: ["Perro", "Gato", "Pez", "Pájaro"],
        correctAnswerIndex: 2,
        explanation: "El pez vive en el agua, mientras que los otros viven en la tierra o vuelan."
    },
    {
        id: 'iq-k-2',
        type: 'multiple-choice',
        questionText: "¿Qué sigue en la serie? Círculo, Cuadrado, Círculo, Cuadrado, ...",
        options: ["Triángulo", "Círculo", "Rectángulo"],
        correctAnswerIndex: 1,
        explanation: "La serie alterna entre un círculo y un cuadrado."
    },
    {
        id: 'iq-k-3',
        type: 'multiple-choice',
        questionText: "Si tienes 3 manzanas y te dan 2 más, ¿cuántas manzanas tienes en total?",
        options: ["4", "5", "6"],
        correctAnswerIndex: 1,
        explanation: "3 más 2 es igual a 5."
    },
    {
        id: 'iq-k-4',
        type: 'multiple-choice',
        questionText: "¿Cuál de estos objetos es más pesado?",
        options: ["Una pluma", "Una hoja de papel", "Una piedra"],
        correctAnswerIndex: 2,
        explanation: "Una piedra es generalmente mucho más pesada que una pluma o una hoja de papel."
    },
    {
        id: 'iq-k-5',
        type: 'multiple-choice',
        questionText: "¿Qué objeto se usa para cortar papel?",
        options: ["Un lápiz", "Unas tijeras", "Un libro"],
        correctAnswerIndex: 1,
        explanation: "Las tijeras están diseñadas para cortar."
    },
    {
        id: 'iq-k-6',
        type: 'image-choice',
        difficulty: 'easy',
        points: 1,
        questionText: "რომელი არ არის ხილი?",
        options: [
            "https://i.postimg.cc/tJ7zXZG3/apple.png", // Apple
            "https://i.postimg.cc/5030s93G/banana.png", // Banana
            "https://i.postimg.cc/k4y5p2F8/carrot.png", // Carrot
            "https://i.postimg.cc/W3h42y9G/grapes.png"  // Grapes
        ],
        correctAnswerIndex: 2,
        explanation: "სტაფილო ბოსტნეულია, დანარჩენი კი ხილია."
    },
    {
        id: 'iq-k-7',
        type: 'image-choice',
        difficulty: 'hard',
        points: 3,
        questionText: "რომელი ზედმეტი?",
        questionImageUrl: "https://i.postimg.cc/V5QvjKLL/k'itkhva1.png",
        options: [
 "https://i.postimg.cc/bdcrQmY7/banani.png",    // ბანანი
 "https://i.postimg.cc/Z0tnrwKJ/burti.png",    // ბურთი
 "https://i.postimg.cc/t7QJhBCX/fortoxali.png",    // ფორთოხალი
 "https://i.postimg.cc/XXSqws7j/sazam-Tro.png",    // საზამთრო
        ],
        correctAnswerIndex: 1,
        explanation: "რათქმაუნდა ბურთი არის ზედმეტი, სხვაყველა დანარჩენი არის ხილი და თან საჭმელი, ბურთი კი არა.",
    },
    {
        id: 'iq-k-8',
        type: 'image-choice',
        difficulty: 'easy',
        points: 1,
        questionText: "რომელი არ ეკუთვნის ჯგუფს?",
        options: [
            "https://i.postimg.cc/qR8bF98Y/soccer-ball.png", // Soccer ball
            "https://i.postimg.cc/TPg4pXwN/basketball.png", // Basketball
            "https://i.postimg.cc/x8P8pGvD/book.png",         // Book
            "https://i.postimg.cc/5yL5q1zC/american-football.png" // Football
        ],
        correctAnswerIndex: 2,
        explanation: "წიგნი სასწავლო ნივთია, დანარჩენი კი სპორტული ბურთებია."
    },
    {
        id: 'iq-k-9',
        type: 'image-choice',
        difficulty: 'medium',
        points: 2,
        questionText: "რომელი ჩრდილი ეკუთვნის ცხოველს?",
        questionImageUrl: "https://i.postimg.cc/vB23rY3h/elephant.png",
        options: [
            "https://i.postimg.cc/ZqDBx6pP/elephant-shadow.png", // Elephant shadow
            "https://i.postimg.cc/PqBYvQzT/giraffe-shadow.png", // Giraffe shadow
            "https://i.postimg.cc/L83TRbJt/lion-shadow.png"      // Lion shadow
        ],
        correctAnswerIndex: 0,
        explanation: "სწორი ჩრდილი პირველია, რომელიც სპილოს ფორმას იმეორებს."
    }
];
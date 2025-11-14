export const questions = [
    {
        questionText: "¿______ es tu nombre? (რა არის შენი სახელი?)",
        options: ["Quién", "Qué", "Cuál"],
        correctAnswerIndex: 1,
        explanation: "გამოიყენება იდენტობის/ობიექტის გასარკვევად."
    },
    {
        questionText: "¿______ es tu profesora favorita? (ვინ არის შენი საყვარელი მასწავლებელი?)",
        options: ["Quién", "Qué", "Cuál"],
        correctAnswerIndex: 0,
        explanation: "გამოიყენება პიროვნების გასარკვევად."
    },
    {
        questionText: "Tengo dos coches. ¿______ prefieres? (ორი მანქანა მაქვს. რომელი გირჩევნია?)",
        options: ["Qué", "Quién", "Cuál"],
        correctAnswerIndex: 2,
        explanation: "გამოიყენება არჩევანის გასაკეთებლად შეზღუდულ ვარიანტებს შორის."
    },
    {
        questionText: "¿______ vives? (სად ცხოვრობ?)",
        options: ["Cuándo", "Dónde", "Cómo"],
        correctAnswerIndex: 1,
        explanation: "გამოიყენება ადგილმდებარეობის საკითხავად."
    },
    {
        questionText: "¿______ es la reunión? (როდის არის შეხვედრა?)",
        options: ["Cuándo", "Cómo", "Cuánto"],
        correctAnswerIndex: 0,
        explanation: "გამოიყენება დროის საკითხავად."
    },
    {
        questionText: "¿______ estás tan feliz hoy? (რატომ ხარ დღეს ასეთი ბედნიერი?)",
        options: ["Dónde", "Por qué", "Cómo"],
        correctAnswerIndex: 1,
        explanation: "გამოიყენება მიზეზის საკითხავად. '¿Por qué?' ეკითხება მიზეზს."
    },
    {
        questionText: "¿______ hermanos tienes? (რამდენი და-ძმა გაქვს?)",
        options: ["Cuántos", "Cuánto", "Cuántas"],
        correctAnswerIndex: 0,
        explanation: "გამოიყენება რაოდენობის საკითხავად. 'Cuántos' ეთანხმება მამრობითი სქესის, მრავლობით რიცხვში არსებულ სახელს (hermanos)."
    },
    { type: 'fill-in-the-blank', questionText: "¿______ hora es?", correctAnswer: ["Qué", "Que"], explanation: "'¿Qué hora es?' es la forma estándar de preguntar la hora." },
    { type: 'fill-in-the-blank', questionText: "¿______ te gusta hacer los fines de semana?", correctAnswer: ["Qué", "Que"], explanation: "Se pregunta por actividades en general." },
    { type: 'fill-in-the-blank', questionText: "¿______ es tu número de teléfono?", correctAnswer: "Cuál", explanation: "Se usa 'cuál' para pedir una información específica dentro de un conjunto (números de teléfono)." },
    { type: 'fill-in-the-blank', questionText: "¿______ cuestan las manzanas?", correctAnswer: "Cuánto", explanation: "Se pregunta por una cantidad (dinero)." },
    { type: 'fill-in-the-blank', questionText: "¿______ vas al médico?", correctAnswer: "Cuándo", explanation: "Se pregunta por el tiempo." },
    { type: 'fill-in-the-blank', questionText: "¿______ años tienes?", correctAnswer: "Cuántos", explanation: "Se pregunta por una cantidad (años)." },
    { type: 'fill-in-the-blank', questionText: "¿______ prefieres, café o té?", correctAnswer: ["Qué", "Que"], explanation: "Se pregunta por una preferencia general." },
    { type: 'fill-in-the-blank', questionText: "¿______ vives tú?", correctAnswer: "Dónde", explanation: "Se pregunta por un lugar." },
    { type: 'fill-in-the-blank', questionText: "¿______ libros hay en la estantería?", correctAnswer: "Cuántos", explanation: "Se pregunta por una cantidad (libros)." },
    { type: 'fill-in-the-blank', questionText: "¿______ son tus zapatos, los negros o los marrones?", correctAnswer: "Cuáles", explanation: "Se pregunta para elegir entre opciones específicas." },
    { type: 'fill-in-the-blank', questionText: "¿______ estás tan cansado hoy?", correctAnswer: ["Por qué", "Porque"], explanation: "Se pregunta por la razón o causa." },
    { type: 'fill-in-the-blank', questionText: "¿______ es tu cantante favorito?", correctAnswer: "Quién", explanation: "Se pregunta por una persona." },
    {
        questionText: "Elige la palabra correcta: ¿______ es tu color favorito?",
        options: ["Cuál", "Cuánto", "Qué"],
        correctAnswerIndex: 0,
        explanation: "Se usa 'Cuál' para preguntar por una elección dentro de un grupo (colores)."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ libros de estos te gusta más?",
        options: ["Cuáles", "Qué", "Cuántos"],
        correctAnswerIndex: 0,
        explanation: "Se usa 'Cuáles' para elegir entre varios elementos específicos (estos libros)."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ años tienes?",
        options: ["Cuándo", "Cuántos", "Qué"],
        correctAnswerIndex: 1,
        explanation: "'Cuántos' se usa para preguntar por la cantidad de años."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ hora es?",
        options: ["Dónde", "Cuál", "Qué"],
        correctAnswerIndex: 2,
        explanation: "La expresión fija para preguntar la hora es '¿Qué hora es?'."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ cuesta el abrigo?",
        options: ["Cuál", "Cuánto", "Qué"],
        correctAnswerIndex: 1,
        explanation: "'Cuánto' se usa para preguntar por el precio."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ personas hay en la clase?",
        options: ["Cuántas", "Cuánto", "Qué"],
        correctAnswerIndex: 0,
        explanation: "'Cuántas' concuerda en género y número con 'personas' (femenino, plural)."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ te llamas tú?",
        options: ["Qué", "Cómo", "Cuál"],
        correctAnswerIndex: 1,
        explanation: "La expresión fija para preguntar el nombre es '¿Cómo te llamas?'."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ es el día de tu cumpleaños?",
        options: ["Cómo", "Cuándo", "Qué"],
        correctAnswerIndex: 1,
        explanation: "'Cuándo' se usa para preguntar por una fecha."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ prefieres, el azul o el rojo?",
        options: ["Cuál", "Qué", "Quién"],
        correctAnswerIndex: 0,
        explanation: "'Cuál' se usa para elegir entre opciones específicas."
    },
    {
        questionText: "Elige la palabra correcta: ¿______ no viniste ayer?",
        options: ["Por qué", "Qué", "Para qué"],
        correctAnswerIndex: 0,
        explanation: "'Por qué' se usa para preguntar por la razón o causa."
    }
];
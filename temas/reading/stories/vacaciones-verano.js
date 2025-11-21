
export const vacacionesVerano = {
    id: 'vacaciones-verano',
    title: 'Las vacaciones de verano',
    level: 'A2', // Level inferred from content complexity
    audioUrl: 'https://cdn.jsdelivr.net/gh/vitogasteizer/Drive@main/Questify/audio/es-las-vacaciones-de-verano-77.mp3',
    text: `Mi nombre es Sofía y vivo en el centro de la ciudad con mis padres Julia y Manuel.

Mi época favorita del año es el verano, porque mi familia y yo nos vamos de vacaciones. Todos los años viajamos a un lugar diferente porque queremos conocer la mayor cantidad de destinos posibles. El año pasado fuimos de vacaciones a un lindo pueblo que se encontraba cerca del mar. Este año disfrutaremos el verano en un hotel que tiene piscina, parque infantil y acceso a una playa privada. Toda la familia está muy feliz y ya tienen las maletas preparadas. A todos nos encanta el mar, la arena y tomar el sol para broncearnos.

Nuestra familia se reúne pocas veces al año, por eso disfrutamos al máximo cada encuentro. Este año vendrán mis tíos maternos Paola y Carlos, ellos no tienen hijos y me quieren mucho, siempre me traen obsequios cuando viajamos juntos. Mis tíos paternos son Luis y María, tienen cuatro hijos pequeños. Mis abuelos Juan y Ana también viajan todos los años con nosotros, ellos son muy divertidos. A mi abuelo le gusta preparar cócteles y aperitivos. Mis padres dicen que viajar en familia es una de las mejores experiencias que se tienen en la vida.

<small>Fuente: lingua.com</small>`,
    questions: [
        {
            type: 'multiple-choice',
            questionText: "¿Cómo se llaman los padres de Sofía?",
            options: [
                "Paola y Carlos",
                "Juan y Ana",
                "Julia y Manuel",
                "Luis y Maria"
            ],
            correctAnswerIndex: 2,
            explanation: "El texto dice: '...con mis padres Julia y Manuel'.",
            level: 'A2'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Cuál es la época del año favorita de Sofía?",
            options: [
                "Otoño",
                "Verano",
                "Invierno",
                "Primavera"
            ],
            correctAnswerIndex: 1,
            explanation: "El texto dice: 'Mi época favorita del año es el verano'.",
            level: 'A2'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Con quién viaja Sofía en las vacaciones?",
            options: [
                "Con sus amigos",
                "Con sus tíos",
                "Con sus padres",
                "Con toda su familia"
            ],
            correctAnswerIndex: 3,
            explanation: "El texto menciona a padres, tíos y abuelos, indicando que viaja con toda la familia.",
            level: 'A2'
        },
        {
            type: 'multiple-choice',
            questionText: "¿A dónde viajaron el año pasado Sofía y su familia?",
            options: [
                "A un pueblo",
                "A la ciudad",
                "A un hotel",
                "A la casa de sus abuelos"
            ],
            correctAnswerIndex: 0,
            explanation: "El texto dice: 'El año pasado fuimos de vacaciones a un lindo pueblo'.",
            level: 'A2'
        },
        {
            type: 'multiple-choice',
            questionText: "¿A qué lugar viajarán Sofía y su familia este verano?",
            options: [
                "A una montaña",
                "A un hotel en la playa",
                "Al campo",
                "A la ciudad"
            ],
            correctAnswerIndex: 1,
            explanation: "El texto dice: '...en un hotel que tiene... acceso a una playa privada'.",
            level: 'A2'
        },
        {
            type: 'multiple-choice',
            questionText: "¿Qué le gusta preparar al abuelo de Sofía?",
            options: [
                "Hamburguesas",
                "Pasteles",
                "Cócteles",
                "Asados"
            ],
            correctAnswerIndex: 2,
            explanation: "El texto dice: 'A mi abuelo le gusta preparar cócteles y aperitivos'.",
            level: 'A2'
        }
    ]
};

export const questions = [
    // 1. Presente (E->IE) - Level A1/A2
    {
        id: 't15-1',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): Nosotros _______ (pensar) que el curso es muy útil.",
        options: ["piensan", "pensamos", "piensamos", "piensas"],
        correctAnswerIndex: 1,
        explanation: "El verbo 'pensar' es irregular (e>ie), pero la forma 'nosotros' es regular: pensamos.",
        level: 'A1'
    },
    {
        id: 't15-2',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): ¿Tú _______ (querer) venir con nosotros al cine?",
        options: ["queres", "quieres", "queréis", "queremos"],
        correctAnswerIndex: 1,
        explanation: "Querer es irregular (e>ie): Tú quieres.",
        level: 'A1'
    },
    {
        id: 't15-3',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): Ellos _______ (preferir) estudiar por la mañana.",
        options: ["preferen", "prefieren", "prefirieron", "preferís"],
        correctAnswerIndex: 1,
        explanation: "Preferir es irregular (e>ie): Ellos prefieren.",
        level: 'A2'
    },
    {
        id: 't15-4',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): Yo _______ (entender) bien este ejercicio.",
        options: ["entendo", "entiendo", "entendí", "entiendes"],
        correctAnswerIndex: 1,
        explanation: "Entender es irregular (e>ie): Yo entiendo.",
        level: 'A1'
    },
    {
        id: 't15-5',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): Mi madre _______ (cerrar) siempre las ventanas.",
        options: ["cerra", "cierra", "cierran", "cerráis"],
        correctAnswerIndex: 1,
        explanation: "Cerrar es irregular (e>ie): Ella cierra.",
        level: 'A1'
    },
    {
        id: 't15-6',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): ¿Vosotros _______ (empezar) a trabajar hoy?",
        options: ["empiezas", "empezáis", "empiezáis", "empiezan"],
        correctAnswerIndex: 1,
        explanation: "Empezar es irregular, pero 'vosotros' es regular: empezáis.",
        level: 'A2'
    },
    {
        id: 't15-7',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): El niño no _______ (entender) la pregunta.",
        options: ["entiende", "entende", "entienden", "entendemos"],
        correctAnswerIndex: 0,
        explanation: "Entender es irregular (e>ie): Él entiende.",
        level: 'A1'
    },
    {
        id: 't15-8',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): Carla y yo _______ (preferir) comer en casa.",
        options: ["prefieren", "preferimos", "prieferimos", "prefiero"],
        correctAnswerIndex: 1,
        explanation: "Preferir (nosotros/as) es regular: preferimos.",
        level: 'A2'
    },
    {
        id: 't15-9',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): ¿Quién _______ (pensar) eso?",
        options: ["pienso", "piensan", "piensa", "pensamos"],
        correctAnswerIndex: 2,
        explanation: "Quién (tercera persona singular) + pensar (e>ie) = piensa.",
        level: 'A2'
    },
    {
        id: 't15-10',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→IE): Tú siempre _______ (querer) ayudar a todos.",
        options: ["queres", "quieres", "queréis", "quiere"],
        correctAnswerIndex: 1,
        explanation: "Querer (tú) es irregular: quieres.",
        level: 'A1'
    },

    // 2. Presente (O->UE) - Level A1/A2
    {
        id: 't15-11',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): Yo no _______ (poder) ir mañana a la reunión.",
        options: ["podo", "puedo", "podemos", "puedes"],
        correctAnswerIndex: 1,
        explanation: "Poder es irregular (o>ue): Yo puedo.",
        level: 'A1'
    },
    {
        id: 't15-12',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): Ellos _______ (dormir) ocho horas todos los días.",
        options: ["dormen", "duermen", "duermimos", "dormís"],
        correctAnswerIndex: 1,
        explanation: "Dormir es irregular (o>ue): Ellos duermen.",
        level: 'A1'
    },
    {
        id: 't15-13',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): ¿Tú _______ (volver) pronto del trabajo?",
        options: ["volves", "vuelves", "vuelve", "volvemos"],
        correctAnswerIndex: 1,
        explanation: "Volver es irregular (o>ue): Tú vuelves.",
        level: 'A2'
    },
    {
        id: 't15-14',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): Mi padre _______ (recordar) siempre nuestros cumpleaños.",
        options: ["recorda", "recuerda", "recuerdan", "recordamos"],
        correctAnswerIndex: 1,
        explanation: "Recordar es irregular (o>ue): Él recuerda.",
        level: 'A2'
    },
    {
        id: 't15-15',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): Nosotros _______ (encontrar) la solución del problema.",
        options: ["encuentramos", "encontramos", "encuentran", "encontráis"],
        correctAnswerIndex: 1,
        explanation: "Encontrar es irregular, pero 'nosotros' es regular: encontramos.",
        level: 'A2'
    },
    {
        id: 't15-16',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): ¿Quién _______ (contar) la historia?",
        options: ["cuenta", "conta", "cuentan", "contamos"],
        correctAnswerIndex: 0,
        explanation: "Contar es irregular (o>ue): Él/Ella cuenta.",
        level: 'A2'
    },
    {
        id: 't15-17',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): El restaurante _______ (volver) a abrir este mes.",
        options: ["volve", "vuelve", "vuelven", "volvemos"],
        correctAnswerIndex: 1,
        explanation: "Volver es irregular (o>ue): Él vuelve.",
        level: 'A2'
    },
    {
        id: 't15-18',
        type: 'multiple-choice',
        questionText: "Completa la frase (O→UE): Mis amigos _______ (poder) cocinar muy bien.",
        options: ["poden", "pueden", "podemos", "puede"],
        correctAnswerIndex: 1,
        explanation: "Poder es irregular (o>ue): Ellos pueden.",
        level: 'A1'
    },

    // 3. Presente (E->I) - Level A2
    {
        id: 't15-19',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): Yo _______ (pedir) café todas las mañanas.",
        options: ["pedo", "pido", "pedimos", "pides"],
        correctAnswerIndex: 1,
        explanation: "Pedir es irregular (e>i): Yo pido.",
        level: 'A2'
    },
    {
        id: 't15-20',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): ¿Tú _______ (servir) la comida hoy?",
        options: ["serves", "sirves", "servís", "sirve"],
        correctAnswerIndex: 1,
        explanation: "Servir es irregular (e>i): Tú sirves.",
        level: 'A2'
    },
    {
        id: 't15-21',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): Ellos _______ (competir) en el campeonato.",
        options: ["competen", "compiten", "competimos", "compite"],
        correctAnswerIndex: 1,
        explanation: "Competir es irregular (e>i): Ellos compiten.",
        level: 'A2'
    },
    {
        id: 't15-22',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): Nosotros _______ (repetir) el ejercicio muchas veces.",
        options: ["ripetimos", "repetimos", "repiten", "repites"],
        correctAnswerIndex: 1,
        explanation: "Repetir (nosotros) es regular: repetimos.",
        level: 'A2'
    },
    {
        id: 't15-23',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): Mi hijo _______ (seguir) las instrucciones.",
        options: ["segue", "sigue", "seguimos", "siguen"],
        correctAnswerIndex: 1,
        explanation: "Seguir es irregular (e>i): Él sigue.",
        level: 'A2'
    },
    {
        id: 't15-24',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): ¿Quién _______ (pedir) la cuenta?",
        options: ["pide", "pede", "piden", "pedimos"],
        correctAnswerIndex: 0,
        explanation: "Pedir es irregular (e>i): Él/Ella pide.",
        level: 'A2'
    },
    {
        id: 't15-25',
        type: 'multiple-choice',
        questionText: "Completa la frase (E→I): Usted _______ (servir) el plato especial.",
        options: ["serve", "sirve", "servimos", "sirven"],
        correctAnswerIndex: 1,
        explanation: "Servir es irregular (e>i): Usted sirve.",
        level: 'A2'
    },

    // 4. Verbos con YO irregular - Level A2
    {
        id: 't15-26',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (hacer) deporte todos los días.",
        options: ["Haco", "Hago", "Hace", "Hacemos"],
        correctAnswerIndex: 1,
        explanation: "Hacer tiene la primera persona irregular: Yo hago.",
        level: 'A2'
    },
    {
        id: 't15-27',
        type: 'multiple-choice',
        questionText: "Completa la frase: ¿Tú _______ (salir) con tus amigos hoy?",
        options: ["salgo", "sales", "sale", "salimos"],
        correctAnswerIndex: 1,
        explanation: "Salir es irregular en 'Yo' (salgo), pero regular en 'Tú': sales.",
        level: 'A2'
    },
    {
        id: 't15-28',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (poner) la mesa antes de cenar.",
        options: ["Pono", "Pongo", "Pone", "Pones"],
        correctAnswerIndex: 1,
        explanation: "Poner tiene la primera persona irregular: Yo pongo.",
        level: 'A2'
    },
    {
        id: 't15-29',
        type: 'multiple-choice',
        questionText: "Completa la frase: Ella _______ (traer) los documentos.",
        options: ["traigo", "trae", "traes", "traemos"],
        correctAnswerIndex: 1,
        explanation: "Traer es irregular en 'Yo' (traigo), pero regular en 'Ella': trae.",
        level: 'A2'
    },
    {
        id: 't15-30',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (conducir) muy despacio.",
        options: ["Conduco", "Conduzco", "Conduce", "Conducimos"],
        correctAnswerIndex: 1,
        explanation: "Conducir tiene la primera persona irregular: Yo conduzco.",
        level: 'A2'
    },
    {
        id: 't15-31',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: No _______ (conocer) a esa persona.",
        options: ["conoco", "conozco", "conoce", "conocemos"],
        correctAnswerIndex: 1,
        explanation: "Conocer tiene la primera persona irregular: Yo conozco.",
        level: 'A2'
    },
    {
        id: 't15-32',
        type: 'multiple-choice',
        questionText: "Completa la frase: Él _______ (saber) la respuesta.",
        options: ["sé", "sabe", "sabes", "sabemos"],
        correctAnswerIndex: 1,
        explanation: "Saber es irregular en 'Yo' (sé), pero regular en 'Él': sabe.",
        level: 'A2'
    },
    {
        id: 't15-33',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (ver) las noticias por la noche.",
        options: ["Vio", "Veo", "Ves", "Vemos"],
        correctAnswerIndex: 1,
        explanation: "Ver tiene la primera persona irregular: Yo veo.",
        level: 'A2'
    },

    // 5. Cambios ortográficos - Level B1
    {
        id: 't15-34',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (dirigir) un equipo de cinco personas.",
        options: ["Dirigo", "Dirijo", "Dirige", "Dirigimos"],
        correctAnswerIndex: 1,
        explanation: "Cambio ortográfico g > j ante a/o: Yo dirijo.",
        level: 'B1'
    },
    {
        id: 't15-35',
        type: 'multiple-choice',
        questionText: "Completa la frase: Ellos _______ (construir) una casa nueva.",
        options: ["construen", "construyen", "construye", "construimos"],
        correctAnswerIndex: 1,
        explanation: "Verbo terminado en -uir añade 'y': Ellos construyen.",
        level: 'B1'
    },
    {
        id: 't15-36',
        type: 'multiple-choice',
        questionText: "Completa la frase: ¿Tú _______ (huir) de los problemas?",
        options: ["huies", "huyes", "huye", "huimos"],
        correctAnswerIndex: 1,
        explanation: "Huir añade 'y': Tú huyes.",
        level: 'B1'
    },
    {
        id: 't15-37',
        type: 'multiple-choice',
        questionText: "Completa la frase: Nosotros _______ (seguir) el plan.",
        options: ["siguemos", "seguimos", "siguen", "sigo"],
        correctAnswerIndex: 1,
        explanation: "Seguir es irregular (e>i), pero 'nosotros' es regular: seguimos.",
        level: 'B1'
    },
    {
        id: 't15-38',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (escoger) siempre frutas frescas.",
        options: ["Escogo", "Escojo", "Escoge", "Escogemos"],
        correctAnswerIndex: 1,
        explanation: "Cambio ortográfico g > j ante a/o: Yo escojo.",
        level: 'B1'
    },

    // 6. Verbos totalmente irregulares - Level A1
    {
        id: 't15-39',
        type: 'multiple-choice',
        questionText: "Completa con la forma YO: _______ (estar) muy cansado hoy.",
        options: ["Esto", "Estoy", "Estás", "Está"],
        correctAnswerIndex: 1,
        explanation: "Estar es irregular: Yo estoy.",
        level: 'A1'
    },
    {
        id: 't15-40',
        type: 'multiple-choice',
        questionText: "Completa la frase: Nosotros _______ (ser) estudiantes de español.",
        options: ["semos", "somos", "son", "sois"],
        correctAnswerIndex: 1,
        explanation: "Ser es irregular: Nosotros somos.",
        level: 'A1'
    },
    {
        id: 't15-41',
        type: 'multiple-choice',
        questionText: "Completa la frase: Él _______ (ir) al supermercado ahora.",
        options: ["vo", "va", "vas", "vamos"],
        correctAnswerIndex: 1,
        explanation: "Ir es irregular: Él va.",
        level: 'A1'
    },
    {
        id: 't15-42',
        type: 'multiple-choice',
        questionText: "Completa la frase: Aquí _______ (haber) mucha gente.",
        options: ["haye", "hay", "ha", "han"],
        correctAnswerIndex: 1,
        explanation: "Forma impersonal de Haber: Hay.",
        level: 'A1'
    },

    // 7. Futuro irregular - Level B1
    {
        id: 't15-43',
        type: 'multiple-choice',
        questionText: "Futuro: Yo _______ (tener) una entrevista mañana.",
        options: ["teneré", "tendré", "tengo", "tuve"],
        correctAnswerIndex: 1,
        explanation: "Futuro irregular de Tener: Tendré.",
        level: 'B1'
    },
    {
        id: 't15-44',
        type: 'multiple-choice',
        questionText: "Futuro: Tú _______ (venir) a mi casa más tarde.",
        options: ["venirás", "vendrás", "vienes", "veniste"],
        correctAnswerIndex: 1,
        explanation: "Futuro irregular de Venir: Vendrás.",
        level: 'B1'
    },
    {
        id: 't15-45',
        type: 'multiple-choice',
        questionText: "Futuro: Nosotros _______ (poner) la música.",
        options: ["poneremos", "pondremos", "ponemos", "pusimos"],
        correctAnswerIndex: 1,
        explanation: "Futuro irregular de Poner: Pondremos.",
        level: 'B1'
    },
    {
        id: 't15-46',
        type: 'multiple-choice',
        questionText: "Futuro: Ellos _______ (hacer) un viaje por España.",
        options: ["hacerán", "harán", "hacen", "hicieron"],
        correctAnswerIndex: 1,
        explanation: "Futuro irregular de Hacer: Harán.",
        level: 'B1'
    },
    {
        id: 't15-47',
        type: 'multiple-choice',
        questionText: "Futuro: ¿Qué _______ (decir) tú en la reunión?",
        options: ["decirás", "dirás", "dices", "dijiste"],
        correctAnswerIndex: 1,
        explanation: "Futuro irregular de Decir: Dirás.",
        level: 'B1'
    }
];
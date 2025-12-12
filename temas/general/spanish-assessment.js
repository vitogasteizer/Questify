export const questions = [
    // A1 Level Questions
    {
        id: 'assess-1',
        type: 'multiple-choice',
        questionText: "¿Cómo se llama la letra «V»?",
        options: ["be", "uve", "u"],
        correctAnswerIndex: 1,
        explanation: "ესპანურად ასო V არის 'uve'.",
        level: 'A1'
    },
    {
        id: 'assess-2',
        type: 'multiple-choice',
        questionText: "¿Qué número es: «96»?",
        options: ["sesenta y nueve", "nueventa y seis", "noventa y seis"],
        correctAnswerIndex: 2,
        explanation: "96 არის noventa y seis.",
        level: 'A1'
    },
    {
        id: 'assess-3',
        type: 'multiple-choice',
        questionText: "Mi amiga Ana tiene los ojos…",
        options: ["negro.", "azulos.", "verdes."],
        correctAnswerIndex: 2,
        explanation: "Ojos არის მამრობითი და მრავლობითი, ამიტომ გვჭირდება verdes (negro - მხოლობითი, azulos - არასწორი ფორმა).",
        level: 'A1'
    },
    {
        id: 'assess-4',
        type: 'multiple-choice',
        questionText: "Selecciona la opción correcta. ANA.— ¿Qué hora es?",
        options: ["LUIS.— Son las diez menos veinte. [9:40]", "LUIS.— Son las nueve menos veinte. [9:40]", "LUIS.— Es la diez menos veinte. [9:40]"],
        correctAnswerIndex: 0,
        explanation: "საათის თქმისას მრავლობითისთვის ვიყენებთ 'Son las'.",
        level: 'A1'
    },
    {
        id: 'assess-5',
        type: 'multiple-choice',
        questionText: "Selecciona la opción correcta. ANA.— ¿ .......... vas a la fiesta? LUIS.— Voy a las diez.",
        options: ["Por qué", "Cómo", "Cuándo"],
        correctAnswerIndex: 2,
        explanation: "პასუხი არის დრო (10 საათზე), ამიტომ კითხვაა 'Cuándo' (როდის).",
        level: 'A1'
    },
    {
        id: 'assess-6',
        type: 'multiple-choice',
        questionText: "¿Dónde ......................... encontrar una farmacia en este pueblo?",
        options: ["tengo", "debo", "puedo"],
        correctAnswerIndex: 2,
        explanation: "შესაძლებლობის გამოსახატავად ვიყენებთ poder-ს (puedo encontrar - შემიძლია ვიპოვო).",
        level: 'A1'
    },
    // Reading Comprehension A1/A2
    {
        id: 'assess-7',
        type: 'multiple-choice',
        readingText: "Un día en la vida de Lena\n\nLena tiene veintidós años, es alemana y muy guapa. Es de Hamburgo y vive en una casa muy grande con sus amigas. Lena estudia Económicas en la Universidad de Hamburgo. ¡Es muy inteligente! Por la mañana, Lena se despierta a las siete, ¡tan temprano! Se ducha, se viste, se lava los dientes y desayuna: hoy leche con cereales y una manzana. ¡Lena es muy sana!",
        questionText: "Lena desayuna y después se viste.",
        options: ["Verdadero", "Falso"],
        correctAnswerIndex: 1,
        explanation: "ტექსტში წერია: 'Se ducha, se viste... y desayuna'. ანუ ჯერ იცვამს და მერე საუზმობს.",
        level: 'A1'
    },
    {
        id: 'assess-8',
        type: 'multiple-choice',
        readingText: "En una boutique del barrio de Salamanca\n\nDEPENDIENTA.— Buenas tardes. ¿Qué desea?\nCARRIE.— Hola, me gustan esos zapatos de ahí. Son muy bonitos.\nDEPENDIENTA.— ¿Cuáles? ¿Esos de ahí que están en la estantería?\nCARRIE.— Sí, sí, esos. ¿Cuánto cuestan?\nDEPENDIENTA.— Cuestan 350 euros.\nCARRIE.— Son muy caros, pero son muy bonitos y elegantes. Me encantan.\nDEPENDIENTA.— Sí, son de Manolo Blahnik.",
        questionText: "Los zapatos que le gustan a Carrie son...",
        options: ["bonitos y baratos.", "elegantes y caros.", "bonitos y económicos."],
        correctAnswerIndex: 1,
        explanation: "ტექსტში Carrie ამბობს: 'Son muy caros, pero son muy bonitos y elegantes'.",
        level: 'A2'
    },
    // A2 Level Questions
    {
        id: 'assess-9',
        type: 'multiple-choice',
        questionText: "Cuando entra, todos miran. Lleva un sombrero negro y un vestido rojo de fiesta. Hoy ......................... la presentación de su última película.",
        options: ["está", "es", "hay"],
        correctAnswerIndex: 1,
        explanation: "მოვლენის (პრეზენტაცია) დროსთან/ადგილთან დასაკავშირებლად ვიყენებთ Ser-ს.",
        level: 'A2'
    },
    {
        id: 'assess-10',
        type: 'multiple-choice',
        questionText: "Selecciona la opción correcta. ANA.— ¿De quién son esas bicicletas que hay ahí? LUIS.— Son ........... (mis hermanos y yo).",
        options: ["mías", "nuestras", "suyas"],
        correctAnswerIndex: 1,
        explanation: "ჩემი ძმები და მე = ჩვენ. ამიტომ 'nuestras'.",
        level: 'A2'
    },
    {
        id: 'assess-11',
        type: 'multiple-choice',
        questionText: "Hoy Cristina ......................... muy temprano y desayuna sola en la cocina.",
        options: ["se despierta", "se levantan", "te despiertas"],
        correctAnswerIndex: 0,
        explanation: "Cristina არის მესამე პირი (ella), ამიტომ 'se despierta'.",
        level: 'A2'
    },
    {
        id: 'assess-12',
        type: 'multiple-choice',
        questionText: "Desde ......................... monumento del Alcázar se puede ver la Catedral y la Giralda.",
        options: ["este", "esto", "aquello"],
        correctAnswerIndex: 0,
        explanation: "Monumento არის მამრობითი სქესის არსებითი სახელი, ამიტომ 'este'.",
        level: 'A2'
    },
    {
        id: 'assess-13',
        type: 'multiple-choice',
        questionText: "Muchas gracias, de momento no quiero ........................., pero si necesito tu ordenador, sé que puedo ir a tu casa.",
        options: ["algunos", "nada", "alguno"],
        correctAnswerIndex: 1,
        explanation: "უარყოფით კონტექსტში 'არაფერი' არის 'nada'.",
        level: 'A2'
    },
    {
        id: 'assess-14',
        type: 'multiple-choice',
        questionText: "Sí, esta mañana ......................... la cocina de la casa nueva que han comprado.",
        options: ["han pitado", "habemos pintado", "han pintado"],
        correctAnswerIndex: 2,
        explanation: "სწორი ფორმაა 'han pintado'. 'Habemos' არასწორია, 'pitado' ნიშნავს საყვირის მიცემას.",
        level: 'A2'
    },
    {
        id: 'assess-15',
        type: 'multiple-choice',
        questionText: "Alguien pregunta: «¿Puedo abrir la ventana?». ¿Cómo respondes formalmente que no?",
        options: ["Disculpe, pero está resuelta.", "Sí, sí, ábrela.", "Perdone, pero estoy resfriado."],
        correctAnswerIndex: 2,
        explanation: "თავაზიანი უარი მიზეზით: 'მაპატიეთ, მაგრამ გაციებული ვარ'.",
        level: 'A2'
    },
    // Reading Comprehension A2
    {
        id: 'assess-16',
        type: 'multiple-choice',
        readingText: "¡Menudo día!\n\nEsta mañana me he levantado de la cama muy contento porque hoy es mi cumpleaños. Ya tengo 18 años y ya puedo hacer el examen de conducir porque mi padre ha dicho que, de regalo de cumpleaños, ¡me compra un coche! Después he ido a clase. Todos mis amigos saben cuándo es mi cumpleaños, pero la primera persona que me ha felicitado de todos ha sido Sonia, la chica más inteligente de mi clase.",
        questionText: "¿Quién ha sido la primera persona en felicitarme?",
        options: ["Sonia.", "Mis amigos en el colegio.", "Mi padre, después de levantarme."],
        correctAnswerIndex: 0,
        explanation: "ტექსტში წერია: 'la primera persona que me ha felicitado... ha sido Sonia'.",
        level: 'A2'
    },
    // B1 Level Questions
    {
        id: 'assess-17',
        type: 'multiple-choice',
        questionText: "Es cierto que, cuando era joven, ………… de una chica de su clase y tuvo una aventura con ella, aunque rompieron al llegar a la universidad.",
        options: ["me enamoré", "se enamoró", "me relacioné"],
        correctAnswerIndex: 1,
        explanation: "საუბარია მესამე პირზე (cuando era joven... tuvo), ამიტომ 'se enamoró'.",
        level: 'B1'
    },
    {
        id: 'assess-18',
        type: 'multiple-choice',
        questionText: "ANA.— Al final, ¿qué hicisteis ayer? LUIS.— Pues finalmente ………… una vuelta por el centro histórico de la ciudad.",
        options: ["dimos", "habíamos dado", "hemos dado"],
        correctAnswerIndex: 0,
        explanation: "კითხვა დასმულია 'ayer' (გუშინ) და Pretérito Indefinido-ში (hicisteis), პასუხიც უნდა იყოს Indefinido-ში: 'dimos'.",
        level: 'B1'
    },
    {
        id: 'assess-19',
        type: 'multiple-choice',
        questionText: "Cada vez que ellos ………… tiempo libre, iban de copas a un bar de marcha que estaba cerca de la playa.",
        options: ["habían tenido", "tenían", "tuvieron"],
        correctAnswerIndex: 1,
        explanation: "წარსულში განმეორებადი მოქმედებისთვის (Cada vez que...) ვიყენებთ Pretérito Imperfecto-ს: 'tenían'.",
        level: 'B1'
    },
    {
        id: 'assess-20',
        type: 'multiple-choice',
        questionText: "Supo que ya ………… de viaje cuando vio que su maleta no estaba en el armario; seguramente ahora ya estaría en el extranjero.",
        options: ["se había marchado", "se marchó", "se marchaba"],
        correctAnswerIndex: 0,
        explanation: "წარსულში მომხდარ მოქმედებამდე მომხდარი მოქმედება (Pluscuamperfecto): 'se había marchado'.",
        level: 'B1'
    },
    {
        id: 'assess-21',
        type: 'multiple-choice',
        questionText: "LUIS.— ¿Y no sabes nada más de él? ANA.— Pues no. No tengo noticias suyas ………… hace tres meses, por lo menos.",
        options: ["desde", "sobre", "de"],
        correctAnswerIndex: 0,
        explanation: "დროის პერიოდის აღსანიშნავად 'hace'-სთან ერთად ვიყენებთ 'desde hace' (3 თვის წინანდელი დროიდან).",
        level: 'B1'
    },
    {
        id: 'assess-22',
        type: 'multiple-choice',
        questionText: "Son muchos los ecologistas que aconsejan usar la bici y no el coche. Es una cuestión medioambiental: no se puede negar que la bici contamina ………… que el coche.",
        options: ["menos", "tanto", "tan"],
        correctAnswerIndex: 0,
        explanation: "შედარება: ველოსიპედი აბინძურებს 'ნაკლებად' (menos), ვიდრე მანქანა.",
        level: 'B1'
    },
    {
        id: 'assess-23',
        type: 'multiple-choice',
        questionText: "Cuando nos dicen: «No está, ¿quiere que le diga algo?», ¿qué nos preguntan indirectamente?",
        options: ["Si queremos hablar con ella.", "Si queremos llamar otra vez.", "Si queremos dejar un mensaje."],
        correctAnswerIndex: 2,
        explanation: "შეთავაზება '¿quiere que le diga algo?' ნიშნავს შეტყობინების დატოვებას.",
        level: 'B1'
    },
    // Reading Comprehension B1
    {
        id: 'assess-24',
        type: 'multiple-choice',
        readingText: "Una aventura inesperada\n\nMi primer viaje sola fue una experiencia increíble. Al principio, estaba más nerviosa que emocionada, pero pronto me di cuenta de que todo era más fácil de lo que pensaba. El aeropuerto era más grande de lo que imaginaba, pero la gente era más amable de lo que esperaba. Cuando llegué al destino, todo parecía más hermoso que en las fotos, y me sentí más libre que nunca. Sin duda, fue mucho mejor de lo que había anticipado.",
        questionText: "¿Cómo se sintió la narradora al principio de su viaje sola?",
        options: ["Se sentía más nerviosa que emocionada.", "Estaba más relajada que nunca.", "Estaba más cansada que feliz."],
        correctAnswerIndex: 0,
        explanation: "ტექსტში პირდაპირ წერია: 'Al principio, estaba más nerviosa que emocionada'.",
        level: 'B1'
    },
    // B2 Level Questions
    {
        id: 'assess-25',
        type: 'multiple-choice',
        questionText: "He oído que ………… a tu padre de la empresa. En fin, qué le vamos a hacer. Esto ya no tiene arreglo.",
        options: ["despedirán", "decidirá", "habrán eligido"],
        correctAnswerIndex: 0,
        explanation: "მომავალი დროის ვარაუდი ან მომავალი მოქმედება: 'despedirán' (დაითხოვენ).",
        level: 'B2'
    },
    {
        id: 'assess-26',
        type: 'multiple-choice',
        questionText: "Y pensar que dentro de muy poco los coches que conocemos hoy en día ………… o serán solo objetos de museo.",
        options: ["habrá aparecido", "habrán desaparecido", "habrán estado"],
        correctAnswerIndex: 1,
        explanation: "Futuro Perfecto მოქმედების დასრულების აღსანიშნავად მომავალში: 'habrán desaparecido' (გამქრალი იქნება).",
        level: 'B2'
    },
    {
        id: 'assess-27',
        type: 'multiple-choice',
        questionText: "Si todavía no has ido, ………… hacerlo lo antes posible. Granada es una de las ciudades con más encanto en España.",
        options: ["tendrías", "deberías", "tenerías"],
        correctAnswerIndex: 1,
        explanation: "რჩევის მიცემა Condicional-ში: 'deberías' (უნდა გააკეთო/კარგი იქნება თუ გააკეთებ).",
        level: 'B2'
    },
    {
        id: 'assess-28',
        type: 'multiple-choice',
        questionText: "Hace un frío que pela en la calle. Por favor, ………… (ustedes) la puerta cuando salgan.",
        options: ["cerrad", "cierren", "cierra"],
        correctAnswerIndex: 1,
        explanation: "იმპერატივი 'Ustedes' (თქვენ, თავაზიანი მრავლობითი) ფორმაში: 'cierren'.",
        level: 'B2'
    },
    {
        id: 'assess-29',
        type: 'multiple-choice',
        questionText: "Mejor dicho, cuando ………… a Marta, decidle que me llame en cuanto pueda.",
        options: ["veáis", "veis", "veréis"],
        correctAnswerIndex: 0,
        explanation: "სუბხუნტივო (Subjuntivo) სამომავლო დროის გამომხატველ 'cuando'-სთან: 'veáis'.",
        level: 'B2'
    },
    {
        id: 'assess-30',
        type: 'multiple-choice',
        questionText: "Espero que el tren ………… ya. No me gusta tener que esperar tanto tiempo en esta estación.",
        options: ["ha llegado", "haya llegado", "está llegando"],
        correctAnswerIndex: 1,
        explanation: "'Espero que' მოითხოვს სუბხუნტივოს. დასრულებული მოქმედებისთვის: 'haya llegado' (Pretérito Perfecto de Subjuntivo).",
        level: 'B2'
    },
    {
        id: 'assess-31',
        type: 'multiple-choice',
        questionText: "¿Cómo propondrías a tu grupo de amigos quedar con Raúl, a quien ya hace mucho que no veis?",
        options: ["Bueno, al final, ¿quedamos con Raúl?", "Supongo que no querréis quedar con Raúl, ¿verdad?", "Estaría bien salir algún día con Raúl. Llevamos meses sin verlo."],
        correctAnswerIndex: 2,
        explanation: "შეთავაზების ზრდილობიანი და ბუნებრივი ფორმა.",
        level: 'B2'
    },
    // Reading Comprehension B2
    {
        id: 'assess-32',
        type: 'multiple-choice',
        readingText: "Explosión de sabor mexicano\n\nLa comida callejera en México es una de las experiencias más auténticas y deliciosas del país. Los puestos de tacos, elotes, tamales y tortas ofrecen una gran variedad de sabores y platillos tradicionales. La comida, preparada al momento y con ingredientes frescos, refleja la diversidad cultural de México. A menudo, los vendedores añaden salsas y condimentos que intensifican los sabores, convirtiendo cada bocado en una explosión de sabor único. Es una verdadera fiesta para los sentidos.",
        questionText: "¿Cuál de las siguientes opciones expresa mejor lo que se recomienda hacer si alguien quiere descubrir la cultura culinaria de México?",
        options: ["Deberías probar la comida callejera para conocer los sabores tradicionales.", "Podrías visitar supermercados grandes para probar comida mexicana.", "Tendrías que evitar los puestos de comida callejera por razones de higiene."],
        correctAnswerIndex: 0,
        explanation: "ტექსტი აქებს ქუჩის საკვებს როგორც 'ყველაზე აუთენტურს', ამიტომ რეკომენდაციაა მისი გასინჯვა.",
        level: 'B2'
    }
];
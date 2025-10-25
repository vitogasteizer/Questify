export const learningContent = {
    summary: [
        {
            title: "1. Operador y requisitos",
            points: [
                "Solo pueden conducir carretillas mayores de 18 años con formación específica.",
                "Deben estar autorizados por la empresa.",
                "Vehículo: matriculado, con seguro y carnet válido.",
                "Respetar normas de circulación dentro y fuera del almacén.",
            ]
        },
        {
            title: "2. Baterías (eléctricas y térmicas)",
            points: [
                "Cargar solo en zonas ventiladas, sin llamas.",
                "Usar EPI (gafas, guantes).",
                "No añadir agua hasta después de la carga.",
                "Comprobar nivel una vez por semana.",
                "En térmicas: repostar con el motor apagado.",
            ]
        },
        {
            title: "3. Estabilidad y carga",
            points: [
                "Mantener carga centrada y baja (15 cm).",
                "No transportar personas.",
                "Evitar giros bruscos y sobrecargas.",
                "Consultar siempre la placa de capacidad.",
            ]
        },
        {
            title: "4. Movimiento y conducción",
            points: [
                "Reducir velocidad en giros y zonas ocupadas.",
                "Usar avisador acústico.",
                "No elevar carga en desplazamiento.",
                "Mantener visibilidad.",
            ]
        },
        {
            title: "5. Seguridad general",
            points: [
                "Usar siempre EPI.",
                "Revisar entorno y suelo.",
                "No saltar al bajar.",
                "Activar freno y quitar llave al estacionar.",
            ]
        }
    ],
    scenarios: [
        {
            title: "Escenario 1 — Inicio de jornada",
            situation: "Vas a empezar el turno. ¿Qué haces primero?",
            choices: [
                { text: "Enciendes el motor.", isCorrect: false },
                { text: "Revisas frenos, ruedas y dirección.", isCorrect: true },
                { text: "Subes sin revisar nada.", isCorrect: false }
            ],
            feedback: "¡Correcto! La revisión previa de elementos clave como frenos, ruedas y dirección es obligatoria y fundamental para garantizar una operación segura. Empezar sin revisar la máquina es un grave riesgo."
        },
        {
            title: "Escenario 2 — Cargando baterías",
            situation: "Debes recargar una batería de plomo-ácido.",
            choices: [
                { text: "La cargas mientras fumas.", isCorrect: false },
                { text: "Usas guantes y ventilación adecuada.", isCorrect: true },
                { text: "Añades agua antes de cargarla.", isCorrect: false }
            ],
            feedback: "¡Correcto! Las baterías de plomo-ácido deben cargarse en zonas ventiladas y usando EPIs. El agua destilada se añade siempre *después* de la carga, no antes, para evitar derrames de ácido."
        },
        {
            title: "Escenario 3 — Estabilidad",
            situation: "Transportas una carga grande y alta.",
            choices: [
                { text: "La levantas más para ver mejor.", isCorrect: false },
                { text: "La mantienes baja y estable.", isCorrect: true },
                { text: "Giras rápido para ahorrar tiempo.", isCorrect: false }
            ],
            feedback: "¡Correcto! Mantener el centro de gravedad (CDG) bajo y realizar movimientos suaves es clave para la estabilidad. Levantar la carga o girar bruscamente aumenta peligrosamente el riesgo de vuelco."
        },
        {
            title: "Escenario 4 — Movimiento",
            situation: "Circulas por un pasillo estrecho.",
            choices: [
                { text: "Vas rápido para salir.", isCorrect: false },
                { text: "Usas claxon y avanzas despacio.", isCorrect: true },
                { text: "Llevas la carga elevada.", isCorrect: false }
            ],
            feedback: "¡Correcto! En pasillos y zonas con poca visibilidad o presencia de peatones, se debe reducir la velocidad y usar el claxon para advertir de tu presencia. La seguridad es siempre prioritaria."
        },
        {
            title: "Escenario 5 — Seguridad / estacionamiento",
            situation: "Terminas el turno.",
            choices: [
                { text: "Apagas motor, pones el freno y bajas las uñas.", isCorrect: true },
                { text: "Solo apagas el motor.", isCorrect: false },
                { text: "Dejas la llave puesta para el siguiente compañero.", isCorrect: false }
            ],
            feedback: "¡Correcto! El procedimiento completo (apagar motor, poner freno de estacionamiento, bajar las uñas al suelo y quitar la llave) es esencial para dejar la máquina de forma segura y evitar usos no autorizados."
        }
    ]
};
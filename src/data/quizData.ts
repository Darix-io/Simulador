export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C';
    text: string;
    isCorrect: boolean;
  }[];
  motivationalFeedback: string;
  teacherTip: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: "Navegador vs. Motor de búsqueda",
    question: "Para entrar a internet como en la ciudad: ¿cuál es tu 'vehículo' y cuál es tu 'mapa'?",
    options: [
      {
        letter: "A",
        text: "El navegador (Chrome) es el auto que te lleva y Google es el mapa que te guía.",
        isCorrect: true,
      },
      {
        letter: "B",
        text: "Google es el auto que manejas y Chrome es solo un mapa de papel.",
        isCorrect: false,
      },
      {
        letter: "C",
        text: "Ambos son exactamente lo mismo, solo cambia el color del ícono.",
        isCorrect: false,
      },
    ],
    motivationalFeedback: "¡Excelente! Chrome es tu vehículo para viajar por la web y Google es el mapa inteligente que te dice a dónde ir.",
    teacherTip: "Analogía del Día 2: el navegador abre puertas; el motor indexa el mundo.",
  },
  {
    id: 2,
    topic: "Dirección URL directa",
    question: "Si escribes directamente 'www.unemi.edu.ec' en la barra de arriba, ¿qué hace tu navegador?",
    options: [
      {
        letter: "A",
        text: "Te lleva directo a la página oficial de la universidad, sin rodeos.",
        isCorrect: true,
      },
      {
        letter: "B",
        text: "Se queda esperando a que busques la palabra primero en TikTok.",
        isCorrect: false,
      },
      {
        letter: "C",
        text: "Apaga el internet porque no se deben poner puntos en la barra.",
        isCorrect: false,
      },
    ],
    motivationalFeedback: "¡Muy bien! Una URL es como la dirección exacta de tu casa: si la conoces, llegas directo a la puerta sin perderte.",
    teacherTip: "Destacar que la URL evita distracciones y te lleva con precisión milimétrica al destino.",
  },
  {
    id: 3,
    topic: "Asunto del Correo Universitario",
    question: "Al redactar un correo para tu profesor, ¿cuál de estos asuntos es el adecuado?",
    options: [
      {
        letter: "A",
        text: "Consulta sobre tarea 1 - Pensamiento Computacional",
        isCorrect: true,
      },
      {
        letter: "B",
        text: "Hola profe ayuda urgente plisss",
        isCorrect: false,
      },
      {
        letter: "C",
        text: "Dejar la casilla de Asunto vacía",
        isCorrect: false,
      },
    ],
    motivationalFeedback: "¡Perfecto! Un asunto claro le dice al docente de qué trata tu mensaje antes de abrirlo y agiliza su respuesta.",
    teacherTip: "El asunto es el cartel visible en la bandeja de entrada del profesor.",
  },
  {
    id: 4,
    topic: "Datos de identificación del estudiante",
    question: "Para que tu docente sepa quién eres entre cientos de alumnos, ¿qué datos debes incluir?",
    options: [
      {
        letter: "A",
        text: "Tu nombre completo, carrera y paralelo.",
        isCorrect: true,
      },
      {
        letter: "B",
        text: "Tu apodo de redes sociales y tu foto favorita.",
        isCorrect: false,
      },
      {
        letter: "C",
        text: "Solo poner 'Saludos' sin tu nombre porque ya sale en el correo.",
        isCorrect: false,
      },
    ],
    motivationalFeedback: "¡Así se hace! Con tu nombre, carrera y paralelo el docente te ubica en segundos en el sistema institucional.",
    teacherTip: "Enseñar a los chicos que los profesores manejan hasta 300 estudiantes a la vez.",
  },
  {
    id: 5,
    topic: "Tono formal vs. WhatsApp",
    question: "¿Es correcto escribirle a un docente un correo lleno de emojis y palabras cortadas como en WhatsApp?",
    options: [
      {
        letter: "A",
        text: "Falso: El correo universitario requiere respeto, ortografía clara y tono formal.",
        isCorrect: true,
      },
      {
        letter: "B",
        text: "Verdadero: A los docentes les gusta descifrar abreviaturas y stickers.",
        isCorrect: false,
      },
      {
        letter: "C",
        text: "Verdadero: Da igual cómo se escriba, con tal de que se mande rápido.",
        isCorrect: false,
      },
    ],
    motivationalFeedback: "¡Exacto! El correo institucional es tu carta de presentación profesional; WhatsApp es para amigos, el correo es para tu futuro.",
    teacherTip: "Enfatizar el concepto: 'Tu voz profesional importa desde el primer semestre'.",
  },
];

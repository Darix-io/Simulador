import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  Printer,
  Volume2,
  VolumeX,
  Compass,
  GraduationCap,
  Mail,
  Send,
  ExternalLink,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { QUIZ_QUESTIONS } from './data/quizData';
import { sounds } from './utils/sound';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<Record<number, boolean>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'slides'>('student');
  const [isMuted, setIsMuted] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedLetter = selectedAnswers[currentQ.id];
  const submitted = isAnswerSubmitted[currentQ.id];

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.muted = next;
  };

  const handleSelectOption = (letter: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: letter }));
  };

  const handleSubmitCurrent = () => {
    if (!selectedLetter) return;
    setIsAnswerSubmitted(prev => ({ ...prev, [currentQ.id]: true }));
    
    const correctOption = currentQ.options.find(o => o.isCorrect);
    if (correctOption && selectedLetter === correctOption.letter) {
      sounds.playSuccess();
    } else {
      sounds.playGentleTryAgain();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizCompleted(true);
      triggerConfetti();
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsAnswerSubmitted({});
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Calculate score
  const totalCorrect = QUIZ_QUESTIONS.filter(q => {
    const selected = selectedAnswers[q.id];
    const correct = q.options.find(o => o.isCorrect)?.letter;
    return selected === correct;
  }).length;

  // Plain text generator for teacher copy
  const getFullQuizPlainText = () => {
    let text = `QUIZ DEL DÍA 2: NAVEGADORES, BUSCADORES, URL Y CORREO FORMAL\n`;
    text += `Pensamiento Computacional - Universidad Estatal de Milagro (UNEMI)\n\n`;

    QUIZ_QUESTIONS.forEach((q, idx) => {
      text += `Pregunta ${idx + 1} (${q.topic}):\n`;
      text += `${q.question}\n`;
      q.options.forEach(opt => {
        const checkMark = opt.isCorrect ? " [CORRECTA]" : "";
        text += `   ${opt.letter}) ${opt.text}${checkMark}\n`;
      });
      text += `Frase motivadora / Explicación: ${q.motivationalFeedback}\n\n`;
    });

    return text;
  };

  const handleCopyQuizText = () => {
    navigator.clipboard.writeText(getFullQuizPlainText());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Compass className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  UNEMI · Día 2
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">Pensamiento Computacional</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Navegantes, Cartógrafos y Comunicación Digital
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              title={isMuted ? "Activar sonido" : "Silenciar sonido"}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* View Mode Nav */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab('student')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'student'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🎮 Modo Quiz
              </button>
              <button
                onClick={() => setActiveTab('teacher')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'teacher'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📋 Texto Docente
              </button>
              <button
                onClick={() => setActiveTab('slides')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'slides'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📖 Resumen Visual
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col justify-start">
        {/* Friendly Teacher Welcome Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200 text-amber-700">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="font-bold text-slate-900 text-lg">
                ¡Hola, futuro/a universitario/a!
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                100% Sin jerga técnica
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Soy tu docente acompañante. Este quiz está diseñado para afianzar lo aprendido hoy sobre <span className="font-semibold text-slate-800">Chrome, Google, URLs y cómo escribirle a tus profesores</span> con ejemplos de tu día a día. ¡Sin trampas ni nervios!
            </p>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE STUDENT QUIZ */}
        {activeTab === 'student' && (
          <div>
            {!isQuizCompleted ? (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Progress bar */}
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-700">
                      Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      · {currentQ.topic}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {QUIZ_QUESTIONS.map((q, idx) => {
                      const isDone = isAnswerSubmitted[q.id];
                      const isCurrent = idx === currentQuestionIndex;
                      const selected = selectedAnswers[q.id];
                      const correct = q.options.find(o => o.isCorrect)?.letter;
                      const wasCorrect = isDone && selected === correct;

                      return (
                        <div
                          key={q.id}
                          className={`w-6 h-2 rounded-full transition-all ${
                            isCurrent
                              ? 'bg-amber-500 w-8'
                              : isDone
                              ? wasCorrect
                                ? 'bg-emerald-500'
                                : 'bg-rose-400'
                              : 'bg-slate-300'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Topic badge */}
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 mb-3 border border-slate-200">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Situación cotidiana #{currentQuestionIndex + 1}</span>
                  </div>

                  {/* Question (Max 2 lines, easy to read) */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight mb-6">
                    {currentQ.question}
                  </h3>

                  {/* Options List (3 options: A, B, C) */}
                  <div className="space-y-3.5">
                    {currentQ.options.map(option => {
                      const isSelected = selectedLetter === option.letter;
                      let optionClasses = "border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 text-slate-700";
                      let badgeClasses = "bg-slate-100 text-slate-700 border-slate-300";

                      if (submitted) {
                        if (option.isCorrect) {
                          optionClasses = "border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20";
                          badgeClasses = "bg-emerald-600 text-white border-emerald-600";
                        } else if (isSelected && !option.isCorrect) {
                          optionClasses = "border-rose-300 bg-rose-50/60 text-rose-950";
                          badgeClasses = "bg-rose-500 text-white border-rose-500";
                        } else {
                          optionClasses = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
                          badgeClasses = "bg-slate-200 text-slate-400 border-slate-300";
                        }
                      } else if (isSelected) {
                        optionClasses = "border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-500/20 font-medium";
                        badgeClasses = "bg-amber-500 text-slate-950 border-amber-500 font-bold";
                      }

                      return (
                        <button
                          key={option.letter}
                          type="button"
                          onClick={() => handleSelectOption(option.letter)}
                          disabled={submitted}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 group cursor-pointer ${optionClasses}`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border transition-all ${badgeClasses}`}>
                            {option.letter}
                          </span>
                          <span className="flex-1 text-sm sm:text-base pt-0.5 leading-relaxed">
                            {option.text}
                          </span>
                          {submitted && option.isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 self-center" />
                          )}
                          {submitted && isSelected && !option.isCorrect && (
                            <XCircle className="w-6 h-6 text-rose-500 shrink-0 self-center" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Motivational Feedback Section */}
                  {submitted && (
                    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-3.5 animate-fadeIn">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase font-bold tracking-wider text-amber-800 mb-1">
                          Palabras de tu profe:
                        </p>
                        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                          {currentQ.motivationalFeedback}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {submitted ? "¡Bien reflexionado!" : "Elige una opción para continuar"}
                    </span>

                    <div className="flex gap-2">
                      {!submitted ? (
                        <button
                          onClick={handleSubmitCurrent}
                          disabled={!selectedLetter}
                          className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                            selectedLetter
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer active:scale-95'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Confirmar respuesta
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                        >
                          {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                            <>
                              Siguiente pregunta
                              <ArrowRight className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              Ver mis resultados
                              <Sparkles className="w-4 h-4 text-amber-400" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Completion Screen */
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 text-center">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center shadow-inner mb-4">
                  <GraduationCap className="w-10 h-10" />
                </div>

                <span className="text-xs uppercase tracking-wider font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                  ¡Misión cumplida del Día 2!
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  {totalCorrect >= 4
                    ? "¡Felicidades! Tienes alma de Navegante Digital 🚀"
                    : "¡Gran esfuerzo! Estás listo para navegar en la U 👏"}
                </h3>

                <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base mt-2">
                  Acertaste <strong className="text-slate-900">{totalCorrect} de {QUIZ_QUESTIONS.length}</strong> preguntas. Lo importante no es solo memorizar, sino saber comunicarte con respeto y navegar seguro en tu nueva vida universitaria.
                </p>

                {/* Badges / Key takeaways */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto my-6 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="text-xl">🚗</span>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Chrome es tu auto</p>
                      <p className="text-slate-500">Google es el mapa que te ayuda a buscar.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">La URL es tu dirección exacta</p>
                      <p className="text-slate-500">Escribirla te lleva directo a la universidad.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="text-xl">✉️</span>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">El Asunto importa</p>
                      <p className="text-slate-500">Debe resumir de qué trata tu consulta en una frase.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="text-xl">🪪</span>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Identifícate siempre</p>
                      <p className="text-slate-500">Nombre completo, carrera y paralelo al final.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  <button
                    onClick={handleRestart}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Repetir Quiz
                  </button>
                  <button
                    onClick={() => setActiveTab('teacher')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Ver cuestionario completo en texto
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEACHER PRINT / COPY TEXT VIEW */}
        {activeTab === 'teacher' && (
          <div className="space-y-6">
            {/* Header with quick copy and print */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Cuestionario del Día 2 (Formato Limpio para Docente)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Listo para copiar y pegar en Moodle, Google Classroom, formularios o imprimir para el aula.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyQuizText}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-900" />
                      ¡Copiado con éxito!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar todo el Quiz
                    </>
                  )}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir
                </button>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                      Pregunta {idx + 1} · {q.topic}
                    </span>
                    <span className="text-xs text-slate-400">3 opciones (A, B, C)</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 mb-4 leading-snug">
                    {q.question}
                  </h4>

                  <div className="space-y-2 mb-4">
                    {q.options.map(opt => (
                      <div
                        key={opt.letter}
                        className={`p-3 rounded-xl border text-sm flex items-start gap-3 ${
                          opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          opt.isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {opt.letter}
                        </span>
                        <span className="flex-1 pt-0.5">{opt.text}</span>
                        {opt.isCorrect && (
                          <span className="text-xs bg-emerald-200/80 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Respuesta Correcta
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/70 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Frase motivadora para el estudiante: </strong>
                      <span>{q.motivationalFeedback}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VISUAL SLIDES & PEDAGOGICAL SUMMARY */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-amber-500" />
                Analogías del Día 2: "Navegantes y Cartógrafos"
              </h3>
              <p className="text-sm text-slate-600">
                Resumen didáctico basado en las diapositivas oficiales de la Facultad de Ciencias e Ingeniería (UNEMI) para el Proyecto de Vinculación.
              </p>
            </div>

            {/* Slide Comparison: Navegador vs Motor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-3">
                    🚗
                  </div>
                  <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">Concepto 1</span>
                  <h4 className="text-xl font-bold mt-1 mb-2">El Navegador es tu Vehículo</h4>
                  <p className="text-sm text-blue-100/90 leading-relaxed">
                    Es el programa que abres para moverte por internet (Chrome, Edge, Firefox, Safari). Sin auto, no puedes salir a la calle.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-800/80 text-xs text-blue-300">
                  Ejemplos: Google Chrome, Mozilla Firefox, Microsoft Edge.
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-200 mb-3">
                    🗺️
                  </div>
                  <span className="text-xs uppercase tracking-wider text-amber-200 font-bold">Concepto 2</span>
                  <h4 className="text-xl font-bold mt-1 mb-2">El Buscador es tu Mapa</h4>
                  <p className="text-sm text-amber-100/90 leading-relaxed">
                    Es el servicio que indexa el mundo y te dice cómo llegar a un sitio cuando no conoces la dirección (Google, Bing).
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-500/80 text-xs text-amber-200">
                  Ejemplos: Google, Bing, DuckDuckGo.
                </div>
              </div>
            </div>

            {/* Email Anatomy Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500" />
                Las 5 piezas del Correo Universitario Exitoso
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs inline-flex items-center justify-center mb-1">1</span>
                  <p className="font-bold text-xs text-slate-900">Asunto claro</p>
                  <p className="text-[11px] text-slate-500">¿De qué trata?</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs inline-flex items-center justify-center mb-1">2</span>
                  <p className="font-bold text-xs text-slate-900">Saludo formal</p>
                  <p className="text-[11px] text-slate-500">Estimado/a docente</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs inline-flex items-center justify-center mb-1">3</span>
                  <p className="font-bold text-xs text-slate-900">Cuerpo directo</p>
                  <p className="text-[11px] text-slate-500">Contexto y duda</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs inline-flex items-center justify-center mb-1">4</span>
                  <p className="font-bold text-xs text-slate-900">Cierre respetuoso</p>
                  <p className="text-[11px] text-slate-500">Agradezco su atención</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs inline-flex items-center justify-center mb-1">5</span>
                  <p className="font-bold text-xs text-slate-900">Firma completa</p>
                  <p className="text-[11px] text-slate-500">Nombre, carrera y paralelo</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>
          Proyecto de Vinculación · Facultad de Ciencias e Ingeniería · <strong className="text-slate-700">UNEMI</strong>
        </p>
        <p className="mt-0.5 text-slate-400">
          Creado para guiar a los jóvenes bachilleres en sus primeros pasos tecnológicos universitarios.
        </p>
      </footer>
    </div>
  );
}

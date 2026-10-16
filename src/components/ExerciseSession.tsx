import React, { useState, useEffect } from 'react';
import { triggerConfetti } from '../utils/confetti';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb, 
  Award, 
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { ExerciseItem, ParticipleCategory, UserStats } from '../types';
import { recordExerciseAttempt } from '../utils/storage';
import { speakRussian } from '../utils/speech';

interface ExerciseSessionProps {
  exercises: ExerciseItem[];
  selectedCategoryName: string;
  onFinishSession: () => void;
  onStatsUpdated: (stats: UserStats) => void;
  isMistakeReviewMode?: boolean;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  exercises,
  selectedCategoryName,
  onFinishSession,
  onStatsUpdated,
  isMistakeReviewMode = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [sessionResults, setSessionResults] = useState<Array<{
    exercise: ExerciseItem;
    selected: string;
    isCorrect: boolean;
  }>>([]);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [speakingText, setSpeakingText] = useState(false);

  // If no exercises available for this filter
  if (!exercises || exercises.length === 0) {
    return (
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-base font-bold text-white">Nessun esercizio da mostrare</h3>
        <p className="text-xs text-slate-300">
          {isMistakeReviewMode
            ? 'Complimenti! Non hai errori registrati da ripassare al momento.'
            : 'Non sono presenti esercizi per questo filtro.'}
        </p>
        <button
          onClick={onFinishSession}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
        >
          Torna Indietro
        </button>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];
  const isLastQuestion = currentIndex === exercises.length - 1;

  // Speak sentence
  const handleSpeak = (text: string) => {
    setSpeakingText(true);
    speakRussian(text, () => setSpeakingText(false));
  };

  // Option selection
  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;

    const isCorrect = selectedOption.trim() === currentExercise.correctAnswer.trim();
    setIsAnswerChecked(true);

    // Save progress to local storage
    const updatedStats = recordExerciseAttempt(
      currentExercise.id,
      currentExercise.category,
      isCorrect
    );
    onStatsUpdated(updatedStats);

    setSessionResults((prev) => [
      ...prev,
      { exercise: currentExercise, selected: selectedOption, isCorrect },
    ]);
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setSessionCompleted(true);
      // Fire confetti if scored reasonably well
      const correctCount = sessionResults.filter(r => r.isCorrect).length + (selectedOption === currentExercise.correctAnswer ? 1 : 0);
      if (correctCount >= Math.ceil(exercises.length / 2)) {
        triggerConfetti();
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setShowHint(false);
    }
  };

  // Render Completed Summary
  if (sessionCompleted) {
    const totalCorrect = sessionResults.filter((r) => r.isCorrect).length;
    const scorePercent = Math.round((totalCorrect / exercises.length) * 100);
    const xpGained = totalCorrect * 15;

    return (
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-xl space-y-5 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-2xl">
            {scorePercent >= 80 ? '🎉' : scorePercent >= 50 ? '👏' : '💪'}
          </div>
          <h2 className="text-xl font-black text-white">
            {scorePercent >= 80 ? 'Eccellente lavoro!' : scorePercent >= 50 ? 'Buon ripasso!' : 'Continua a esercitarti!'}
          </h2>
          <p className="text-xs text-slate-300">
            Hai completato la sessione: <span className="font-semibold text-amber-300">{selectedCategoryName}</span>
          </p>
        </div>

        {/* Score metrics */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Risposte</span>
            <span className="text-lg font-black text-emerald-400">
              {totalCorrect}/{exercises.length}
            </span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Precisione</span>
            <span className="text-lg font-black text-amber-400">
              {scorePercent}%
            </span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">XP Ottenuti</span>
            <span className="text-lg font-black text-indigo-400">
              +{xpGained}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown of this session */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Riepilogo Quesiti
          </h4>
          {sessionResults.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                item.isCorrect
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200'
                  : 'bg-rose-950/20 border-rose-800/40 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {item.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate font-sans">
                    {item.exercise.russianSentence}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Tua risposta: <span className={item.isCorrect ? 'text-emerald-300 font-bold' : 'text-rose-300 line-through'}>{item.selected}</span>
                    {!item.isCorrect && (
                      <span className="text-emerald-300 font-bold ml-1.5">✓ {item.exercise.correctAnswer}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswerChecked(false);
              setSessionResults([]);
              setSessionCompleted(false);
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Riprova Sessione</span>
          </button>
          <button
            onClick={onFinishSession}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
          >
            <span>Concludi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Format sentence preview: if an option is selected, replace [...] with selectedOption
  const formatSentenceDisplay = () => {
    const raw = currentExercise.russianSentence;
    if (!raw.includes('[...]')) return raw;

    if (selectedOption) {
      const parts = raw.split('[...]');
      return (
        <span>
          {parts[0]}
          <span className={`px-2 py-0.5 rounded font-bold underline transition-colors ${
            !isAnswerChecked 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
              : selectedOption === currentExercise.correctAnswer 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}>
            {selectedOption}
          </span>
          {parts[1]}
        </span>
      );
    }

    const parts = raw.split('[...]');
    return (
      <span>
        {parts[0]}
        <span className="inline-block px-3 py-0.5 mx-1 bg-slate-700/60 border border-dashed border-amber-400/50 rounded text-amber-300 text-xs font-mono animate-pulse">
          [...]
        </span>
        {parts[1]}
      </span>
    );
  };

  const isCurrentCorrect = selectedOption === currentExercise.correctAnswer;

  return (
    <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
      {/* Progress & Category Top Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-amber-400 font-bold">Domanda {currentIndex + 1}</span>
            <span>di {exercises.length}</span>
            {isMistakeReviewMode && (
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-1.5 py-0.2 rounded ml-1">
                Ripasso Errori
              </span>
            )}
          </div>
          <span className="text-[11px] bg-slate-700/80 text-slate-300 px-2 py-0.5 rounded-full font-medium">
            {currentExercise.difficulty.toUpperCase()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Instruction */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentExercise.title}</span>
        </h3>
        <p className="text-sm font-semibold text-white leading-snug">
          {currentExercise.instruction}
        </p>
      </div>

      {/* Main Russian Sentence Box */}
      <div className="bg-slate-900/90 border border-slate-700/70 rounded-xl p-3.5 space-y-2 relative">
        <div className="flex items-start justify-between gap-2">
          <p className="text-base md:text-lg font-bold text-white tracking-wide font-sans leading-relaxed">
            {formatSentenceDisplay()}
          </p>
          <button
            onClick={() => handleSpeak(currentExercise.russianSentence)}
            title="Ascolta pronuncia russa"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 shrink-0 transition-colors cursor-pointer"
          >
            <Volume2 className={`w-4 h-4 ${speakingText ? 'animate-pulse text-amber-300' : ''}`} />
          </button>
        </div>

        {/* Highlight target or Base verb */}
        {currentExercise.verbBase && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/40 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-medium">Verbo di base:</span>
            <strong className="text-indigo-300 font-mono">{currentExercise.verbBase}</strong>
          </div>
        )}

        {currentExercise.highlightTarget && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/40 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-medium">Elemento di accordo:</span>
            <strong className="text-amber-300 font-semibold">{currentExercise.highlightTarget}</strong>
          </div>
        )}

        {/* Italian Translation */}
        <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-800/80">
          « {currentExercise.italianTranslation} »
        </p>
      </div>

      {/* Options Grid (Zero typing requirement) */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Seleziona l'opzione corretta:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentExercise.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentExercise.correctAnswer;

            let btnStyle = 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600';

            if (!isAnswerChecked) {
              if (isSelected) {
                btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 font-bold';
              }
            } else {
              if (isCorrectOption) {
                btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500';
              } else if (isSelected && !isCurrentCorrect) {
                btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-300 line-through';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(option)}
                className={`py-3 px-3.5 rounded-xl border text-sm text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
              >
                <span className="font-semibold font-sans">{option}</span>
                {isAnswerChecked && isCorrectOption && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isAnswerChecked && isSelected && !isCurrentCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Feedback / Detailed Explanation */}
      {isAnswerChecked && (
        <div className={`p-3.5 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
          isCurrentCorrect 
            ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200' 
            : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {isCurrentCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-emerald-300">Esatto! +15 XP</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span className="text-rose-300">Non corretto</span>
              </>
            )}
          </div>

          <p className="text-slate-200 leading-relaxed">
            {currentExercise.explanation}
          </p>

          {currentExercise.grammarTip && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex items-start gap-1.5 text-[11px] text-amber-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{currentExercise.grammarTip}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Button */}
      <div className="pt-2">
        {!isAnswerChecked ? (
          <button
            disabled={!selectedOption}
            onClick={handleCheckAnswer}
            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedOption
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Verifica Risposta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>{isLastQuestion ? 'Visualizza Risultati' : 'Prossima Domanda'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

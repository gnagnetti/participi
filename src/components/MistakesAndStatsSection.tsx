import React, { useState } from 'react';
import { 
  BarChart2, 
  Flame, 
  Trophy, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  ChevronRight, 
  ArrowRight,
  Shield,
  Zap,
  BookOpen,
  Award
} from 'lucide-react';
import { UserStats, ParticipleCategory } from '../types';
import { EXERCISES } from '../data/exercisesData';
import { BADGES, resetAllStats } from '../utils/storage';
import { ExerciseSession } from './ExerciseSession';

interface MistakesAndStatsSectionProps {
  stats: UserStats;
  onStatsUpdated: (stats: UserStats) => void;
  onNavigateToExercises: (category?: ParticipleCategory) => void;
}

export const MistakesAndStatsSection: React.FC<MistakesAndStatsSectionProps> = ({
  stats,
  onStatsUpdated,
  onNavigateToExercises,
}) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [expandedMistakeId, setExpandedMistakeId] = useState<string | null>(null);

  // Filter exercises that are in mistakeIds
  const mistakeExercises = EXERCISES.filter(ex => stats.mistakeIds.includes(ex.id));

  const totalAttempted = stats.totalAttempted;
  const totalCorrect = stats.totalCorrect;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const categoryLabels: Record<ParticipleCategory, { name: string; icon: string }> = {
    active_present: { name: 'Presente Attivo (-ущ-/-ащ-)', icon: '⚡' },
    active_past: { name: 'Passato Attivo (-вш-/-ш-)', icon: '⌛' },
    passive_present: { name: 'Presente Passivo (-ем-/-им-)', icon: '🛡️' },
    passive_past: { name: 'Passato Passivo (-нн-/-т-)', icon: '📜' },
    transformations: { name: 'Clausola «Который»', icon: '🔄' },
    short_forms: { name: 'Forme Brevi Passive', icon: '✂️' },
  };

  const handleReset = () => {
    const fresh = resetAllStats();
    onStatsUpdated(fresh);
    setShowResetConfirm(false);
    setReviewMode(false);
  };

  if (reviewMode && mistakeExercises.length > 0) {
    return (
      <div className="space-y-4 pb-20">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setReviewMode(false)}
            className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Torna alle Statistiche
          </button>
          <span className="text-xs text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
            {mistakeExercises.length} errori da sanare
          </span>
        </div>

        <ExerciseSession
          exercises={mistakeExercises}
          selectedCategoryName="Ripasso Errori Personale"
          isMistakeReviewMode={true}
          onFinishSession={() => setReviewMode(false)}
          onStatsUpdated={onStatsUpdated}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Overview Stats Cards */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/80 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Progressi & Statistiche Locali
            </h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            Salvataggio Offline
          </span>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Trophy className="w-3.5 h-3.5 text-indigo-400" />
              <span>Punti XP</span>
            </div>
            <span className="text-xl font-black text-indigo-300 font-mono">
              {stats.xp}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Serie Giorni</span>
            </div>
            <span className="text-xl font-black text-amber-400 font-mono">
              {stats.streakDays}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Precisione</span>
            </div>
            <span className="text-xl font-black text-emerald-400 font-mono">
              {overallAccuracy}%
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Risolti</span>
            </div>
            <span className="text-xl font-black text-sky-400 font-mono">
              {totalCorrect}/{totalAttempted}
            </span>
          </div>
        </div>
      </div>

      {/* Mistake Bank / Registro Errori Section */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Registro Errori da Ripassare
            </h3>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            mistakeExercises.length > 0 
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {mistakeExercises.length} in sospeso
          </span>
        </div>

        {mistakeExercises.length === 0 ? (
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3.5 text-center space-y-1.5">
            <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
            <p className="text-xs font-bold text-emerald-300">
              Nessun errore in sospeso!
            </p>
            <p className="text-[11px] text-slate-300">
              Tutti i tuoi tentativi finora sono corretti o hai già superato tutti i tuoi errori precedenti.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-xs text-slate-300 leading-relaxed">
              Hai <strong className="text-rose-400">{mistakeExercises.length} domande</strong> a cui hai risposto in modo errato nelle sessioni precedenti. Esercitati in modo mirato fino a correggerle!
            </p>

            <button
              onClick={() => setReviewMode(true)}
              className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Avvia Ripasso Errori ({mistakeExercises.length} quesiti)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick list of mistakes */}
            <div className="space-y-1.5 pt-1">
              {mistakeExercises.map((ex) => {
                const isExpanded = expandedMistakeId === ex.id;
                return (
                  <div
                    key={ex.id}
                    className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl p-2.5 text-xs space-y-1.5 transition-all"
                  >
                    <div 
                      onClick={() => setExpandedMistakeId(isExpanded ? null : ex.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-slate-200 truncate font-sans">
                          {ex.russianSentence}
                        </p>
                        <p className="text-[10px] text-slate-400 italic">
                          « {ex.italianTranslation} »
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-400 shrink-0 font-bold">
                        {isExpanded ? 'Chiudi' : 'Spiegazione'}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 bg-slate-950/40 p-2 rounded-lg space-y-1">
                        <p>
                          <strong className="text-emerald-300">Risposta corretta: </strong>
                          <span className="font-bold font-sans">{ex.correctAnswer}</span>
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                          {ex.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Category Mastery Progress Bars */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Padronanza per Categoria di Participio
        </h3>

        <div className="space-y-2.5">
          {(Object.keys(categoryLabels) as ParticipleCategory[]).map((cat) => {
            const data = stats.categoryStats[cat] || { attempted: 0, correct: 0 };
            const rate = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
            const meta = categoryLabels[cat];

            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium flex items-center gap-1.5">
                    <span>{meta.icon}</span>
                    <span>{meta.name}</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {data.correct}/{data.attempted} ({rate}%)
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      rate >= 80 
                        ? 'bg-emerald-500' 
                        : rate >= 50 
                          ? 'bg-amber-500' 
                          : 'bg-indigo-500'
                    }`}
                    style={{ width: `${Math.max(rate, data.attempted > 0 ? 5 : 0)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges / Traguardi */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Traguardi & Distintivi</span>
          </h3>
          <span className="text-[11px] text-amber-400 font-semibold font-mono">
            {stats.unlockedBadges.length} / {BADGES.length} sbloccati
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BADGES.map((b) => {
            const isUnlocked = stats.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isUnlocked
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <span className="text-2xl block mb-1">{b.icon}</span>
                <span className="text-xs font-bold block truncate text-white">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-400 block line-clamp-2 mt-0.5 leading-snug">
                  {b.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Stats section */}
      <div className="pt-2 text-center">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Azzera statistiche ed errori salvati</span>
          </button>
        ) : (
          <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-3 max-w-sm mx-auto space-y-2">
            <p className="text-xs text-rose-200 font-semibold">
              Sei sicuro di voler azzerare tutti i progressi e gli errori salvati?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Sì, Azzera
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs cursor-pointer"
              >
                Annulla
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

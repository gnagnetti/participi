import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Filter, 
  ArrowRight, 
  Zap, 
  History, 
  Shield, 
  CheckCheck, 
  RefreshCw, 
  Play, 
  HelpCircle,
  Scissors
} from 'lucide-react';
import { EXERCISES } from '../data/exercisesData';
import { ParticipleCategory, ExerciseType, UserStats } from '../types';
import { ExerciseSession } from './ExerciseSession';

interface PracticeHubProps {
  initialCategory?: ParticipleCategory;
  onStatsUpdated: (stats: UserStats) => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  initialCategory,
  onStatsUpdated,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ParticipleCategory | 'all'>(initialCategory || 'all');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'facile' | 'medio' | 'avanzato'>('all');
  const [sessionLimit, setSessionLimit] = useState<number | 'all'>(10);
  const [inActiveSession, setInActiveSession] = useState(false);
  const [activeSessionList, setActiveSessionList] = useState<typeof EXERCISES>([]);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      if (selectedCategory !== 'all' && ex.category !== selectedCategory) {
        // If short_forms selected, also allow passive_past with short forms
        if (selectedCategory === 'short_forms' && ex.category !== 'short_forms' && ex.category !== 'passive_past') {
          return false;
        }
        if (selectedCategory !== 'short_forms') {
          return false;
        }
      }
      if (selectedType !== 'all' && ex.type !== selectedType) {
        return false;
      }
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedType, selectedDifficulty]);

  const categoryOptions = [
    { id: 'all' as const, label: 'Tutte le Categorie', icon: Sparkles, count: EXERCISES.length },
    { id: 'active_present' as const, label: 'Presente Attivo (-ущ-/-ащ-)', icon: Zap, count: EXERCISES.filter(e => e.category === 'active_present').length },
    { id: 'active_past' as const, label: 'Passato Attivo (-вш-/-ш-)', icon: History, count: EXERCISES.filter(e => e.category === 'active_past').length },
    { id: 'passive_present' as const, label: 'Presente Passivo (-ем-/-им-)', icon: Shield, count: EXERCISES.filter(e => e.category === 'passive_present').length },
    { id: 'passive_past' as const, label: 'Passato Passivo (-нн-/-т-)', icon: CheckCheck, count: EXERCISES.filter(e => e.category === 'passive_past').length },
    { id: 'short_forms' as const, label: 'Forme Brevi Passive', icon: Scissors, count: EXERCISES.filter(e => e.category === 'short_forms').length },
    { id: 'transformations' as const, label: 'Trasformazioni «Который»', icon: RefreshCw, count: EXERCISES.filter(e => e.category === 'transformations').length },
  ];

  const typeOptions: Array<{ id: ExerciseType | 'all'; label: string }> = [
    { id: 'all', label: 'Tutti i Tipi' },
    { id: 'formation', label: 'Formazione Participio' },
    { id: 'agreement_fill', label: 'Accordo & Fill-in-blank' },
    { id: 'transformation', label: 'Trasformazione Clausola' },
    { id: 'grammar_identification', label: 'Riconoscimento Caso/Genere' },
  ];

  const currentCategoryName = categoryOptions.find(c => c.id === selectedCategory)?.label || 'Tutti gli Esercizi';

  const handleStartSession = () => {
    let chosen = [...filteredExercises];
    if (sessionLimit !== 'all' && chosen.length > sessionLimit) {
      chosen = chosen.sort(() => 0.5 - Math.random()).slice(0, sessionLimit);
    }
    setActiveSessionList(chosen);
    setInActiveSession(true);
  };

  if (inActiveSession) {
    return (
      <div className="space-y-4 pb-20">
        <button
          onClick={() => setInActiveSession(false)}
          className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          ← Torna ai filtri di allenamento
        </button>

        <ExerciseSession
          exercises={activeSessionList.length > 0 ? activeSessionList : filteredExercises}
          selectedCategoryName={currentCategoryName}
          onFinishSession={() => setInActiveSession(false)}
          onStatsUpdated={onStatsUpdated}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Intro Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white tracking-tight">
            Allenamento Interattivo a Scelta Multipla
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Nessuna digitazione da tastiera. Scegli una categoria specifica o affronta una sessione mista. Ogni domanda include riscontro immediato, spiegazione grammaticale e ascolto audio.
        </p>
      </div>

      {/* Category Selection Cards */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>1. Seleziona Modulo / Categoria</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categoryOptions.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-amber-500/30 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold truncate">{cat.label}</span>
                </div>
                <span className="text-[11px] bg-slate-800/80 px-2 py-0.5 rounded-full font-mono text-slate-400 shrink-0">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter by Type & Difficulty */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          2. Filtra per Tipologia di Esercizio
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {typeOptions.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedType === t.id
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Difficoltà:</span>
          <div className="flex gap-1.5">
            {(['all', 'facile', 'medio', 'avanzato'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff === 'all' ? 'Tutte' : diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start Session Action Card */}
      <div className="bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-amber-300">
              {filteredExercises.length} Esercizi nel Database
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Quesiti per questa sessione:
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {([5, 10, 20, 50, 'all'] as const).map((count) => (
              <button
                key={count}
                onClick={() => setSessionLimit(count)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sessionLimit === count
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {count === 'all' ? 'Tutti' : count}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={filteredExercises.length === 0}
          onClick={handleStartSession}
          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            filteredExercises.length > 0
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 shadow-amber-500/20'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>
            Inizia Quiz ({sessionLimit === 'all' || filteredExercises.length < (typeof sessionLimit === 'number' ? sessionLimit : 0) ? filteredExercises.length : sessionLimit} Quesiti)
          </span>
        </button>
      </div>
    </div>
  );
};

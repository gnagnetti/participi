import React, { useState } from 'react';
import { RefreshCw, ArrowRight, CheckCircle2, BookOpen, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { EXERCISES } from '../data/exercisesData';
import { ExerciseSession } from './ExerciseSession';
import { UserStats } from '../types';
import { speakRussian } from '../utils/speech';

interface TransformSectionProps {
  onStatsUpdated: (stats: UserStats) => void;
}

export const TransformSection: React.FC<TransformSectionProps> = ({ onStatsUpdated }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'interactive'>('interactive');
  const [stepByStepActiveIndex, setStepByStepActiveIndex] = useState(0);

  const transformExercises = EXERCISES.filter(e => e.category === 'transformations');

  const transformationGuides = [
    {
      title: 'Attivo Presente: который читает → читающий',
      subordinate: 'Студент, который читает книгу, сидит у окна.',
      participial: 'Студент, читающий книгу, сидит у окна.',
      translation: 'Lo studente che legge il libro è seduto vicino alla finestra.',
      rulePoint: 'Il pronome "который" è sempre al NOMINATIVO (soggetto). Il verbo "читает" è imperfettivo presente → participio presente attivo "читающий".',
      caseNote: 'Se "студент" è all\'Accusativo animato: Я вижу студента, читающего книгу.'
    },
    {
      title: 'Attivo Passato: который пришёл → пришедший',
      subordinate: 'Мы встретили друга, который приехал вчера.',
      participial: 'Мы встретили друга, приехавшего вчера.',
      translation: 'Abbiamo incontrato l\'amico che è arrivato ieri.',
      rulePoint: 'Verbo passato perfettivo (приехал) → participio passato attivo (приехавший).',
      caseNote: 'Attenzione all\'accordo di caso: "друга" è all\'Accusativo animato (= Genitivo) → "приехавшего". Nella frase con "который", esso resta sempre al Nominativo!'
    },
    {
      title: 'Passivo Passato: которую написал → написанная',
      subordinate: 'Книга, которую написал Пушкин, очень известна.',
      participial: 'Книга, написанная Пушкиным, очень известна.',
      translation: 'Il libro scritto da Puškin è celeberrimo.',
      rulePoint: 'Nel passivo, il complemento oggetto (книгу) diventa il soggetto (книга). Chi compie l\'azione (Пушкин) va al caso STRUMENTALE senza preposizione (Пушкиным).',
      caseNote: 'Accordo del participio: написанная concorda con "книга" (femminile nominativo).'
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-900/60 to-slate-800 border border-indigo-700/50 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <RefreshCw className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Laboratorio Trasformazioni «Который»
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Padroneggia il passaggio tra proposizioni relative con <span className="text-indigo-300 font-semibold">«который»</span> e i costrutti participiali <span className="text-amber-300 font-semibold">(причастные обороты)</span>. Nessun inserimento da tastiera: solo ragionamento e scelta multipla.
        </p>

        {/* Mode Switcher */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-indigo-800/60">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'interactive'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Esercizi Interattivi ({transformExercises.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Regole & Schema Passo-Passo</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Exercises */}
      {activeTab === 'interactive' && (
        <ExerciseSession
          exercises={transformExercises}
          selectedCategoryName="Trasformazioni Clausola «Который»"
          onFinishSession={() => setActiveTab('rules')}
          onStatsUpdated={onStatsUpdated}
        />
      )}

      {/* Mode 2: Step-by-Step Interactive Guide */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {/* 4 Golden Steps Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>I 4 Passaggi per la Trasformazione Perfetta</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong className="text-white">Identifica tempo e aspetto del verbo:</strong>
                  <p className="text-slate-300 mt-0.5">Se il verbo è al presente imperfettivo usa il participio presente attivo; se al passato perfettivo usa il passato attivo o passivo.</p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong className="text-white">Regola d'oro di «который»:</strong>
                  <p className="text-slate-300 mt-0.5">Nella proposizione subordinata che corrisponde a un participio attivo, la parola <em>который</em> è SEMPRE al caso <span className="text-amber-300 font-semibold">Nominativo</span> (chi compie l'azione).</p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong className="text-white">Accordo con il nome principale:</strong>
                  <p className="text-slate-300 mt-0.5">Il participio concorda in <em>genere, numero e caso</em> con il sostantivo a cui si riferisce, anche se nella frase con «который» quest'ultimo era al Nominativo!</p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong className="text-white">Nel passivo: l'agente va allo Strumentale!</strong>
                  <p className="text-slate-300 mt-0.5">Es. «Книга, которую прочитал студент» → «Книга, прочитанная <em>студентом</em>» (caso Strumentale senza preposizione).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Examples Carousel / Tabs */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Confronto Guidato Esemplificativo
            </h3>

            <div className="flex gap-2">
              {transformationGuides.map((guide, idx) => (
                <button
                  key={idx}
                  onClick={() => setStepByStepActiveIndex(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    stepByStepActiveIndex === idx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Modello {idx + 1}
                </button>
              ))}
            </div>

            {/* Current guide card */}
            {(() => {
              const guide = transformationGuides[stepByStepActiveIndex];
              return (
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400">
                    {guide.title}
                  </h4>

                  <div className="space-y-2">
                    {/* Clause with kotoryj */}
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-indigo-300 font-bold uppercase">Proposizione con «Который»:</span>
                        <button
                          onClick={() => speakRussian(guide.subordinate)}
                          className="text-slate-400 hover:text-amber-300 p-1 rounded"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-slate-200 font-sans">
                        {guide.subordinate}
                      </p>
                    </div>

                    {/* Transform arrow */}
                    <div className="flex items-center justify-center gap-1 text-slate-500">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Diventa costrutto participiale:</span>
                    </div>

                    {/* Participial Construction */}
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-amber-400 font-bold uppercase">Costrutto Participiale (Причастный оборот):</span>
                        <button
                          onClick={() => speakRussian(guide.participial)}
                          className="text-slate-400 hover:text-amber-300 p-1 rounded"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-amber-200 font-sans">
                        {guide.participial}
                      </p>
                    </div>
                  </div>

                  {/* Italian Translation */}
                  <p className="text-xs text-slate-400 italic">
                    « {guide.translation} »
                  </p>

                  {/* Rules Explanations */}
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300 space-y-1">
                    <p className="leading-relaxed">
                      💡 {guide.rulePoint}
                    </p>
                    <p className="text-indigo-300 font-medium leading-relaxed">
                      ⚖️ {guide.caseNote}
                    </p>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={() => setActiveTab('interactive')}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <span>Esercitati sulle Trasformazioni Ora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

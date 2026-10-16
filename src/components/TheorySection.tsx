import React, { useState } from 'react';
import { 
  BookOpen, 
  Zap, 
  History, 
  Shield, 
  CheckCheck, 
  RefreshCw, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { THEORY_TOPICS } from '../data/theoryData';
import { ParticipleCategory, TheoryTopic } from '../types';
import { speakRussian } from '../utils/speech';

interface TheorySectionProps {
  onStartCategoryPractice: (category: ParticipleCategory) => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ onStartCategoryPractice }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('intro');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [playingRussian, setPlayingRussian] = useState<string | null>(null);

  const getTopicIcon = (category: string) => {
    switch (category) {
      case 'intro': return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'active_present': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'active_past': return <History className="w-5 h-5 text-sky-400" />;
      case 'passive_present': return <Shield className="w-5 h-5 text-purple-400" />;
      case 'passive_past': return <CheckCheck className="w-5 h-5 text-rose-400" />;
      case 'transformations': return <RefreshCw className="w-5 h-5 text-indigo-400" />;
      default: return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  const currentTopic = THEORY_TOPICS.find(t => t.id === selectedTopicId) || THEORY_TOPICS[0];

  const handleSpeak = (text: string) => {
    setPlayingRussian(text);
    speakRussian(text, () => setPlayingRussian(null));
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Intro Header Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 border border-slate-700/70 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Guida Teorica Interattiva
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          I participi russi uniscono il dinamismo del verbo con la flessione dell'aggettivo. Esplora le 4 categorie, i suffissi di derivazione, l'accordo di caso e le regole sintattiche.
        </p>
      </div>

      {/* Horizontal Topic Pill Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        {THEORY_TOPICS.map((topic) => {
          const isSelected = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all snap-start cursor-pointer border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800/70 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {getTopicIcon(topic.category)}
              <span>{topic.title.replace(/^\d+\.\s*/, '')}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Topic Card */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 md:p-5 shadow-lg space-y-4">
        {/* Topic Title & Subtitle */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                Modulo
              </span>
              <span className="text-xs text-slate-400">
                Aspetto: <strong className="text-slate-200">{currentTopic.aspectsAllowed}</strong>
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              {currentTopic.title}
            </h3>
            <p className="text-xs text-slate-300 font-medium italic mt-0.5">
              {currentTopic.subtitle}
            </p>
          </div>
          {currentTopic.category !== 'intro' && (
            <button
              onClick={() => onStartCategoryPractice(currentTopic.category as ParticipleCategory)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>Esercitati</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs leading-relaxed text-slate-200">
          {currentTopic.summary}
        </div>

        {/* Suffixes Box */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Suffissi Caratteristici
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentTopic.suffixes.map((suffix, i) => (
              <span
                key={i}
                className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
              >
                {suffix}
              </span>
            ))}
          </div>
        </div>

        {/* Formation Rule */}
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-3">
          <h4 className="text-xs font-bold text-slate-200 mb-1">
            Regola di Formazione:
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentTopic.formationRule}
          </p>
        </div>

        {/* Examples Section with Visual Breakdown and Speech */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Esempi Chiave & Scomposizione</span>
            <span className="text-[10px] text-slate-400 normal-case font-normal flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-amber-400" /> Tocca l'altoparlante per ascoltare
            </span>
          </h4>
          <div className="space-y-2.5">
            {currentTopic.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-3 space-y-2 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm text-amber-200 tracking-wide font-sans">
                      {ex.russian}
                    </p>
                    <p className="text-xs text-slate-300 italic">
                      {ex.italian}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak(ex.russian)}
                    title="Ascolta pronuncia"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 shrink-0 transition-colors cursor-pointer"
                  >
                    <Volume2 className={`w-4 h-4 ${playingRussian === ex.russian ? 'animate-pulse text-amber-300' : ''}`} />
                  </button>
                </div>

                {/* Morphological Breakdown Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-sans mr-1">Struttura:</span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200" title="Radice">
                    {ex.breakdown.stem}
                  </span>
                  <span className="text-slate-500">+</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold" title="Suffisso participiale">
                    -{ex.breakdown.suffix}-
                  </span>
                  <span className="text-slate-500">+</span>
                  <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 rounded font-bold" title="Desinenza di accordo aggettivale">
                    -{ex.breakdown.ending}
                  </span>
                  {ex.breakdown.reflexive && (
                    <>
                      <span className="text-slate-500">+</span>
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold" title="Particella riflessiva invariata">
                        -{ex.breakdown.reflexive}
                      </span>
                    </>
                  )}
                </div>

                {ex.notes && (
                  <p className="text-[11px] text-slate-400 bg-slate-950/40 px-2 py-1 rounded border border-slate-800/50">
                    💡 {ex.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Rules list */}
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Regole Fondamentali</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1 pl-5 list-disc">
            {currentTopic.keyRules.map((rule, idx) => (
              <li key={idx} className="leading-relaxed">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Common Pitfalls / Mistakes */}
        <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Errori Comuni da Evitare</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1 pl-5 list-disc">
            {currentTopic.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="leading-relaxed">
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

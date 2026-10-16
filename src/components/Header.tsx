import React from 'react';
import { Flame, Trophy, Volume2, ShieldCheck, RefreshCw } from 'lucide-react';
import { UserStats } from '../types';
import { speakRussian } from '../utils/speech';

interface HeaderProps {
  stats: UserStats;
  onOpenStats?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ stats, onOpenStats }) => {
  // Determine level based on XP
  const xp = stats.xp;
  let level = 1;
  let levelTitle = 'Principiante';
  let nextLevelXp = 50;

  if (xp >= 300) {
    level = 5;
    levelTitle = 'Maestro dei Participi';
    nextLevelXp = 300;
  } else if (xp >= 180) {
    level = 4;
    levelTitle = 'Grammatico';
    nextLevelXp = 300;
  } else if (xp >= 100) {
    level = 3;
    levelTitle = 'Praticante';
    nextLevelXp = 180;
  } else if (xp >= 40) {
    level = 2;
    levelTitle = 'Apprendista';
    nextLevelXp = 100;
  }

  const handleTestVoice = () => {
    speakRussian('Здравствуйте! Изучаем русские причастия.');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0 font-bold text-lg text-white">
            П
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold tracking-tight text-white leading-tight truncate">
              I Participi Russi
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-emerald-300">Offline • 100% Locale</span>
            </div>
          </div>
        </div>

        {/* User Badges & Gamification Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Audio Pronunciation check button */}
          <button
            onClick={handleTestVoice}
            title="Ascolta audio di prova (sintesi vocale locale)"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Streak badge */}
          <div 
            title={`Serie di studio: ${stats.streakDays} ${stats.streakDays === 1 ? 'giorno' : 'giorni'}`}
            className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-1 rounded-lg text-xs font-semibold"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce" />
            <span>{stats.streakDays}d</span>
          </div>

          {/* XP & Level badge */}
          <button
            onClick={onOpenStats}
            title={`Livello ${level}: ${levelTitle} (${xp} XP)`}
            className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-300 hover:text-indigo-200 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span>L{level}</span>
            <span className="text-[10px] bg-indigo-600/40 px-1 py-0.5 rounded text-indigo-200">{xp} XP</span>
          </button>
        </div>
      </div>
    </header>
  );
};

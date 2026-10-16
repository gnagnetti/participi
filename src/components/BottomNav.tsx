import React from 'react';
import { BookOpen, Sparkles, RefreshCw, BarChart2, Table2 } from 'lucide-react';

export type TabType = 'teoria' | 'esercizi' | 'trasformazioni' | 'tabella' | 'errori_stats';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  mistakesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  mistakesCount,
}) => {
  const tabs = [
    {
      id: 'teoria' as TabType,
      label: 'Teoria',
      icon: BookOpen,
      badge: null,
    },
    {
      id: 'esercizi' as TabType,
      label: 'Esercizi',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'trasformazioni' as TabType,
      label: 'Который',
      icon: RefreshCw,
      badge: null,
    },
    {
      id: 'tabella' as TabType,
      label: 'Tavola',
      icon: Table2,
      badge: null,
    },
    {
      id: 'errori_stats' as TabType,
      label: 'Progressi',
      icon: BarChart2,
      badge: mistakesCount > 0 ? mistakesCount : null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 pb-safe">
      <div className="max-w-2xl mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-2'
                  }`}
                />
                {tab.badge !== null && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-900 shadow-sm animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-5 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

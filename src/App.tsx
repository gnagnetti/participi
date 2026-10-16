import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { TheorySection } from './components/TheorySection';
import { PracticeHub } from './components/PracticeHub';
import { TransformSection } from './components/TransformSection';
import { MistakesAndStatsSection } from './components/MistakesAndStatsSection';
import { CheatSheetSection } from './components/CheatSheetSection';
import { UserStats, ParticipleCategory } from './types';
import { getStoredStats } from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('teoria');
  const [stats, setStats] = useState<UserStats>(getStoredStats());
  const [targetPracticeCategory, setTargetPracticeCategory] = useState<ParticipleCategory | undefined>(undefined);

  useEffect(() => {
    // Sync stats from storage on mount
    setStats(getStoredStats());
  }, []);

  const handleStatsUpdated = (newStats: UserStats) => {
    setStats(newStats);
  };

  const handleStartCategoryPractice = (category?: ParticipleCategory) => {
    setTargetPracticeCategory(category);
    setCurrentTab('esercizi');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sticky App Header */}
      <Header
        stats={stats}
        onOpenStats={() => setCurrentTab('errori_stats')}
      />

      {/* Main Content Area (Mobile Viewport Optimized) */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-3.5 pt-3.5 pb-24">
        {currentTab === 'teoria' && (
          <TheorySection
            onStartCategoryPractice={handleStartCategoryPractice}
          />
        )}

        {currentTab === 'esercizi' && (
          <PracticeHub
            initialCategory={targetPracticeCategory}
            onStatsUpdated={handleStatsUpdated}
          />
        )}

        {currentTab === 'trasformazioni' && (
          <TransformSection
            onStatsUpdated={handleStatsUpdated}
          />
        )}

        {currentTab === 'tabella' && (
          <CheatSheetSection />
        )}

        {currentTab === 'errori_stats' && (
          <MistakesAndStatsSection
            stats={stats}
            onStatsUpdated={handleStatsUpdated}
            onNavigateToExercises={handleStartCategoryPractice}
          />
        )}
      </main>

      {/* Persistent Bottom Mobile Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'esercizi') {
            setTargetPracticeCategory(undefined);
          }
          setCurrentTab(tab);
        }}
        mistakesCount={stats.mistakeIds.length}
      />
    </div>
  );
}

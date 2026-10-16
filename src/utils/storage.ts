import { UserStats, ParticipleCategory, Badge } from '../types';

const STORAGE_KEY = 'russian_participles_user_stats_v1';

const defaultStats: UserStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  xp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  categoryStats: {
    active_present: { attempted: 0, correct: 0 },
    active_past: { attempted: 0, correct: 0 },
    passive_present: { attempted: 0, correct: 0 },
    passive_past: { attempted: 0, correct: 0 },
    transformations: { attempted: 0, correct: 0 },
    short_forms: { attempted: 0, correct: 0 },
  },
  completedExerciseIds: [],
  mistakeIds: [],
  unlockedBadges: [],
};

export const BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'Primo Passo',
    description: 'Completa il tuo primo esercizio correttamente',
    icon: '🎯',
    category: 'Avvio',
    condition: (stats) => stats.totalCorrect >= 1,
  },
  {
    id: 'active_hunter',
    name: 'Cacciatore Attivo',
    description: 'Completa 5 esercizi sui participi attivi',
    icon: '⚡',
    category: 'Participi Attivi',
    condition: (stats) => 
      (stats.categoryStats.active_present.correct + stats.categoryStats.active_past.correct) >= 5,
  },
  {
    id: 'passive_shield',
    name: 'Scudo Passivo',
    description: 'Completa 5 esercizi sui participi passivi (presente e passato)',
    icon: '🛡️',
    category: 'Participi Passivi',
    condition: (stats) => 
      (stats.categoryStats.passive_present.correct + stats.categoryStats.passive_past.correct) >= 5,
  },
  {
    id: 'kotoryj_master',
    name: 'Maestro di Который',
    description: 'Risolvi correttamente 5 trasformazioni di clausole',
    icon: '🔄',
    category: 'Sintassi',
    condition: (stats) => stats.categoryStats.transformations.correct >= 5,
  },
  {
    id: 'error_crusher',
    name: 'Cacciatore di Errori',
    description: 'Risolvi e ripassa con successo 3 errori registrati',
    icon: '🧹',
    category: 'Ripasso',
    condition: (stats) => stats.totalAttempted >= 10 && stats.mistakeIds.length === 0,
  },
  {
    id: 'participle_pro',
    name: 'Grammatico Russo',
    description: 'Raggiungi 25 risposte corrette e 250 XP',
    icon: '🏆',
    category: 'Maestria',
    condition: (stats) => stats.totalCorrect >= 25 && stats.xp >= 250,
  },
];

export function getStoredStats(): UserStats {
  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw) as UserStats;
    
    // Check and update streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = today;
    }
    
    return {
      ...defaultStats,
      ...parsed,
      categoryStats: {
        ...defaultStats.categoryStats,
        ...parsed.categoryStats,
      },
    };
  } catch {
    return defaultStats;
  }
}

export function saveStoredStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    // Check for newly unlocked badges
    const currentUnlocked = new Set(stats.unlockedBadges);
    BADGES.forEach(badge => {
      if (!currentUnlocked.has(badge.id) && badge.condition(stats)) {
        currentUnlocked.add(badge.id);
      }
    });
    stats.unlockedBadges = Array.from(currentUnlocked);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save user stats:', err);
  }
}

export function recordExerciseAttempt(
  exerciseId: string,
  category: ParticipleCategory,
  isCorrect: boolean
): UserStats {
  const stats = getStoredStats();
  stats.totalAttempted += 1;

  if (!stats.categoryStats[category]) {
    stats.categoryStats[category] = { attempted: 0, correct: 0 };
  }
  stats.categoryStats[category].attempted += 1;

  if (isCorrect) {
    stats.totalCorrect += 1;
    stats.xp += 15;
    stats.categoryStats[category].correct += 1;
    if (!stats.completedExerciseIds.includes(exerciseId)) {
      stats.completedExerciseIds.push(exerciseId);
    }
    // If it was in mistakes, remove it
    stats.mistakeIds = stats.mistakeIds.filter(id => id !== exerciseId);
  } else {
    // Add to mistakes if not already there
    if (!stats.mistakeIds.includes(exerciseId)) {
      stats.mistakeIds.push(exerciseId);
    }
  }

  saveStoredStats(stats);
  return stats;
}

export function resetAllStats(): UserStats {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultStats;
}

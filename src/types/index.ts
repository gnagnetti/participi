export type ParticipleCategory = 
  | 'active_present'     // Participio Presente Attivo (-ущ-/-ющ-, -ащ-/-ящ-)
  | 'active_past'        // Participio Passato Attivo (-вш-/-ш-)
  | 'passive_present'    // Participio Presente Passivo (-ем-/-им-)
  | 'passive_past'       // Participio Passato Passivo (-нн-/-енн-/-т-)
  | 'transformations'    // Trasformazione clausola "который"
  | 'short_forms';       // Forme brevi dei participi passivi

export type ExerciseType = 
  | 'grammar_identification' // Identifica caso, genere, numero o voce
  | 'formation'              // Forma il participio corretto dal verbo base
  | 'transformation'         // Trasforma da "который" a participio o viceversa
  | 'agreement_fill';        // Accordo del participio con il nome (fill-in-the-blank)

export interface ExerciseItem {
  id: string;
  category: ParticipleCategory;
  type: ExerciseType;
  title: string;
  instruction: string;
  russianSentence: string; // The Russian sentence, optionally with [...] or highlighted word
  highlightTarget?: string; // Highlighted word in sentence (e.g. for identification)
  italianTranslation: string;
  verbBase?: string; // E.g. "читать (НСВ)"
  options: string[];
  correctAnswer: string;
  explanation: string; // Detailed pedagogical explanation in Italian
  grammarTip?: string; // Extra tip, e.g. "Attenzione: verbo riflessivo con -ся"
  difficulty: 'facile' | 'medio' | 'avanzato';
}

export interface UserStats {
  totalAttempted: number;
  totalCorrect: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  categoryStats: Record<ParticipleCategory, { attempted: number; correct: number }>;
  completedExerciseIds: string[];
  mistakeIds: string[]; // List of exercise IDs answered incorrectly
  unlockedBadges: string[];
}

export interface TheoryTopic {
  id: string;
  category: ParticipleCategory | 'intro';
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
  aspectsAllowed: 'Solo НСВ (Imperfettivo)' | 'Solo СВ (Perfettivo)' | 'Entrambi (НСВ e СВ)';
  suffixes: string[];
  formationRule: string;
  examples: Array<{
    russian: string;
    italian: string;
    breakdown: {
      stem: string;
      suffix: string;
      ending: string;
      reflexive?: string;
    };
    notes?: string;
  }>;
  keyRules: string[];
  commonMistakes: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  condition: (stats: UserStats) => boolean;
}

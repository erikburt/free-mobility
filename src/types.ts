export type MuscleGroup =
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'adductors'
  | 'calves'
  | 'tibialis'
  | 'hip_flexors'
  | 'lower_back'
  | 'upper_back'
  | 'traps'
  | 'lats'
  | 'chest'
  | 'shoulders'
  | 'triceps'
  | 'biceps'
  | 'forearms'
  | 'feet';

export type Priority = 1 | 2 | 3; // 1 = high, 2 = medium, 3 = low

export interface MuscleGroupSelection {
  muscleGroup: MuscleGroup;
  priority: Priority;
}

export type ExerciseType = 'foam_roller' | 'lacrosse_ball' | 'barbell';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  type: ExerciseType;
  description: string;
  defaultDuration: number; // seconds per side (for unilateral) or total (for bilateral)
  isUnilateral: boolean; // true if exercise should be done on each side separately
}

export type Side = 'left' | 'right' | null; // null for bilateral exercises

export interface ScheduledExercise {
  exercise: Exercise;
  duration: number; // allocated time in seconds (per side for unilateral)
  side: Side; // which side this scheduled exercise is for
}

export interface Session {
  totalTime: number; // seconds
  exercises: ScheduledExercise[];
}

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  quads: 'Quads',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  adductors: 'Adductors',
  calves: 'Calves',
  tibialis: 'Tibialis',
  hip_flexors: 'Hip Flexors',
  lower_back: 'Lower Back',
  upper_back: 'Upper Back',
  traps: 'Traps',
  lats: 'Lats',
  chest: 'Chest',
  shoulders: 'Shoulders',
  triceps: 'Triceps',
  biceps: 'Biceps',
  forearms: 'Forearms',
  feet: 'Feet',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
};

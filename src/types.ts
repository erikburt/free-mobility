export type MuscleGroup =
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'hip_flexors'
  | 'lower_back'
  | 'upper_back'
  | 'lats'
  | 'chest'
  | 'shoulders'
  | 'triceps'
  | 'biceps'
  | 'forearms';

export type Priority = 1 | 2 | 3; // 1 = high, 2 = medium, 3 = low

export interface MuscleGroupSelection {
  muscleGroup: MuscleGroup;
  priority: Priority;
}

export type ExerciseType = 'foam_roller' | 'lacrosse_ball';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  type: ExerciseType;
  description: string;
  defaultDuration: number; // seconds
}

export interface ScheduledExercise {
  exercise: Exercise;
  duration: number; // allocated time in seconds
}

export interface Session {
  totalTime: number; // seconds
  exercises: ScheduledExercise[];
}

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  quads: 'Quads',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  hip_flexors: 'Hip Flexors',
  lower_back: 'Lower Back',
  upper_back: 'Upper Back',
  lats: 'Lats',
  chest: 'Chest',
  shoulders: 'Shoulders',
  triceps: 'Triceps',
  biceps: 'Biceps',
  forearms: 'Forearms',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
};

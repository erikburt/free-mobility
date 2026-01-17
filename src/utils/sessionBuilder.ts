import { ScheduledExercise, Exercise } from '../types';
import { EXERCISES } from '../data/exercises';

export function buildSession(
  selectedExerciseIds: Set<string>,
  secondsPerSide: number
): ScheduledExercise[] {
  const scheduled: ScheduledExercise[] = [];

  // Get exercises in the order they appear in EXERCISES (which is grouped by muscle)
  for (const exercise of EXERCISES) {
    if (!selectedExerciseIds.has(exercise.id)) continue;

    if (exercise.isUnilateral) {
      // Add left side
      scheduled.push({
        exercise,
        duration: secondsPerSide,
        side: 'left',
      });
      // Add right side
      scheduled.push({
        exercise,
        duration: secondsPerSide,
        side: 'right',
      });
    } else {
      // Bilateral exercise gets 2x time (equivalent to both sides combined)
      scheduled.push({
        exercise,
        duration: secondsPerSide * 2,
        side: null,
      });
    }
  }

  return scheduled;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}

export function getTotalSessionTime(exercises: ScheduledExercise[]): number {
  return exercises.reduce((sum, e) => sum + e.duration, 0);
}

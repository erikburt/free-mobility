import { MuscleGroupSelection, ScheduledExercise, Priority } from '../types';
import { getExercisesForMuscleGroup } from '../data/exercises';

// Priority weights: higher priority = more time
const PRIORITY_WEIGHTS: Record<Priority, number> = {
  1: 3, // High priority gets 3x weight
  2: 2, // Medium priority gets 2x weight
  3: 1, // Low priority gets 1x weight
};

export function buildSession(
  selections: MuscleGroupSelection[],
  totalTimeSeconds: number
): ScheduledExercise[] {
  if (selections.length === 0) {
    return [];
  }

  // Calculate total weight
  const totalWeight = selections.reduce(
    (sum, s) => sum + PRIORITY_WEIGHTS[s.priority],
    0
  );

  // Time per weight unit
  const timePerWeight = totalTimeSeconds / totalWeight;

  const scheduled: ScheduledExercise[] = [];

  for (const selection of selections) {
    const exercises = getExercisesForMuscleGroup(selection.muscleGroup);
    if (exercises.length === 0) continue;

    // Allocate time for this muscle group based on priority
    const allocatedTime = Math.floor(
      timePerWeight * PRIORITY_WEIGHTS[selection.priority]
    );

    // For now, just pick the first exercise (foam roller preferred)
    // Later we can add logic to pick based on available equipment
    const exercise = exercises[0];

    scheduled.push({
      exercise,
      duration: Math.max(allocatedTime, 30), // Minimum 30 seconds per exercise
    });
  }

  // Adjust durations if we went over due to minimum times
  const totalAllocated = scheduled.reduce((sum, s) => sum + s.duration, 0);
  if (totalAllocated > totalTimeSeconds && scheduled.length > 0) {
    // Scale down proportionally
    const scale = totalTimeSeconds / totalAllocated;
    for (const s of scheduled) {
      s.duration = Math.max(Math.floor(s.duration * scale), 20);
    }
  }

  return scheduled;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

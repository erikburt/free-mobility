import { WorkoutExercise, MuscleGroup, Priority, MuscleGroupSelection } from '../types';

export const WORKOUT_EXERCISES: WorkoutExercise[] = [
  // Compound Lower Body
  {
    id: 'back-squat',
    name: 'Back Squat',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'hamstrings', priority: 2 },
      { muscleGroup: 'lower_back', priority: 2 },
      { muscleGroup: 'adductors', priority: 3 },
    ],
  },
  {
    id: 'front-squat',
    name: 'Front Squat',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'glutes', priority: 2 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'lower_back', priority: 3 },
    ],
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'lower_back', priority: 1 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'traps', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'sumo-deadlift',
    name: 'Sumo Deadlift',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'adductors', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'hamstrings', priority: 2 },
      { muscleGroup: 'lower_back', priority: 2 },
    ],
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'lower_back', priority: 2 },
    ],
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'hip_flexors', priority: 2 },
    ],
  },
  {
    id: 'split-squat',
    name: 'Split Squat / Bulgarian',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'hip_flexors', priority: 1 },
    ],
  },
  {
    id: 'step-ups',
    name: 'Step Ups',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'glutes', priority: 2 },
    ],
  },

  // Compound Upper Body
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'chest', priority: 1 },
      { muscleGroup: 'shoulders', priority: 2 },
      { muscleGroup: 'triceps', priority: 2 },
    ],
  },
  {
    id: 'incline-bench',
    name: 'Incline Bench Press',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'chest', priority: 1 },
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'triceps', priority: 2 },
    ],
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'triceps', priority: 2 },
      { muscleGroup: 'upper_back', priority: 3 },
    ],
  },
  {
    id: 'push-press',
    name: 'Push Press',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'triceps', priority: 2 },
      { muscleGroup: 'quads', priority: 3 },
    ],
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'upper_back', priority: 1 },
      { muscleGroup: 'lats', priority: 1 },
      { muscleGroup: 'biceps', priority: 2 },
      { muscleGroup: 'lower_back', priority: 3 },
    ],
  },

  // Gymnastics
  {
    id: 'dips',
    name: 'Dips',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'chest', priority: 1 },
      { muscleGroup: 'triceps', priority: 1 },
      { muscleGroup: 'shoulders', priority: 2 },
    ],
  },
  {
    id: 'push-ups',
    name: 'Push Ups',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'chest', priority: 1 },
      { muscleGroup: 'triceps', priority: 2 },
      { muscleGroup: 'shoulders', priority: 2 },
    ],
  },
  {
    id: 'pull-ups',
    name: 'Pull Ups',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'lats', priority: 1 },
      { muscleGroup: 'biceps', priority: 2 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'chin-ups',
    name: 'Chin Ups',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'biceps', priority: 1 },
      { muscleGroup: 'lats', priority: 1 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'muscle-up',
    name: 'Muscle Up',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'lats', priority: 1 },
      { muscleGroup: 'chest', priority: 1 },
      { muscleGroup: 'triceps', priority: 1 },
      { muscleGroup: 'biceps', priority: 2 },
      { muscleGroup: 'shoulders', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'toes-to-bar',
    name: 'Toes to Bar',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'hip_flexors', priority: 1 },
      { muscleGroup: 'lats', priority: 2 },
      { muscleGroup: 'forearms', priority: 2 },
    ],
  },
  {
    id: 'rope-climb',
    name: 'Rope Climb',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'lats', priority: 1 },
      { muscleGroup: 'biceps', priority: 1 },
      { muscleGroup: 'forearms', priority: 1 },
      { muscleGroup: 'feet', priority: 2 },
    ],
  },
  {
    id: 'handstand-push-up',
    name: 'Handstand Push Up',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'triceps', priority: 1 },
      { muscleGroup: 'upper_back', priority: 2 },
    ],
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'chest', priority: 2 },
      { muscleGroup: 'shoulders', priority: 2 },
      { muscleGroup: 'calves', priority: 3 },
    ],
  },
  {
    id: 'box-jump',
    name: 'Box Jump',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'calves', priority: 1 },
      { muscleGroup: 'glutes', priority: 2 },
    ],
  },
  {
    id: 'double-unders',
    name: 'Double Unders',
    category: 'gymnastics',
    muscleGroups: [
      { muscleGroup: 'calves', priority: 1 },
      { muscleGroup: 'forearms', priority: 2 },
      { muscleGroup: 'shoulders', priority: 3 },
    ],
  },

  // Olympic Lifts
  {
    id: 'clean',
    name: 'Clean',
    category: 'olympic',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'traps', priority: 1 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'forearms', priority: 2 },
    ],
  },
  {
    id: 'snatch',
    name: 'Snatch',
    category: 'olympic',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'traps', priority: 1 },
      { muscleGroup: 'upper_back', priority: 2 },
    ],
  },
  {
    id: 'clean-and-jerk',
    name: 'Clean & Jerk',
    category: 'olympic',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'traps', priority: 1 },
      { muscleGroup: 'triceps', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'power-clean',
    name: 'Power Clean',
    category: 'olympic',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'traps', priority: 1 },
      { muscleGroup: 'quads', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'hang-clean',
    name: 'Hang Clean',
    category: 'olympic',
    muscleGroups: [
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'traps', priority: 1 },
      { muscleGroup: 'glutes', priority: 2 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },

  // Cardio / CrossFit
  {
    id: 'running',
    name: 'Running',
    category: 'cardio',
    muscleGroups: [
      { muscleGroup: 'calves', priority: 1 },
      { muscleGroup: 'tibialis', priority: 1 },
      { muscleGroup: 'quads', priority: 2 },
      { muscleGroup: 'hamstrings', priority: 2 },
      { muscleGroup: 'hip_flexors', priority: 2 },
      { muscleGroup: 'feet', priority: 2 },
    ],
  },
  {
    id: 'rowing',
    name: 'Rowing (Erg)',
    category: 'cardio',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 2 },
      { muscleGroup: 'hamstrings', priority: 2 },
      { muscleGroup: 'upper_back', priority: 2 },
      { muscleGroup: 'lats', priority: 2 },
      { muscleGroup: 'biceps', priority: 3 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },
  {
    id: 'cycling',
    name: 'Cycling / Assault Bike',
    category: 'cardio',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'hamstrings', priority: 2 },
      { muscleGroup: 'glutes', priority: 2 },
      { muscleGroup: 'calves', priority: 3 },
    ],
  },
  {
    id: 'ski-erg',
    name: 'Ski Erg',
    category: 'cardio',
    muscleGroups: [
      { muscleGroup: 'triceps', priority: 2 },
      { muscleGroup: 'lats', priority: 2 },
      { muscleGroup: 'forearms', priority: 3 },
    ],
  },


  {
    id: 'wall-ball',
    name: 'Wall Ball',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'glutes', priority: 2 },
    ],
  },
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'glutes', priority: 1 },
      { muscleGroup: 'hamstrings', priority: 1 },
      { muscleGroup: 'lower_back', priority: 2 },
      { muscleGroup: 'forearms', priority: 2 },
      { muscleGroup: 'shoulders', priority: 3 },
    ],
  },
  {
    id: 'thrusters',
    name: 'Thrusters',
    category: 'compound',
    muscleGroups: [
      { muscleGroup: 'quads', priority: 1 },
      { muscleGroup: 'shoulders', priority: 1 },
      { muscleGroup: 'glutes', priority: 2 },
      { muscleGroup: 'triceps', priority: 2 },
    ],
  },
];

// Group exercises by category for display
export const WORKOUT_CATEGORIES = {
  compound: 'Compound',
  gymnastics: 'Gymnastics / Bodyweight',
  olympic: 'Olympic Lifts',
  cardio: 'Cardio',
} as const;

// Point values for each priority level (higher = more impact)
const PRIORITY_POINTS: Record<Priority, number> = {
  1: 3, // High priority exercise = 3 points
  2: 2, // Medium priority = 2 points
  3: 1, // Low priority = 1 point
};

// Function to derive muscle group selections from selected workout exercises
export function deriveMuscleGroupsFromWorkout(
  selectedExerciseIds: Set<string>
): MuscleGroupSelection[] {
  // Accumulate points for each muscle group
  const muscleGroupScores = new Map<MuscleGroup, number>();

  for (const exerciseId of selectedExerciseIds) {
    const exercise = WORKOUT_EXERCISES.find((e) => e.id === exerciseId);
    if (!exercise) continue;

    for (const { muscleGroup, priority } of exercise.muscleGroups) {
      const currentScore = muscleGroupScores.get(muscleGroup) || 0;
      muscleGroupScores.set(muscleGroup, currentScore + PRIORITY_POINTS[priority]);
    }
  }

  // Get all scores and sort them to find relative thresholds
  const scores = Array.from(muscleGroupScores.values()).sort((a, b) => b - a);

  if (scores.length === 0) return [];

  // Find threshold values that divide scores into thirds
  const highThreshold = scores[Math.floor(scores.length / 3)] ?? scores[0];
  const mediumThreshold = scores[Math.floor((scores.length * 2) / 3)] ?? scores[0];

  // Convert accumulated scores to priority levels based on relative position
  return Array.from(muscleGroupScores.entries()).map(
    ([muscleGroup, score]) => ({
      muscleGroup,
      priority: scoreToPriority(score, highThreshold, mediumThreshold),
    })
  );
}

function scoreToPriority(score: number, highThreshold: number, mediumThreshold: number): Priority {
  if (score >= highThreshold) return 1;
  if (score >= mediumThreshold) return 2;
  return 3;
}

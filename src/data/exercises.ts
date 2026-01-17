import { Exercise, MuscleGroup } from '../types';

// Placeholder exercises - we can expand these later with more detailed instructions
export const EXERCISES: Exercise[] = [
  // Quads
  {
    id: 'foam-quads',
    name: 'Foam Roll Quads',
    muscleGroup: 'quads',
    type: 'foam_roller',
    description: 'Lie face down with the foam roller under your thighs. Roll from hip to just above the knee.',
    defaultDuration: 60,
  },
  // Hamstrings
  {
    id: 'foam-hamstrings',
    name: 'Foam Roll Hamstrings',
    muscleGroup: 'hamstrings',
    type: 'foam_roller',
    description: 'Sit with the foam roller under your thighs. Roll from glutes to just above the knee.',
    defaultDuration: 60,
  },
  // Glutes
  {
    id: 'foam-glutes',
    name: 'Foam Roll Glutes',
    muscleGroup: 'glutes',
    type: 'foam_roller',
    description: 'Sit on the foam roller and cross one ankle over the opposite knee. Roll the glute of the crossed leg.',
    defaultDuration: 60,
  },
  {
    id: 'lacrosse-glutes',
    name: 'Lacrosse Ball Glutes',
    muscleGroup: 'glutes',
    type: 'lacrosse_ball',
    description: 'Sit on a lacrosse ball targeting the piriformis. Apply pressure and make small movements.',
    defaultDuration: 45,
  },
  // Calves
  {
    id: 'foam-calves',
    name: 'Foam Roll Calves',
    muscleGroup: 'calves',
    type: 'foam_roller',
    description: 'Sit with the foam roller under your calves. Roll from ankle to just below the knee.',
    defaultDuration: 60,
  },
  // Hip Flexors
  {
    id: 'foam-hip-flexors',
    name: 'Foam Roll Hip Flexors',
    muscleGroup: 'hip_flexors',
    type: 'foam_roller',
    description: 'Lie face down with the foam roller at the front of your hip. Roll gently.',
    defaultDuration: 60,
  },
  {
    id: 'lacrosse-hip-flexors',
    name: 'Lacrosse Ball Hip Flexors',
    muscleGroup: 'hip_flexors',
    type: 'lacrosse_ball',
    description: 'Lie face down with a lacrosse ball on the hip flexor area. Apply pressure and breathe.',
    defaultDuration: 45,
  },
  // Lower Back
  {
    id: 'foam-lower-back',
    name: 'Foam Roll Lower Back',
    muscleGroup: 'lower_back',
    type: 'foam_roller',
    description: 'Lie on your back with the foam roller under your lower back. Gently roll.',
    defaultDuration: 60,
  },
  {
    id: 'lacrosse-lower-back',
    name: 'Lacrosse Ball Lower Back',
    muscleGroup: 'lower_back',
    type: 'lacrosse_ball',
    description: 'Lie on a lacrosse ball targeting the QL muscle beside the spine.',
    defaultDuration: 45,
  },
  // Upper Back
  {
    id: 'foam-upper-back',
    name: 'Foam Roll Upper Back',
    muscleGroup: 'upper_back',
    type: 'foam_roller',
    description: 'Lie on your back with the foam roller under your upper back. Cross arms over chest and roll.',
    defaultDuration: 60,
  },
  {
    id: 'lacrosse-upper-back',
    name: 'Lacrosse Ball Upper Back',
    muscleGroup: 'upper_back',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your upper back and a wall. Target knots and tight spots.',
    defaultDuration: 45,
  },
  // Lats
  {
    id: 'foam-lats',
    name: 'Foam Roll Lats',
    muscleGroup: 'lats',
    type: 'foam_roller',
    description: 'Lie on your side with the foam roller under your armpit. Roll along the lat muscle.',
    defaultDuration: 60,
  },
  // Chest
  {
    id: 'lacrosse-chest',
    name: 'Lacrosse Ball Chest',
    muscleGroup: 'chest',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your chest/pec and a wall. Roll slowly to release tension.',
    defaultDuration: 45,
  },
  // Shoulders
  {
    id: 'lacrosse-shoulders',
    name: 'Lacrosse Ball Shoulders',
    muscleGroup: 'shoulders',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your shoulder/deltoid and a wall. Target different angles.',
    defaultDuration: 45,
  },
  {
    id: 'lacrosse-rear-delt',
    name: 'Lacrosse Ball Rear Delt',
    muscleGroup: 'shoulders',
    type: 'lacrosse_ball',
    description: 'Lie on your back with a lacrosse ball under the rear deltoid. Apply pressure and move arm.',
    defaultDuration: 45,
  },
  // Triceps
  {
    id: 'foam-triceps',
    name: 'Foam Roll Triceps',
    muscleGroup: 'triceps',
    type: 'foam_roller',
    description: 'Place the foam roller on a bench and roll your triceps over it.',
    defaultDuration: 45,
  },
  // Biceps
  {
    id: 'lacrosse-biceps',
    name: 'Lacrosse Ball Biceps',
    muscleGroup: 'biceps',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your bicep and a table or wall. Apply pressure.',
    defaultDuration: 30,
  },
  // Forearms
  {
    id: 'lacrosse-forearms',
    name: 'Lacrosse Ball Forearms',
    muscleGroup: 'forearms',
    type: 'lacrosse_ball',
    description: 'Roll a lacrosse ball along your forearm on a table, applying pressure.',
    defaultDuration: 30,
  },
];

export function getExercisesForMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
  return EXERCISES.filter((e) => e.muscleGroup === muscleGroup);
}

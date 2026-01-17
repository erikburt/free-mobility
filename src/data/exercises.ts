import { Exercise, MuscleGroup } from '../types';

export const EXERCISES: Exercise[] = [
  // Quads
  {
    id: 'quad-roll',
    name: 'Quad Roll',
    muscleGroup: 'quads',
    type: 'foam_roller',
    description: 'Lie face down with the foam roller under one thigh. Roll from hip to just above the knee.',
    defaultDuration: 60,
    isUnilateral: true,
  },
  {
    id: 'barbell-quad',
    name: 'Barbell Quad Roll',
    muscleGroup: 'quads',
    type: 'barbell',
    description: 'Sit with a barbell across one thigh. Roll the barbell up and down the quad, applying pressure.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // Hamstrings
  {
    id: 'hamstring-roll',
    name: 'Hamstring Roll',
    muscleGroup: 'hamstrings',
    type: 'foam_roller',
    description: 'Sit with the foam roller under one thigh. Roll from glute to just above the knee.',
    defaultDuration: 60,
    isUnilateral: true,
  },
  {
    id: 'hamstring-lacrosse-box',
    name: 'Lacrosse Ball Hamstring (Seated on Box)',
    muscleGroup: 'hamstrings',
    type: 'lacrosse_ball',
    description: 'Sit on a box with a lacrosse ball under your hamstring. Roll and apply pressure to target specific tight spots.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // Glutes
  {
    id: 'glute-roll',
    name: 'Glute Roll',
    muscleGroup: 'glutes',
    type: 'foam_roller',
    description: 'Sit on the foam roller and cross one ankle over the opposite knee. Roll the glute of the crossed leg.',
    defaultDuration: 60,
    isUnilateral: true,
  },
  {
    id: 'piriformis-lacrosse',
    name: 'Lacrosse Ball Piriformis',
    muscleGroup: 'glutes',
    type: 'lacrosse_ball',
    description: 'Sit on a lacrosse ball targeting deep in the glute/piriformis. Apply pressure with small movements.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // Adductors
  {
    id: 'adductor-roll',
    name: 'Adductor Roll',
    muscleGroup: 'adductors',
    type: 'foam_roller',
    description: 'Lie face down with one leg out to the side, foam roller under inner thigh. Roll along the adductors.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // Calves
  {
    id: 'calf-roll',
    name: 'Calf Roll',
    muscleGroup: 'calves',
    type: 'foam_roller',
    description: 'Sit with the foam roller under one calf. Roll from ankle to just below the knee.',
    defaultDuration: 60,
    isUnilateral: true,
  },
  {
    id: 'calf-lacrosse',
    name: 'Lacrosse Ball Calf',
    muscleGroup: 'calves',
    type: 'lacrosse_ball',
    description: 'Sit with a lacrosse ball under your calf, targeting specific tight spots. Apply pressure.',
    defaultDuration: 45,
    isUnilateral: true,
  },

  // Tibialis
  {
    id: 'shin-lacrosse',
    name: 'Lacrosse Ball Shin',
    muscleGroup: 'tibialis',
    type: 'lacrosse_ball',
    description: 'Kneel with a lacrosse ball under your shin/tibialis. Apply pressure and roll slowly.',
    defaultDuration: 45,
    isUnilateral: true,
  },

  // Hip Flexors
  {
    id: 'psoas-lacrosse',
    name: 'Lacrosse Ball Psoas',
    muscleGroup: 'hip_flexors',
    type: 'lacrosse_ball',
    description: 'Lie face down with a lacrosse ball just inside the hip bone on the psoas. Breathe and relax into it.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // IT Band (grouped under Quads)
  {
    id: 'it-band-roll',
    name: 'IT Band Roll',
    muscleGroup: 'quads',
    type: 'foam_roller',
    description: 'Lie on your side with the foam roller under your outer thigh. Roll from hip to just above the knee.',
    defaultDuration: 60,
    isUnilateral: true,
  },
  {
    id: 'it-band-lacrosse',
    name: 'Lacrosse Ball IT Band',
    muscleGroup: 'quads',
    type: 'lacrosse_ball',
    description: 'Lie on your side with a lacrosse ball under your outer thigh. Target specific tight spots.',
    defaultDuration: 45,
    isUnilateral: true,
  },

  // Lower Back
  {
    id: 'global-lower-back-roll',
    name: 'Global Lower Back Roll',
    muscleGroup: 'lower_back',
    type: 'foam_roller',
    description: 'Lie on your back with the foam roller under your lower back. Gently roll the entire lower back area.',
    defaultDuration: 60,
    isUnilateral: false,
  },
  {
    id: 'specific-lower-back-roll',
    name: 'Specific Lower Back Roll',
    muscleGroup: 'lower_back',
    type: 'foam_roller',
    description: 'Position the foam roller on a specific tight spot in the lower back. Lean to one side, apply pressure and make small movements.',
    defaultDuration: 60,
    isUnilateral: true,
  },
  {
    id: 'super-lower-back',
    name: 'Super Lower Back Release',
    muscleGroup: 'lower_back',
    type: 'lacrosse_ball',
    description: 'Foam roll upper back while using a lacrosse ball on lower back. Target QL and erector muscles.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // Upper Back
  {
    id: 'upper-back-roll',
    name: 'Upper Back Roll',
    muscleGroup: 'upper_back',
    type: 'foam_roller',
    description: 'Lie on your back with the foam roller under your upper back. Cross arms and roll from mid-back to shoulders.',
    defaultDuration: 60,
    isUnilateral: false,
  },
  {
    id: 'back-roll-overhead',
    name: 'Back Roll in Overhead Position',
    muscleGroup: 'upper_back',
    type: 'foam_roller',
    description: 'Lie on foam roller with arms extended overhead. Roll upper back while maintaining overhead position.',
    defaultDuration: 60,
    isUnilateral: false,
  },

  // Traps
  {
    id: 'upper-trap-lacrosse',
    name: 'Lacrosse Ball Upper Trap',
    muscleGroup: 'traps',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your upper trap and a wall. Apply pressure and move slowly.',
    defaultDuration: 45,
    isUnilateral: true,
  },

  // Lats
  {
    id: 'lat-roll',
    name: 'Lat Roll',
    muscleGroup: 'lats',
    type: 'foam_roller',
    description: 'Lie on your side with the foam roller under your armpit. Roll along the lat muscle.',
    defaultDuration: 60,
    isUnilateral: true,
  },

  // Chest
  {
    id: 'pec-lacrosse',
    name: 'Lacrosse Ball Pec',
    muscleGroup: 'chest',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your pec and a wall. Roll slowly to release tension.',
    defaultDuration: 45,
    isUnilateral: true,
  },

  // Shoulders
  {
    id: 'anterior-delt-lacrosse',
    name: 'Lacrosse Ball Front Delt',
    muscleGroup: 'shoulders',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your front deltoid and a wall. Roll with small movements.',
    defaultDuration: 45,
    isUnilateral: true,
  },
  {
    id: 'medial-delt-lacrosse',
    name: 'Lacrosse Ball Side Delt',
    muscleGroup: 'shoulders',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball on the side of your shoulder against a wall. Apply pressure.',
    defaultDuration: 45,
    isUnilateral: true,
  },
  {
    id: 'posterior-delt-lacrosse',
    name: 'Lacrosse Ball Rear Delt',
    muscleGroup: 'shoulders',
    type: 'lacrosse_ball',
    description: 'Lie on your back with a lacrosse ball under the rear deltoid. Move arm to intensify.',
    defaultDuration: 45,
    isUnilateral: true,
  },
  {
    id: 'rotator-cuff-lacrosse',
    name: 'Lacrosse Ball Rotator Cuff',
    muscleGroup: 'shoulders',
    type: 'lacrosse_ball',
    description: 'Place the lacrosse ball on the back of the shoulder blade targeting the rotator cuff. Gentle pressure.',
    defaultDuration: 45,
    isUnilateral: true,
  },

  // Triceps
  {
    id: 'triceps-lacrosse',
    name: 'Lacrosse Ball Triceps',
    muscleGroup: 'triceps',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your triceps and a wall or table. Roll along the muscle.',
    defaultDuration: 30,
    isUnilateral: true,
  },

  // Biceps
  {
    id: 'biceps-lacrosse',
    name: 'Lacrosse Ball Biceps',
    muscleGroup: 'biceps',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your bicep and a table or wall. Roll along the muscle belly.',
    defaultDuration: 30,
    isUnilateral: true,
  },
  {
    id: 'barbell-biceps',
    name: 'Barbell Biceps Roll',
    muscleGroup: 'biceps',
    type: 'barbell',
    description: 'Rest your bicep on a barbell and roll it along the muscle, applying pressure.',
    defaultDuration: 30,
    isUnilateral: true,
  },

  // Forearms
  {
    id: 'wall-forearm-roll',
    name: 'Wall Forearm Roll',
    muscleGroup: 'forearms',
    type: 'lacrosse_ball',
    description: 'Pin a lacrosse ball between your forearm and a wall. Roll up and down the forearm.',
    defaultDuration: 30,
    isUnilateral: true,
  },
  {
    id: 'forearm-hammer-lacrosse',
    name: 'Lacrosse Ball Forearm (Lying)',
    muscleGroup: 'forearms',
    type: 'lacrosse_ball',
    description: 'Lie face down with a lacrosse ball under your forearm. Apply body weight and roll.',
    defaultDuration: 30,
    isUnilateral: true,
  },
  {
    id: 'reverse-forearm-lacrosse',
    name: 'Lacrosse Ball Forearm Flexors',
    muscleGroup: 'forearms',
    type: 'lacrosse_ball',
    description: 'Roll a lacrosse ball along the underside of your forearm on a table.',
    defaultDuration: 30,
    isUnilateral: true,
  },
  {
    id: 'barbell-grip',
    name: 'Barbell Grip Roll',
    muscleGroup: 'forearms',
    type: 'barbell',
    description: 'Roll a barbell over your forearm on a bench or floor, targeting grip muscles.',
    defaultDuration: 30,
    isUnilateral: true,
  },

  // Feet
  {
    id: 'underfoot-lacrosse',
    name: 'Lacrosse Ball Underfoot',
    muscleGroup: 'feet',
    type: 'lacrosse_ball',
    description: 'Stand with a lacrosse ball under your foot. Roll from heel to toes, applying pressure.',
    defaultDuration: 45,
    isUnilateral: true,
  },
];

export function getExercisesForMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
  return EXERCISES.filter((e) => e.muscleGroup === muscleGroup);
}

import { useState } from 'react';
import { MuscleGroup, MuscleGroupSelection, ScheduledExercise, InputMode, MUSCLE_GROUP_LABELS } from './types';
import { MuscleGroupSelector } from './components/MuscleGroupSelector';
import { WorkoutExerciseSelector } from './components/WorkoutExerciseSelector';
import { ExerciseSelector } from './components/ExerciseSelector';
import { SessionTimer } from './components/SessionTimer';
import { buildSession } from './utils/sessionBuilder';
import { getExercisesForMuscleGroup } from './data/exercises';
import { deriveMuscleGroupsFromWorkout } from './data/workoutExercises';
import './App.css';

type View = 'setup' | 'exercises' | 'session' | 'complete';

function App() {
  const [view, setView] = useState<View>('setup');
  const [inputMode, setInputMode] = useState<InputMode>('exercises');
  const [selections, setSelections] = useState<MuscleGroupSelection[]>([]);
  const [selectedWorkoutExercises, setSelectedWorkoutExercises] = useState<Set<string>>(new Set());
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<Set<string>>(new Set());
  const [secondsPerSide, setSecondsPerSide] = useState(60);
  const [scheduledExercises, setScheduledExercises] = useState<ScheduledExercise[]>([]);
  // Track muscle groups that have already had exercises auto-selected
  const [initializedMuscleGroups, setInitializedMuscleGroups] = useState<Set<MuscleGroup>>(new Set());

  // Derive muscle groups from workout exercises when in exercise input mode
  const effectiveSelections = inputMode === 'exercises'
    ? deriveMuscleGroupsFromWorkout(selectedWorkoutExercises)
    : selections;

  const goToExerciseSelection = () => {
    // Get currently selected muscle groups (use effective selections)
    const currentMuscleGroups = new Set(effectiveSelections.map((s) => s.muscleGroup));

    // Clean up initialized muscle groups - remove any that are no longer selected
    // This allows auto-selection to happen if a muscle group is re-added
    const cleanedInitialized = new Set(
      [...initializedMuscleGroups].filter((mg) => currentMuscleGroups.has(mg))
    );
    if (cleanedInitialized.size !== initializedMuscleGroups.size) {
      setInitializedMuscleGroups(cleanedInitialized);
    }

    // Get all valid exercise IDs for currently selected muscle groups
    const allValidExercises = effectiveSelections.flatMap((s) => getExercisesForMuscleGroup(s.muscleGroup));
    const validExerciseIds = new Set(allValidExercises.map((e) => e.id));

    // Keep existing selections that are still valid (belong to selected muscle groups)
    const preserved = new Set<string>();
    for (const id of selectedExerciseIds) {
      if (validExerciseIds.has(id)) {
        preserved.add(id);
      }
    }

    // Track newly initialized muscle groups
    const newlyInitialized = new Set<MuscleGroup>();

    // Auto-select first exercise for each muscle group that hasn't been initialized yet
    for (const selection of effectiveSelections) {
      // Skip if this muscle group was already initialized (user has seen it before)
      if (cleanedInitialized.has(selection.muscleGroup)) continue;

      const exercises = getExercisesForMuscleGroup(selection.muscleGroup);
      if (exercises.length === 0) continue;

      // Select the first exercise (sorted by order field)
      preserved.add(exercises[0].id);

      // Mark as initialized
      newlyInitialized.add(selection.muscleGroup);
    }

    // Update initialized muscle groups (merge cleaned + newly initialized)
    if (newlyInitialized.size > 0 || cleanedInitialized.size !== initializedMuscleGroups.size) {
      setInitializedMuscleGroups(new Set([...cleanedInitialized, ...newlyInitialized]));
    }

    setSelectedExerciseIds(preserved);
    if (secondsPerSide === 0) setSecondsPerSide(60);
    setView('exercises');
  };

  const toggleExercise = (exerciseId: string) => {
    setSelectedExerciseIds((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
      } else {
        next.add(exerciseId);
      }
      return next;
    });
  };

  const startSession = () => {
    const exercises = buildSession(selectedExerciseIds, secondsPerSide);
    setScheduledExercises(exercises);
    setView('session');
  };

  const resetSession = () => {
    setView('setup');
    setScheduledExercises([]);
    setSelectedExerciseIds(new Set());
    setInitializedMuscleGroups(new Set());
    setSelectedWorkoutExercises(new Set());
    setSelections([]);
  };

  const canStart = effectiveSelections.length > 0;

  if (view === 'exercises') {
    return (
      <div className="app">
        <ExerciseSelector
          selections={effectiveSelections}
          selectedExercises={selectedExerciseIds}
          onToggleExercise={toggleExercise}
          secondsPerSide={secondsPerSide}
          onSecondsChange={setSecondsPerSide}
          onBack={() => setView('setup')}
          onConfirm={startSession}
        />
      </div>
    );
  }

  if (view === 'session') {
    return (
      <div className="app">
        <SessionTimer
          exercises={scheduledExercises}
          onComplete={() => setView('complete')}
          onBack={resetSession}
        />
      </div>
    );
  }

  if (view === 'complete') {
    return (
      <div className="app">
        <div className="complete-screen">
          <h1>Session Complete!</h1>
          <p>Great work on your mobility session.</p>
          <button className="primary-btn" onClick={resetSession}>
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Free Mobility</h1>
        <p>Post-WOD Recovery</p>
      </header>

      <main className="app-main">
        <div className="input-mode-toggle">
          <button
            className={`mode-btn ${inputMode === 'exercises' ? 'active' : ''}`}
            onClick={() => setInputMode('exercises')}
          >
            By Workout
          </button>
          <button
            className={`mode-btn ${inputMode === 'muscle_groups' ? 'active' : ''}`}
            onClick={() => setInputMode('muscle_groups')}
          >
            By Muscle Group
          </button>
        </div>

        {inputMode === 'exercises' ? (
          <>
            <WorkoutExerciseSelector
              selectedWorkoutExercises={selectedWorkoutExercises}
              onChange={setSelectedWorkoutExercises}
            />
            {effectiveSelections.length > 0 && (
              <div className="derived-muscle-groups">
                <h3>Mobility focus:</h3>
                <div className="derived-groups-list">
                  {effectiveSelections
                    .sort((a, b) => a.priority - b.priority)
                    .map((s) => (
                      <span key={s.muscleGroup} className="derived-group-chip">
                        <span className={`priority-dot priority-${s.priority}`} />
                        {MUSCLE_GROUP_LABELS[s.muscleGroup]}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <MuscleGroupSelector
              selections={selections}
              onChange={setSelections}
            />
            <div className="session-summary">
              {selections.length > 0 && (
                <p>
                  {selections.length} muscle group{selections.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </>
        )}

        <button
          className="primary-btn start-btn"
          onClick={goToExerciseSelection}
          disabled={!canStart}
        >
          Choose Exercises
        </button>
      </main>
    </div>
  );
}

export default App;

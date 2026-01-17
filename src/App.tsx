import { useState } from 'react';
import { MuscleGroupSelection, ScheduledExercise } from './types';
import { MuscleGroupSelector } from './components/MuscleGroupSelector';
import { ExerciseSelector } from './components/ExerciseSelector';
import { SessionTimer } from './components/SessionTimer';
import { buildSession } from './utils/sessionBuilder';
import { getExercisesForMuscleGroup } from './data/exercises';
import './App.css';

type View = 'setup' | 'exercises' | 'session' | 'complete';

function App() {
  const [view, setView] = useState<View>('setup');
  const [selections, setSelections] = useState<MuscleGroupSelection[]>([]);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<Set<string>>(new Set());
  const [secondsPerSide, setSecondsPerSide] = useState(60);
  const [scheduledExercises, setScheduledExercises] = useState<ScheduledExercise[]>([]);

  const goToExerciseSelection = () => {
    // Target 12 minutes (720 seconds) with 60 seconds per side
    const targetSeconds = 720;
    const perSide = 60;

    // Sort by priority (high = 1 first)
    const sortedSelections = [...selections].sort((a, b) => a.priority - b.priority);

    // Auto-select exercises to fit within budget
    const initial = new Set<string>();
    let totalSeconds = 0;

    for (const selection of sortedSelections) {
      const exercises = getExercisesForMuscleGroup(selection.muscleGroup);
      if (exercises.length === 0) continue;

      const exercise = exercises[0];
      // All exercises get 2x perSide (unilateral = left+right, bilateral = combined)
      const exerciseTime = perSide * 2;

      // Only add if it fits within budget
      if (totalSeconds + exerciseTime <= targetSeconds) {
        initial.add(exercise.id);
        totalSeconds += exerciseTime;
      }
    }

    setSelectedExerciseIds(initial);
    setSecondsPerSide(perSide);
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
  };

  const canStart = selections.length > 0;

  if (view === 'exercises') {
    return (
      <div className="app">
        <ExerciseSelector
          selections={selections}
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

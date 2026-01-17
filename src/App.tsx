import { useState } from 'react';
import { MuscleGroupSelection, ScheduledExercise } from './types';
import { MuscleGroupSelector } from './components/MuscleGroupSelector';
import { TimeSelector } from './components/TimeSelector';
import { SessionTimer } from './components/SessionTimer';
import { buildSession } from './utils/sessionBuilder';
import './App.css';

type View = 'setup' | 'session' | 'complete';

function App() {
  const [view, setView] = useState<View>('setup');
  const [selections, setSelections] = useState<MuscleGroupSelection[]>([]);
  const [minutes, setMinutes] = useState(10);
  const [scheduledExercises, setScheduledExercises] = useState<ScheduledExercise[]>([]);

  const startSession = () => {
    const exercises = buildSession(selections, minutes * 60);
    setScheduledExercises(exercises);
    setView('session');
  };

  const resetSession = () => {
    setView('setup');
    setScheduledExercises([]);
  };

  const canStart = selections.length > 0;

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

        <TimeSelector minutes={minutes} onChange={setMinutes} />

        <div className="session-summary">
          {selections.length > 0 && (
            <p>
              {selections.length} muscle group{selections.length !== 1 ? 's' : ''} selected
              • {minutes} minutes
            </p>
          )}
        </div>

        <button
          className="primary-btn start-btn"
          onClick={startSession}
          disabled={!canStart}
        >
          Start Session
        </button>
      </main>
    </div>
  );
}

export default App;

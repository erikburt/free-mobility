import { useState, useEffect, useCallback } from 'react';
import { ScheduledExercise } from '../types';
import { formatTime } from '../utils/sessionBuilder';

interface Props {
  exercises: ScheduledExercise[];
  onComplete: () => void;
  onBack: () => void;
}

export function SessionTimer({ exercises, onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(exercises[0]?.duration || 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const currentExercise = exercises[currentIndex];
  const totalExercises = exercises.length;
  const isLastExercise = currentIndex === totalExercises - 1;

  const goToNext = useCallback(() => {
    if (isLastExercise) {
      onComplete();
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTimeRemaining(exercises[nextIndex].duration);
    }
  }, [currentIndex, exercises, isLastExercise, onComplete]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTimeRemaining(exercises[prevIndex].duration);
    }
  };

  useEffect(() => {
    if (!isStarted || isPaused || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          // Play a sound cue
          try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleDE+gnqxqJRWNkNfkpuMdWJOV2uAnI96YU5LT3OHkIFyaFpYaHqFhHxxa1tcZnF8fXhybGxqb3Z7eXV0cnBydXl6d3Z2dHR2eHl4d3Z1dXZ3eHh3d3Z2dnd4eHd3d3d3d3d3');
            audio.volume = 0.3;
            audio.play().catch(() => {});
          } catch {}
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isPaused, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0 && isStarted && !isPaused) {
      const timeout = setTimeout(goToNext, 500);
      return () => clearTimeout(timeout);
    }
  }, [timeRemaining, isStarted, isPaused, goToNext]);

  if (!currentExercise) {
    return <div>No exercises scheduled</div>;
  }

  const progress = ((currentExercise.duration - timeRemaining) / currentExercise.duration) * 100;

  return (
    <div className="session-timer">
      <div className="timer-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <span className="exercise-counter">
          {currentIndex + 1} / {totalExercises}
        </span>
      </div>

      <div className="exercise-display">
        <h2>{currentExercise.exercise.name}</h2>
        <p className="exercise-description">
          {currentExercise.exercise.description}
        </p>
        <div className="exercise-type">
          {currentExercise.exercise.type === 'foam_roller' ? '🧘 Foam Roller' : '🎾 Lacrosse Ball'}
        </div>
      </div>

      <div className="timer-display">
        <div className="progress-ring">
          <svg viewBox="0 0 100 100">
            <circle
              className="progress-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className="progress-bar"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="time-text">{formatTime(timeRemaining)}</div>
        </div>
      </div>

      <div className="timer-controls">
        {!isStarted ? (
          <button className="control-btn start" onClick={() => setIsStarted(true)}>
            Start
          </button>
        ) : (
          <>
            <button
              className="control-btn nav"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              ← Prev
            </button>
            <button
              className="control-btn pause"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button className="control-btn nav" onClick={goToNext}>
              {isLastExercise ? 'Finish' : 'Next →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

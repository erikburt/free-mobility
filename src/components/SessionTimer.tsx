import { useState, useEffect, useCallback, useRef } from 'react';
import { ScheduledExercise } from '../types';
import { formatTime } from '../utils/sessionBuilder';

interface Props {
  exercises: ScheduledExercise[];
  onComplete: () => void;
  onBack: () => void;
}

// Singleton AudioContext for iOS Safari compatibility
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioContext;
}

// Must be called from a user gesture (click/tap) to enable audio on iOS
function initAudio(): Promise<void> {
  const ctx = getAudioContext();
  if (!ctx) return Promise.resolve();

  if (ctx.state === 'suspended') {
    return ctx.resume();
  }
  return Promise.resolve();
}

// Simple beep sound generator using Web Audio API
function playBeep(frequency = 800, duration = 150, count = 1, volume = 0.3) {
  if (volume === 0) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (needed for iOS)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const playTone = (delay: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration / 1000);

    oscillator.start(ctx.currentTime + delay);
    oscillator.stop(ctx.currentTime + delay + duration / 1000);
  };

  for (let i = 0; i < count; i++) {
    playTone(i * 0.2);
  }
}

const TRANSITION_SECONDS = 5;

export function SessionTimer({ exercises, onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(exercises[0]?.duration || 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTime, setTransitionTime] = useState(TRANSITION_SECONDS);
  const [volume, setVolume] = useState(0.5);
  const volumeRef = useRef(volume);

  // Keep ref in sync with state
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const currentExercise = exercises[currentIndex];
  const nextExercise = exercises[currentIndex + 1];
  const totalExercises = exercises.length;
  const isLastExercise = currentIndex === totalExercises - 1;

  // Check if next is same exercise (switching sides) or different exercise
  const isSwitchingSides = nextExercise &&
    currentExercise?.exercise.id === nextExercise.exercise.id;

  // Calculate total remaining time in session
  const calculateRemainingSessionTime = useCallback(() => {
    let remaining = timeRemaining;
    for (let i = currentIndex + 1; i < exercises.length; i++) {
      remaining += exercises[i].duration;
      // Add transition time for each remaining exercise
      remaining += TRANSITION_SECONDS;
    }
    return remaining;
  }, [currentIndex, exercises, timeRemaining]);

  const startTransition = useCallback(() => {
    if (isLastExercise) {
      playBeep(1000, 200, 3, volume); // Triple beep for completion
      onComplete();
    } else {
      // Play sound based on what's next
      if (isSwitchingSides) {
        playBeep(800, 150, 1, volume); // Single beep for side switch
      } else {
        playBeep(800, 150, 2, volume); // Double beep for new exercise
      }
      setIsTransitioning(true);
      setTransitionTime(TRANSITION_SECONDS);
    }
  }, [isLastExercise, isSwitchingSides, onComplete, volume]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setTimeRemaining(exercises[nextIndex].duration);
    setIsTransitioning(false);
  }, [currentIndex, exercises]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTimeRemaining(exercises[prevIndex].duration);
      setIsTransitioning(false);
    }
  };

  const skipTransition = () => {
    goToNext();
  };

  // Main exercise timer
  useEffect(() => {
    if (!isStarted || isPaused || isTransitioning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isPaused, isTransitioning, timeRemaining]);

  // Trigger transition when exercise timer hits 0
  useEffect(() => {
    if (timeRemaining === 0 && isStarted && !isPaused && !isTransitioning) {
      startTransition();
    }
  }, [timeRemaining, isStarted, isPaused, isTransitioning, startTransition]);

  // Transition countdown timer
  useEffect(() => {
    if (!isTransitioning || isPaused) return;

    const interval = setInterval(() => {
      setTransitionTime((t) => {
        if (t <= 1) {
          return 0;
        }
        // Beep on last 3 seconds
        if (t <= 4 && t > 1) {
          playBeep(600, 100, 1, volumeRef.current);
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTransitioning, isPaused]);

  // Auto-advance when transition countdown ends
  useEffect(() => {
    if (isTransitioning && transitionTime === 0) {
      goToNext();
    }
  }, [isTransitioning, transitionTime, goToNext]);

  if (!currentExercise) {
    return <div>No exercises scheduled</div>;
  }

  const progress = isTransitioning
    ? ((TRANSITION_SECONDS - transitionTime) / TRANSITION_SECONDS) * 100
    : ((currentExercise.duration - timeRemaining) / currentExercise.duration) * 100;

  const sessionTimeRemaining = calculateRemainingSessionTime();

  return (
    <div className="session-timer">
      <div className="timer-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="volume-control">
          <span className="volume-icon">{volume === 0 ? '🔇' : '🔊'}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>
        <span className="exercise-counter">
          {currentIndex + 1} / {totalExercises}
        </span>
      </div>

      {isStarted && (
        <div className="session-remaining">
          {formatTime(sessionTimeRemaining)} remaining
        </div>
      )}

      <div className="exercise-display">
        {isTransitioning ? (
          <>
            <div className="transition-label">
              {isSwitchingSides ? 'SWITCH SIDES' : 'NEXT EXERCISE'}
            </div>
            <h2>{nextExercise?.exercise.name}</h2>
            {nextExercise?.side && (
              <div className={`side-indicator side-${nextExercise.side}`}>
                {nextExercise.side === 'left' ? '← LEFT SIDE' : 'RIGHT SIDE →'}
              </div>
            )}
          </>
        ) : (
          <>
            {currentExercise.side && (
              <div className={`side-indicator side-${currentExercise.side}`}>
                {currentExercise.side === 'left' ? '← LEFT SIDE' : 'RIGHT SIDE →'}
              </div>
            )}
            <h2>{currentExercise.exercise.name}</h2>
            <p className="exercise-description">
              {currentExercise.exercise.description}
            </p>
            <div className="exercise-type">
              {currentExercise.exercise.type === 'foam_roller' && 'Foam Roller'}
              {currentExercise.exercise.type === 'lacrosse_ball' && 'Lacrosse Ball'}
              {currentExercise.exercise.type === 'barbell' && 'Barbell'}
              {currentExercise.side && (
                <span className="side-note">
                  {currentExercise.side === 'left' ? ' • Right side next' : ' • Last side'}
                </span>
              )}
            </div>
          </>
        )}
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
              className={`progress-bar ${isTransitioning ? 'transition' : ''}`}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="time-text">
            {formatTime(isTransitioning ? transitionTime : timeRemaining)}
          </div>
        </div>
      </div>

      <div className="timer-controls">
        {!isStarted ? (
          <button
            className="control-btn start"
            onClick={() => {
              initAudio(); // Initialize audio on user gesture for iOS
              setIsStarted(true);
            }}
          >
            Start
          </button>
        ) : isTransitioning ? (
          <button className="control-btn start" onClick={skipTransition}>
            Skip Countdown
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
            <button className="control-btn nav" onClick={startTransition}>
              {isLastExercise ? 'Finish' : 'Next →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

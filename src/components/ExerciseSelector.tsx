import { useState } from 'react';
import { Exercise, MuscleGroupSelection, MUSCLE_GROUP_LABELS } from '../types';
import { getExercisesForMuscleGroup } from '../data/exercises';

interface Props {
  selections: MuscleGroupSelection[];
  selectedExercises: Set<string>; // Set of exercise IDs
  onToggleExercise: (exerciseId: string) => void;
  secondsPerSide: number;
  onSecondsChange: (seconds: number) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const TIME_OPTIONS = [30, 60, 90, 120, 150, 180]; // 30s increments up to 3 min

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function ExerciseSelector({
  selections,
  selectedExercises,
  onToggleExercise,
  secondsPerSide,
  onSecondsChange,
  onBack,
  onConfirm,
}: Props) {
  // Track which sections are expanded (all start collapsed)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (muscleGroup: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(muscleGroup)) {
        next.delete(muscleGroup);
      } else {
        next.add(muscleGroup);
      }
      return next;
    });
  };

  // Get all exercises for selected muscle groups
  const allExercises: { exercise: Exercise; priority: number }[] = [];
  for (const selection of selections) {
    const exercises = getExercisesForMuscleGroup(selection.muscleGroup);
    for (const exercise of exercises) {
      allExercises.push({ exercise, priority: selection.priority });
    }
  }

  // Sort by priority (high priority first)
  allExercises.sort((a, b) => a.priority - b.priority);

  // Group by muscle group for display
  const groupedByMuscle = new Map<string, { exercise: Exercise; priority: number }[]>();
  for (const item of allExercises) {
    const key = item.exercise.muscleGroup;
    if (!groupedByMuscle.has(key)) {
      groupedByMuscle.set(key, []);
    }
    groupedByMuscle.get(key)!.push(item);
  }

  // Calculate total time
  // Both unilateral (left + right) and bilateral (combined) get 2x secondsPerSide
  let totalSeconds = 0;
  for (const exerciseId of selectedExercises) {
    const item = allExercises.find((e) => e.exercise.id === exerciseId);
    if (item) {
      totalSeconds += secondsPerSide * 2;
    }
  }

  const totalMins = Math.floor(totalSeconds / 60);
  const totalSecs = totalSeconds % 60;

  return (
    <div className="exercise-selector">
      <div className="selector-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2>Select Exercises</h2>
      </div>

      <div className="time-per-exercise">
        <label>Time per exercise:</label>
        <div className="time-options">
          {TIME_OPTIONS.map((seconds) => (
            <button
              key={seconds}
              className={`time-option ${secondsPerSide === seconds ? 'active' : ''}`}
              onClick={() => onSecondsChange(seconds)}
            >
              {formatDuration(seconds)}
            </button>
          ))}
        </div>
        <p className="time-note">Per side for unilateral exercises</p>
      </div>

      <div className="muscle-group-exercises">
        {Array.from(groupedByMuscle.entries()).map(([muscleGroup, items]) => {
          const priority = items[0].priority;
          const isExpanded = expandedSections.has(muscleGroup);
          const selectedCount = items.filter((i) => selectedExercises.has(i.exercise.id)).length;

          return (
            <div key={muscleGroup} className={`muscle-group-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
              <button
                className="section-header"
                onClick={() => toggleSection(muscleGroup)}
              >
                <span className="section-toggle">{isExpanded ? '▼' : '▶'}</span>
                <span className="section-title">
                  {MUSCLE_GROUP_LABELS[muscleGroup as keyof typeof MUSCLE_GROUP_LABELS]}
                </span>
                <span className={`priority-badge priority-${priority}`}>
                  {priority === 1 ? 'High' : priority === 2 ? 'Med' : 'Low'}
                </span>
                <span className="section-count">
                  {selectedCount}/{items.length}
                </span>
              </button>

              {isExpanded && (
                <div className="exercise-options">
                  {items.map(({ exercise }) => {
                    const isSelected = selectedExercises.has(exercise.id);

                    return (
                      <button
                        key={exercise.id}
                        className={`exercise-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => onToggleExercise(exercise.id)}
                      >
                        <div className="exercise-option-header">
                          <span className="exercise-checkbox">
                            {isSelected ? '☑' : '☐'}
                          </span>
                          <span className="exercise-name">{exercise.name}</span>
                          <span className="exercise-meta">
                            {exercise.type === 'foam_roller' && '🧘'}
                            {exercise.type === 'lacrosse_ball' && '🎾'}
                            {exercise.type === 'barbell' && '🏋️'}
                            {exercise.isUnilateral ? ' • Each side' : ''}
                          </span>
                        </div>
                        <p className="exercise-description">{exercise.description}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="session-total">
        <span className="total-label">Total session time:</span>
        <span className="total-time">
          {totalMins > 0 ? `${totalMins}m ` : ''}{totalSecs > 0 ? `${totalSecs}s` : totalMins > 0 ? '' : '0s'}
        </span>
      </div>

      <button
        className="primary-btn"
        onClick={onConfirm}
        disabled={selectedExercises.size === 0}
      >
        Start Session ({selectedExercises.size} exercise{selectedExercises.size !== 1 ? 's' : ''})
      </button>
    </div>
  );
}

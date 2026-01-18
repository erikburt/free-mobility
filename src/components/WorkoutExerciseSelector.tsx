import { useState } from 'react';
import { WORKOUT_EXERCISES, WORKOUT_CATEGORIES } from '../data/workoutExercises';
import { WorkoutExercise } from '../types';

interface Props {
  selectedWorkoutExercises: Set<string>;
  onChange: (selected: Set<string>) => void;
}

type Category = keyof typeof WORKOUT_CATEGORIES;

export function WorkoutExerciseSelector({ selectedWorkoutExercises, onChange }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(
    new Set(['compound', 'olympic'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (category: Category) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleExercise = (exerciseId: string) => {
    const next = new Set(selectedWorkoutExercises);
    if (next.has(exerciseId)) {
      next.delete(exerciseId);
    } else {
      next.add(exerciseId);
    }
    onChange(next);
  };

  const getExercisesForCategory = (category: Category): WorkoutExercise[] => {
    return WORKOUT_EXERCISES.filter((e) => e.category === category);
  };

  const filteredExercises = searchQuery.trim()
    ? WORKOUT_EXERCISES.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const getSelectedCount = (category: Category): number => {
    return getExercisesForCategory(category).filter((e) =>
      selectedWorkoutExercises.has(e.id)
    ).length;
  };

  const renderExercise = (exercise: WorkoutExercise) => {
    const isSelected = selectedWorkoutExercises.has(exercise.id);
    const primaryMuscles = exercise.muscleGroups
      .filter((mg) => mg.priority === 1)
      .map((mg) => mg.muscleGroup.replace('_', ' '))
      .join(', ');

    return (
      <button
        key={exercise.id}
        className={`workout-exercise-option ${isSelected ? 'selected' : ''}`}
        onClick={() => toggleExercise(exercise.id)}
      >
        <span className="workout-exercise-checkbox">
          {isSelected ? '✓' : ''}
        </span>
        <span className="workout-exercise-name">{exercise.name}</span>
        <span className="workout-exercise-muscles">{primaryMuscles}</span>
      </button>
    );
  };

  const renderCategory = (category: Category) => {
    const exercises = getExercisesForCategory(category);
    const isExpanded = expandedCategories.has(category);
    const selectedCount = getSelectedCount(category);

    return (
      <div
        key={category}
        className={`workout-category-section ${isExpanded ? 'expanded' : 'collapsed'}`}
      >
        <button
          className="workout-category-header"
          onClick={() => toggleCategory(category)}
        >
          <span className="section-toggle">{isExpanded ? '▼' : '▶'}</span>
          <span className="section-title">{WORKOUT_CATEGORIES[category]}</span>
          {selectedCount > 0 && (
            <span className="section-count">{selectedCount} selected</span>
          )}
        </button>

        {isExpanded && (
          <div className="workout-exercise-list">
            {exercises.map(renderExercise)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="workout-exercise-selector">
      <h2>What did you do today?</h2>
      <p className="subtitle">Select exercises from your workout</p>

      <div className="workout-search">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="workout-search-input"
        />
        {searchQuery && (
          <button
            className="workout-search-clear"
            onClick={() => setSearchQuery('')}
          >
            ✕
          </button>
        )}
      </div>

      {filteredExercises ? (
        <div className="workout-search-results">
          {filteredExercises.length === 0 ? (
            <p className="no-results">No exercises found</p>
          ) : (
            filteredExercises.map(renderExercise)
          )}
        </div>
      ) : (
        <div className="workout-categories">
          {(Object.keys(WORKOUT_CATEGORIES) as Category[]).map(renderCategory)}
        </div>
      )}

      {selectedWorkoutExercises.size > 0 && (
        <div className="workout-selection-summary">
          {selectedWorkoutExercises.size} exercise
          {selectedWorkoutExercises.size !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

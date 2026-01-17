import { MuscleGroup, MuscleGroupSelection, Priority, MUSCLE_GROUP_LABELS, PRIORITY_LABELS } from '../types';

interface Props {
  selections: MuscleGroupSelection[];
  onChange: (selections: MuscleGroupSelection[]) => void;
}

const LOWER_BODY: MuscleGroup[] = [
  'quads',
  'hamstrings',
  'glutes',
  'adductors',
  'calves',
  'tibialis',
  'hip_flexors',
  'lower_back',
  'feet',
];

const UPPER_BODY: MuscleGroup[] = [
  'upper_back',
  'traps',
  'lats',
  'chest',
  'shoulders',
  'triceps',
  'biceps',
  'forearms',
];

export function MuscleGroupSelector({ selections, onChange }: Props) {
  const isSelected = (mg: MuscleGroup) =>
    selections.some((s) => s.muscleGroup === mg);

  const getSelection = (mg: MuscleGroup) =>
    selections.find((s) => s.muscleGroup === mg);

  const toggleMuscleGroup = (mg: MuscleGroup) => {
    if (isSelected(mg)) {
      onChange(selections.filter((s) => s.muscleGroup !== mg));
    } else {
      onChange([...selections, { muscleGroup: mg, priority: 2 }]);
    }
  };

  const setPriority = (mg: MuscleGroup, priority: Priority) => {
    onChange(
      selections.map((s) =>
        s.muscleGroup === mg ? { ...s, priority } : s
      )
    );
  };

  const renderMuscleGroup = (mg: MuscleGroup) => {
    const selected = isSelected(mg);
    const selection = getSelection(mg);

    return (
      <div
        key={mg}
        className={`muscle-card ${selected ? 'selected' : ''}`}
      >
        <button
          className="muscle-toggle"
          onClick={() => toggleMuscleGroup(mg)}
        >
          {MUSCLE_GROUP_LABELS[mg]}
        </button>

        {selected && (
          <div className="priority-selector">
            {([1, 2, 3] as Priority[]).map((p) => (
              <button
                key={p}
                className={`priority-btn priority-${p} ${
                  selection?.priority === p ? 'active' : ''
                }`}
                onClick={() => setPriority(mg, p)}
              >
                {PRIORITY_LABELS[p]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="muscle-group-selector">
      <h2>Select Muscle Groups</h2>
      <p className="subtitle">Tap to select, then set priority</p>

      <h3 className="body-section-header">Lower Body</h3>
      <div className="muscle-grid">
        {LOWER_BODY.map(renderMuscleGroup)}
      </div>

      <h3 className="body-section-header">Upper Body</h3>
      <div className="muscle-grid">
        {UPPER_BODY.map(renderMuscleGroup)}
      </div>
    </div>
  );
}

import { MuscleGroup, MuscleGroupSelection, Priority, MUSCLE_GROUP_LABELS, PRIORITY_LABELS } from '../types';

interface Props {
  selections: MuscleGroupSelection[];
  onChange: (selections: MuscleGroupSelection[]) => void;
}

const ALL_MUSCLE_GROUPS: MuscleGroup[] = [
  'quads',
  'hamstrings',
  'glutes',
  'calves',
  'hip_flexors',
  'lower_back',
  'upper_back',
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

  return (
    <div className="muscle-group-selector">
      <h2>Select Muscle Groups</h2>
      <p className="subtitle">Tap to select, then set priority</p>

      <div className="muscle-grid">
        {ALL_MUSCLE_GROUPS.map((mg) => {
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
        })}
      </div>
    </div>
  );
}

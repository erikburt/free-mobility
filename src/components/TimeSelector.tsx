interface Props {
  minutes: number;
  onChange: (minutes: number) => void;
}

const PRESET_TIMES = [5, 10, 15, 20, 30];

export function TimeSelector({ minutes, onChange }: Props) {
  return (
    <div className="time-selector">
      <h2>Session Duration</h2>

      <div className="time-presets">
        {PRESET_TIMES.map((t) => (
          <button
            key={t}
            className={`time-btn ${minutes === t ? 'active' : ''}`}
            onClick={() => onChange(t)}
          >
            {t} min
          </button>
        ))}
      </div>

      <div className="time-custom">
        <label>
          Custom:
          <input
            type="number"
            min={1}
            max={60}
            value={minutes}
            onChange={(e) => onChange(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
          />
          minutes
        </label>
      </div>
    </div>
  );
}

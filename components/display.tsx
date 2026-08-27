export function CalcActions({
  onCalculate,
  onReset,
  calculateLabel = "⚡ Calculate",
  resetLabel = "↻ Reset",
}: {
  onCalculate: () => void;
  onReset: () => void;
  calculateLabel?: string;
  resetLabel?: string;
}) {
  return (
    <div className="calc-actions">
      <button type="button" className="btn btn-primary" onClick={onCalculate}>
        {calculateLabel}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onReset}>
        {resetLabel}
      </button>
    </div>
  );
}

export function Result({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="result-item">
      <span className="result-label">{label}</span>
      <span className={highlight ? "result-value highlight" : "result-value"}>{value}</span>
    </div>
  );
}

export function ResultsPanel({ children, hasResults = false }: { children: React.ReactNode; hasResults?: boolean }) {
  return (
    <div className="calc-results">
      {!hasResults && (
        <div className="results-placeholder">
          <span className="placeholder-icon">&#128200;</span>
          <p>Enter values and click Calculate to see results</p>
        </div>
      )}
      <div className={`results-container ${hasResults ? "results-visible" : ""}`}>{children}</div>
    </div>
  );
}

export function FormulaBox({
  title = "Formulas Used",
  formulas,
  note,
}: {
  title?: string;
  formulas?: React.ReactNode[];
  note?: React.ReactNode;
}) {
  return (
    <div className="formula-box">
      <h3>{title}</h3>
      {formulas ? (
        <ul>
          {formulas.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      ) : null}
      {note ? <p>{note}</p> : null}
    </div>
  );
}

export function DisclaimerBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="disclaimer-box">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Explanation({ children }: { children: React.ReactNode }) {
  return <p className="explanation">{children}</p>;
}

export function Diagram({ children }: { children: string }) {
  return (
    <div className="diagram" aria-label="Calculation diagram">
      {children}
    </div>
  );
}

export function ModeSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="mode-select">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

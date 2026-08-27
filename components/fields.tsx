import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="input-group">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint ? <p className="explanation">{hint}</p> : null}
    </div>
  );
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  step = "any",
  min,
  max,
  hint,
  unitSuffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
  min?: number;
  max?: number;
  hint?: string;
  unitSuffix?: string;
}) {
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {unitSuffix ? <p className="explanation">{unitSuffix}</p> : null}
    </Field>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function UnitField({
  id,
  label,
  value,
  onChange,
  placeholder,
  unitId,
  unitValue,
  onUnitChange,
  unitOptions,
  step = "any",
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unitId: string;
  unitValue: string;
  onUnitChange: (v: string) => void;
  unitOptions: { label: string; value: string }[];
  step?: string;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <div className="unit-row">
        <div className="input-group">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            step={step}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <select
          id={unitId}
          aria-label={`${label} unit`}
          value={unitValue}
          onChange={(e) => onUnitChange(e.target.value)}
        >
          {unitOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </Field>
  );
}

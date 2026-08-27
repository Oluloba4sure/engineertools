"use client";

import { useState, useEffect } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox } from "@/components/display"
import { SelectField, NumberField } from "@/components/fields";;
import { ucUnits, ucFactors, convertTemperature } from "@/lib/units";

const CATEGORIES = [
  { label: "Length", value: "length" },
  { label: "Pressure", value: "pressure" },
  { label: "Power", value: "power" },
  { label: "Energy", value: "energy" },
  { label: "Temperature", value: "temperature" },
];

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("mm");
  const [to, setTo] = useState("cm");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  function doConvert() {
    const raw = value.trim();
    if (raw === "" || isNaN(parseFloat(raw))) {
      setResult(null);
      setError(null);
      return;
    }
    const v = parseFloat(raw);
    const units = ucUnits[category] || [];
    const factors = ucFactors[category] || {};
    if (category === "temperature") {
      const r = convertTemperature(v, from, to);
      setResult(r.toFixed(r === Math.round(r) ? 0 : 4) + " " + to.toUpperCase());
      setError(null);
      return;
    }
    if (!factors[from] || !factors[to]) {
      setError("Invalid unit selection.");
      setResult(null);
      return;
    }
    const base = v * factors[from];
    const r = base / factors[to];
    setResult(r.toFixed(r === Math.round(r) ? 0 : 4) + " " + to.toUpperCase());
    setError(null);
  }

  function onCategory(v: string) {
    setCategory(v);
    const units = ucUnits[v] || [];
    if (units.length >= 2) {
      setFrom(units[0].value);
      setTo(units[1].value);
    } else if (units.length === 1) {
      setFrom(units[0].value);
      setTo(units[0].value);
    }
    setResult(null);
    setError(null);
  }

  function reset() {
    setValue("");
    setResult(null);
    setError(null);
  }

  useEffect(() => {
    doConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const units = ucUnits[category] || [];

  return (
    <CalcPage slug="unit-converter" title="Engineering Unit Converter" badge="Converters" desc="Convert between common engineering units.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <SelectField id="uc-category" label="Category" value={category} onChange={onCategory} options={CATEGORIES} />
            <SelectField id="uc-from" label="From" value={from} onChange={(v) => { setFrom(v); doConvert(); }} options={units} />
            <NumberField id="uc-value" label="Value" value={value} onChange={(v) => { setValue(v); doConvert(); }} placeholder="Enter value" />
            <SelectField id="uc-to" label="To" value={to} onChange={(v) => { setTo(v); doConvert(); }} options={units} />
            <CalcActions onCalculate={doConvert} onReset={reset} calculateLabel="⚡ Convert" />
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </>
        ),
        results: (
          <ResultsPanel>
            <Result label="Converted Value" value={result ?? "—"} />
            <FormulaBox title="Available Units" note={
              <ul>
                {(ucUnits[category] || []).map((u) => (
                  <li key={u.value}>
                    {u.label} ({u.value.toUpperCase()})
                  </li>
                ))}
              </ul>
            } />
            <RelatedCalculators slug="unit-converter" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

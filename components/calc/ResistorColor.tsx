"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation } from "@/components/display"
import { SelectField } from "@/components/fields";;
import { formatResistance } from "@/lib/formulas";

const COLOR_MAP: Record<string, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4, green: 5, blue: 6, violet: 7, grey: 8, white: 9, gold: -1, silver: -2,
};
const TOL_MAP: Record<string, number> = {
  brown: 1, red: 2, green: 0.5, blue: 0.25, violet: 0.1, grey: 0.05, gold: 5, silver: 10,
};
const CONTRAST: Record<string, string> = {
  black: "#fff", brown: "#fff", red: "#fff", orange: "#fff", yellow: "#000", green: "#fff", blue: "#fff", violet: "#fff", grey: "#fff", white: "#000", gold: "#000", silver: "#000",
};

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const BAND_COLORS: Record<string, string> = {
  black: "#222", brown: "#7b3f00", red: "#d32f2f", orange: "#f57c00", yellow: "#fbc02d",
  green: "#388e3c", blue: "#1976d2", violet: "#7b1fa2", grey: "#9e9e9e", white: "#fafafa",
  gold: "#c9a227", silver: "#bdbdbd",
};

function bandColor(b: string): string {
  return BAND_COLORS[b] ?? "#333";
}

export default function ResistorColor() {
  const [b1, setB1] = useState("");
  const [b2, setB2] = useState("");
  const [mult, setMult] = useState("");
  const [tol, setTol] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ value: number; t: number; min: number; max: number } | null>(null);

  function reset() {
    setB1("");
    setB2("");
    setMult("");
    setTol("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    if (!b1 || !b2 || !mult || !tol) {
      setError("Please select all four color bands.");
      setResults(null);
      return;
    }
    const d1 = COLOR_MAP[b1];
    const d2 = COLOR_MAP[b2];
    const m = COLOR_MAP[mult];
    const t = TOL_MAP[tol];
    if (d1 === undefined || d2 === undefined || m === undefined || t === undefined) {
      setError("Invalid color selection.");
      setResults(null);
      return;
    }
    const sig = d1 * 10 + d2;
    const value = sig * Math.pow(10, m);
    const min = value * (1 - t / 100);
    const max = value * (1 + t / 100);
    setResults({ value, t, min, max });
  }

  const bands = [b1, b2, mult, tol];
  const detail =
    results && b1 && b2
      ? `= (${COLOR_MAP[b1]} × 10 + ${COLOR_MAP[b2]}) × 10^${COLOR_MAP[mult]} = ${formatResistance(results.value)} ±${results.t}%`
      : "";

  return (
    <CalcPage slug="resistor-color" title="Resistor Color Code Calculator" badge="Electronics" desc="Decode resistance values from 4-band resistor color codes.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <SelectField id="rc-band1" label="Band 1 (First Digit)" value={b1} onChange={setB1} options={colorOptions("Select color")} />
            <SelectField id="rc-band2" label="Band 2 (Second Digit)" value={b2} onChange={setB2} options={colorOptions("Select color")} />
            <SelectField id="rc-multiplier" label="Multiplier" value={mult} onChange={setMult} options={multiplierOptions()} />
            <SelectField id="rc-tolerance" label="Tolerance" value={tol} onChange={setTol} options={toleranceOptions()} />
            <div className="resistor-visual" aria-label="Visual resistor representation">
              <span className="resistor-lead"></span>
              <div className="resistor-body">
                {bands.map((b, idx) => (
                  <span
                    key={idx}
                    className="resistor-band"
                    style={{
                      backgroundColor: b ? bandColor(b) : "#333",
                      color: b ? CONTRAST[b] : "#fff",
                    }}
                  >
                    {b ? cap(b).slice(0, 1) : idx === 3 ? "T" : idx === 2 ? "M" : "B" + (idx + 1)}
                  </span>
                ))}
              </div>
              <span className="resistor-lead"></span>
            </div>
            <CalcActions onCalculate={calculate} onReset={reset} />
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </>
        ),
        results: (
          <ResultsPanel>
            <Result label="Resistance" value={results ? formatResistance(results.value) : "—"} />
            <Result label="Tolerance" value={results ? `±${results.t}%` : "—"} />
            <Result label="Minimum Resistance" value={results ? formatResistance(results.min) : "—"} />
            <Result label="Maximum Resistance" value={results ? formatResistance(results.max) : "—"} />
            <FormulaBox
              title="Calculation"
              note={
                <>
                  <p>Resistance = (Band1 × 10 + Band2) × Multiplier</p>
                  {detail ? <p>{detail}</p> : null}
                </>
              }
            />
            <Explanation>
              The color bands encode the resistance value and tolerance. The first two bands are
              significant digits, the third is the multiplier, and the fourth is the tolerance.
            </Explanation>
            <RelatedCalculators slug="resistor-color" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

function colorOptions(placeholder: string) {
  const opts = [{ label: placeholder, value: "" }];
  for (const c of ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]) {
    opts.push({ label: cap(c), value: c });
  }
  return opts;
}
function multiplierOptions() {
  return [
    { label: "Select color", value: "" },
    { label: "Black (×1)", value: "black" },
    { label: "Brown (×10)", value: "brown" },
    { label: "Red (×100)", value: "red" },
    { label: "Orange (×1k)", value: "orange" },
    { label: "Yellow (×10k)", value: "yellow" },
    { label: "Green (×100k)", value: "green" },
    { label: "Blue (×1M)", value: "blue" },
    { label: "Violet (×10M)", value: "violet" },
    { label: "Grey (×100M)", value: "grey" },
    { label: "White (×1G)", value: "white" },
    { label: "Gold (×0.1)", value: "gold" },
    { label: "Silver (×0.01)", value: "silver" },
  ];
}
function toleranceOptions() {
  return [
    { label: "Select color", value: "" },
    { label: "Brown (±1%)", value: "brown" },
    { label: "Red (±2%)", value: "red" },
    { label: "Green (±0.5%)", value: "green" },
    { label: "Blue (±0.25%)", value: "blue" },
    { label: "Violet (±0.1%)", value: "violet" },
    { label: "Grey (±0.05%)", value: "grey" },
    { label: "Gold (±5%)", value: "gold" },
    { label: "Silver (±10%)", value: "silver" },
  ];
}

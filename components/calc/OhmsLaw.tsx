"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function OhmsLaw() {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ v: number; i: number; r: number; p: number } | null>(null);

  function reset() {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const V = parseValue(voltage, { allowZero: true, name: "Voltage" });
    const I = parseValue(current, { allowZero: true, name: "Current" });
    const R = parseValue(resistance, { allowZero: true, name: "Resistance" });
    const provided = [V.ok, I.ok, R.ok].filter(Boolean).length;
    if (provided < 2) {
      setError("Enter any two of Voltage, Current and Resistance to calculate the third.");
      setResults(null);
      return;
    }
    let v = V.ok ? V.v : NaN;
    let i = I.ok ? I.v : NaN;
    let r = R.ok ? R.v : NaN;
    if (Number.isNaN(v) && !Number.isNaN(i) && !Number.isNaN(r)) v = i * r;
    if (Number.isNaN(i) && !Number.isNaN(v) && !Number.isNaN(r)) {
      if (r === 0) {
        setError("Resistance cannot be zero for current calculation.");
        setResults(null);
        return;
      }
      i = v / r;
    }
    if (Number.isNaN(r) && !Number.isNaN(v) && !Number.isNaN(i)) {
      if (i === 0) {
        setError("Current cannot be zero for resistance calculation.");
        setResults(null);
        return;
      }
      r = v / i;
    }
    setResults({ v, i, r, p: v * i });
  }

  return (
    <CalcPage slug="ohms-law" title="Ohm's Law Calculator" badge="Electrical" desc="Calculate voltage, current, resistance, and power.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="ol-voltage" label="Voltage (V)" value={voltage} onChange={setVoltage} placeholder="e.g. 12" />
            <NumberField id="ol-current" label="Current (I) in Amps" value={current} onChange={setCurrent} placeholder="e.g. 2" />
            <NumberField id="ol-resistance" label="Resistance (R) in Ohms" value={resistance} onChange={setResistance} placeholder="e.g. 6" />
            <CalcActions onCalculate={calculate} onReset={reset} />
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </>
        ),
        results: (
          <ResultsPanel hasResults={results !== null}>
            <Result label="Voltage" value={results ? results.v.toFixed(4) + " V" : "—"} />
            <Result label="Current" value={results ? results.i.toFixed(4) + " A" : "—"} />
            <Result label="Resistance" value={results ? results.r.toFixed(4) + " Ω" : "—"} />
            <Result label="Power" value={results ? results.p.toFixed(4) + " W" : "—"} />
            <FormulaBox
              formulas={[
                "V = I × R",
                "I = V / R",
                "R = V / I",
                "P = V × I",
              ]}
            />
            <Explanation>Power is calculated from the derived voltage and current.</Explanation>
            <RelatedCalculators slug="ohms-law" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

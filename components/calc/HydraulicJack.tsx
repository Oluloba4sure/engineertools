"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, DisclaimerBox, Diagram } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function HydraulicJack() {
  const [force, setForce] = useState("");
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ a1: number; a2: number; pressure: number; ratio: number; f2: number } | null>(null);

  function reset() {
    setForce("");
    setD1("");
    setD2("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const F1 = parseValue(force, { allowZero: true, name: "Small Piston Force" });
    const D1 = parseValue(d1, { allowZero: true, name: "Small Piston Diameter" });
    const D2 = parseValue(d2, { allowZero: true, name: "Large Piston Diameter" });
    if (!F1.ok) { setError(F1.msg); setResults(null); return; }
    if (!D1.ok) { setError(D1.msg); setResults(null); return; }
    if (!D2.ok) { setError(D2.msg); setResults(null); return; }
    if (D1.v === 0) { setError("Small piston diameter cannot be zero."); setResults(null); return; }
    const a1 = (Math.PI * Math.pow(D1.v / 1000, 2)) / 4;
    const a2 = (Math.PI * Math.pow(D2.v / 1000, 2)) / 4;
    const pressure = F1.v / a1;
    const ratio = a2 / a1;
    setResults({ a1, a2, pressure, ratio, f2: F1.v * ratio });
  }

  return (
    <CalcPage slug="hydraulic-jack" title="Hydraulic Jack Calculator" badge="Fluid & Hydraulics" desc="Calculate hydraulic force multiplication using Pascal's law.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="hj-force" label="Small Piston Force (F₁) in N" value={force} onChange={setForce} placeholder="e.g. 100" />
            <NumberField id="hj-d1" label="Small Piston Diameter (d₁) in mm" value={d1} onChange={setD1} placeholder="e.g. 20" />
            <NumberField id="hj-d2" label="Large Piston Diameter (d₂) in mm" value={d2} onChange={setD2} placeholder="e.g. 100" />
            <Diagram>{"   Load\n    ↓\n ┌─────────┐\n │ Large   │\n │ Piston  │\n └────┬────┘\n      │\nHydraulic\n  Fluid\n      │\n ┌────┴────┐\n │ Small   │\n │ Piston  │\n └─────────┘\n  ↑\n  Force"}</Diagram>
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
            <Result label="Small Piston Area" value={results ? (results.a1 * 1e6).toFixed(4) + " mm²" : "—"} />
            <Result label="Large Piston Area" value={results ? (results.a2 * 1e6).toFixed(4) + " mm²" : "—"} />
            <Result label="Hydraulic Pressure" value={results ? results.pressure.toFixed(2) + " Pa (" + (results.pressure / 1000).toFixed(2) + " kPa)" : "—"} />
            <Result label="Force Multiplication Ratio" value={results ? results.ratio.toFixed(2) + ":1" : "—"} />
            <Result label="Large Piston Force (F₂)" value={results ? results.f2.toFixed(2) + " N (" + (results.f2 / 1000).toFixed(2) + " kN)" : "—"} />
            <FormulaBox formulas={["A = πd² / 4", "P = F / A", "F₂ = F₁ × A₂ / A₁"]} />
            <DisclaimerBox title="Assumption">
              Assumes ideal hydraulic force transmission and does not account for mechanical losses.
            </DisclaimerBox>
            <RelatedCalculators slug="hydraulic-jack" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

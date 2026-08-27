"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function ShaftPower() {
  const [torque, setTorque] = useState("");
  const [rpm, setRpm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ p: number; steps: string } | null>(null);

  function reset() {
    setTorque("");
    setRpm("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const T = parseValue(torque, { allowZero: true, name: "Torque" });
    const N = parseValue(rpm, { allowZero: true, name: "Rotational Speed" });
    if (!T.ok) { setError(T.msg); setResults(null); return; }
    if (!N.ok) { setError(N.msg); setResults(null); return; }
    const p = (2 * Math.PI * N.v * T.v) / 60;
    setResults({ p, steps: `P = 2π × ${N.v} × ${T.v} / 60 = ${p.toFixed(2)} W` });
  }

  return (
    <CalcPage slug="shaft-power" title="Shaft Power Calculator" badge="Mechanical" desc="Calculate mechanical power from torque and rotational speed.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="sp-torque" label="Torque (T) in N·m" value={torque} onChange={setTorque} placeholder="e.g. 50" />
            <NumberField id="sp-rpm" label="Rotational Speed (N) in RPM" value={rpm} onChange={setRpm} placeholder="e.g. 1500" />
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
            <Result label="Power (W)" value={results ? results.p.toFixed(2) + " W" : "—"} />
            <Result label="Power (kW)" value={results ? (results.p / 1000).toFixed(4) + " kW" : "—"} />
            <Result label="Power (hp)" value={results ? (results.p / 746).toFixed(4) + " hp" : "—"} />
            <FormulaBox formulas={["P = 2πNT / 60"]} note={results ? results.steps : null} />
            <RelatedCalculators slug="shaft-power" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

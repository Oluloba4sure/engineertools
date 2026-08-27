"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function GearRatio() {
  const [driver, setDriver] = useState("");
  const [driven, setDriven] = useState("");
  const [inputRpm, setInputRpm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ ratio: number; output: number } | null>(null);

  function reset() {
    setDriver("");
    setDriven("");
    setInputRpm("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const D = parseValue(driver, { allowZero: true, name: "Driver Gear Teeth" });
    const N = parseValue(driven, { allowZero: true, name: "Driven Gear Teeth" });
    const R = parseValue(inputRpm, { allowZero: true, name: "Input RPM" });
    if (!D.ok) { setError(D.msg); setResults(null); return; }
    if (!N.ok) { setError(N.msg); setResults(null); return; }
    if (!R.ok) { setError(R.msg); setResults(null); return; }
    if (D.v === 0) { setError("Driver teeth cannot be zero."); setResults(null); return; }
    const ratio = N.v / D.v;
    setResults({ ratio, output: R.v / ratio });
  }

  return (
    <CalcPage slug="gear-ratio" title="Gear Ratio Calculator" badge="Mechanical" desc="Calculate gear ratio and output speed.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="gr-driver" label="Driver Gear Teeth" value={driver} onChange={setDriver} placeholder="e.g. 20" min={1} />
            <NumberField id="gr-driven" label="Driven Gear Teeth" value={driven} onChange={setDriven} placeholder="e.g. 60" min={1} />
            <NumberField id="gr-input-rpm" label="Input RPM" value={inputRpm} onChange={setInputRpm} placeholder="e.g. 1500" />
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
            <Result label="Gear Ratio" value={results ? results.ratio.toFixed(4) + ":1" : "—"} />
            <Result label="Output RPM" value={results ? results.output.toFixed(2) + " RPM" : "—"} />
            <FormulaBox formulas={["Gear Ratio = Driven Teeth / Driver Teeth", "Output RPM = Input RPM / Gear Ratio"]} />
            <Explanation>A ratio greater than 1 indicates speed reduction and torque multiplication.</Explanation>
            <RelatedCalculators slug="gear-ratio" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

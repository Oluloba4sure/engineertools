"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function MotorSpeed() {
  const [freq, setFreq] = useState("");
  const [poles, setPoles] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ speed: number } | null>(null);

  function reset() {
    setFreq("");
    setPoles("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const F = parseValue(freq, { allowZero: true, name: "Frequency" });
    const P = parseValue(poles, { allowZero: true, name: "Number of Poles" });
    if (!F.ok) { setError(F.msg); setResults(null); return; }
    if (!P.ok) { setError(P.msg); setResults(null); return; }
    if (P.v === 0) { setError("Number of poles cannot be zero."); setResults(null); return; }
    setResults({ speed: (120 * F.v) / P.v });
  }

  return (
    <CalcPage slug="motor-speed" title="Motor Speed Calculator" badge="Mechanical" desc="Calculate synchronous speed from frequency and poles.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="ms-frequency" label="Frequency (f) in Hz" value={freq} onChange={setFreq} placeholder="e.g. 60" />
            <NumberField id="ms-poles" label="Number of Poles (P)" value={poles} onChange={setPoles} placeholder="e.g. 4" min={2} />
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
            <Result label="Synchronous Speed" value={results ? results.speed.toFixed(2) + " RPM" : "—"} />
            <FormulaBox formulas={["Ns = 120 × f / P", "Ns = synchronous speed in RPM", "f = frequency in Hz", "P = number of poles"]} />
            <Explanation>
              This gives the theoretical synchronous speed. Actual induction motor speed will be
              slightly lower due to slip.
            </Explanation>
            <RelatedCalculators slug="motor-speed" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

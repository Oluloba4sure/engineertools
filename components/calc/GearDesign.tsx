"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, DisclaimerBox } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function GearDesign() {
  const [z1, setZ1] = useState("");
  const [z2, setZ2] = useState("");
  const [rpm, setRpm] = useState("");
  const [mod, setMod] = useState("");
  const [pressure, setPressure] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ ratio: number; output: number; d1: number; d2: number; center: number } | null>(null);

  function reset() {
    setZ1("");
    setZ2("");
    setRpm("");
    setMod("");
    setPressure("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const Z1 = parseValue(z1, { allowZero: true, name: "Driver Gear Teeth" });
    const Z2 = parseValue(z2, { allowZero: true, name: "Driven Gear Teeth" });
    const R = parseValue(rpm, { allowZero: true, name: "Driver RPM" });
    const M = parseValue(mod, { allowZero: true, name: "Module" });
    if (!Z1.ok) { setError(Z1.msg); setResults(null); return; }
    if (!Z2.ok) { setError(Z2.msg); setResults(null); return; }
    if (!R.ok) { setError(R.msg); setResults(null); return; }
    if (!M.ok) { setError(M.msg); setResults(null); return; }
    if (Z1.v === 0) { setError("Driver teeth cannot be zero."); setResults(null); return; }
    if (Z2.v === 0) { setError("Driven teeth cannot be zero."); setResults(null); return; }
    const ratio = Z2.v / Z1.v;
    const outRpm = (R.v * Z1.v) / Z2.v;
    const d1 = M.v * Z1.v;
    const d2 = M.v * Z2.v;
    setResults({ ratio, output: outRpm, d1, d2, center: (d1 + d2) / 2 });
  }

  return (
    <CalcPage slug="gear-design" title="Gear Design Calculator" badge="Mechanical" desc="Preliminary gear geometry and ratio calculations.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="gd-z1" label="Driver Gear Teeth (Z₁)" value={z1} onChange={setZ1} placeholder="e.g. 20" min={1} />
            <NumberField id="gd-z2" label="Driven Gear Teeth (Z₂)" value={z2} onChange={setZ2} placeholder="e.g. 60" min={1} />
            <NumberField id="gd-rpm" label="Driver RPM (N₁)" value={rpm} onChange={setRpm} placeholder="e.g. 1500" />
            <NumberField id="gd-module" label="Module (m) in mm" value={mod} onChange={setMod} placeholder="e.g. 2" />
            <NumberField id="gd-pressure" label="Pressure Angle (degrees)" value={pressure} onChange={setPressure} placeholder="e.g. 20" min={0} max={45} hint="Common values: 20° (standard), 14.5°, 25°." />
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
            <Result label="Gear Ratio" value={results ? results.ratio.toFixed(4) + ":1" : "—"} />
            <Result label="Output RPM (N₂)" value={results ? results.output.toFixed(2) + " RPM" : "—"} />
            <Result label="Driver Pitch Diameter" value={results ? results.d1.toFixed(2) + " mm" : "—"} />
            <Result label="Driven Pitch Diameter" value={results ? results.d2.toFixed(2) + " mm" : "—"} />
            <Result label="Center Distance" value={results ? results.center.toFixed(2) + " mm" : "—"} />
            <FormulaBox formulas={["i = Z₂ / Z₁", "N₂ = N₁ × Z₁ / Z₂", "d = m × Z", "a = (d₁ + d₂) / 2"]} />
            <DisclaimerBox title="Important Note">
              This is a simplified gear calculator and does not perform complete gear-strength,
              wear, contact-stress, or AGMA/ISO design verification.
            </DisclaimerBox>
            <RelatedCalculators slug="gear-design" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

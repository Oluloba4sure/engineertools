"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, Diagram } from "@/components/display"
import { NumberField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const FORCE_UNITS = [
  { label: "N", value: "N" },
  { label: "kN", value: "kN" },
];
const ARM_UNITS = [
  { label: "m", value: "m" },
  { label: "cm", value: "cm" },
  { label: "mm", value: "mm" },
];

export default function Torque() {
  const [force, setForce] = useState("");
  const [forceUnit, setForceUnit] = useState("N");
  const [arm, setArm] = useState("");
  const [armUnit, setArmUnit] = useState("m");
  const [angle, setAngle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ nm: number; steps: string } | null>(null);

  function reset() {
    setForce("");
    setArm("");
    setAngle("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const F = parseValue(force, { allowZero: true, name: "Force" });
    const R = parseValue(arm, { allowZero: true, name: "Lever Arm" });
    const A = parseValue(angle, { allowZero: true, name: "Angle" });
    if (!F.ok) { setError(F.msg); setResults(null); return; }
    if (!R.ok) { setError(R.msg); setResults(null); return; }
    if (!A.ok) { setError(A.msg); setResults(null); return; }
    if (A.v < 0 || A.v > 180) { setError("Angle must be between 0 and 180 degrees."); setResults(null); return; }
    const fN = forceUnit === "kN" ? F.v * 1000 : F.v;
    const rM = armUnit === "mm" ? R.v / 1000 : armUnit === "cm" ? R.v / 100 : R.v;
    const tau = rM * fN * Math.sin((A.v * Math.PI) / 180);
    setResults({ nm: tau, steps: `τ = ${rM.toFixed(4)} m × ${fN.toFixed(2)} N × sin(${A.v}°) = ${tau.toFixed(4)} N·m` });
  }

  return (
    <CalcPage slug="torque" title="Torque Calculator" badge="Mechanical" desc="Calculate torque from force, lever arm, and angle.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <UnitField id="tq-force" label="Force (F)" value={force} onChange={setForce} unitId="tq-force-unit" unitValue={forceUnit} onUnitChange={setForceUnit} unitOptions={FORCE_UNITS} placeholder="e.g. 50" />
            <UnitField id="tq-arm" label="Lever Arm (r)" value={arm} onChange={setArm} unitId="tq-arm-unit" unitValue={armUnit} onUnitChange={setArmUnit} unitOptions={ARM_UNITS} placeholder="e.g. 0.5" />
            <NumberField id="tq-angle" label="Angle (θ) in degrees" value={angle} onChange={setAngle} placeholder="e.g. 90" min={0} max={180} hint="Use 90° for the common perpendicular case." />
            <Diagram>{"Force ↓\n  |\n  |  θ\n  |______\n  r      O (pivot)"}</Diagram>
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
            <Result label="Torque (N·m)" value={results ? results.nm.toFixed(4) + " N·m" : "—"} />
            <Result label="Torque (N·mm)" value={results ? (results.nm * 1000).toFixed(2) + " N·mm" : "—"} />
            <Result label="Torque (kN·m)" value={results ? (results.nm / 1000).toFixed(6) + " kN·m" : "—"} />
            <FormulaBox formulas={["τ = r × F × sin(θ)"]} note={results ? results.steps : null} />
            <RelatedCalculators slug="torque" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

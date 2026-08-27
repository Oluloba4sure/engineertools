"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const PRESSURE_UNITS = [
  { label: "Pa", value: "Pa" },
  { label: "kPa", value: "kPa" },
  { label: "MPa", value: "MPa" },
  { label: "bar", value: "bar" },
];

function toPa(v: number, unit: string) {
  return unit === "kPa" ? v * 1e3 : unit === "MPa" ? v * 1e6 : unit === "bar" ? v * 1e5 : v;
}

export default function PumpHead() {
  const [pressure, setPressure] = useState("");
  const [pressureUnit, setPressureUnit] = useState("Pa");
  const [density, setDensity] = useState("");
  const [staticH, setStaticH] = useState("");
  const [friction, setFriction] = useState("");
  const [velocity, setVelocity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ head: number; total: number; steps: string } | null>(null);

  function reset() {
    setPressure("");
    setDensity("");
    setStaticH("");
    setFriction("");
    setVelocity("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const P = parseValue(pressure, { allowZero: true, name: "Pressure" });
    const Rho = parseValue(density, { allowZero: true, name: "Fluid Density" });
    if (!P.ok) { setError(P.msg); setResults(null); return; }
    if (!Rho.ok) { setError(Rho.msg); setResults(null); return; }
    if (Rho.v === 0) { setError("Fluid density cannot be zero."); setResults(null); return; }
    const pPa = toPa(P.v, pressureUnit);
    const g = 9.81;
    const head = pPa / (Rho.v * g);
    const s = staticH.trim() === "" ? 0 : parseFloat(staticH);
    const f = friction.trim() === "" ? 0 : parseFloat(friction);
    const v = velocity.trim() === "" ? 0 : parseFloat(velocity);
    if (![s, f, v].every((x) => isFinite(x))) {
      setError("Optional head values must be valid numbers.");
      setResults(null);
      return;
    }
    const total = head + s + f + v;
    setResults({
      head,
      total,
      steps: `H = ${pPa.toFixed(0)} Pa / (${Rho.v} × 9.81) = ${head.toFixed(2)} m. Total = ${head.toFixed(2)} + ${s} + ${f} + ${v} = ${total.toFixed(2)} m`,
    });
  }

  return (
    <CalcPage slug="pump-head" title="Pump Head Calculator" badge="Fluid & Hydraulics" desc="Calculate pressure head and total dynamic head.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <UnitField id="ph-pressure" label="Pressure (P)" value={pressure} onChange={setPressure} unitId="ph-pressure-unit" unitValue={pressureUnit} onUnitChange={setPressureUnit} unitOptions={PRESSURE_UNITS} placeholder="e.g. 200000" />
            <NumberField id="ph-density" label="Fluid Density (ρ) in kg/m³" value={density} onChange={setDensity} placeholder="e.g. 1000" hint="Water ≈ 1000 kg/m³. Enter a custom density for other fluids." />
            <NumberField id="ph-static" label="Static Head (m) — optional" value={staticH} onChange={setStaticH} placeholder="e.g. 5" />
            <NumberField id="ph-friction" label="Friction Head (m) — optional" value={friction} onChange={setFriction} placeholder="e.g. 2" />
            <NumberField id="ph-velocity" label="Velocity Head (m) — optional" value={velocity} onChange={setVelocity} placeholder="e.g. 0.5" />
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
            <Result label="Pressure Head (H)" value={results ? results.head.toFixed(2) + " m" : "—"} />
            <Result label="Total Dynamic Head" value={results ? results.total.toFixed(2) + " m" : "—"} />
            <FormulaBox formulas={["H = P / (ρg)", "H_total = H_static + H_friction + H_velocity"]} note={results ? results.steps : null} />
            <DisclaimerBox title="Assumption">
              Basic head calculation; actual pump selection requires system-specific flow, friction
              losses, efficiency and manufacturer pump curves.
            </DisclaimerBox>
            <RelatedCalculators slug="pump-head" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

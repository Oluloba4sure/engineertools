"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField, SelectField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const POWER_UNITS = [
  { label: "W", value: "W" },
  { label: "kW", value: "kW" },
];

export default function CableSizing() {
  const [power, setPower] = useState("");
  const [powerUnit, setPowerUnit] = useState("W");
  const [voltage, setVoltage] = useState("");
  const [length, setLength] = useState("");
  const [pf, setPf] = useState("");
  const [vd, setVd] = useState("");
  const [phase, setPhase] = useState("single");
  const [material, setMaterial] = useState("copper");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ current: number; area: number; size: number; vdrop: number; vdPct: number; steps: string } | null>(null);

  function reset() {
    setPower("");
    setVoltage("");
    setLength("");
    setPf("");
    setVd("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const P = parseValue(power, { allowZero: true, name: "Load Power" });
    const V = parseValue(voltage, { allowZero: true, name: "System Voltage" });
    const L = parseValue(length, { allowZero: true, name: "Cable Length" });
    const PF = parseValue(pf, { allowZero: true, name: "Power Factor" });
    const VD = parseValue(vd, { allowZero: true, name: "Allowable Voltage Drop" });
    if (!P.ok) { setError(P.msg); setResults(null); return; }
    if (!V.ok) { setError(V.msg); setResults(null); return; }
    if (!L.ok) { setError(L.msg); setResults(null); return; }
    if (!PF.ok) { setError(PF.msg); setResults(null); return; }
    if (!VD.ok) { setError(VD.msg); setResults(null); return; }
    if (V.v === 0) { setError("Voltage cannot be zero."); setResults(null); return; }
    if (PF.v === 0) { setError("Power factor cannot be zero."); setResults(null); return; }
    if (VD.v === 0) { setError("Allowable voltage drop cannot be zero."); setResults(null); return; }

    const pW = powerUnit === "kW" ? P.v * 1000 : P.v;
    const rho = material === "copper" ? 1.68e-8 : 2.82e-8;
    const current = phase === "single" ? pW / (V.v * PF.v) : pW / (Math.sqrt(3) * V.v * PF.v);
    const vdMax = (V.v * VD.v) / 100;
    const stdSizes = [1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
    const minAreaM2 = (2 * current * rho * L.v) / vdMax;
    const minAreaMm2 = minAreaM2 * 1e6;
    const chosen = stdSizes.find((s) => s >= minAreaMm2) || 120;
    const vdrop = (2 * current * rho * L.v) / (chosen * 1e-6);
    const vdActualPct = (vdrop / V.v) * 100;
    setResults({
      current,
      area: minAreaMm2,
      size: chosen,
      vdrop,
      vdPct: vdActualPct,
      steps: `I = ${pW.toFixed(0)} / (${phase === "single" ? V.v + " × " + PF.v : "√3 × " + V.v + " × " + PF.v}) = ${current.toFixed(2)} A. Min area = ${minAreaMm2.toFixed(2)} mm². Selected: ${chosen} mm².`,
    });
  }

  return (
    <CalcPage slug="cable-sizing" title="Cable Sizing Calculator" badge="Energy & Power Systems" desc="Estimate conductor size based on load current and voltage drop.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <UnitField
              id="cs-power"
              label="Load Power"
              value={power}
              onChange={setPower}
              unitId="cs-power-unit"
              unitValue={powerUnit}
              onUnitChange={setPowerUnit}
              unitOptions={POWER_UNITS}
              placeholder="e.g. 5000"
            />
            <NumberField id="cs-voltage" label="System Voltage (V)" value={voltage} onChange={setVoltage} placeholder="e.g. 230" />
            <SelectField id="cs-phase" label="System Type" value={phase} onChange={setPhase} options={[{ label: "Single-Phase", value: "single" }, { label: "Three-Phase", value: "three" }]} />
            <NumberField id="cs-length" label="Cable Length (one-way, m)" value={length} onChange={setLength} placeholder="e.g. 30" hint="The calculator uses one-way length and accounts for the return path in the voltage-drop calculation." />
            <SelectField id="cs-material" label="Conductor Material" value={material} onChange={setMaterial} options={[{ label: "Copper", value: "copper" }, { label: "Aluminium", value: "aluminium" }]} />
            <NumberField id="cs-pf" label="Power Factor" value={pf} onChange={setPf} placeholder="e.g. 0.9" min={0} max={1} />
            <NumberField id="cs-vd" label="Allowable Voltage Drop (%)" value={vd} onChange={setVd} placeholder="e.g. 3" min={0} />
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
            <Result label="Load Current" value={results ? results.current.toFixed(2) + " A" : "—"} />
            <Result label="Minimum Estimated Conductor Area" value={results ? results.area.toFixed(2) + " mm²" : "—"} />
            <Result label="Recommended Standard Cable Size" value={results ? results.size + " mm²" : "—"} />
            <Result label="Estimated Voltage Drop" value={results ? results.vdrop.toFixed(2) + " V" : "—"} />
            <Result label="Voltage Drop (%)" value={results ? results.vdPct.toFixed(2) + "%" : "—"} />
            <Result label="Conductor Material" value={results ? material.charAt(0).toUpperCase() + material.slice(1) : "—"} />
            <FormulaBox
              formulas={[
                "I = P / (V × PF) — single-phase",
                "I = P / (√3 × V × PF) — three-phase",
                "Vdrop = I × ρ × L × 2 / A (simplified resistive)",
              ]}
              note={results ? results.steps : null}
            />
            <DisclaimerBox title="Critical Safety Notice">
              This is a preliminary cable-sizing calculator, not a substitute for electrical
              installation design. Actual cable selection must consider ampacity, installation method,
              ambient temperature, grouping, insulation rating, short-circuit withstand, protective
              devices, voltage drop limits and applicable electrical codes/standards.
            </DisclaimerBox>
            <RelatedCalculators slug="cable-sizing" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

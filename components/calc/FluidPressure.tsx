"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { Tabs } from "@/components/Tabs";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField, SelectField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const DEPTH_UNITS = [
  { label: "m", value: "m" },
  { label: "cm", value: "cm" },
  { label: "mm", value: "mm" },
];
const RESULT_UNITS = [
  { label: "Pa", value: "Pa" },
  { label: "kPa", value: "kPa" },
  { label: "MPa", value: "MPa" },
  { label: "bar", value: "bar" },
  { label: "psi", value: "psi" },
  { label: "atm", value: "atm" },
];
const CONVERSIONS: Record<string, number> = { Pa: 1, kPa: 1000, MPa: 1e6, bar: 1e5, psi: 6894.757, atm: 101325 };

function depthToM(v: number, unit: string) {
  return unit === "cm" ? v / 100 : unit === "mm" ? v / 1000 : v;
}

export default function FluidPressure() {
  const [density, setDensity] = useState("");
  const [depth, setDepth] = useState("");
  const [depthUnit, setDepthUnit] = useState("m");
  const [fVal, setFVal] = useState("");
  const [area, setArea] = useState("");
  const [resultUnit, setResultUnit] = useState("Pa");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ pPa: number; steps: string } | null>(null);

  function reset() {
    setDensity("");
    setDepth("");
    setFVal("");
    setArea("");
    setError(null);
    setResults(null);
  }

  function calculate(active: "hydro" | "force") {
    setError(null);
    if (active === "hydro") {
      const Rho = parseValue(density, { allowZero: true, name: "Fluid Density" });
      const H = parseValue(depth, { allowZero: true, name: "Fluid Depth" });
      if (!Rho.ok) { setError(Rho.msg); setResults(null); return; }
      if (!H.ok) { setError(H.msg); setResults(null); return; }
      const hM = depthToM(H.v, depthUnit);
      const pPa = Rho.v * 9.81 * hM;
      setResults({ pPa, steps: `P = ${Rho.v} × 9.81 × ${hM} = ${pPa.toFixed(2)} Pa` });
    } else {
      const F = parseValue(fVal, { allowZero: true, name: "Force" });
      const A = parseValue(area, { allowZero: true, name: "Area" });
      if (!F.ok) { setError(F.msg); setResults(null); return; }
      if (!A.ok) { setError(A.msg); setResults(null); return; }
      if (A.v === 0) { setError("Area cannot be zero."); setResults(null); return; }
      const pPa = F.v / A.v;
      setResults({ pPa, steps: `P = ${F.v} / ${A.v} = ${pPa.toFixed(2)} Pa` });
    }
  }

  return (
    <CalcPage slug="fluid-pressure" title="Fluid Pressure Calculator" badge="Fluid & Hydraulics" desc="Calculate hydrostatic pressure and pressure from force and area.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <Tabs
              tabs={[
                {
                  id: "hydro",
                  label: "Hydrostatic Pressure",
                  content: (
                    <>
                      <NumberField id="fp-density" label="Fluid Density (ρ) in kg/m³" value={density} onChange={setDensity} placeholder="e.g. 1000" />
                      <UnitField id="fp-depth" label="Fluid Depth (h)" value={depth} onChange={setDepth} unitId="fp-depth-unit" unitValue={depthUnit} onUnitChange={setDepthUnit} unitOptions={DEPTH_UNITS} placeholder="e.g. 10" />
                      <CalcActions onCalculate={() => calculate("hydro")} onReset={reset} />
                    </>
                  ),
                },
                {
                  id: "force",
                  label: "Force / Area",
                  content: (
                    <>
                      <NumberField id="fp-force-val" label="Force (F) in N" value={fVal} onChange={setFVal} placeholder="e.g. 500" />
                      <NumberField id="fp-area" label="Area (A) in m²" value={area} onChange={setArea} placeholder="e.g. 0.05" />
                      <CalcActions onCalculate={() => calculate("force")} onReset={reset} />
                    </>
                  ),
                },
              ]}
            />
            <SelectField id="fp-result-unit" label="Result Unit" value={resultUnit} onChange={setResultUnit} options={RESULT_UNITS} />
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </>
        ),
        results: (
          <ResultsPanel hasResults={results !== null}>
            <Result label="Pressure" value={results ? (results.pPa / CONVERSIONS[resultUnit]).toFixed(4) + " " + resultUnit : "—"} />
            <Result label="Pressure (Pa)" value={results ? results.pPa.toFixed(2) + " Pa" : "—"} />
            <Result label="Pressure (kPa)" value={results ? (results.pPa / 1000).toFixed(4) + " kPa" : "—"} />
            <Result label="Pressure (bar)" value={results ? (results.pPa / 1e5).toFixed(6) + " bar" : "—"} />
            <Result label="Pressure (psi)" value={results ? (results.pPa / 6894.757).toFixed(4) + " psi" : "—"} />
            <FormulaBox formulas={["P = ρgh", "P = F / A"]} note={results ? results.steps : null} />
            <DisclaimerBox title="Assumption">
              Hydrostatic pressure assumes a static fluid and known density.
            </DisclaimerBox>
            <RelatedCalculators slug="fluid-pressure" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

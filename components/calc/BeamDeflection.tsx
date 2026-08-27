"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { ModeSelect, CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox, Diagram } from "@/components/display"
import { NumberField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const LENGTH_UNITS = [
  { label: "m", value: "m" },
  { label: "mm", value: "mm" },
];
const LOAD_UNITS = [
  { label: "N", value: "N" },
  { label: "kN", value: "kN" },
];
const UDL_UNITS = [
  { label: "N/m", value: "N/m" },
  { label: "kN/m", value: "kN/m" },
];
const E_UNITS = [
  { label: "GPa", value: "GPa" },
  { label: "MPa", value: "MPa" },
  { label: "Pa", value: "Pa" },
];
const I_UNITS = [
  { label: "m⁴", value: "m4" },
  { label: "mm⁴", value: "mm4" },
];

function lengthToM(v: number, unit: string) {
  return unit === "mm" ? v / 1000 : v;
}
function loadToN(v: number, unit: string) {
  return unit === "kN" ? v * 1000 : v;
}
function loadToNm(v: number, unit: string) {
  return unit === "kN/m" ? v * 1000 : v;
}
function eToPa(v: number, unit: string) {
  return unit === "GPa" ? v * 1e9 : unit === "MPa" ? v * 1e6 : v;
}
function iToM4(v: number, unit: string) {
  return unit === "mm4" ? v * 1e-12 : v;
}

const DIAGRAMS: Record<string, string> = {
  "ss-point": "Support ▲────────────▲\n        ↓ P",
  "ss-udl": "Support ▲────────────▲\n        w ↓↓↓↓↓",
  "cant-point": "Wall │───────────────\n     ↓ P",
  "cant-udl": "Wall │───────────────\n     w ↓↓↓↓↓",
};

export default function BeamDeflection() {
  const [type, setType] = useState("ss-point");
  const [length, setLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("m");
  const [load, setLoad] = useState("");
  const [loadUnit, setLoadUnit] = useState("N");
  const [udl, setUdl] = useState("");
  const [udlUnit, setUdlUnit] = useState("N/m");
  const [e, setE] = useState("");
  const [eUnit, setEUnit] = useState("GPa");
  const [i, setI] = useState("");
  const [iUnit, setIUnit] = useState("m4");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ deflection: number; formula: string; steps: string } | null>(null);

  const isUdl = type === "ss-udl" || type === "cant-udl";

  function reset() {
    setLength("");
    setLoad("");
    setUdl("");
    setE("");
    setI("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const L = parseValue(length, { allowZero: true, name: "Beam Length" });
    const E = parseValue(e, { allowZero: true, name: "Young's Modulus" });
    const I = parseValue(i, { allowZero: true, name: "Second Moment of Area" });
    const P = parseValue(isUdl ? udl : load, { allowZero: true, name: isUdl ? "Uniform Load" : "Applied Load" });
    if (!L.ok) { setError(L.msg); setResults(null); return; }
    if (!E.ok) { setError(E.msg); setResults(null); return; }
    if (!I.ok) { setError(I.msg); setResults(null); return; }
    if (!P.ok) { setError(P.msg); setResults(null); return; }
    if (E.v === 0) { setError("Young's modulus cannot be zero."); setResults(null); return; }
    if (I.v === 0) { setError("Second moment of area cannot be zero."); setResults(null); return; }

    const Lm = lengthToM(L.v, lengthUnit);
    const loadN = loadToN(P.v, isUdl ? udlUnit : loadUnit);
    const ePa = eToPa(E.v, eUnit);
    const iM4 = iToM4(I.v, iUnit);

    let delta: number;
    let formula: string;
    if (type === "ss-point") {
      delta = (loadN * Math.pow(Lm, 3)) / (48 * ePa * iM4);
      formula = "δmax = PL³ / 48EI";
    } else if (type === "ss-udl") {
      delta = (5 * loadN * Math.pow(Lm, 4)) / (384 * ePa * iM4);
      formula = "δmax = 5wL⁴ / 384EI";
    } else if (type === "cant-point") {
      delta = (loadN * Math.pow(Lm, 3)) / (3 * ePa * iM4);
      formula = "δmax = PL³ / 3EI";
    } else {
      delta = (loadN * Math.pow(Lm, 4)) / (8 * ePa * iM4);
      formula = "δmax = wL⁴ / 8EI";
    }
    const deltaMm = delta * 1000;
    setResults({
      deflection: deltaMm,
      formula,
      steps: `Substituting values: ${formula} = ${delta.toExponential(4)} m = ${deltaMm.toFixed(4)} mm`,
    });
  }

  return (
    <CalcPage slug="beam-deflection" title="Beam Deflection Calculator" badge="Mechanical" desc="Estimate maximum deflection for common beam configurations.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <ModeSelect
              id="bd-type"
              label="Beam Type"
              value={type}
              onChange={(v) => setType(v)}
              options={[
                { label: "Simply Supported — Center Point Load", value: "ss-point" },
                { label: "Simply Supported — Uniformly Distributed Load", value: "ss-udl" },
                { label: "Cantilever — End Point Load", value: "cant-point" },
                { label: "Cantilever — Uniformly Distributed Load", value: "cant-udl" },
              ]}
            />
            <UnitField id="bd-length" label="Beam Length (L)" value={length} onChange={setLength} unitId="bd-length-unit" unitValue={lengthUnit} onUnitChange={setLengthUnit} unitOptions={LENGTH_UNITS} placeholder="e.g. 3" />
            {isUdl ? (
              <UnitField id="bd-udl" label="Uniform Load (w)" value={udl} onChange={setUdl} unitId="bd-udl-unit" unitValue={udlUnit} onUnitChange={setUdlUnit} unitOptions={UDL_UNITS} placeholder="e.g. 5" />
            ) : (
              <UnitField id="bd-load" label="Applied Load (P)" value={load} onChange={setLoad} unitId="bd-load-unit" unitValue={loadUnit} onUnitChange={setLoadUnit} unitOptions={LOAD_UNITS} placeholder="e.g. 10" />
            )}
            <UnitField id="bd-e" label="Young's Modulus (E)" value={e} onChange={setE} unitId="bd-e-unit" unitValue={eUnit} onUnitChange={setEUnit} unitOptions={E_UNITS} placeholder="e.g. 200" />
            <UnitField id="bd-i" label="Second Moment of Area (I)" value={i} onChange={setI} unitId="bd-i-unit" unitValue={iUnit} onUnitChange={setIUnit} unitOptions={I_UNITS} placeholder="e.g. 8.33e-6" />
            <Diagram>{DIAGRAMS[type]}</Diagram>
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
            <Result label="Maximum Deflection" value={results ? results.deflection.toFixed(4) + " mm (" + (results.deflection / 1000).toExponential(4) + " m)" : "—"} />
            <FormulaBox title="Formula Used" note={<><p>{results ? results.formula : "—"}</p><p>{results ? results.steps : "—"}</p></>} />
            <DisclaimerBox title="Important Note">
              This calculator uses simplified beam theory and is intended for educational and
              preliminary calculations. It should not replace detailed structural analysis or
              professional engineering design.
            </DisclaimerBox>
            <RelatedCalculators slug="beam-deflection" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

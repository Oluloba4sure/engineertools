"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { Tabs } from "@/components/Tabs";
import { CalcActions, Result, ResultsPanel, FormulaBox } from "@/components/display"
import { NumberField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const FREQ_UNITS = [
  { label: "Hz", value: "Hz" },
  { label: "kHz", value: "kHz" },
  { label: "MHz", value: "MHz" },
];
const IND_UNITS = [
  { label: "µH", value: "uH" },
  { label: "mH", value: "mH" },
  { label: "H", value: "H" },
];

function toHz(v: number, unit: string) {
  return unit === "kHz" ? v * 1e3 : unit === "MHz" ? v * 1e6 : v;
}
function indToH(v: number, unit: string) {
  return unit === "uH" ? v * 1e-6 : unit === "mH" ? v * 1e-3 : v;
}

export default function Inductor() {
  const [freq, setFreq] = useState("");
  const [freqUnit, setFreqUnit] = useState("Hz");
  const [ind, setInd] = useState("");
  const [indUnit, setIndUnit] = useState("uH");
  const [res, setRes] = useState("");
  const [indRl, setIndRl] = useState("");
  const [indUnitRl, setIndUnitRl] = useState("uH");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ xl: number | null; tc: number | null; f: number; l: number; lUnit: string } | null>(null);

  function reset() {
    setFreq("");
    setInd("");
    setRes("");
    setIndRl("");
    setError(null);
    setResults(null);
  }

  function calculate(active: "reactance" | "time") {
    setError(null);
    if (active === "reactance") {
      const F = parseValue(freq, { allowZero: true, name: "Frequency" });
      const L = parseValue(ind, { allowZero: true, name: "Inductance" });
      if (!F.ok || !L.ok) {
        setError(!F.ok ? F.msg : L.msg);
        setResults(null);
        return;
      }
      const fHz = toHz(F.v, freqUnit);
      const lH = indToH(L.v, indUnit);
      const xl = 2 * Math.PI * fHz * lH;
      setResults({ xl, tc: null, f: fHz, l: L.v, lUnit: indUnit });
    } else {
      const R = parseValue(res, { allowZero: true, name: "Resistance" });
      const L = parseValue(indRl, { allowZero: true, name: "Inductance" });
      if (!R.ok || !L.ok) {
        setError(!R.ok ? R.msg : L.msg);
        setResults(null);
        return;
      }
      if (R.v === 0) {
        setError("Resistance cannot be zero.");
        setResults(null);
        return;
      }
      const tau = indToH(L.v, indUnitRl) / R.v;
      setResults({ xl: null, tc: tau, f: 0, l: L.v, lUnit: indUnitRl });
    }
  }

  return (
    <CalcPage slug="inductor" title="Inductor Calculator" badge="Electronics" desc="Calculate inductive reactance and RL time constants.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <Tabs
              tabs={[
                {
                  id: "reactance",
                  label: "Inductive Reactance",
                  content: (
                    <>
                      <UnitField
                        id="ind-frequency"
                        label="Frequency"
                        value={freq}
                        onChange={setFreq}
                        unitId="ind-freq-unit"
                        unitValue={freqUnit}
                        onUnitChange={setFreqUnit}
                        unitOptions={FREQ_UNITS}
                        placeholder="e.g. 50"
                      />
                      <UnitField
                        id="ind-inductance"
                        label="Inductance"
                        value={ind}
                        onChange={setInd}
                        unitId="ind-ind-unit"
                        unitValue={indUnit}
                        onUnitChange={setIndUnit}
                        unitOptions={IND_UNITS}
                        placeholder="e.g. 10"
                      />
                      <CalcActions onCalculate={() => calculate("reactance")} onReset={reset} />
                    </>
                  ),
                },
                {
                  id: "time",
                  label: "RL Time Constant",
                  content: (
                    <>
                      <UnitField
                        id="ind-inductance-rl"
                        label="Inductance"
                        value={indRl}
                        onChange={setIndRl}
                        unitId="ind-ind-unit-rl"
                        unitValue={indUnitRl}
                        onUnitChange={setIndUnitRl}
                        unitOptions={IND_UNITS}
                        placeholder="e.g. 10"
                      />
                      <NumberField id="ind-resistance" label="Resistance (R) in Ohms" value={res} onChange={setRes} placeholder="e.g. 100" />
                      <CalcActions onCalculate={() => calculate("time")} onReset={reset} />
                    </>
                  ),
                },
              ]}
            />
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </>
        ),
        results: (
          <ResultsPanel>
            <Result label="Inductive Reactance (XL)" value={results && results.xl !== null ? results.xl.toFixed(4) + " Ω" : "—"} />
            <Result label="Frequency" value={results ? (results.f === 0 ? "—" : results.f + " Hz") : "—"} />
            <Result label="Inductance" value={results ? results.l + " " + results.lUnit : "—"} />
            <Result label="RL Time Constant (τ)" value={results && results.tc !== null ? results.tc.toFixed(6) + " s" : "—"} />
            <FormulaBox formulas={["XL = 2πfL", "τ = L / R"]} />
            <RelatedCalculators slug="inductor" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

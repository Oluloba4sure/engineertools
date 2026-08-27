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
const CAP_UNITS = [
  { label: "pF", value: "pF" },
  { label: "nF", value: "nF" },
  { label: "µF", value: "uF" },
  { label: "mF", value: "mF" },
  { label: "F", value: "F" },
];

function toHz(v: number, unit: string) {
  return unit === "kHz" ? v * 1e3 : unit === "MHz" ? v * 1e6 : v;
}
function capToF(v: number, unit: string) {
  return unit === "pF" ? v * 1e-12 : unit === "nF" ? v * 1e-9 : unit === "uF" ? v * 1e-6 : unit === "mF" ? v * 1e-3 : v;
}

export default function Capacitor() {
  const [freq, setFreq] = useState("");
  const [freqUnit, setFreqUnit] = useState("Hz");
  const [cap, setCap] = useState("");
  const [capUnit, setCapUnit] = useState("pF");
  const [res, setRes] = useState("");
  const [capRc, setCapRc] = useState("");
  const [capUnitRc, setCapUnitRc] = useState("pF");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ xc: number | null; tc: number | null; f: number; c: number; cUnit: string } | null>(null);

  function reset() {
    setFreq("");
    setCap("");
    setRes("");
    setCapRc("");
    setError(null);
    setResults(null);
  }

  function calculate(active: "reactance" | "time") {
    setError(null);
    if (active === "reactance") {
      const F = parseValue(freq, { allowZero: true, name: "Frequency" });
      const C = parseValue(cap, { allowZero: true, name: "Capacitance" });
      if (!F.ok || !C.ok) {
        setError(!F.ok ? F.msg : C.msg);
        setResults(null);
        return;
      }
      const fHz = toHz(F.v, freqUnit);
      const cF = capToF(C.v, capUnit);
      if (cF === 0) {
        setError("Capacitance cannot be zero.");
        setResults(null);
        return;
      }
      const xc = 1 / (2 * Math.PI * fHz * cF);
      setResults({ xc, tc: null, f: fHz, c: C.v, cUnit: capUnit });
    } else {
      const R = parseValue(res, { allowZero: true, name: "Resistance" });
      const C = parseValue(capRc, { allowZero: true, name: "Capacitance" });
      if (!R.ok || !C.ok) {
        setError(!R.ok ? R.msg : C.msg);
        setResults(null);
        return;
      }
      if (R.v === 0) {
        setError("Resistance cannot be zero.");
        setResults(null);
        return;
      }
      const tau = R.v * capToF(C.v, capUnitRc);
      setResults({ xc: null, tc: tau, f: 0, c: C.v, cUnit: capUnitRc });
    }
  }

  return (
    <CalcPage slug="capacitor" title="Capacitor Calculator" badge="Electronics" desc="Calculate capacitive reactance and RC time constants.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <Tabs
              tabs={[
                {
                  id: "reactance",
                  label: "Capacitive Reactance",
                  content: (
                    <>
                      <UnitField
                        id="cap-frequency"
                        label="Frequency"
                        value={freq}
                        onChange={setFreq}
                        unitId="cap-freq-unit"
                        unitValue={freqUnit}
                        onUnitChange={setFreqUnit}
                        unitOptions={FREQ_UNITS}
                        placeholder="e.g. 50"
                      />
                      <UnitField
                        id="cap-capacitance"
                        label="Capacitance"
                        value={cap}
                        onChange={setCap}
                        unitId="cap-cap-unit"
                        unitValue={capUnit}
                        onUnitChange={setCapUnit}
                        unitOptions={CAP_UNITS}
                        placeholder="e.g. 10"
                      />
                      <CalcActions onCalculate={() => calculate("reactance")} onReset={reset} />
                    </>
                  ),
                },
                {
                  id: "time",
                  label: "RC Time Constant",
                  content: (
                    <>
                      <NumberField id="cap-resistance" label="Resistance (R) in Ohms" value={res} onChange={setRes} placeholder="e.g. 1000" />
                      <UnitField
                        id="cap-capacitance-rc"
                        label="Capacitance"
                        value={capRc}
                        onChange={setCapRc}
                        unitId="cap-cap-unit-rc"
                        unitValue={capUnitRc}
                        onUnitChange={setCapUnitRc}
                        unitOptions={CAP_UNITS}
                        placeholder="e.g. 100"
                      />
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
            <Result label="Capacitive Reactance (Xc)" value={results && results.xc !== null ? results.xc.toFixed(4) + " Ω" : "—"} />
            <Result label="Frequency" value={results ? (results.f === 0 ? "—" : results.f + " Hz") : "—"} />
            <Result label="Capacitance" value={results ? results.c + " " + results.cUnit : "—"} />
            <Result label="RC Time Constant (τ)" value={results && results.tc !== null ? results.tc.toFixed(6) + " s" : "—"} />
            <FormulaBox formulas={["Xc = 1 / (2πfC)", "τ = R × C"]} />
            <RelatedCalculators slug="capacitor" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation } from "@/components/display"
import { NumberField, SelectField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function ElectricalPower() {
  const [pUnit, setPUnit] = useState("W");
  const [power, setPower] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ p: number; v: number; i: number; e: number | null } | null>(null);

  function reset() {
    setPower("");
    setVoltage("");
    setCurrent("");
    setTime("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const P = parseValue(power, { allowZero: true, name: "Power" });
    const V = parseValue(voltage, { allowZero: true, name: "Voltage" });
    const I = parseValue(current, { allowZero: true, name: "Current" });
    const T = parseValue(time, { allowZero: true, name: "Time" });
    const known = [P.ok, V.ok, I.ok].filter(Boolean).length;
    if (known < 2) {
      setError("Enter at least two of Power, Voltage, and Current.");
      setResults(null);
      return;
    }
    let p = P.ok ? P.v : NaN;
    let v = V.ok ? V.v : NaN;
    let i = I.ok ? I.v : NaN;
    if (Number.isNaN(p) && !Number.isNaN(v) && !Number.isNaN(i)) p = v * i;
    if (Number.isNaN(v) && !Number.isNaN(p) && !Number.isNaN(i)) {
      if (i === 0) {
        setError("Current cannot be zero.");
        setResults(null);
        return;
      }
      v = p / i;
    }
    if (Number.isNaN(i) && !Number.isNaN(p) && !Number.isNaN(v)) {
      if (v === 0) {
        setError("Voltage cannot be zero.");
        setResults(null);
        return;
      }
      i = p / v;
    }
    const scale = pUnit === "kW" ? 1000 : 1;
    const pW = p * scale;
    const e = T.ok ? pW * T.v : null;
    setResults({ p, v, i, e });
  }

  return (
    <CalcPage slug="electrical-power" title="Electrical Power Calculator" badge="Electrical" desc="Calculate power, voltage, current, and energy.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField
              id="ep-power"
              label={`Power (P) in ${pUnit}`}
              value={power}
              onChange={setPower}
              placeholder="e.g. 100"
            />
            <SelectField
              id="ep-power-unit"
              label="Power Unit"
              value={pUnit}
              onChange={setPUnit}
              options={[
                { label: "W", value: "W" },
                { label: "kW", value: "kW" },
              ]}
            />
            <NumberField id="ep-voltage" label="Voltage (V)" value={voltage} onChange={setVoltage} placeholder="e.g. 12" />
            <NumberField id="ep-current" label="Current (I) in Amps" value={current} onChange={setCurrent} placeholder="e.g. 8.33" />
            <NumberField id="ep-time" label="Time (t) in hours" value={time} onChange={setTime} placeholder="e.g. 2" />
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
            <Result label="Power" value={results ? (pUnit === "kW" ? (results.p / 1000).toFixed(4) : results.p.toFixed(4)) + " " + pUnit : "—"} />
            <Result label="Voltage" value={results ? results.v.toFixed(4) + " V" : "—"} />
            <Result label="Current" value={results ? results.i.toFixed(4) + " A" : "—"} />
            <Result
              label="Energy"
              value={results && results.e !== null ? (results.e >= 1000 ? (results.e / 1000).toFixed(4) + " kWh" : results.e.toFixed(4) + " Wh") : "—"}
            />
            <FormulaBox formulas={["P = V × I", "E = P × t"]} />
            <Explanation>Energy is calculated only when power and time are known.</Explanation>
            <RelatedCalculators slug="electrical-power" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

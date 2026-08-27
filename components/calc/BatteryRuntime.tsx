"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, DisclaimerBox } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function BatteryRuntime() {
  const [voltage, setVoltage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [load, setLoad] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ runtime: number } | null>(null);

  function reset() {
    setVoltage("");
    setCapacity("");
    setLoad("");
    setEfficiency("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const V = parseValue(voltage, { allowZero: true, name: "Battery Voltage" });
    const Ah = parseValue(capacity, { allowZero: true, name: "Battery Capacity" });
    const L = parseValue(load, { allowZero: true, name: "Load Power" });
    const E = parseValue(efficiency, { allowZero: true, name: "Efficiency" });
    if (!V.ok) { setError(V.msg); setResults(null); return; }
    if (!Ah.ok) { setError(Ah.msg); setResults(null); return; }
    if (!L.ok) { setError(L.msg); setResults(null); return; }
    if (!E.ok) { setError(E.msg); setResults(null); return; }
    if (L.v === 0) { setError("Load power cannot be zero."); setResults(null); return; }
    const eta = E.v / 100;
    const runtime = (V.v * Ah.v * eta) / L.v;
    setResults({ runtime });
  }

  function fmt(runtime: number) {
    const h = Math.floor(runtime);
    const m = Math.round((runtime - h) * 60);
    return h + "h " + m + "m (approx " + runtime.toFixed(2) + " hours)";
  }

  return (
    <CalcPage slug="battery-runtime" title="Battery Runtime Calculator" badge="Energy" desc="Estimate runtime from battery capacity and load.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="br-voltage" label="Battery Voltage (V)" value={voltage} onChange={setVoltage} placeholder="e.g. 12" />
            <NumberField id="br-capacity" label="Battery Capacity (Ah)" value={capacity} onChange={setCapacity} placeholder="e.g. 100" />
            <NumberField id="br-load" label="Load Power (W)" value={load} onChange={setLoad} placeholder="e.g. 50" />
            <NumberField id="br-efficiency" label="Efficiency (%)" value={efficiency} onChange={setEfficiency} placeholder="e.g. 90" min={0} max={100} />
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
            <Result label="Estimated Runtime" value={results ? fmt(results.runtime) : "—"} />
            <DisclaimerBox title="Important Disclaimer">
              This is an estimate only. Actual runtime depends on battery condition, discharge
              characteristics, temperature, age, and actual load profile.
            </DisclaimerBox>
            <FormulaBox
              formulas={["Runtime (h) = (V × Ah × η) / Load", "where η = efficiency / 100"]}
            />
            <RelatedCalculators slug="battery-runtime" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

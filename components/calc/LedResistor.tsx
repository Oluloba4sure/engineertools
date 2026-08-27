"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, DisclaimerBox } from "@/components/display"
import { NumberField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";
import { nextStandardResistor } from "@/lib/formulas";

const CURRENT_UNITS = [
  { label: "mA", value: "mA" },
  { label: "A", value: "A" },
];

export default function LedResistor() {
  const [vs, setVs] = useState("");
  const [vf, setVf] = useState("");
  const [current, setCurrent] = useState("");
  const [currentUnit, setCurrentUnit] = useState("mA");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ r: number; std: number; p: number; rec: number } | null>(null);

  function reset() {
    setVs("");
    setVf("");
    setCurrent("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const Vs = parseValue(vs, { allowZero: true, name: "Supply Voltage" });
    const Vf = parseValue(vf, { allowZero: true, name: "LED Forward Voltage" });
    const I = parseValue(current, { allowZero: true, name: "Desired LED Current" });
    if (!Vs.ok) {
      setError(Vs.msg);
      setResults(null);
      return;
    }
    if (!Vf.ok) {
      setError(Vf.msg);
      setResults(null);
      return;
    }
    if (!I.ok) {
      setError(I.msg);
      setResults(null);
      return;
    }
    if (Vf.v >= Vs.v) {
      setError("Forward voltage must be less than supply voltage.");
      setResults(null);
      return;
    }
    const iA = currentUnit === "mA" ? I.v / 1000 : I.v;
    if (iA === 0) {
      setError("Current cannot be zero.");
      setResults(null);
      return;
    }
    const r = (Vs.v - Vf.v) / iA;
    const p = (Vs.v - Vf.v) * iA;
    const std = nextStandardResistor(r);
    setResults({ r, std, p, rec: p * 1.5 });
  }

  return (
    <CalcPage slug="led-resistor" title="LED Resistor Calculator" badge="Electronics" desc="Calculate the correct series resistor for an LED.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="led-vs" label="Supply Voltage (Vs) in Volts" value={vs} onChange={setVs} placeholder="e.g. 12" />
            <NumberField
              id="led-vf"
              label="LED Forward Voltage (Vf) in Volts"
              value={vf}
              onChange={setVf}
              placeholder="e.g. 2"
              hint="Typical: Red ≈ 2.0 V, Yellow ≈ 2.1 V, Green ≈ 2.2 V, Blue ≈ 3.0–3.3 V, White ≈ 3.0–3.3 V"
            />
            <UnitField
              id="led-current"
              label="Desired LED Current"
              value={current}
              onChange={setCurrent}
              unitId="led-current-unit"
              unitValue={currentUnit}
              onUnitChange={setCurrentUnit}
              unitOptions={CURRENT_UNITS}
              placeholder="e.g. 20"
            />
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
            <Result label="Required Resistor" value={results ? results.r.toFixed(2) + " Ω" : "—"} />
            <Result label="Recommended Standard Value" value={results ? results.std + " Ω" : "—"} />
            <Result label="Resistor Power" value={results ? results.p.toFixed(4) + " W" : "—"} />
            <Result label="Recommended Min. Power Rating" value={results ? results.rec.toFixed(2) + " W" : "—"} />
            <FormulaBox
              formulas={["R = (Vs − Vf) / I", "P = (Vs − Vf) × I"]}
            />
            <DisclaimerBox title="Safety Note">
              Use a suitable resistor power rating and verify the LED&apos;s maximum forward current
              before connecting the circuit.
            </DisclaimerBox>
            <RelatedCalculators slug="led-resistor" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

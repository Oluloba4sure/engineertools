"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, Diagram } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function VoltageDivider() {
  const [vin, setVin] = useState("");
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ vout: number; vr1: number; vr2: number; sum: number } | null>(null);

  function reset() {
    setVin("");
    setR1("");
    setR2("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const Vin = parseValue(vin, { allowZero: true, name: "Input Voltage" });
    const R1 = parseValue(r1, { allowZero: true, name: "R1" });
    const R2 = parseValue(r2, { allowZero: true, name: "R2" });
    if (!Vin.ok) {
      setError(Vin.msg);
      setResults(null);
      return;
    }
    if (!R1.ok) {
      setError(R1.msg);
      setResults(null);
      return;
    }
    if (!R2.ok) {
      setError(R2.msg);
      setResults(null);
      return;
    }
    const sum = R1.v + R2.v;
    if (sum === 0) {
      setError("R1 + R2 cannot be zero.");
      setResults(null);
      return;
    }
    const vout = (Vin.v * R2.v) / sum;
    setResults({ vout, vr1: Vin.v - vout, vr2: vout, sum });
  }

  return (
    <CalcPage slug="voltage-divider" title="Voltage Divider Calculator" badge="Electrical" desc="Calculate the output voltage of a resistor divider network.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="vd-vin" label="Input Voltage (Vin) in Volts" value={vin} onChange={setVin} placeholder="e.g. 12" />
            <NumberField id="vd-r1" label="R1 in Ohms" value={r1} onChange={setR1} placeholder="e.g. 1000" />
            <NumberField id="vd-r2" label="R2 in Ohms" value={r2} onChange={setR2} placeholder="e.g. 2000" />
            <Diagram>{"Vin\n |\nR1\n |\n +------ Vout\n |\nR2\n |\nGND"}</Diagram>
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
            <Result label="Output Voltage (Vout)" value={results ? results.vout.toFixed(4) + " V" : "—"} />
            <Result label="Voltage across R1" value={results ? results.vr1.toFixed(4) + " V" : "—"} />
            <Result label="Voltage across R2" value={results ? results.vr2.toFixed(4) + " V" : "—"} />
            <Result label="Total Resistance (R1 + R2)" value={results ? results.sum.toFixed(4) + " Ω" : "—"} />
            <FormulaBox formulas={["Vout = Vin × R2 / (R1 + R2)"]} />
            <Explanation>
              The output voltage is the voltage across R2. The sum of voltages across R1 and R2
              equals the input voltage.
            </Explanation>
            <RelatedCalculators slug="voltage-divider" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, DisclaimerBox } from "@/components/display"
import { NumberField, SelectField } from "@/components/fields";;
import { parseValue } from "@/lib/units";
import { formatPower, formatReactivePower } from "@/lib/formulas";

export default function ThreePhase() {
  const [vl, setVl] = useState("");
  const [il, setIl] = useState("");
  const [pf, setPf] = useState("");
  const [pUnit, setPUnit] = useState("W");
  const [sUnit, setSUnit] = useState("VA");
  const [qUnit, setQUnit] = useState("var");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ p: number; s: number; q: number; pf: number } | null>(null);

  function reset() {
    setVl("");
    setIl("");
    setPf("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const VL = parseValue(vl, { allowZero: true, name: "Line-to-Line Voltage" });
    const IL = parseValue(il, { allowZero: true, name: "Line Current" });
    const PF = parseValue(pf, { allowZero: true, name: "Power Factor" });
    if (!VL.ok) {
      setError(VL.msg);
      setResults(null);
      return;
    }
    if (!IL.ok) {
      setError(IL.msg);
      setResults(null);
      return;
    }
    if (!PF.ok) {
      setError(PF.msg);
      setResults(null);
      return;
    }
    if (PF.v > 1) {
      setError("Power factor must be between 0 and 1.");
      setResults(null);
      return;
    }
    const sqrt3 = Math.sqrt(3);
    const s = sqrt3 * VL.v * IL.v;
    const p = s * PF.v;
    const q = Math.sqrt(Math.max(0, s * s - p * p));
    setResults({ p, s, q, pf: PF.v });
  }

  return (
    <CalcPage slug="three-phase" title="Three-Phase Power Calculator" badge="Electrical" desc="Calculate real, apparent, and reactive power in a balanced three-phase system.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="tp-vl" label="Line-to-Line Voltage (VL) in Volts" value={vl} onChange={setVl} placeholder="e.g. 400" />
            <NumberField id="tp-il" label="Line Current (IL) in Amps" value={il} onChange={setIl} placeholder="e.g. 10" />
            <NumberField id="tp-pf" label="Power Factor (PF)" value={pf} onChange={setPf} placeholder="e.g. 0.8" min={0} max={1} />
            <SelectField
              id="tp-p-unit"
              label="Real Power Unit"
              value={pUnit}
              onChange={setPUnit}
              options={[
                { label: "W", value: "W" },
                { label: "kW", value: "kW" },
                { label: "MW", value: "MW" },
              ]}
            />
            <SelectField
              id="tp-s-unit"
              label="Apparent Power Unit"
              value={sUnit}
              onChange={setSUnit}
              options={[
                { label: "VA", value: "VA" },
                { label: "kVA", value: "kVA" },
              ]}
            />
            <SelectField
              id="tp-q-unit"
              label="Reactive Power Unit"
              value={qUnit}
              onChange={setQUnit}
              options={[
                { label: "var", value: "var" },
                { label: "kvar", value: "kvar" },
              ]}
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
          <ResultsPanel hasResults={results !== null}>
            <Result label="Real Power (P)" value={results ? formatPower(results.p, pUnit) : "—"} />
            <Result label="Apparent Power (S)" value={results ? formatPower(results.s, sUnit) : "—"} />
            <Result label="Reactive Power (Q)" value={results ? formatReactivePower(results.q, qUnit) : "—"} />
            <Result label="Power Factor" value={results ? results.pf.toFixed(4) : "—"} />
            <FormulaBox
              formulas={[
                "P = √3 × VL × IL × PF",
                "S = √3 × VL × IL",
                "Q = √(S² − P²)",
              ]}
            />
            <DisclaimerBox title="Assumption">
              The calculator assumes a balanced three-phase system with line-to-line voltage and line
              current.
            </DisclaimerBox>
            <RelatedCalculators slug="three-phase" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

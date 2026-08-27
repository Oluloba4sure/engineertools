"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, DisclaimerBox } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

export default function Transformer() {
  const [vp, setVp] = useState("");
  const [vs, setVs] = useState("");
  const [np, setNp] = useState("");
  const [ns, setNs] = useState("");
  const [ip, setIp] = useState("");
  const [is, setIs] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ vp: number | null; vs: number | null; np: number | null; ns: number | null; ratio: number | null; ip: number | null; is: number | null } | null>(null);

  function reset() {
    setVp("");
    setVs("");
    setNp("");
    setNs("");
    setIp("");
    setIs("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const Vp = parseValue(vp, { allowZero: true, name: "Primary Voltage" });
    const Vs = parseValue(vs, { allowZero: true, name: "Secondary Voltage" });
    const Np = parseValue(np, { allowZero: true, name: "Primary Turns" });
    const Ns = parseValue(ns, { allowZero: true, name: "Secondary Turns" });
    const Ip = parseValue(ip, { allowZero: true, name: "Primary Current" });
    const Is = parseValue(is, { allowZero: true, name: "Secondary Current" });
    const v = [Vp.ok && Vp.v !== 0, Vs.ok && Vs.v !== 0, Np.ok && Np.v !== 0, Ns.ok && Ns.v !== 0].filter(Boolean).length;
    if (v < 2) {
      setError("Enter at least two known values (voltage or turns).");
      setResults(null);
      return;
    }

    let turnsRatio: number | null = null;
    let vpVal: number | null = Vp.ok ? Vp.v : null;
    let vsVal: number | null = Vs.ok ? Vs.v : null;
    let npVal: number | null = Np.ok ? Np.v : null;
    let nsVal: number | null = Ns.ok ? Ns.v : null;

    if (Np.ok && Np.v !== 0 && Ns.ok && Ns.v !== 0) turnsRatio = npVal! / nsVal!;
    else if (Vp.ok && Vp.v !== 0 && Vs.ok && Vs.v !== 0) turnsRatio = vpVal! / vsVal!;

    if (turnsRatio === null) {
      setError("Cannot determine turns ratio from given values.");
      setResults(null);
      return;
    }

    if (vpVal !== null && nsVal !== null && vsVal === null) vsVal = vpVal / turnsRatio;
    if (vsVal !== null && npVal !== null && nsVal === null) nsVal = npVal / turnsRatio;
    if (vsVal !== null && nsVal !== null && npVal === null) npVal = nsVal * turnsRatio;
    if (vpVal !== null && npVal !== null && nsVal === null) nsVal = npVal / turnsRatio;
    if (npVal !== null && vsVal !== null && vpVal === null) vpVal = vsVal * turnsRatio;
    if (nsVal !== null && vsVal !== null && vpVal === null) vpVal = vsVal * turnsRatio;

    let ipVal: number | null = Ip.ok ? Ip.v : null;
    let isVal: number | null = Is.ok ? Is.v : null;
    if (ipVal !== null && isVal === null && vpVal !== null && vsVal !== null) isVal = (vpVal / vsVal) * ipVal;
    if (isVal !== null && ipVal === null && vpVal !== null && vsVal !== null) ipVal = (vsVal / vpVal) * isVal;

    setResults({ vp: vpVal, vs: vsVal, np: npVal, ns: nsVal, ratio: turnsRatio, ip: ipVal, is: isVal });
  }

  return (
    <CalcPage slug="transformer" title="Transformer Calculator" badge="Electronics" desc="Calculate voltages, turns, and currents for an ideal transformer.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="tr-vp" label="Primary Voltage (Vp) in Volts" value={vp} onChange={setVp} placeholder="e.g. 240" />
            <NumberField id="tr-vs" label="Secondary Voltage (Vs) in Volts" value={vs} onChange={setVs} placeholder="e.g. 24" />
            <NumberField id="tr-np" label="Primary Turns (Np)" value={np} onChange={setNp} placeholder="e.g. 1000" min={1} />
            <NumberField id="tr-ns" label="Secondary Turns (Ns)" value={ns} onChange={setNs} placeholder="e.g. 100" min={1} />
            <NumberField id="tr-ip" label="Primary Current (Ip) in Amps" value={ip} onChange={setIp} placeholder="e.g. 1" />
            <NumberField id="tr-is" label="Secondary Current (Is) in Amps" value={is} onChange={setIs} placeholder="e.g. 10" />
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
            <Result label="Primary Voltage" value={results && results.vp !== null ? results.vp.toFixed(4) + " V" : "—"} />
            <Result label="Secondary Voltage" value={results && results.vs !== null ? results.vs.toFixed(4) + " V" : "—"} />
            <Result label="Primary Turns" value={results && results.np !== null ? results.np.toFixed(0) : "—"} />
            <Result label="Secondary Turns" value={results && results.ns !== null ? results.ns.toFixed(0) : "—"} />
            <Result label="Turns Ratio" value={results && results.ratio !== null ? results.ratio.toFixed(4) + ":1" : "—"} />
            <Result label="Primary Current" value={results && results.ip !== null ? results.ip.toFixed(4) + " A" : "—"} />
            <Result label="Secondary Current" value={results && results.is !== null ? results.is.toFixed(4) + " A" : "—"} />
            <FormulaBox formulas={["Vp / Vs = Np / Ns", "Vp × Ip = Vs × Is"]} />
            <DisclaimerBox title="Important Note">
              This calculator uses an ideal transformer model. Real transformers have losses and
              efficiency less than 100%.
            </DisclaimerBox>
            <RelatedCalculators slug="transformer" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

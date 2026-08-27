"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";
import { ApplianceList, collectAppliances, newAppliance, type Appliance } from "@/components/ApplianceList";

const STANDARD_SIZES = [1, 2, 3, 5, 7.5, 10, 15, 20, 30, 50];

export default function GeneratorSizing() {
  const [margin, setMargin] = useState("20");
  const [items, setItems] = useState<Appliance[]>(() => [newAppliance()]);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ running: number; starting: number; apparent: number; recommended: number; standard: number; steps: string } | null>(null);

  function onChange(id: string, field: keyof Appliance, value: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }
  function add() {
    setItems((prev) => [...prev, newAppliance()]);
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }
  function reset() {
    setMargin("20");
    setItems([newAppliance()]);
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const M = parseValue(margin, { allowZero: true, name: "Design Margin" });
    if (!M.ok) { setError(M.msg); setResults(null); return; }
    const collected = collectAppliances(items, "generator");
    if (collected.length === 0) { setError("Add at least one load."); setResults(null); return; }
    let running = 0;
    let surge = 0;
    for (const it of collected) {
      running += it.running * it.qty;
      surge += it.surge * it.qty;
    }
    if (running === 0) { setError("Total running load cannot be zero."); setResults(null); return; }
    const factor = 1 + M.v / 100;
    const apparentVA = running / 0.8;
    const recommendedVA = Math.max(running, surge) * factor;
    const standard = STANDARD_SIZES.find((s) => s >= recommendedVA / 1000) || 50;
    setResults({
      running,
      starting: surge,
      apparent: apparentVA,
      recommended: recommendedVA / 1000,
      standard,
      steps: `Running = ${running.toFixed(0)} W. Surge = ${surge.toFixed(0)} W. Recommended = max(${running.toFixed(0)}, ${surge.toFixed(0)}) × ${factor} = ${recommendedVA.toFixed(0)} VA = ${(recommendedVA / 1000).toFixed(2)} kVA. Standard: ${standard} kVA.`,
    });
  }

  return (
    <CalcPage slug="generator-sizing" title="Generator Sizing Calculator" badge="Energy & Power Systems" desc="Estimate the required generator capacity for your loads.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="gs-margin" label="Design Margin (%)" value={margin} onChange={setMargin} placeholder="e.g. 20" min={0} />
            <ApplianceList
              items={items}
              type="generator"
              onChange={onChange}
              onAdd={add}
              onRemove={remove}
              addLabel="+ Add Load"
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
            <Result label="Total Running Load" value={results ? `${results.running.toFixed(0)} W (${(results.running / 1000).toFixed(2)} kW)` : "—"} />
            <Result label="Estimated Starting Load" value={results ? `${results.starting.toFixed(0)} W (${(results.starting / 1000).toFixed(2)} kW)` : "—"} />
            <Result label="Estimated Apparent Power" value={results ? `${(results.apparent / 1000).toFixed(2)} kVA (at PF 0.8)` : "—"} />
            <Result label="Recommended Generator Size" value={results ? `${results.recommended.toFixed(2)} kVA` : "—"} />
            <Result label="Recommended Standard Rating" value={results ? `${results.standard} kVA` : "—"} />
            <FormulaBox
              formulas={["S = P / PF", "Recommended = Max(Running, Surge) × (1 + Margin/100)"]}
              note={results ? results.steps : null}
            />
            <DisclaimerBox title="Important Note">
              Generator sizing depends on motor starting characteristics, load diversity, power factor,
              generator alternator characteristics, altitude, ambient temperature and manufacturer
              recommendations. This calculator provides preliminary sizing only.
            </DisclaimerBox>
            <RelatedCalculators slug="generator-sizing" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

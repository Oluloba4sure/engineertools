"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";
import { ApplianceList, collectAppliances, newAppliance, type Appliance } from "@/components/ApplianceList";

const STANDARD_SIZES = [1, 1.5, 2, 3, 5, 7.5, 10];

export default function InverterSizing() {
  const [margin, setMargin] = useState("20");
  const [items, setItems] = useState<Appliance[]>(() => [newAppliance()]);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ running: number; surge: number; continuous: number; rating: number; surgeCap: number } | null>(null);

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
    const collected = collectAppliances(items, "inverter");
    if (collected.length === 0) { setError("Add at least one appliance."); setResults(null); return; }
    let running = 0;
    let surge = 0;
    for (const it of collected) {
      running += it.running * it.qty;
      surge += it.surge * it.qty;
    }
    if (running === 0) { setError("Total running load cannot be zero."); setResults(null); return; }
    const factor = 1 + M.v / 100;
    const recommendedW = running * factor;
    const surgeCap = Math.max(surge, recommendedW);
    const std = STANDARD_SIZES.find((s) => s >= recommendedW / 1000) || 10;
    setResults({ running, surge, continuous: recommendedW, rating: std, surgeCap });
  }

  return (
    <CalcPage slug="inverter-sizing" title="Inverter Sizing Calculator" badge="Energy & Power Systems" desc="Estimate the minimum inverter capacity required for your appliances.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="inv-margin" label="Design Margin (%)" value={margin} onChange={setMargin} placeholder="e.g. 20" min={0} />
            <ApplianceList
              items={items}
              type="inverter"
              onChange={onChange}
              onAdd={add}
              onRemove={remove}
              addLabel="+ Add Appliance"
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
            <Result label="Estimated Surge Requirement" value={results ? results.surge.toFixed(0) + " W" : "—"} />
            <Result label="Recommended Continuous Capacity" value={results ? `${results.continuous.toFixed(0)} W (${(results.continuous / 1000).toFixed(2)} kW)` : "—"} />
            <Result label="Recommended Inverter Rating" value={results ? `${results.rating} kVA (approx ${(results.rating * 0.8).toFixed(1)} kW at PF 0.8)` : "—"} />
            <Result label="Minimum Surge Capacity" value={results ? `${results.surgeCap.toFixed(0)} W (${(results.surgeCap / 1000).toFixed(2)} kW)` : "—"} />
            <FormulaBox
              formulas={["Total Running = Σ (Running Power × Quantity)", "Recommended = Total Running × (1 + Margin/100)"]}
            />
            <Explanation>kW = real power. kVA = apparent power. For resistive loads, kVA ≈ kW. For inductive loads, kVA = kW / PF.</Explanation>
            <DisclaimerBox title="Important Note">
              Actual inverter selection should consider appliance starting currents, power factor,
              inverter waveform, battery voltage, manufacturer specifications and applicable
              standards.
            </DisclaimerBox>
            <RelatedCalculators slug="inverter-sizing" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

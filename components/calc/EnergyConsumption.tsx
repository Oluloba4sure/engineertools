"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField } from "@/components/fields";;
import { parseValue } from "@/lib/units";
import { ApplianceList, collectAppliances, newAppliance, type Appliance } from "@/components/ApplianceList";

export default function EnergyConsumption() {
  const [tariff, setTariff] = useState("");
  const [items, setItems] = useState<Appliance[]>(() => [newAppliance()]);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ load: number; daily: number; monthly: number; cost: number | null; chart: { name: string; kwh: number }[]; steps: string } | null>(null);

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
    setTariff("");
    setItems([newAppliance()]);
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const collected = collectAppliances(items, "energy");
    if (collected.length === 0) { setError("Add at least one appliance."); setResults(null); return; }
    let totalLoad = 0;
    let totalDaily = 0;
    let totalMonthly = 0;
    const chart: { name: string; kwh: number }[] = [];
    for (const it of collected) {
      const load = it.running * it.qty;
      const dailyWh = load * it.hours;
      const monthlyWh = dailyWh * it.days;
      totalLoad += load;
      totalDaily += dailyWh;
      totalMonthly += monthlyWh;
      chart.push({ name: it.name, kwh: monthlyWh / 1000 });
    }
    const tariffRaw = tariff.trim() === "" ? 0 : parseFloat(tariff);
    const monthlyKwh = totalMonthly / 1000;
    const cost = tariffRaw > 0 ? monthlyKwh * tariffRaw : null;
    setResults({
      load: totalLoad,
      daily: totalDaily,
      monthly: totalMonthly,
      cost,
      chart,
      steps: `Total monthly energy = ${monthlyKwh.toFixed(2)} kWh. ${cost !== null ? `Cost = ${monthlyKwh.toFixed(2)} × ${tariffRaw} = ${cost.toFixed(2)}` : "Enter a tariff to estimate cost."}`,
    });
  }

  const maxChart = results ? Math.max(...results.chart.map((d) => d.kwh), 1) : 1;

  return (
    <CalcPage slug="energy-consumption" title="Energy Consumption Calculator" badge="Energy & Power Systems" desc="Calculate electrical energy use and estimated cost for your appliances.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <NumberField id="ec-tariff" label="Electricity Tariff (per kWh) — optional" value={tariff} onChange={setTariff} placeholder="e.g. 0.15" min={0} />
            <ApplianceList
              items={items}
              type="energy"
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
          <ResultsPanel hasResults={results !== null}>
            <Result label="Total Connected Load" value={results ? `${results.load.toFixed(0)} W (${(results.load / 1000).toFixed(2)} kW)` : "—"} />
            <Result label="Total Daily Energy" value={results ? `${(results.daily / 1000).toFixed(2)} kWh/day` : "—"} />
            <Result label="Total Monthly Energy" value={results ? `${results.monthly / 1000} kWh/month` : "—"} />
            <Result label="Estimated Monthly Cost" value={results ? (results.cost !== null ? `${results.cost.toFixed(2)} (currency units)` : "— (no tariff entered)") : "—"} />
            <FormulaBox
              formulas={["Energy (kWh) = Power (W) × Quantity × Hours × Days / 1000"]}
              note={results ? results.steps : null}
            />
            {results ? (
              <div className="bar-chart" aria-label="Monthly energy consumption chart">
                <h3>Monthly Energy by Appliance (kWh)</h3>
                {results.chart.map((d, i) => (
                  <div className="bar-row" key={i}>
                    <span className="bar-label">{d.name}</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${((d.kwh / maxChart) * 100).toFixed(1)}%` }}></div>
                    </div>
                    <span className="bar-value">{d.kwh.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <DisclaimerBox title="Important Note">
              Actual energy consumption may differ from nameplate ratings.
            </DisclaimerBox>
            <RelatedCalculators slug="energy-consumption" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

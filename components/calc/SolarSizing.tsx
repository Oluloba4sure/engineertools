"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display"
import { NumberField, SelectField, UnitField } from "@/components/fields";;
import { parseValue } from "@/lib/units";

const ENERGY_UNITS = [
  { label: "kWh/day", value: "kWh" },
  { label: "Wh/day", value: "Wh" },
];
const PANEL_PRESETS = [
  "100", "200", "300", "400", "450", "500", "550", "custom",
];

export default function SolarSizing() {
  const [energy, setEnergy] = useState("");
  const [energyUnit, setEnergyUnit] = useState("kWh");
  const [sun, setSun] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [preset, setPreset] = useState("550");
  const [panel, setPanel] = useState("550");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ energy: number; pv: number; panels: number; installed: number; production: number; steps: string } | null>(null);

  function onPreset(v: string) {
    setPreset(v);
    if (v === "custom") {
      setPanel("");
    } else {
      setPanel(v);
    }
  }

  function reset() {
    setEnergy("");
    setSun("");
    setEfficiency("");
    setPreset("550");
    setPanel("550");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const E = parseValue(energy, { allowZero: true, name: "Daily Energy Requirement" });
    const H = parseValue(sun, { allowZero: true, name: "Peak Sun Hours" });
    const Eff = parseValue(efficiency, { allowZero: true, name: "System Efficiency" });
    const P = parseValue(panel, { allowZero: true, name: "Panel Rating" });
    if (!E.ok) { setError(E.msg); setResults(null); return; }
    if (!H.ok) { setError(H.msg); setResults(null); return; }
    if (!Eff.ok) { setError(Eff.msg); setResults(null); return; }
    if (!P.ok) { setError(P.msg); setResults(null); return; }
    if (H.v === 0) { setError("Peak sun hours cannot be zero."); setResults(null); return; }
    if (Eff.v === 0) { setError("System efficiency cannot be zero."); setResults(null); return; }
    if (P.v === 0) { setError("Panel rating cannot be zero."); setResults(null); return; }

    const eWh = energyUnit === "kWh" ? E.v * 1000 : E.v;
    const eta = Eff.v / 100;
    const pvW = eWh / (H.v * eta);
    const panels = Math.ceil(pvW / P.v);
    const installedW = panels * P.v;
    const productionWh = installedW * H.v * eta;
    setResults({
      energy: energyUnit === "kWh" ? E.v : E.v / 1000,
      pv: pvW,
      panels,
      installed: installedW,
      production: productionWh,
      steps: `PV = ${eWh.toFixed(0)} Wh / (${H.v} × ${eta}) = ${pvW.toFixed(0)} W. Panels = ceil(${pvW.toFixed(0)} / ${P.v}) = ${panels}.`,
    });
  }

  function fmtPower(w: number) {
    return w >= 1000 ? (w / 1000).toFixed(2) + " kW" : w.toFixed(0) + " W";
  }

  return (
    <CalcPage slug="solar-sizing" title="Solar Panel Sizing Calculator" badge="Energy & Power Systems" desc="Estimate the required photovoltaic array capacity for your daily energy needs.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <UnitField id="ss-energy" label="Daily Energy Requirement" value={energy} onChange={setEnergy} unitId="ss-energy-unit" unitValue={energyUnit} onUnitChange={setEnergyUnit} unitOptions={ENERGY_UNITS} placeholder="e.g. 5" />
            <NumberField id="ss-sun" label="Peak Sun Hours (per day)" value={sun} onChange={setSun} placeholder="e.g. 5" min={0} />
            <NumberField id="ss-efficiency" label="System Efficiency (%)" value={efficiency} onChange={setEfficiency} placeholder="e.g. 80" min={0} max={100} />
            <div className="unit-row">
              <div className="input-group">
                <label htmlFor="ss-panel-preset">Panel Rating Preset</label>
                <select id="ss-panel-preset" value={preset} onChange={(e) => onPreset(e.target.value)}>
                  {PANEL_PRESETS.map((p) => (
                    <option key={p} value={p}>
                      {p === "custom" ? "Custom" : p + " W"}
                    </option>
                  ))}
                </select>
              </div>
              <NumberField id="ss-panel" label="Panel Rating (W)" value={panel} onChange={setPanel} placeholder="e.g. 550" min={0} />
            </div>
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
            <Result label="Daily Energy Requirement" value={results ? (energyUnit === "kWh" ? results.energy.toFixed(2) + " kWh/day" : (results.energy * 1000).toFixed(0) + " Wh/day") : "—"} />
            <Result label="Required Solar Array Capacity" value={results ? fmtPower(results.pv) : "—"} />
            <Result label="Recommended Number of Panels" value={results ? results.panels + " panels" : "—"} />
            <Result label="Actual Installed PV Capacity" value={results ? fmtPower(results.installed) : "—"} />
            <Result label="Estimated Daily Solar Production" value={results ? (results.production >= 1000 ? (results.production / 1000).toFixed(2) + " kWh/day" : results.production.toFixed(0) + " Wh/day") : "—"} />
            <FormulaBox
              formulas={["PV Power = E / (H × η)", "Number of Panels = PV Power / Panel Rating (rounded up)"]}
              note={results ? results.steps : null}
            />
            <DisclaimerBox title="Important Disclaimer">
              This calculator provides preliminary solar-system sizing only. Actual system design
              should consider location-specific solar irradiation, temperature, shading, panel
              orientation, battery losses, inverter efficiency, wiring losses and applicable
              electrical standards.
            </DisclaimerBox>
            <RelatedCalculators slug="solar-sizing" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

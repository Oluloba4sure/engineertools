"use client";

import { useState } from "react";
import { CalcPage, RelatedCalculators } from "@/components/CalcPage";
import { CalcActions, Result, ResultsPanel, FormulaBox, Explanation, DisclaimerBox } from "@/components/display";
import { NumberField, SelectField, UnitField } from "@/components/fields";
import { parseValue } from "@/lib/units";

const ENERGY_UNITS = [
  { label: "Wh/day", value: "Wh" },
  { label: "kWh/day", value: "kWh" },
];
const DOD_MAP: Record<string, number> = {
  "lead-acid": 50, agm: 60, gel: 70, lithium: 80, lifepo4: 90,
};
const BATT_VOLTAGES = [
  { label: "Not specified", value: "" },
  { label: "2 V", value: "2" },
  { label: "6 V", value: "6" },
  { label: "12 V", value: "12" },
  { label: "24 V", value: "24" },
  { label: "48 V", value: "48" },
];

export default function BatteryBank() {
  const [energy, setEnergy] = useState("");
  const [energyUnit, setEnergyUnit] = useState("Wh");
  const [autonomy, setAutonomy] = useState("");
  const [voltage, setVoltage] = useState("");
  const [type, setType] = useState("lead-acid");
  const [dod, setDod] = useState("50");
  const [efficiency, setEfficiency] = useState("");
  const [battVoltage, setBattVoltage] = useState("");
  const [battAh, setBattAh] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    energy: number; ah: number; voltage: number;
    series: number; parallel: number; totalAh: number; steps: string;
  } | null>(null);

  function onTypeChange(v: string) {
    setType(v);
    if (DOD_MAP[v] !== undefined) setDod(String(DOD_MAP[v]));
  }

  function reset() {
    setEnergy("");
    setAutonomy("");
    setVoltage("");
    setType("lead-acid");
    setDod("50");
    setEfficiency("");
    setBattVoltage("");
    setBattAh("");
    setError(null);
    setResults(null);
  }

  function calculate() {
    setError(null);
    const E = parseValue(energy, { allowZero: true, name: "Daily Energy Requirement" });
    const D = parseValue(autonomy, { allowZero: true, name: "Required Autonomy" });
    const V = parseValue(voltage, { allowZero: true, name: "System Voltage" });
    const Dod = parseValue(dod, { allowZero: true, name: "Depth of Discharge" });
    const Eff = parseValue(efficiency, { allowZero: true, name: "System Efficiency" });
    if (!E.ok) { setError(E.msg); setResults(null); return; }
    if (!D.ok) { setError(D.msg); setResults(null); return; }
    if (!V.ok) { setError(V.msg); setResults(null); return; }
    if (!Dod.ok) { setError(Dod.msg); setResults(null); return; }
    if (!Eff.ok) { setError(Eff.msg); setResults(null); return; }
    if (V.v === 0) { setError("System voltage cannot be zero."); setResults(null); return; }
    if (Dod.v === 0) { setError("Depth of discharge cannot be zero."); setResults(null); return; }
    if (Eff.v === 0) { setError("System efficiency cannot be zero."); setResults(null); return; }

    const eWh = energyUnit === "kWh" ? E.v * 1000 : E.v;
    const dodDec = Dod.v / 100;
    const effDec = Eff.v / 100;
    const battEnergy = (eWh * D.v) / (dodDec * effDec);
    const ah = battEnergy / V.v;
    let series = 0, parallel = 0, totalAh = 0;
    if (battVoltage !== "" && battAh.trim() !== "" && parseFloat(battAh) > 0) {
      const bv = parseFloat(battVoltage);
      const ba = parseFloat(battAh);
      series = Math.ceil(V.v / bv);
      parallel = Math.ceil(ah / ba);
      totalAh = series * parallel * ba;
    }
    setResults({
      energy: battEnergy,
      ah,
      voltage: V.v,
      series,
      parallel,
      totalAh,
      steps: `Battery Energy = (${eWh.toFixed(0)} × ${D.v}) / (${dodDec} × ${effDec}) = ${battEnergy.toFixed(0)} Wh. Capacity = ${battEnergy.toFixed(0)} / ${V.v} = ${ah.toFixed(0)} Ah.`,
    });
  }

  return (
    <CalcPage slug="battery-bank" title="Battery Bank Sizing Calculator" badge="Energy & Power Systems" desc="Estimate battery capacity for off-grid or backup power systems.">
      {{
        form: (
          <>
            <h2 className="panel-title">📥 Inputs</h2>
            <UnitField id="bb-energy" label="Daily Energy Requirement" value={energy} onChange={setEnergy} unitId="bb-energy-unit" unitValue={energyUnit} onUnitChange={setEnergyUnit} unitOptions={ENERGY_UNITS} placeholder="e.g. 5000" />
            <NumberField id="bb-autonomy" label="Required Autonomy (days)" value={autonomy} onChange={setAutonomy} placeholder="e.g. 1" min={0} />
            <NumberField id="bb-voltage" label="System Voltage (V)" value={voltage} onChange={setVoltage} placeholder="e.g. 24" />
            <SelectField id="bb-type" label="Battery Type" value={type} onChange={onTypeChange} options={[
              { label: "Lead-Acid (DoD 50%)", value: "lead-acid" },
              { label: "AGM (DoD 60%)", value: "agm" },
              { label: "Gel (DoD 70%)", value: "gel" },
              { label: "Lithium-ion (DoD 80%)", value: "lithium" },
              { label: "LiFePO4 (DoD 90%)", value: "lifepo4" },
              { label: "Custom", value: "custom" },
            ]} />
            <NumberField id="bb-dod" label="Maximum Depth of Discharge (%)" value={dod} onChange={setDod} placeholder="e.g. 80" min={0} max={100} />
            <NumberField id="bb-efficiency" label="System Efficiency (%)" value={efficiency} onChange={setEfficiency} placeholder="e.g. 90" min={0} max={100} />
            <SelectField id="bb-batt-voltage" label="Battery Nominal Voltage (V) — optional" value={battVoltage} onChange={setBattVoltage} options={BATT_VOLTAGES} />
            <NumberField id="bb-batt-ah" label="Battery Capacity (Ah) — optional" value={battAh} onChange={setBattAh} placeholder="e.g. 200" min={0} />
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
            <Result label="Required Battery Energy" value={results ? `${results.energy.toFixed(0)} Wh (${(results.energy / 1000).toFixed(2)} kWh)` : "—"} />
            <Result label="Recommended Battery Capacity" value={results ? `${results.ah.toFixed(0)} Ah` : "—"} />
            <Result label="System Voltage" value={results ? `${results.voltage} V` : "—"} />
            <Result label="Batteries in Series" value={results && results.series ? `${results.series} batteries in series` : "— (battery specs not provided)"} />
            <Result label="Parallel Strings" value={results && results.parallel ? `${results.parallel} parallel string(s)` : "— (battery specs not provided)"} />
            <Result label="Total Nominal Battery Capacity" value={results && results.totalAh ? `${results.totalAh.toFixed(0)} Ah (${(results.totalAh * results.voltage / 1000).toFixed(1)} kWh)` : "— (battery specs not provided)"} />
            <FormulaBox
              formulas={["Battery Energy = (E × Days) / (DoD × η)", "Capacity (Ah) = Battery Energy / System Voltage"]}
              note={results ? results.steps : null}
            />
            <DisclaimerBox title="Important Note">
              Battery sizing is an estimate. Actual battery selection should consider temperature,
              discharge rate, battery chemistry, cycle life, manufacturer specifications, inverter
              efficiency and system operating conditions.
            </DisclaimerBox>
            <RelatedCalculators slug="battery-bank" />
          </ResultsPanel>
        ),
      }}
    </CalcPage>
  );
}

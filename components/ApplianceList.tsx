"use client";

import { type ReactNode } from "react";

export type Appliance = {
  id: string;
  name: string;
  qty: string;
  running: string;
  surge: string;
  hours: string;
  days: string;
};

export function ApplianceList({
  items,
  type,
  onChange,
  onAdd,
  onRemove,
  addLabel,
}: {
  items: Appliance[];
  type: "inverter" | "generator" | "energy";
  onChange: (id: string, field: keyof Appliance, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  addLabel: string;
}) {
  return (
    <>
      <div id="appliance-list" className="appliance-list">
        {items.map((row) => (
          <div className="appliance-card" key={row.id}>
            <div className="input-group">
              <label>Appliance Name</label>
              <input type="text" value={row.name} placeholder="e.g. Refrigerator" onChange={(e) => onChange(row.id, "name", e.target.value)} />
            </div>
            <div className="input-group">
              <label>Quantity</label>
              <input type="number" min={1} step={1} value={row.qty} placeholder="1" onChange={(e) => onChange(row.id, "qty", e.target.value)} />
            </div>
            <div className="input-group">
              <label>{type === "energy" ? "Power (W)" : "Running Power (W)"}</label>
              <input type="number" min={0} step="any" value={row.running} placeholder="150" onChange={(e) => onChange(row.id, "running", e.target.value)} />
            </div>
            {type === "energy" ? (
              <>
                <div className="input-group">
                  <label>Hours/day</label>
                  <input type="number" min={0} step="any" value={row.hours} placeholder="24" onChange={(e) => onChange(row.id, "hours", e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Days/month</label>
                  <input type="number" min={0} step="any" value={row.days} placeholder="30" onChange={(e) => onChange(row.id, "days", e.target.value)} />
                </div>
              </>
            ) : (
              <div className="input-group">
                <label>Surge Power (W)</label>
                <input type="number" min={0} step="any" value={row.surge} placeholder="600" onChange={(e) => onChange(row.id, "surge", e.target.value)} />
              </div>
            )}
            <div className="calc-actions">
              <button type="button" className="btn btn-secondary" onClick={() => onRemove(row.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="calc-actions">
        <button type="button" className="btn btn-secondary" onClick={onAdd}>
          {addLabel}
        </button>
      </div>
    </>
  );
}

export function newAppliance(): Appliance {
  return {
    id: (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Math.random())),
    name: "",
    qty: "1",
    running: "",
    surge: "",
    hours: "24",
    days: "30",
  };
}

export function collectAppliances(items: Appliance[], type: "inverter" | "generator" | "energy") {
  return items.map((it) => ({
    name: it.name.trim() || "Appliance",
    qty: parseFloat(it.qty) || 0,
    running: parseFloat(it.running) || 0,
    surge: type === "energy" ? 0 : parseFloat(it.surge) || 0,
    hours: type === "energy" ? parseFloat(it.hours) || 0 : 0,
    days: type === "energy" ? parseFloat(it.days) || 0 : 0,
  }));
}

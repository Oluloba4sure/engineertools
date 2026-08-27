export function formatResistance(ohms: number): string {
  if (!isFinite(ohms)) return "—";
  if (ohms >= 1e9) return (ohms / 1e9).toFixed(2) + " GΩ";
  if (ohms >= 1e6) return (ohms / 1e6).toFixed(2) + " MΩ";
  if (ohms >= 1e3) return (ohms / 1e3).toFixed(2) + " kΩ";
  return ohms.toFixed(2) + " Ω";
}

export function formatPower(w: number, unit: string): string {
  if (!isFinite(w)) return "—";
  if (unit === "kW") return (w / 1000).toFixed(4) + " kW";
  if (unit === "MW") return (w / 1e6).toFixed(4) + " MW";
  return w.toFixed(4) + " W";
}

export function formatReactivePower(w: number, unit: string): string {
  if (!isFinite(w)) return "—";
  if (unit === "var") return w.toFixed(4) + " var";
  if (unit === "kvar") return (w / 1000).toFixed(4) + " kvar";
  return (w / 1000).toFixed(4) + " kvar";
}

export function nextStandardResistor(value: number): number {
  const series = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
  const decades = [1, 10, 100, 1000, 10000, 100000, 1000000];
  for (const d of decades) {
    for (const s of series) {
      const std = s * d;
      if (std >= value) return std;
    }
  }
  return Math.ceil(value);
}

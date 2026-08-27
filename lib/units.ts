export type ParsedValue = { ok: true; v: number } | { ok: false; msg: string };

export function parseValue(
  raw: string,
  opts: { allowZero?: boolean; name?: string } = {},
): ParsedValue {
  const name = opts.name ?? "Value";
  const allowZero = opts.allowZero ?? false;
  const trimmed = raw.trim();
  if (trimmed === "") return { ok: false, msg: `Please enter ${name.toLowerCase()}.` };
  const v = Number(trimmed);
  if (!isFinite(v)) return { ok: false, msg: `Please enter a valid number for ${name.toLowerCase()}.` };
  if (!allowZero && v === 0) return { ok: false, msg: `${name} cannot be zero.` };
  if (v < 0) return { ok: false, msg: `${name} cannot be negative.` };
  return { ok: true, v };
}

export type FieldSpec = { id: string; name: string; allowZero?: boolean };

export type Collected = Record<string, number> & { __error?: string };

export function collectValues(
  get: (id: string) => string,
  fields: FieldSpec[],
): Collected | { __error: string } {
  const out: Collected = {};
  for (const f of fields) {
    const res = parseValue(get(f.id), { allowZero: f.allowZero, name: f.name });
    if (!res.ok) return { __error: res.msg };
    out[f.id] = res.v;
  }
  return out;
}

export const ucUnits: Record<string, { label: string; value: string }[]> = {
  length: [
    { label: "Millimeter", value: "mm" },
    { label: "Centimeter", value: "cm" },
    { label: "Meter", value: "m" },
    { label: "Kilometer", value: "km" },
    { label: "Inch", value: "in" },
    { label: "Foot", value: "ft" },
  ],
  pressure: [
    { label: "Pascal", value: "pa" },
    { label: "Kilopascal", value: "kpa" },
    { label: "Megapascal", value: "mpa" },
    { label: "Bar", value: "bar" },
    { label: "PSI", value: "psi" },
  ],
  power: [
    { label: "Watt", value: "w" },
    { label: "Kilowatt", value: "kw" },
    { label: "Megawatt", value: "mw" },
    { label: "Horsepower", value: "hp" },
  ],
  energy: [
    { label: "Joule", value: "j" },
    { label: "Kilojoule", value: "kj" },
    { label: "Watt-hour", value: "wh" },
    { label: "Kilowatt-hour", value: "kwh" },
  ],
  temperature: [
    { label: "Celsius", value: "c" },
    { label: "Fahrenheit", value: "f" },
    { label: "Kelvin", value: "k" },
  ],
};

export const ucFactors: Record<string, Record<string, number>> = {
  length: { mm: 1, cm: 10, m: 1000, km: 1000000, in: 25.4, ft: 304.8 },
  pressure: { pa: 1, kpa: 1000, mpa: 1000000, bar: 100000, psi: 6894.757 },
  power: { w: 1, kw: 1000, mw: 1000000, hp: 745.699872 },
  energy: { j: 1, kj: 1000, wh: 3600, kwh: 3600000 },
  temperature: {},
};

export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  let c: number;
  if (from === "c") c = value;
  else if (from === "f") c = ((value - 32) * 5) / 9;
  else c = value - 273.15;
  if (to === "c") return c;
  if (to === "f") return (c * 9) / 5 + 32;
  return c + 273.15;
}

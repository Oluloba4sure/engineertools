export type Calculator = {
  slug: string;
  name: string;
  desc: string;
  category: string;
  badge: string;
  icon: string;
  search: string;
};

type CategoryDef = {
  slug: string;
  title: string;
  desc: string;
  icon: string;
};

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "electrical",
    title: "Electrical",
    desc: "Circuits, power, and electrical systems.",
    icon: "⚡",
  },
  {
    slug: "electronics",
    title: "Electronics",
    desc: "Components, circuits, and signal processing.",
    icon: "🌱",
  },
  {
    slug: "energy",
    title: "Energy",
    desc: "Battery and energy storage calculations.",
    icon: "🔋",
  },
  {
    slug: "mechanical",
    title: "Mechanical",
    desc: "Forces, motion, and mechanical design.",
    icon: "⚙️",
  },
  {
    slug: "fluid-hydraulics",
    title: "Fluid & Hydraulics",
    desc: "Fluid mechanics and hydraulic systems.",
    icon: "💧",
  },
  {
    slug: "energy-power-systems",
    title: "Energy & Power Systems",
    desc: "Renewable energy and power system design.",
    icon: "☀️",
  },
  {
    slug: "converters",
    title: "Converters",
    desc: "Engineering unit conversions and calculations.",
    icon: "⇄",
  },
];

export const CALCULATORS: Calculator[] = [
  {
    slug: "ohms-law",
    name: "Ohm's Law",
    desc: "Calculate voltage, current, resistance, and power.",
    category: "electrical",
    badge: "Electrical",
    icon: "⚡",
    search: "ohms law voltage current resistance",
  },
  {
    slug: "electrical-power",
    name: "Electrical Power",
    desc: "Calculate power, voltage, current, and energy.",
    category: "electrical",
    badge: "Electrical",
    icon: "⏱️",
    search: "electrical power voltage current energy watt kilowatt",
  },
  {
    slug: "voltage-divider",
    name: "Voltage Divider",
    desc: "Calculate output voltage across a divider network.",
    category: "electrical",
    badge: "Electrical",
    icon: "⬆️",
    search: "voltage divider output voltage resistor network",
  },
  {
    slug: "three-phase",
    name: "Three-Phase Power",
    desc: "Calculate real, apparent, and reactive power.",
    category: "electrical",
    badge: "Electrical",
    icon: "⬛",
    search: "three phase power balanced system line voltage current",
  },
  {
    slug: "resistor-color",
    name: "Resistor Color Code",
    desc: "Decode resistance values from color bands.",
    category: "electronics",
    badge: "Electronics",
    icon: "🎨",
    search: "resistor color code bands decode tolerance",
  },
  {
    slug: "capacitor",
    name: "Capacitor Calculator",
    desc: "Calculate reactance and RC time constants.",
    category: "electronics",
    badge: "Electronics",
    icon: "⚡",
    search: "capacitor reactance rc time constant capacitance",
  },
  {
    slug: "inductor",
    name: "Inductor Calculator",
    desc: "Calculate reactance and RL time constants.",
    category: "electronics",
    badge: "Electronics",
    icon: "🔌",
    search: "inductor reactance rl time constant inductance",
  },
  {
    slug: "transformer",
    name: "Transformer Calculator",
    desc: "Voltages, turns, and currents for an ideal transformer.",
    category: "electronics",
    badge: "Electronics",
    icon: "🌱",
    search: "transformer ideal voltage turns ratio primary secondary",
  },
  {
    slug: "led-resistor",
    name: "LED Resistor Calculator",
    desc: "Calculate the correct series resistor for an LED.",
    category: "electronics",
    badge: "Electronics",
    icon: "💡",
    search: "led resistor series current forward voltage",
  },
  {
    slug: "battery-runtime",
    name: "Battery Runtime",
    desc: "Estimate runtime from battery capacity and load.",
    category: "energy",
    badge: "Energy",
    icon: "🔋",
    search: "battery runtime capacity voltage load estimate",
  },
  {
    slug: "motor-speed",
    name: "Motor Speed",
    desc: "Calculate synchronous speed from frequency and poles.",
    category: "mechanical",
    badge: "Mechanical",
    icon: "🛠️",
    search: "motor speed synchronous rpm frequency poles",
  },
  {
    slug: "gear-ratio",
    name: "Gear Ratio",
    desc: "Calculate gear ratio and output speed.",
    category: "mechanical",
    badge: "Mechanical",
    icon: "⚙️",
    search: "gear ratio teeth driver driven output rpm",
  },
  {
    slug: "torque",
    name: "Torque Calculator",
    desc: "Calculate torque from force and lever arm.",
    category: "mechanical",
    badge: "Mechanical",
    icon: "⚙️",
    search: "torque force lever arm angle moment",
  },
  {
    slug: "shaft-power",
    name: "Shaft Power",
    desc: "Calculate power from torque and RPM.",
    category: "mechanical",
    badge: "Mechanical",
    icon: "⚙️",
    search: "shaft power torque rpm mechanical power horsepower",
  },
  {
    slug: "gear-design",
    name: "Gear Design",
    desc: "Gear ratio, pitch diameters, and center distance.",
    category: "mechanical",
    badge: "Mechanical",
    icon: "⚙️",
    search: "gear design module pitch diameter center distance teeth",
  },
  {
    slug: "beam-deflection",
    name: "Beam Deflection",
    desc: "Estimate beam deflection for common configurations.",
    category: "mechanical",
    badge: "Mechanical",
    icon: "📐",
    search: "beam deflection load youngs modulus moment of inertia structural",
  },
  {
    slug: "hydraulic-jack",
    name: "Hydraulic Jack",
    desc: "Calculate hydraulic force multiplication.",
    category: "fluid-hydraulics",
    badge: "Fluid & Hydraulics",
    icon: "🔧",
    search: "hydraulic jack pascal law piston force multiplication",
  },
  {
    slug: "pump-head",
    name: "Pump Head",
    desc: "Calculate pressure head and total dynamic head.",
    category: "fluid-hydraulics",
    badge: "Fluid & Hydraulics",
    icon: "💧",
    search: "pump head pressure total dynamic head fluid density",
  },
  {
    slug: "fluid-pressure",
    name: "Fluid Pressure",
    desc: "Hydrostatic pressure and pressure conversion.",
    category: "fluid-hydraulics",
    badge: "Fluid & Hydraulics",
    icon: "💧",
    search: "fluid pressure hydrostatic force area conversion bar psi",
  },
  {
    slug: "solar-sizing",
    name: "Solar Panel Sizing",
    desc: "Estimate required solar array capacity.",
    category: "energy-power-systems",
    badge: "Energy & Power Systems",
    icon: "☀️",
    search: "solar solar panel pv photovoltaic sizing capacity",
  },
  {
    slug: "inverter-sizing",
    name: "Inverter Sizing",
    desc: "Select an appropriate inverter capacity.",
    category: "energy-power-systems",
    badge: "Energy & Power Systems",
    icon: "⚡",
    search: "inverter sizing surge power kva appliances",
  },
  {
    slug: "cable-sizing",
    name: "Cable Sizing",
    desc: "Estimate conductor size and voltage drop.",
    category: "energy-power-systems",
    badge: "Energy & Power Systems",
    icon: "🔌",
    search: "cable cable size conductor voltage drop wire",
  },
  {
    slug: "battery-bank",
    name: "Battery Bank Sizing",
    desc: "Estimate battery capacity for backup systems.",
    category: "energy-power-systems",
    badge: "Energy & Power Systems",
    icon: "🔋",
    search: "battery battery bank capacity amp hours autonomy",
  },
  {
    slug: "energy-consumption",
    name: "Energy Consumption",
    desc: "Calculate electrical energy use and cost.",
    category: "energy-power-systems",
    badge: "Energy & Power Systems",
    icon: "📊",
    search: "energy consumption electricity bill power usage appliance",
  },
  {
    slug: "generator-sizing",
    name: "Generator Sizing",
    desc: "Estimate generator capacity for loads.",
    category: "energy-power-systems",
    badge: "Energy & Power Systems",
    icon: "⚙️",
    search: "generator generator size kva power backup load",
  },
  {
    slug: "unit-converter",
    name: "Engineering Unit Converter",
    desc: "Convert between common engineering units.",
    category: "converters",
    badge: "Converters",
    icon: "⇄",
    search: "unit converter length pressure power energy temperature",
  },
];

const CALC_BY_SLUG: Record<string, Calculator> = Object.fromEntries(
  CALCULATORS.map((c) => [c.slug, c]),
);

export function getCalculator(slug: string): Calculator | undefined {
  return CALC_BY_SLUG[slug];
}

const RELATED: Record<string, string[]> = {
  "ohms-law": ["electrical-power", "voltage-divider", "led-resistor", "resistor-color"],
  "electrical-power": ["ohms-law", "three-phase", "voltage-divider", "motor-speed"],
  "battery-runtime": ["electrical-power", "unit-converter"],
  "motor-speed": ["gear-ratio", "three-phase", "electrical-power"],
  "gear-ratio": ["motor-speed", "unit-converter"],
  "unit-converter": ["ohms-law", "electrical-power", "voltage-divider", "three-phase"],
  "resistor-color": ["ohms-law", "voltage-divider", "led-resistor", "electrical-power"],
  "voltage-divider": ["ohms-law", "resistor-color", "led-resistor", "electrical-power"],
  "capacitor": ["inductor", "ohms-law", "voltage-divider", "resistor-color"],
  "inductor": ["capacitor", "ohms-law", "voltage-divider", "motor-speed"],
  "transformer": ["ohms-law", "voltage-divider", "electrical-power", "three-phase"],
  "led-resistor": ["ohms-law", "resistor-color", "voltage-divider", "electrical-power"],
  "three-phase": ["electrical-power", "motor-speed", "unit-converter", "voltage-divider"],
  "beam-deflection": ["unit-converter", "torque", "gear-design", "shaft-power"],
  torque: ["shaft-power", "motor-speed", "gear-design", "gear-ratio"],
  "shaft-power": ["torque", "motor-speed", "gear-ratio", "gear-design"],
  "gear-design": ["gear-ratio", "motor-speed", "torque", "shaft-power"],
  "hydraulic-jack": ["fluid-pressure", "pump-head", "unit-converter"],
  "pump-head": ["fluid-pressure", "hydraulic-jack", "unit-converter"],
  "fluid-pressure": ["pump-head", "hydraulic-jack", "unit-converter"],
  "solar-sizing": ["battery-bank", "inverter-sizing", "energy-consumption", "cable-sizing"],
  "inverter-sizing": ["battery-bank", "energy-consumption", "generator-sizing", "solar-sizing"],
  "cable-sizing": ["electrical-power", "three-phase", "inverter-sizing", "generator-sizing"],
  "battery-bank": ["solar-sizing", "inverter-sizing", "energy-consumption"],
  "energy-consumption": ["electrical-power", "solar-sizing", "battery-bank", "generator-sizing"],
  "generator-sizing": ["inverter-sizing", "electrical-power", "three-phase", "energy-consumption"],
};

export function getRelated(slug: string): Calculator[] {
  return (RELATED[slug] ?? []).map((s) => CALC_BY_SLUG[s]).filter(Boolean);
}

export function calculatorsByCategory(slug: string): Calculator[] {
  return CALCULATORS.filter((c) => c.category === slug);
}

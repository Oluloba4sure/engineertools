const fs = require("fs");
const path = require("path");
const titles = {
  "ohms-law": "Ohm's Law Calculator", "electrical-power": "Electrical Power Calculator", "voltage-divider": "Voltage Divider Calculator",
  "three-phase": "Three-Phase Power Calculator", "resistor-color": "Resistor Color Code Calculator", "capacitor": "Capacitor Calculator",
  "inductor": "Inductor Calculator", "transformer": "Transformer Calculator", "led-resistor": "LED Resistor Calculator",
  "battery-runtime": "Battery Runtime Calculator", "motor-speed": "Motor Speed Calculator", "gear-ratio": "Gear Ratio Calculator",
  "torque": "Torque Calculator", "shaft-power": "Shaft Power Calculator", "gear-design": "Gear Design Calculator",
  "beam-deflection": "Beam Deflection Calculator", "hydraulic-jack": "Hydraulic Jack Calculator", "pump-head": "Pump Head Calculator",
  "fluid-pressure": "Fluid Pressure Calculator", "solar-sizing": "Solar Panel Sizing Calculator", "inverter-sizing": "Inverter Sizing Calculator",
  "cable-sizing": "Cable Sizing Calculator", "battery-bank": "Battery Bank Sizing Calculator", "energy-consumption": "Energy Consumption Calculator",
  "generator-sizing": "Generator Sizing Calculator", "unit-converter": "Engineering Unit Converter"
};
for (const [slug, title] of Object.entries(titles)) {
  const file = path.join("app", slug, "page.tsx");
  if (!fs.existsSync(file)) { console.error("MISSING", file); continue; }
  let s = fs.readFileSync(file, "utf8");
  s = s.replace(/export const metadata = \{ title: "[^"]*" \};/, 'export const metadata = { title: ' + JSON.stringify(title) + " };");
  fs.writeFileSync(file, s);
}
console.log("titles updated");

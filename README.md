# EngineerTools

Free, browser-based engineering calculators for students, technicians, researchers, and engineers.

## Features

### Version 1 — Core Calculators

- Ohm's Law Calculator
- Electrical Power Calculator
- Battery Runtime Estimator
- Motor Speed Calculator
- Gear Ratio Calculator
- Engineering Unit Converter

### Version 2 — Electrical & Electronics

- Resistor Color Code Calculator — decode resistance from 4-band color codes
- Voltage Divider Calculator — Vout = Vin × R2 / (R1 + R2)
- Capacitor Calculator — capacitive reactance (Xc = 1/2πfC) and RC time constant (τ = RC)
- Inductor Calculator — inductive reactance (XL = 2πfL) and RL time constant (τ = L/R)
- Transformer Calculator — ideal transformer voltage/turns/current relationships
- LED Resistor Calculator — series resistor for LEDs (R = (Vs − Vf) / I)
- Three-Phase Power Calculator — balanced system real, apparent, and reactive power

### Version 3 — Mechanical & Fluid Engineering

- Beam Deflection Calculator — maximum deflection for simply supported and cantilever beams (point and UDL loads) using simplified Euler-Bernoulli beam theory
- Torque Calculator — τ = rF sin(θ) with N·m, N·mm, and kN·m results
- Shaft Power Calculator — P = 2πNT / 60 with W, kW, and hp results
- Gear Design Calculator — gear ratio, output RPM, pitch diameters (d = mZ), and center distance for external gears
- Hydraulic Jack Calculator — Pascal's law force multiplication (F₂ = F₁ × A₂ / A₁)
- Pump Head Calculator — pressure head (H = P/ρg) and total dynamic head
- Fluid Pressure Calculator — hydrostatic pressure (P = ρgh) and pressure from force/area (P = F/A) with unit conversion

### Version 4 — Energy & Power Systems

- Solar Panel Sizing Calculator — required PV capacity (PV = E/(H×η)) and number of panels from daily energy, peak sun hours, and efficiency
- Inverter Sizing Calculator — total running load, surge requirement, and recommended inverter capacity (kW/kVA) with design margin
- Cable Sizing Calculator — load current (single/three-phase) and voltage-drop-based conductor sizing (Vdrop = IρL/A) with standard cable sizes
- Battery Bank Sizing Calculator — required battery energy and Ah capacity from daily energy, autonomy days, DoD, and system efficiency
- Energy Consumption Calculator — per-appliance and total daily/monthly energy (kWh) with optional tariff cost estimation and CSS bar chart
- Generator Sizing Calculator — total running/starting load, apparent power (S = P/PF), and recommended generator kVA with standard ratings

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- No backend or database required
- Deployable as static files on GitHub Pages

## Run Locally

Open `index.html` in any modern web browser. No build step or server is required.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Source**, select the branch (e.g. `main`) and folder `/ (root)`.
4. Save. Your site will be published at `https://<username>.github.io/<repo-name>/`.

## Contribute

Fork the repository, make your changes, and open a pull request.
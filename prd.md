Build a complete responsive web application called:

ENGINEERTOOLS
"Free Engineering Calculators"

Goal:
Create a simple, professional and mobile-friendly engineering
calculator website that engineering students, technicians,
researchers and engineers can use directly from their browsers.

Technology:
- HTML5
- CSS3
- Vanilla JavaScript
- No backend
- No database
- No authentication
- No external APIs

The application must be suitable for deployment on GitHub Pages.

VERSION 1 CALCULATORS

1. Ohm's Law Calculator
2. Electrical Power Calculator
3. Battery Runtime Calculator
4. Motor Speed Calculator
5. Gear Ratio Calculator
6. Engineering Unit Converter

GENERAL REQUIREMENTS

- Create a professional engineering-themed interface.
- Make the application responsive on desktop, tablet and mobile.
- Create a clean navigation bar.
- Create a homepage with calculator cards.
- Add calculator categories.
- Add search functionality for calculators.
- Add a footer.
- Include "About EngineerTools".
- Include "How to use".
- Include a reset button on every calculator.
- Validate all inputs.
- Display clear error messages.
- Display results with appropriate engineering units.
- Clearly display the formula used.
- Explain what the result means.
- Do not use fake calculations.
- Use mathematically correct engineering formulas.
- Use sensible decimal rounding.
- Prevent division by zero.
- Handle empty and invalid inputs.
- Make buttons keyboard accessible.
- Use semantic HTML.

CALCULATOR 1 — OHM'S LAW

Allow the user to calculate:
- Voltage
- Current
- Resistance

Use:

V = I × R
I = V / R
R = V / I

Also calculate electrical power where possible:

P = V × I

Show:
- Input values
- Result
- Formula
- Calculation steps

CALCULATOR 2 — ELECTRICAL POWER

Allow calculation of:
- Power
- Voltage
- Current
- Energy

Use:

P = V × I
E = P × t

Allow suitable units such as:
W, kW, Wh and kWh.

CALCULATOR 3 — BATTERY RUNTIME

Inputs:
- Battery voltage
- Battery capacity in Ah
- Load power in W
- Efficiency percentage

Estimate runtime using appropriate assumptions.

Clearly state that the result is an estimate and depends on
battery condition, discharge characteristics and actual load.

CALCULATOR 4 — MOTOR SPEED

Allow calculation of synchronous speed from:

Ns = 120f / P

where:
Ns = synchronous speed in RPM
f = frequency in Hz
P = number of poles

Allow the user to enter:
- Frequency
- Number of poles

Display RPM.

CALCULATOR 5 — GEAR RATIO

Allow calculation of:

Gear Ratio = Driven Gear Teeth / Driver Gear Teeth

Also calculate output speed where applicable.

Inputs:
- Driver teeth
- Driven teeth
- Input RPM

Display:
- Gear ratio
- Output RPM

CALCULATOR 6 — ENGINEERING UNIT CONVERTER

Include:

Length:
- mm
- cm
- m
- km
- inch
- ft

Pressure:
- Pa
- kPa
- MPa
- bar
- psi

Power:
- W
- kW
- MW
- hp

Energy:
- J
- kJ
- Wh
- kWh

Temperature:
- Celsius
- Fahrenheit
- Kelvin

DESIGN

Use a modern, clean engineering interface.

Homepage structure:

ENGINEERTOOLS
Free Engineering Calculators

Search calculators

Electrical
- Ohm's Law
- Electrical Power

Energy
- Battery Runtime

Mechanical
- Motor Speed
- Gear Ratio

Conversions
- Engineering Unit Converter

Each calculator should open in a dedicated section/page.

Use cards, clear labels and large input fields.

Make the calculator usable on a mobile phone.

PROJECT STRUCTURE

Create:

index.html
style.css
script.js

You may create additional JavaScript modules if necessary, but
do not over-engineer the application.

Also create:

README.md

README.md must explain:
- What EngineerTools is
- Features
- Technologies used
- How to run locally
- How to deploy using GitHub Pages
- How to contribute

TESTING

After implementation:
1. Test every calculator.
2. Test zero values.
3. Test empty fields.
4. Test invalid input.
5. Test decimal values.
6. Test mobile layout.
7. Check browser console for errors.
8. Verify every formula manually.
9. Verify that every button works.
10. Remove unused code.

Do not add unnecessary features.

The objective is a polished Version 1 that can be completed
and published in one day.


# ENGINEERTOOLS — VERSION 2 DEVELOPMENT PROMPT

## Project

Extend the existing **EngineerTools — Free Engineering Calculators** web application.

The current Version 1 is already working. **Do NOT rebuild the application from scratch. Do NOT remove or replace existing Version 1 calculators.**

Your job is to extend the existing application by adding seven new electrical/electronics engineering calculators.

---

# VERSION 2 OBJECTIVE

Add the following calculators:

1. Resistor Color Code Calculator
2. Voltage Divider Calculator
3. Capacitor Calculator
4. Inductor Calculator
5. Transformer Calculator
6. LED Resistor Calculator
7. Three-Phase Power Calculator

All existing Version 1 calculators must continue working exactly as they currently do.

---

# IMPORTANT DEVELOPMENT RULES

Before making changes:

1. Inspect the entire existing EngineerTools project.
2. Understand the current folder structure.
3. Identify how Version 1 calculators are implemented.
4. Identify the existing navigation system.
5. Identify the existing calculator-card design.
6. Identify the existing JavaScript structure.
7. Reuse existing components, styles, functions and patterns wherever possible.
8. Do not duplicate code unnecessarily.
9. Do not introduce a framework if the existing project does not use one.
10. Do not change the existing design unnecessarily.

The new Version 2 calculators must look like they belong to the same EngineerTools application.

---

# 1. RESISTOR COLOR CODE CALCULATOR

Create a calculator that allows users to determine resistor resistance from color bands.

Support:

### 4-band resistor

Band 1:

* Black
* Brown
* Red
* Orange
* Yellow
* Green
* Blue
* Violet
* Grey
* White

Band 2:
Same color options.

Multiplier:

* Black
* Brown
* Red
* Orange
* Yellow
* Green
* Blue
* Violet
* Grey
* White
* Gold
* Silver

Tolerance:

* Brown = ±1%
* Red = ±2%
* Green = ±0.5%
* Blue = ±0.25%
* Violet = ±0.1%
* Grey = ±0.05%
* Gold = ±5%
* Silver = ±10%

Allow the user to visually select the resistor colors.

Display:

Resistance:
Example:

270 Ω ±5%

Also display:

* Resistance value
* Tolerance
* Minimum resistance
* Maximum resistance
* Formula/calculation explanation

Example:

Band 1 = Red
Band 2 = Violet
Multiplier = Brown
Tolerance = Gold

Result:

270 Ω ±5%

Include a visual resistor representation whose bands change when the user changes the selected colors.

---

# 2. VOLTAGE DIVIDER CALCULATOR

Create a Voltage Divider Calculator.

Use:

Vout = Vin × R2 / (R1 + R2)

Inputs:

* Input Voltage (Vin)
* R1
* R2

Calculate:

* Output Voltage
* Voltage across R1
* Voltage across R2

Display:

Formula

Calculation steps

Final result

Example:

Vin = 12 V
R1 = 1 kΩ
R2 = 2 kΩ

Vout = 8 V

Include a simple visual representation:

Vin
|
R1
|
+------ Vout
|
R2
|
GND

Make the diagram responsive.

---

# 3. CAPACITOR CALCULATOR

Create a capacitor calculator with useful basic engineering calculations.

Include:

### Capacitance

Allow unit conversion:

* pF
* nF
* µF
* mF
* F

### Capacitive Reactance

Use:

Xc = 1 / (2πfC)

Inputs:

* Frequency
* Capacitance

Output:

* Capacitive reactance in Ω

### RC Time Constant

Use:

τ = RC

Inputs:

* Resistance
* Capacitance

Output:

* Time constant in seconds

Also include common unit conversions.

Clearly explain each formula.

---

# 4. INDUCTOR CALCULATOR

Create an Inductor Calculator.

Include:

### Inductive Reactance

Use:

XL = 2πfL

Inputs:

* Frequency
* Inductance

Output:

* Inductive reactance in Ω

### RL Time Constant

Use:

τ = L/R

Inputs:

* Inductance
* Resistance

Output:

* Time constant in seconds

Support:

Inductance:

* µH
* mH
* H

Frequency:

* Hz
* kHz
* MHz

Display formula and calculation steps.

---

# 5. TRANSFORMER CALCULATOR

Create a basic ideal Transformer Calculator.

Use:

Vp / Vs = Np / Ns

and

Vp × Ip = Vs × Is

Allow the user to calculate:

* Secondary voltage
* Primary voltage
* Turns ratio
* Primary turns
* Secondary turns
* Secondary current
* Primary current

Include selectable calculation modes.

Example:

Primary voltage = 240 V
Primary turns = 1000
Secondary turns = 100

Result:

Secondary voltage = 24 V

Display:

Turns Ratio = 10:1

Clearly state:

"This calculator uses an ideal transformer model. Real transformers have losses and efficiency less than 100%."

Do not present ideal calculations as real-world exact measurements.

---

# 6. LED RESISTOR CALCULATOR

Create an LED Series Resistor Calculator.

Use:

R = (Vs - Vf) / I

Inputs:

* Supply voltage
* LED forward voltage
* Desired LED current

Support common LED forward voltage examples:

Red ≈ 2.0 V
Yellow ≈ 2.1 V
Green ≈ 2.2 V
Blue ≈ 3.0–3.3 V
White ≈ 3.0–3.3 V

Allow users to enter their own forward voltage.

Allow current input in:

* mA
* A

Calculate:

* Required resistor resistance
* Resistor power
* Recommended minimum resistor power rating

Also recommend selecting the next standard resistor value above the calculated value.

Example:

Supply = 12 V
LED Vf = 2 V
Current = 20 mA

Calculated resistor ≈ 500 Ω

Recommended standard value:

510 Ω

Also calculate resistor power.

Display a safety note:

"Use a suitable resistor power rating and verify the LED's maximum forward current before connecting the circuit."

---

# 7. THREE-PHASE POWER CALCULATOR

Create a Three-Phase Electrical Power Calculator.

Support:

### Balanced three-phase system

Use:

P = √3 × VL × IL × PF

Where:

P = real power
VL = line voltage
IL = line current
PF = power factor

Allow calculation of:

* Real Power
* Line Voltage
* Line Current
* Power Factor

Also provide apparent power:

S = √3 × VL × IL

and reactive power:

Q = √(S² - P²)

Allow units:

* W
* kW
* MW
* VA
* kVA
* var
* kvar

Include a clear note:

"The calculator assumes a balanced three-phase system."

Add an option to distinguish between:

* Line-to-line voltage
* Line current

Clearly explain the assumptions.

---

# USER INTERFACE

Add all Version 2 calculators to the EngineerTools homepage.

Create a new category:

## ELECTRICAL & ELECTRONICS

Display:

┌─────────────────────────────┐
│ Resistor Color Code         │
│ Decode resistor bands       │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Voltage Divider             │
│ Calculate output voltage    │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Capacitor Calculator        │
│ Reactance & time constant   │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Inductor Calculator         │
│ Reactance & RL calculations │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Transformer Calculator      │
│ Voltage & turns ratio       │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ LED Resistor Calculator     │
│ Calculate LED resistance    │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Three-Phase Power           │
│ Calculate 3-phase power     │
│ [Open Calculator]           │
└─────────────────────────────┘

---

# CALCULATOR PAGE DESIGN

Every calculator should have the same general structure:

1. Calculator title
2. Short description
3. Input section
4. Calculate button
5. Reset button
6. Result section
7. Formula section
8. Calculation explanation
9. Engineering notes/assumptions
10. Related calculators

Example:

CALCULATOR TITLE

Description

INPUTS
[ Input field ]

[ Input field ]

[ Calculate ]

[ Reset ]

RESULT

========================

Result: 24 V

========================

FORMULA

Vout = Vin × R2 / (R1 + R2)

CALCULATION

Show the actual values substituted into the formula.

ENGINEERING NOTE

Explain important assumptions and limitations.

---

# VALIDATION

Every calculator must properly handle:

* Empty inputs
* Zero values where inappropriate
* Negative values where inappropriate
* Invalid numbers
* Very large numbers
* Decimal numbers
* Unit conversions
* Division by zero

Display friendly error messages.

Never display:

NaN

Infinity

undefined

or unexplained JavaScript errors to the user.

---

# ENGINEERING ACCURACY

Accuracy is extremely important.

Before completing each calculator:

1. Verify the formula.
2. Test the formula with known values.
3. Test unit conversions.
4. Test edge cases.
5. Check rounding.
6. Check displayed units.
7. Check calculation steps.

Do not invent engineering formulas.

Where a calculator uses assumptions, clearly state them.

For example:

* Transformer calculator = ideal transformer
* Three-phase calculator = balanced system
* Battery calculator = estimate
* LED calculator = assumes a simple series resistor circuit

---

# SEARCH FUNCTION

Update the existing EngineerTools search functionality so users can search for:

"resistor"

"voltage divider"

"capacitor"

"inductor"

"transformer"

"LED"

"three phase"

"power"

The correct calculator should appear in the search results.

---

# NAVIGATION

Update the existing navigation.

Recommended categories:

ELECTRICAL

* Ohm's Law
* Electrical Power
* Voltage Divider
* Three-Phase Power

ELECTRONICS

* Resistor Color Code
* Capacitor
* Inductor
* LED Resistor
* Transformer

ENERGY

* Battery Runtime

MECHANICAL

* Motor Speed
* Gear Ratio

CONVERTERS

* Engineering Unit Converter

Do not remove any existing Version 1 calculator.

---

# RELATED CALCULATORS

At the bottom of each calculator, display related tools.

Example:

Voltage Divider:

Related Calculators:

* Ohm's Law
* Resistor Color Code
* LED Resistor
* Electrical Power

LED Resistor:

Related Calculators:

* Ohm's Law
* Resistor Color Code
* Voltage Divider
* Electrical Power

Three-Phase Power:

Related Calculators:

* Electrical Power
* Motor Speed
* Engineering Unit Converter

---

# SEO

Improve each calculator page for search engines.

Use meaningful:

* Page titles
* Meta descriptions
* Headings
* Descriptions

Examples:

"Resistor Color Code Calculator | EngineerTools"

"Voltage Divider Calculator | EngineerTools"

"LED Resistor Calculator | EngineerTools"

"Three Phase Power Calculator | EngineerTools"

Do not use misleading SEO claims.

---

# ACCESSIBILITY

Ensure:

* Labels are associated with inputs.
* Buttons have meaningful names.
* Good keyboard navigation.
* Focus states are visible.
* Color is not the only way to communicate information.
* Text is readable on mobile devices.
* Resistor color bands include text labels in addition to color.

---

# PERFORMANCE

Keep the application lightweight.

Do not introduce unnecessary libraries.

The calculators should work quickly even on low-end mobile devices.

Do not add a backend or database.

---

# VERSION CONTROL

Before modifying the application:

Inspect the existing Git repository.

After completing Version 2:

Create a clear Git commit message such as:

"Add Version 2 electrical engineering calculators"

Do not delete existing Git history.

Do not overwrite the repository.

---

# TESTING CHECKLIST

Test every Version 1 calculator.

Then test every Version 2 calculator.

Test:

* Desktop
* Tablet
* Mobile
* Chrome
* Edge

Check browser console.

Check:

* Navigation
* Search
* Calculator buttons
* Reset buttons
* Form validation
* Unit conversion
* Results
* Formula display
* Responsive layout

Confirm that Version 1 has not been broken.

---

# README UPDATE

Update README.md.

Add:

## Version 2

New calculators:

1. Resistor Color Code
2. Voltage Divider
3. Capacitor
4. Inductor
5. Transformer
6. LED Resistor
7. Three-Phase Power

Explain the formulas and assumptions at a high level.

Also update the feature list.

---

# IMPORTANT

Do not rebuild EngineerTools.

Do not replace Version 1.

Do not remove existing calculators.

Do not redesign the entire website.

Extend the existing application.

Reuse existing components and styles.

Keep the application simple.

Build and test one calculator at a time.

At the end, provide a concise summary of:

1. Files created
2. Files modified
3. Calculators added
4. Bugs fixed
5. Tests performed
6. Any remaining issues

The final result should be a polished **EngineerTools Version 2 — Free Engineering Calculators** application ready to commit to GitHub and deploy online.


# ENGINEERTOOLS — VERSION 3 DEVELOPMENT PROMPT

## PROJECT

Continue development of the existing:

**ENGINEERTOOLS — Free Engineering Calculators**

Version 1 and Version 2 are already implemented.

**DO NOT rebuild the application from scratch.**

**DO NOT remove, replace, redesign, or break any existing Version 1 or Version 2 calculators.**

Version 3 must extend the current application by adding seven new engineering calculators focused on:

* Structural/Mechanical Engineering
* Machine Design
* Power Transmission
* Hydraulic Engineering
* Fluid Mechanics

---

# VERSION 3 CALCULATORS

Add the following:

1. Beam Deflection Calculator
2. Torque Calculator
3. Shaft Power Calculator
4. Gear Design Calculator
5. Hydraulic Jack Calculator
6. Pump Head Calculator
7. Fluid Pressure Calculator

---

# DEVELOPMENT APPROACH

Before writing code:

1. Inspect the existing EngineerTools project.
2. Understand the current project architecture.
3. Identify how Version 1 calculators were implemented.
4. Identify how Version 2 calculators were implemented.
5. Reuse existing calculator components.
6. Reuse existing CSS styles.
7. Reuse existing navigation.
8. Reuse existing search functionality.
9. Reuse existing validation functions where appropriate.
10. Follow the same design language as Versions 1 and 2.

Do not create a completely separate application.

The goal is to make Version 3 look like a natural extension of EngineerTools.

---

# 1. BEAM DEFLECTION CALCULATOR

Create a basic beam deflection calculator for educational and preliminary engineering calculations.

The calculator should support common beam configurations.

At minimum include:

### Beam Type

Allow the user to select:

1. Simply Supported Beam — Center Point Load
2. Simply Supported Beam — Uniformly Distributed Load
3. Cantilever Beam — End Point Load
4. Cantilever Beam — Uniformly Distributed Load

---

## INPUTS

Depending on the selected beam type, provide:

* Beam length, L
* Applied load, P
* Uniform load, w
* Young's modulus, E
* Second moment of area, I

Allow suitable units:

Length:

* mm
* m

Force:

* N
* kN

Young's modulus:

* Pa
* MPa
* GPa

Second moment of area:

* mm⁴
* m⁴

---

## FORMULAS

For a simply supported beam with center point load:

δmax = PL³ / 48EI

For a cantilever beam with an end point load:

δmax = PL³ / 3EI

For a simply supported beam with uniformly distributed load:

δmax = 5wL⁴ / 384EI

For a cantilever beam with uniformly distributed load:

δmax = wL⁴ / 8EI

Display:

* Maximum deflection
* Deflection unit
* Formula used
* Calculation steps

---

## BEAM VISUALIZATION

Create a simple visual diagram that changes according to beam type.

For example:

Simply Supported:

Support ▲────────────▲
↓ P

Cantilever:

Wall │───────────────
↓ P

The visual does not need to be a CAD model.

Keep it simple and responsive.

---

## IMPORTANT

Clearly state:

"This calculator uses simplified beam theory and is intended for educational and preliminary calculations. It should not replace detailed structural analysis or professional engineering design."

---

# 2. TORQUE CALCULATOR

Create a Torque Calculator.

Allow users to calculate:

* Torque
* Force
* Lever arm
* Angle

Use:

τ = rF sin(θ)

Where:

τ = torque
r = lever arm
F = force
θ = angle between force and lever arm

For the common perpendicular case:

τ = rF

---

## INPUTS

* Force
* Distance/lever arm
* Angle

Units:

Force:

* N
* kN

Distance:

* mm
* cm
* m

Angle:

* degrees

Calculate:

* Torque in N·m
* Torque in N·mm
* Torque in kN·m where appropriate

Display the formula and calculation steps.

Also provide a simple torque visual.

---

# 3. SHAFT POWER CALCULATOR

Create a Shaft Power Calculator.

Allow users to calculate mechanical power from torque and rotational speed.

Use:

P = 2πNT / 60

Where:

P = power in watts
N = rotational speed in RPM
T = torque in N·m

Allow users to calculate:

* Power
* Torque
* RPM

Display:

* Power in W
* Power in kW
* Optional horsepower

Use:

1 hp ≈ 746 W

---

## INPUTS

Torque:

* N·m

Speed:

* RPM

Calculate:

Power = 2πNT / 60

Show the calculation step-by-step.

Also provide a link/card to the existing Motor Speed Calculator.

---

# 4. GEAR DESIGN CALCULATOR

Create a basic Gear Design Calculator.

This is intended for educational and preliminary machine-design calculations.

Allow the user to enter:

* Number of teeth on driver gear
* Number of teeth on driven gear
* Driver RPM
* Module
* Optional pressure angle

Calculate:

### Gear Ratio

i = Z₂ / Z₁

Where:

Z₁ = driver teeth

Z₂ = driven teeth

### Output Speed

N₂ = N₁ × Z₁ / Z₂

### Pitch Diameter

d = mZ

Where:

d = pitch diameter

m = module

Z = number of teeth

Calculate:

* Gear ratio
* Output RPM
* Driver pitch diameter
* Driven pitch diameter

---

## OPTIONAL

If practical, include:

* Center distance

For two external gears:

a = (d₁ + d₂) / 2

Display:

* Gear ratio
* Speed reduction/increase
* Pitch diameters
* Center distance

Provide a simple visual:

Driver Gear → Driven Gear

The visual can show approximate gear sizes based on the number of teeth.

---

## IMPORTANT

Clearly state that this is a simplified gear calculator and does not perform complete gear-strength, wear, contact-stress, or AGMA/ISO design verification.

---

# 5. HYDRAULIC JACK CALCULATOR

Create a Hydraulic Jack Calculator based on Pascal's law.

Use:

P = F / A

and:

F₂ / F₁ = A₂ / A₁

Therefore:

F₂ = F₁ × A₂ / A₁

---

## INPUTS

Allow the user to enter:

Small piston force
Small piston diameter
Large piston diameter

Calculate:

* Hydraulic pressure
* Large piston force
* Mechanical force multiplication

---

## OPTIONAL

Also calculate piston areas:

A = πd² / 4

Display:

Small piston area

Large piston area

Force multiplication ratio

Output lifting force

---

## VISUAL

Create a simple hydraulic jack diagram:

```
   Load
    ↓
```

┌─────────┐
│ Large   │
│ Piston  │
└────┬────┘
│
Hydraulic
Fluid
│
┌────┴────┐
│ Small   │
│ Piston  │
└─────────┘
↑
Force

Keep the visualization simple.

---

# 6. PUMP HEAD CALCULATOR

Create a Pump Head Calculator.

The calculator should provide a basic hydraulic head calculation.

Use:

H = P / (ρg)

Where:

H = pressure head in metres
P = pressure in Pa
ρ = fluid density in kg/m³
g = gravitational acceleration

Use:

g = 9.81 m/s²

Allow users to enter:

* Pressure
* Fluid density

Calculate:

* Pressure head in metres

---

## ALSO PROVIDE TOTAL HEAD

Where practical, include a simplified total dynamic head calculation:

H_total = H_static + H_friction + H_velocity

Allow optional inputs:

* Static head
* Friction head
* Velocity head

Calculate:

Total head

Clearly distinguish between:

Pressure Head

and

Total Dynamic Head.

---

## COMMON FLUIDS

Provide presets:

Water:
ρ = 1000 kg/m³

Allow the user to enter custom density.

Do not assume all fluids have the density of water.

---

# 7. FLUID PRESSURE CALCULATOR

Create a Fluid Pressure Calculator.

Support basic pressure calculations.

---

## HYDROSTATIC PRESSURE

Use:

P = ρgh

Where:

P = pressure
ρ = fluid density
g = gravitational acceleration
h = fluid depth

Allow users to enter:

* Fluid density
* Fluid depth

Calculate:

* Hydrostatic pressure in Pa
* kPa
* bar
* psi

---

## PRESSURE FROM FORCE AND AREA

Also support:

P = F/A

Inputs:

* Force
* Area

Calculate:

Pressure.

---

## PRESSURE CONVERSION

Support:

* Pa
* kPa
* MPa
* bar
* psi
* atm

Allow users to convert between units.

---

# USER INTERFACE

Add a new category to the EngineerTools homepage:

# MECHANICAL & FLUID

Cards:

┌─────────────────────────────┐
│ 📐 Beam Deflection          │
│ Estimate beam deflection    │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚙️ Torque Calculator        │
│ Calculate torque            │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚙️ Shaft Power              │
│ Torque, RPM & power         │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚙️ Gear Design              │
│ Gear ratio & dimensions     │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🔧 Hydraulic Jack           │
│ Hydraulic force multiplier  │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 💧 Pump Head                │
│ Calculate hydraulic head    │
│ [Open Calculator]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 💧 Fluid Pressure           │
│ Pressure calculations       │
│ [Open Calculator]           │
└─────────────────────────────┘

---

# CALCULATOR STANDARD

Every Version 3 calculator must follow the same interface:

1. Title
2. Short explanation
3. Input fields
4. Unit selection
5. Calculate button
6. Reset button
7. Result panel
8. Formula
9. Calculation steps
10. Engineering assumptions
11. Related calculators

Example:

## RESULT

---

Maximum Deflection

2.45 mm

---

## FORMULA

δmax = PL³ / 48EI

## CALCULATION

Show the actual values substituted into the formula.

---

# INPUT VALIDATION

Every calculator must handle:

* Empty fields
* Invalid values
* Zero values where invalid
* Negative values where physically inappropriate
* Extremely large values
* Decimal values
* Unit conversion errors
* Division by zero

Never display:

NaN

Infinity

undefined

or raw JavaScript errors.

Provide human-readable error messages.

---

# ENGINEERING ACCURACY

This is an engineering calculator website.

Mathematical accuracy is critical.

Before completing each calculator:

1. Verify the governing equation.
2. Verify dimensions/units.
3. Test with manually calculated examples.
4. Test unit conversions.
5. Test edge cases.
6. Test rounding.
7. Verify displayed units.
8. Verify calculation steps.

Use SI units internally where practical.

Convert user input into consistent SI units before calculations.

Then convert the final answer to the requested display unit.

---

# ASSUMPTIONS AND LIMITATIONS

Every calculator must clearly communicate its assumptions.

Examples:

Beam Deflection:

"Based on simplified Euler-Bernoulli beam theory."

Gear Design:

"Provides preliminary geometric calculations and does not replace detailed gear strength or standards-based design."

Hydraulic Jack:

"Assumes ideal hydraulic force transmission and does not account for mechanical losses."

Pump Head:

"Basic head calculation; actual pump selection requires system-specific flow, friction losses, efficiency and manufacturer pump curves."

Fluid Pressure:

"Hydrostatic pressure assumes a static fluid and known density."

Torque:

"Torque depends on the force magnitude, lever arm and angle."

Shaft Power:

"Power calculation assumes rotational speed and torque values are known."

---

# RELATED CALCULATORS

Connect Version 3 calculators to existing EngineerTools calculators.

For example:

### Torque

Related:

* Shaft Power
* Motor Speed
* Gear Design

### Shaft Power

Related:

* Torque
* Motor Speed
* Gear Ratio

### Gear Design

Related:

* Gear Ratio
* Motor Speed
* Torque
* Shaft Power

### Hydraulic Jack

Related:

* Fluid Pressure
* Pump Head
* Unit Converter

### Pump Head

Related:

* Fluid Pressure
* Hydraulic Jack
* Unit Converter

### Beam Deflection

Related:

* Unit Converter
* Torque
* Engineering Calculator

---

# SEARCH

Update the existing EngineerTools search system.

Users should be able to search:

"beam"

"deflection"

"torque"

"shaft"

"power"

"gear"

"gear ratio"

"hydraulic"

"jack"

"pump"

"pump head"

"fluid"

"pressure"

The appropriate calculator must appear.

---

# NAVIGATION

Organize the EngineerTools navigation into:

## ELECTRICAL

* Ohm's Law
* Electrical Power
* Voltage Divider
* Three-Phase Power

## ELECTRONICS

* Resistor Color Code
* Capacitor
* Inductor
* Transformer
* LED Resistor

## MECHANICAL

* Motor Speed
* Torque
* Shaft Power
* Gear Ratio
* Gear Design
* Beam Deflection

## FLUID & HYDRAULICS

* Hydraulic Jack
* Pump Head
* Fluid Pressure

## ENERGY

* Battery Runtime

## CONVERTERS

* Engineering Unit Converter

Do not remove existing calculators.

---

# SEO

Add appropriate metadata for each new calculator.

Examples:

"Beam Deflection Calculator | EngineerTools"

"Torque Calculator | EngineerTools"

"Shaft Power Calculator | EngineerTools"

"Gear Design Calculator | EngineerTools"

"Hydraulic Jack Calculator | EngineerTools"

"Pump Head Calculator | EngineerTools"

"Fluid Pressure Calculator | EngineerTools"

Use meaningful descriptions containing the actual engineering purpose of each tool.

---

# MOBILE DESIGN

All calculators must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile phone

Use responsive layouts.

Do not allow horizontal scrolling.

Input controls must be large enough for touch interaction.

Results should remain clearly visible on small screens.

---

# ACCESSIBILITY

Implement:

* Proper labels
* Keyboard navigation
* Visible focus states
* Semantic HTML
* Accessible buttons
* Meaningful error messages

Do not rely only on colors to communicate information.

---

# PERFORMANCE

Keep EngineerTools lightweight.

Do not introduce unnecessary dependencies.

Do not add:

* Backend
* Database
* Authentication
* Payment system
* External API

unless the existing project already requires them.

The Version 3 calculators should work entirely in the browser.

---

# TESTING

After development:

### Version 1

Verify all Version 1 calculators still work.

### Version 2

Verify all Version 2 calculators still work.

### Version 3

Test:

1. Beam Deflection
2. Torque
3. Shaft Power
4. Gear Design
5. Hydraulic Jack
6. Pump Head
7. Fluid Pressure

For every calculator test:

* Normal values
* Decimal values
* Empty values
* Zero values
* Invalid values
* Very large values
* Unit conversion
* Reset button
* Calculate button
* Formula display
* Calculation steps

Also test:

* Search
* Navigation
* Related calculators
* Mobile layout
* Browser console

Fix all errors before completing the task.

---

# README UPDATE

Update README.md with:

# EngineerTools

Free Engineering Calculators

Add Version 3 to the feature list.

## Version 3 — Mechanical & Fluid Engineering

Include:

* Beam Deflection
* Torque
* Shaft Power
* Gear Design
* Hydraulic Jack
* Pump Head
* Fluid Pressure

Briefly explain what each calculator does.

---

# GITHUB

Do not delete existing Git history.

Do not overwrite the repository.

After successful implementation, create a clear Git commit:

"Add Version 3 mechanical and fluid calculators"

Ensure the application remains ready for GitHub Pages deployment.

---

# FINAL QUALITY CHECK

Before declaring the work complete:

* Do not rebuild EngineerTools.
* Do not remove Version 1.
* Do not remove Version 2.
* Do not break existing calculators.
* Do not duplicate unnecessary code.
* Do not introduce unnecessary dependencies.
* Verify engineering formulas.
* Verify unit conversions.
* Verify responsive design.
* Verify accessibility.
* Verify all navigation.
* Verify all search results.
* Verify all calculator results.

Finally, provide a concise development report containing:

1. New files created
2. Existing files modified
3. Seven calculators added
4. Engineering formulas implemented
5. Validation implemented
6. Tests performed
7. Bugs fixed
8. Any remaining issues

The final result must be:

**ENGINEERTOOLS VERSION 3**
**Free Engineering Calculators**

with Version 1 + Version 2 + Version 3 working together as one unified engineering toolbox.

# ENGINEERTOOLS — VERSION 4 DEVELOPMENT PROMPT

## PROJECT

Continue development of the existing:

**ENGINEERTOOLS — Free Engineering Calculators**

The application already contains:

* Version 1 — Basic Engineering Calculators
* Version 2 — Electrical & Electronics Calculators
* Version 3 — Mechanical & Fluid Engineering Calculators

**DO NOT rebuild the application from scratch.**

**DO NOT remove, replace, redesign, or break any existing calculator.**

Version 4 must extend the existing application by adding six new calculators focused on:

# ENERGY & POWER SYSTEMS

Add:

1. Solar Panel Sizing Calculator
2. Inverter Sizing Calculator
3. Cable Sizing Calculator
4. Battery Bank Sizing Calculator
5. Energy Consumption Calculator
6. Generator Sizing Calculator

The final application must remain lightweight, responsive and suitable for deployment through GitHub Pages.

---

# DEVELOPMENT RULES

Before writing any code:

1. Inspect the complete existing EngineerTools project.
2. Understand the current architecture.
3. Identify the existing calculator component structure.
4. Identify existing unit-conversion functions.
5. Identify existing validation functions.
6. Identify existing navigation.
7. Identify the existing search system.
8. Identify the existing styling system.
9. Reuse existing components and utilities.
10. Follow the existing EngineerTools design.

Do not create a separate application.

Do not duplicate existing functionality unnecessarily.

Do not introduce a backend or database.

---

# VERSION 4 CATEGORY

Create a new main category:

## ENERGY & POWER SYSTEMS

The homepage should contain:

┌──────────────────────────────────┐
│ ☀️ Solar Panel Sizing            │
│ Estimate required solar capacity│
│ [Open Calculator]                │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ⚡ Inverter Sizing               │
│ Select an appropriate inverter   │
│ [Open Calculator]                │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 🔌 Cable Sizing                  │
│ Estimate cable size              │
│ [Open Calculator]                │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 🔋 Battery Bank Sizing           │
│ Estimate battery capacity       │
│ [Open Calculator]                │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 📊 Energy Consumption            │
│ Calculate electrical energy use  │
│ [Open Calculator]                │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ⚙️ Generator Sizing              │
│ Estimate generator capacity      │
│ [Open Calculator]                │
└──────────────────────────────────┘

---

# 1. SOLAR PANEL SIZING CALCULATOR

Create a Solar Panel Sizing Calculator for preliminary solar-system sizing.

The calculator should estimate the required photovoltaic array capacity based on daily energy consumption and available peak sun hours.

## INPUTS

Provide:

* Daily energy requirement
* Peak Sun Hours
* System efficiency / derating factor
* Panel wattage

Allow:

Energy:

* Wh/day
* kWh/day

Solar panel:

* W
* kW

Efficiency:

* Percentage

Example:

Daily energy = 5 kWh/day

Peak Sun Hours = 5 hours/day

System efficiency = 80%

Panel rating = 550 W

---

# CALCULATIONS

Use:

Required PV Power = Daily Energy / (Peak Sun Hours × System Efficiency)

Where efficiency is expressed as a decimal.

For example:

80% = 0.80

Then calculate:

Number of Panels =
Required PV Power / Panel Power

Round the number of panels UP to the next whole panel.

Then calculate actual installed capacity:

Actual PV Capacity =
Number of Panels × Panel Rating

---

# OUTPUTS

Display:

* Daily energy requirement
* Required solar array capacity
* Recommended number of panels
* Actual installed PV capacity
* Estimated daily solar energy production

Also display:

### Formula

PV Power = E / (H × η)

Where:

E = daily energy requirement
H = peak sun hours
η = system efficiency

---

# SOLAR PANEL PRESETS

Provide optional common panel ratings:

* 100 W
* 200 W
* 300 W
* 400 W
* 450 W
* 500 W
* 550 W
* Custom

Do not assume that all solar panels have the same rating.

---

# IMPORTANT DISCLAIMER

Display:

"This calculator provides preliminary solar-system sizing only. Actual system design should consider location-specific solar irradiation, temperature, shading, panel orientation, battery losses, inverter efficiency, wiring losses and applicable electrical standards."

---

# 2. INVERTER SIZING CALCULATOR

Create an Inverter Sizing Calculator.

The calculator should help users estimate the minimum inverter capacity required for a group of appliances.

## INPUTS

Allow users to add multiple appliances.

Each appliance should have:

* Appliance name
* Quantity
* Running power in watts
* Starting/surge power in watts
* Optional operating hours

Example:

Refrigerator
Quantity: 1
Running Power: 150 W
Surge Power: 600 W

Television
Quantity: 1
Running Power: 100 W
Surge Power: 200 W

Fan
Quantity: 2
Running Power: 80 W
Surge Power: 120 W

---

# CALCULATIONS

Calculate:

Total Running Power =
Sum of all appliance running power × quantity

Estimated Maximum Surge Power =
Sum of applicable surge power × quantity

Apply a design margin.

Default design margin:

20%

Recommended inverter continuous capacity:

Recommended Inverter Power =
Total Running Power × 1.20

Also consider surge capacity.

---

# OUTPUT

Display:

* Total running load
* Estimated surge requirement
* Recommended continuous inverter capacity
* Recommended inverter rating
* Minimum surge capacity

Recommend standard inverter sizes where appropriate:

* 1 kVA
* 1.5 kVA
* 2 kVA
* 3 kVA
* 5 kVA
* 7.5 kVA
* 10 kVA
* Custom

Clearly distinguish:

kW = real power

kVA = apparent power

---

# IMPORTANT

State:

"Actual inverter selection should consider appliance starting currents, power factor, inverter waveform, battery voltage, manufacturer specifications and applicable standards."

Do not claim that the calculator guarantees safe inverter sizing.

---

# 3. CABLE SIZING CALCULATOR

Create a preliminary Cable Sizing Calculator.

The calculator should estimate conductor size based on current and voltage drop.

## INPUTS

Allow:

* Load power
* Voltage
* Single-phase / three-phase
* Cable length
* Conductor material
* Power factor
* Allowable voltage drop percentage

Materials:

* Copper
* Aluminium

Cable length should represent the appropriate circuit length according to the calculation method. Clearly explain whether the calculator uses one-way length and accounts for the return path.

---

# CURRENT CALCULATION

For single-phase:

I = P / (V × PF)

For three-phase:

I = P / (√3 × V × PF)

---

# VOLTAGE DROP

Implement an appropriate simplified voltage-drop calculation.

For a basic resistive approximation:

Vdrop = I × R

Where:

R = ρL/A

Therefore:

Vdrop = IρL/A

Where:

ρ = conductor resistivity
L = circuit length
A = conductor cross-sectional area

For AC circuits, clearly state that this is a simplified approximation and does not fully account for reactance.

---

# STANDARD CABLE SIZES

Provide selectable standard conductor sizes such as:

* 1.0 mm²
* 1.5 mm²
* 2.5 mm²
* 4 mm²
* 6 mm²
* 10 mm²
* 16 mm²
* 25 mm²
* 35 mm²
* 50 mm²
* 70 mm²
* 95 mm²
* 120 mm²

Select the smallest candidate size that satisfies the configured voltage-drop criterion within the calculator's simplified model.

---

# OUTPUT

Display:

* Load current
* Minimum estimated conductor area
* Recommended standard cable size
* Estimated voltage drop
* Voltage-drop percentage
* Conductor material

---

# IMPORTANT SAFETY NOTICE

This is critical.

Display:

"This is a preliminary cable-sizing calculator, not a substitute for electrical installation design. Actual cable selection must consider ampacity, installation method, ambient temperature, grouping, insulation rating, short-circuit withstand, protective devices, voltage drop limits and applicable electrical codes/standards."

Do not claim that a cable is "safe" based only on this calculator.

---

# 4. BATTERY BANK SIZING CALCULATOR

Create a Battery Bank Sizing Calculator.

The calculator should estimate the required battery capacity for an off-grid or backup system.

## INPUTS

Provide:

* Daily energy requirement
* Required backup/autonomy days
* System voltage
* Battery type
* Maximum depth of discharge
* Inverter/system efficiency

Battery types:

* Lead-acid
* AGM
* Gel
* Lithium-ion
* LiFePO4
* Custom

Provide sensible default depth-of-discharge values but allow the user to change them.

---

# CALCULATION

Use:

Required Battery Energy =
Daily Energy × Autonomy Days /
(Depth of Discharge × System Efficiency)

Convert energy to amp-hours:

Battery Capacity (Ah) =
Required Battery Energy (Wh) / System Voltage

For example:

Daily energy = 5,000 Wh

Autonomy = 1 day

System voltage = 24 V

DoD = 80%

Efficiency = 90%

---

# OUTPUT

Display:

* Required battery energy in Wh
* Recommended battery capacity in Ah
* System voltage
* Number of batteries in series
* Number of parallel strings where battery specifications are provided
* Total nominal battery capacity

If battery specifications are not supplied, do not invent a specific battery configuration.

---

# BATTERY CONFIGURATION

Allow optional inputs:

Battery nominal voltage:

* 2 V
* 6 V
* 12 V
* 24 V
* 48 V

Battery capacity:

* Ah

If the user provides individual battery specifications, calculate:

Number in Series =
System Voltage / Battery Voltage

Number of Parallel Strings =
Required Ah / Battery Ah

Round both appropriately and explain the result.

---

# IMPORTANT

Display:

"Battery sizing is an estimate. Actual battery selection should consider temperature, discharge rate, battery chemistry, cycle life, manufacturer specifications, inverter efficiency and system operating conditions."

---

# 5. ENERGY CONSUMPTION CALCULATOR

Create an Energy Consumption Calculator.

This should be one of the most useful tools in EngineerTools.

Allow users to add multiple appliances.

Each appliance should have:

* Appliance name
* Quantity
* Power rating
* Operating hours per day
* Days per month

Example:

Refrigerator
Power = 150 W
Quantity = 1
Hours/day = 24
Days/month = 30

Fan
Power = 80 W
Quantity = 2
Hours/day = 8
Days/month = 30

---

# CALCULATIONS

For each appliance:

Energy (Wh) =
Power × Quantity × Hours × Days

Convert to:

kWh

Total energy:

Total kWh =
Sum of all appliance energy consumption

---

# COST ESTIMATION

Allow optional electricity tariff input:

Cost per kWh

Calculate:

Estimated Cost =
Total Energy × Tariff

Display:

* Energy per appliance
* Total daily energy
* Total monthly energy
* Estimated monthly cost

---

# RESULTS

Create a summary dashboard:

Total Connected Load
Total Daily Energy
Total Monthly Energy
Estimated Monthly Cost

Also show the highest energy-consuming appliances.

---

# OPTIONAL CHART

If the existing project supports lightweight charting without unnecessarily increasing complexity, display a simple bar chart showing:

Appliance vs Monthly Energy Consumption

If a chart library is not already installed, use a simple CSS/HTML visualization or lightweight JavaScript implementation instead of adding a large dependency.

---

# 6. GENERATOR SIZING CALCULATOR

Create a Generator Sizing Calculator.

Allow users to add multiple loads/appliances.

Each load should contain:

* Name
* Quantity
* Running power
* Starting/surge power
* Power factor where applicable

---

# CALCULATIONS

Calculate:

Total running power

and

Estimated starting/surge requirement.

Where appropriate, convert real power to apparent power:

S = P / PF

where:

S = apparent power in VA
P = real power in W
PF = power factor

Estimate the required generator capacity in kVA.

Apply a configurable design margin.

Default:

20%

---

# OUTPUT

Display:

* Total running load
* Estimated starting load
* Estimated apparent power
* Recommended generator size
* Recommended standard generator rating

Suggested standard ratings:

* 1 kVA
* 2 kVA
* 3 kVA
* 5 kVA
* 7.5 kVA
* 10 kVA
* 15 kVA
* 20 kVA
* 30 kVA
* 50 kVA
* Custom

Round UP to the next appropriate standard size.

---

# IMPORTANT

Display:

"Generator sizing depends on motor starting characteristics, load diversity, power factor, generator alternator characteristics, altitude, ambient temperature and manufacturer recommendations. This calculator provides preliminary sizing only."

Do not claim that the selected generator is guaranteed to operate safely under all conditions.

---

# USER INTERFACE

All six calculators must follow the existing EngineerTools design.

Each calculator should contain:

1. Calculator title
2. Description
3. Input section
4. Add/remove load controls where required
5. Unit selection
6. Calculate button
7. Reset button
8. Results panel
9. Formula
10. Calculation steps
11. Engineering assumptions
12. Warning/limitations
13. Related calculators

---

# MULTI-APPLIANCE INPUT COMPONENT

For:

* Inverter Sizing
* Energy Consumption
* Generator Sizing

create a reusable appliance/load-entry component.

Example:

┌─────────────────────────────────────────────┐
│ Appliance                                   │
│ [ Refrigerator ]                            │
│                                             │
│ Quantity      [ 1 ]                         │
│ Running W    [ 150 ]                        │
│ Surge W      [ 600 ]                        │
│ Hours/day    [ 24 ]                         │
│                                             │
│ [Remove]                                    │
└─────────────────────────────────────────────┘

[ + Add Appliance ]

Do not duplicate this component three times.

Create one reusable component/function and configure it for each calculator.

---

# ENGINEERING UNITS

Support appropriate units.

Power:

* W
* kW
* VA
* kVA

Energy:

* Wh
* kWh

Voltage:

* V

Current:

* A

Battery:

* Ah

Cable:

* mm²

Solar:

* W
* kW

Pressure where relevant:

* Pa
* kPa
* bar
* psi

---

# UNIT HANDLING

Use consistent internal SI units.

Convert user input into SI units before calculations.

Convert final results to user-friendly units.

Do not mix units in formulas.

Clearly display units next to every input and output.

---

# VALIDATION

Every calculator must properly handle:

* Empty fields
* Invalid numbers
* Negative values where physically inappropriate
* Zero values where invalid
* Decimal numbers
* Extremely large values
* Division by zero
* Missing appliance entries
* Invalid unit combinations

Never show:

NaN

Infinity

undefined

or raw JavaScript errors.

Use clear messages such as:

"Please enter a valid positive battery voltage."

---

# ENGINEERING ACCURACY

This is an engineering application.

Accuracy is more important than visual complexity.

For each calculator:

1. Verify formulas.
2. Check unit consistency.
3. Test with hand calculations.
4. Test realistic engineering examples.
5. Test boundary conditions.
6. Check rounding.
7. Check standard-size selection.
8. Verify all displayed units.

Use constants such as:

g = 9.81 m/s²

where required.

---

# IMPORTANT DISTINCTION

Clearly distinguish between:

### CALCULATED VALUE

and

### RECOMMENDED VALUE

For example:

Calculated Solar Capacity:
4.72 kW

Recommended Standard Configuration:
5.00 kW

Do not confuse estimates with guaranteed design requirements.

---

# ENGINEERING WARNINGS

Use appropriate warnings.

For example:

### Cable Sizing

"This preliminary calculation does not replace ampacity and code-based cable selection."

### Solar Sizing

"Actual solar output varies with location, weather, shading, orientation and system losses."

### Battery Sizing

"Actual battery performance depends on chemistry, temperature, discharge rate and battery age."

### Generator Sizing

"Motor starting loads can be substantially higher than running loads."

### Inverter Sizing

"Some appliances have high startup/surge requirements."

### Energy Consumption

"Actual energy consumption may differ from nameplate ratings."

---

# SEARCH

Update EngineerTools search so users can find:

"solar"

"solar panel"

"PV"

"inverter"

"cable"

"cable size"

"battery"

"battery bank"

"energy"

"electricity bill"

"generator"

"generator size"

"power consumption"

Each search term should return the relevant calculator.

---

# NAVIGATION

Update the navigation structure.

## ELECTRICAL

* Ohm's Law
* Electrical Power
* Voltage Divider
* Three-Phase Power

## ELECTRONICS

* Resistor Color Code
* Capacitor
* Inductor
* Transformer
* LED Resistor

## MECHANICAL

* Motor Speed
* Torque
* Shaft Power
* Gear Ratio
* Gear Design
* Beam Deflection

## FLUID & HYDRAULICS

* Hydraulic Jack
* Pump Head
* Fluid Pressure

## ENERGY & POWER SYSTEMS

* Solar Panel Sizing
* Inverter Sizing
* Cable Sizing
* Battery Bank Sizing
* Energy Consumption
* Generator Sizing

## CONVERTERS

* Engineering Unit Converter

Do not remove any existing tools.

---

# RELATED CALCULATORS

Add related calculator links.

### Solar Panel Sizing

Related:

* Battery Bank Sizing
* Inverter Sizing
* Energy Consumption
* Cable Sizing

### Inverter Sizing

Related:

* Battery Bank Sizing
* Energy Consumption
* Generator Sizing
* Solar Panel Sizing

### Cable Sizing

Related:

* Electrical Power
* Three-Phase Power
* Inverter Sizing
* Generator Sizing

### Battery Bank Sizing

Related:

* Solar Panel Sizing
* Inverter Sizing
* Energy Consumption

### Energy Consumption

Related:

* Electrical Power
* Solar Panel Sizing
* Battery Bank Sizing
* Generator Sizing

### Generator Sizing

Related:

* Inverter Sizing
* Electrical Power
* Three-Phase Power
* Energy Consumption

---

# SEO

Add appropriate page titles and descriptions.

Examples:

"Solar Panel Sizing Calculator | EngineerTools"

"Inverter Sizing Calculator | EngineerTools"

"Cable Sizing Calculator | EngineerTools"

"Battery Bank Sizing Calculator | EngineerTools"

"Energy Consumption Calculator | EngineerTools"

"Generator Sizing Calculator | EngineerTools"

Use meaningful descriptions.

Do not make unsupported claims such as "100% accurate."

---

# MOBILE RESPONSIVENESS

All Version 4 calculators must work on:

* Desktop
* Laptop
* Tablet
* Mobile phone

Ensure:

* No horizontal scrolling
* Large touch-friendly inputs
* Responsive appliance tables/cards
* Readable results
* Responsive charts
* Clear error messages

For mobile devices, convert wide tables into stacked cards where appropriate.

---

# ACCESSIBILITY

Implement:

* Semantic HTML
* Proper labels
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Accessible error messages
* Text labels in addition to icons
* Sufficient text contrast

---

# PERFORMANCE

Keep the application lightweight.

Do not introduce unnecessary dependencies.

Do not add:

* Backend
* Database
* Authentication
* Payment system
* External APIs

unless already required by the existing project.

All Version 4 calculations should run locally in the browser.

---

# TESTING

Before completing Version 4:

## Test Version 1

Confirm all existing calculators work.

## Test Version 2

Confirm all existing calculators work.

## Test Version 3

Confirm all existing calculators work.

## Test Version 4

Test:

1. Solar Panel Sizing
2. Inverter Sizing
3. Cable Sizing
4. Battery Bank Sizing
5. Energy Consumption
6. Generator Sizing

For every calculator test:

* Normal values
* Decimal values
* Empty values
* Zero values
* Invalid values
* Very large values
* Unit conversions
* Reset
* Calculate
* Results
* Formula
* Calculation steps

Also test:

* Search
* Navigation
* Related calculators
* Mobile layout
* Browser console
* Page loading
* GitHub Pages compatibility

---

# TEST CASES

Create several internal test cases for verification.

For example:

## Solar

Daily energy:
5 kWh

Peak sun hours:
5

Efficiency:
80%

Expected approximate PV requirement:

1.25 kW

If panel rating is:

500 W

Expected number of panels:

3

---

## Energy Consumption

Appliance:

100 W

Quantity:

2

Hours/day:

5

Days:

30

Expected:

30 kWh/month

Use similar manually verifiable test cases for all calculators.

---

# README UPDATE

Update README.md.

Add:

# Version 4 — Energy & Power Systems

New calculators:

1. Solar Panel Sizing
2. Inverter Sizing
3. Cable Sizing
4. Battery Bank Sizing
5. Energy Consumption
6. Generator Sizing

Briefly explain each calculator.

Add the appropriate engineering assumptions and limitations.

---

# GITHUB

Do not delete Git history.

Do not replace the repository.

After successfully completing Version 4, create a Git commit:

"Add Version 4 energy and power system calculators"

Ensure the project remains deployable through GitHub Pages.

---

# FINAL QUALITY CONTROL

Before declaring Version 4 complete:

* Do NOT rebuild EngineerTools.
* Do NOT remove Version 1.
* Do NOT remove Version 2.
* Do NOT remove Version 3.
* Do NOT break existing calculators.
* Reuse existing components.
* Verify all formulas.
* Verify all units.
* Verify all calculations.
* Verify input validation.
* Verify mobile responsiveness.
* Verify navigation.
* Verify search.
* Verify related calculators.
* Verify GitHub Pages compatibility.

Finally, provide a development report containing:

1. Files created
2. Files modified
3. Six calculators added
4. Formulas implemented
5. Unit conversions implemented
6. Validation implemented
7. Test cases performed
8. Bugs fixed
9. Any remaining issues

The final result must be:

# ENGINEERTOOLS VERSION 4

## Free Engineering Calculators

with Versions 1, 2, 3 and 4 functioning together as one unified engineering toolbox.

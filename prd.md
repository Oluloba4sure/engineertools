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
- Add a reset button on every calculator.
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

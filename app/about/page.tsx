import Link from "next/link";

export const metadata = { title: "About EngineerTools" };

export default function AboutPage() {
  return (
    <section className="view">
      <div className="container">
        <div className="calc-header">
          <Link href="/" className="back-btn" aria-label="Back to home">
            &#8592; Back
          </Link>
          <h1 className="calc-title">About EngineerTools</h1>
        </div>
        <div className="content-block">
          <p>
            EngineerTools is a free, browser-based collection of engineering calculators designed
            for students, technicians, researchers, and engineers.
          </p>
          <p>
            All calculations run locally in your browser. No data is sent to any server. No account
            is required.
          </p>
          <h2>Features</h2>
          <ul>
            <li>
              Electrical &amp; electronics calculators (Ohm&apos;s Law, Power, Voltage Divider,
              Three-Phase, Resistor Color Code, Capacitor, Inductor, Transformer, LED Resistor)
            </li>
            <li>
              Mechanical &amp; fluid calculators (Beam Deflection, Torque, Shaft Power, Gear Design,
              Hydraulic Jack, Pump Head, Fluid Pressure)
            </li>
            <li>
              Energy &amp; power system calculators (Solar Panel Sizing, Inverter Sizing, Cable
              Sizing, Battery Bank Sizing, Energy Consumption, Generator Sizing)
            </li>
            <li>Energy, mechanical, and unit converter tools</li>
            <li>Engineering unit converter</li>
            <li>Responsive design for desktop, tablet, and mobile</li>
            <li>Instant results with clear formulas</li>
            <li>Input validation and error handling</li>
          </ul>
          <h2>Technology</h2>
          <p>
            Built with Next.js, React, and TypeScript. Deployable on Vercel or any Node.js hosting
            service.
          </p>
        </div>
      </div>
    </section>
  );
}

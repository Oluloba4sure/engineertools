import Link from "next/link";

export const metadata = { title: "How to Use EngineerTools" };

export default function HowToUsePage() {
  return (
    <section className="view">
      <div className="container">
        <div className="calc-header">
          <Link href="/" className="back-btn" aria-label="Back to home">
            &#8592; Back
          </Link>
          <h1 className="calc-title">How to Use EngineerTools</h1>
        </div>
        <div className="content-block">
          <h2>Getting Started</h2>
          <ol>
            <li>Browse the homepage and choose a calculator.</li>
            <li>Enter the known values in the input fields.</li>
            <li>Click <strong>Calculate</strong> to see results.</li>
            <li>Use <strong>Reset</strong> to clear inputs and results.</li>
          </ol>
          <h2>Tips</h2>
          <ul>
            <li>Leave the unknown field empty and fill the others.</li>
            <li>Results update instantly after clicking Calculate.</li>
            <li>Formulas and explanations are shown below every result.</li>
            <li>Use the search bar on the homepage to quickly find a calculator.</li>
          </ul>
          <h2>Keyboard Accessibility</h2>
          <p>
            All buttons and inputs are keyboard accessible. Use Tab to navigate and Enter to
            activate.
          </p>
        </div>
      </div>
    </section>
  );
}

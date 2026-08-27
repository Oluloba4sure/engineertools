import Link from "next/link";

const CATEGORIES = [
  { slug: "electrical", label: "Electrical" },
  { slug: "electronics", label: "Electronics" },
  { slug: "mechanical", label: "Mechanical" },
  { slug: "fluid-hydraulics", label: "Fluid & Hydraulics" },
  { slug: "energy-power-systems", label: "Energy & Power Systems" },
  { slug: "converters", label: "Converters" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">ENGINEERTOOLS</span>
          <p className="footer-tagline">Free Engineering Calculators</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Categories</h4>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/#category-${c.slug}`}>
                {c.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <Link href="/about">About EngineerTools</Link>
            <Link href="/how-to-use">How to Use</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} EngineerTools. Free Engineering Calculators.</p>
        </div>
      </div>
    </footer>
  );
}

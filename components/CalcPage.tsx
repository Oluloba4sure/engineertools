"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { getRelated } from "@/lib/catalog";

export function RelatedCalculators({ slug }: { slug: string }) {
  const related = getRelated(slug);
  if (related.length === 0) return null;
  return (
    <div className="related-calculators">
      <h3>Related Calculators</h3>
      {related.map((c) => (
        <Link key={c.slug} href={`/${c.slug}`}>
          {c.name}
        </Link>
      ))}
    </div>
  );
}

export type CalcPageChildren = { form: ReactNode; results: ReactNode };

export function CalcPage({
  slug,
  title,
  badge,
  desc,
  children,
}: {
  slug: string;
  title: string;
  badge: string;
  desc: string;
  children: CalcPageChildren;
}) {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = resultsRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => el.classList.add("results-visible"));
    return () => cancelAnimationFrame(raf);
  }, [children.results]);

  return (
    <section className="view">
      <div className="container">
        <div className="calc-header">
          <Link href="/" className="back-btn" aria-label="Back to home">
            &#8592; Back
          </Link>
          <div className="calc-badge">{badge}</div>
          <h1 className="calc-title">{title}</h1>
          <p className="calc-desc">{desc}</p>
        </div>
        <div className="calc-layout">
          <div className="calc-panel calc-form-panel">{children.form}</div>
          <div className="calc-panel calc-results-panel">
            <h2 className="panel-title">📊 Results</h2>
            <div ref={resultsRef}>{children.results}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

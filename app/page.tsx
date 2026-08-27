"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, calculatorsByCategory } from "@/lib/catalog";

export default function HomeView() {
  const [query, setQuery] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});

  function onSearch(value: string) {
    const term = value.toLowerCase().trim();
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".calc-card"),
    );
    let visible = 0;
    cards.forEach((card) => {
      const text = (card.textContent + " " + (card.dataset.search || "")).toLowerCase();
      const match = term === "" || text.includes(term);
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });
    const noResults = document.getElementById("no-results");
    if (noResults) noResults.hidden = visible > 0;
    setCounts({ total: visible });
  }

  const total = CATEGORIES.reduce(
    (sum, c) => sum + calculatorsByCategory(c.slug).length,
    0,
  );

  return (
    <section className="view">
      <div className="container">
        <div className="hero">
          <div className="hero-badge">Free Engineering Calculators</div>
          <h1 className="hero-title">ENGINEERTOOLS</h1>
          <p className="hero-subtitle">
            Fast, accurate and easy-to-use engineering tools for students, technicians,
            researchers and engineers.
          </p>
          <div className="search-wrap">
            <input
              type="search"
              id="search-input"
              placeholder="🔍 Search Engineering Calculators..."
              aria-label="Search calculators"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
            />
            <span className="search-icon">&#128269;</span>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number" id="stat-calculators">
                {total}
              </span>
              <span className="stat-label">Calculators</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free to Use</span>
            </div>
          </div>
        </div>

        <div className="categories">
          {CATEGORIES.map((category) => {
            const calcs = calculatorsByCategory(category.slug);
            return (
              <div className="category-block" id={`category-${category.slug}`} key={category.slug}>
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <div className="category-info">
                    <h2 className="category-title">{category.title}</h2>
                    <p className="category-desc">{category.desc}</p>
                  </div>
                  <span className="category-count">
                    {calcs.length} {calcs.length === 1 ? "calculator" : "calculators"}
                  </span>
                </div>
                <div className="card-grid">
                  {calcs.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/${calc.slug}`}
                      className="calc-card"
                      data-search={calc.search}
                    >
                      <div className="card-icon-wrapper">
                        <span className="card-icon">{calc.icon}</span>
                      </div>
                      <h3>{calc.name}</h3>
                      <p>{calc.desc}</p>
                      <div className="card-footer">
                        <span className="card-category">{calc.badge}</span>
                        <span className="card-action">
                          Open Calculator <span className="arrow">→</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div id="no-results" className="no-results" hidden>
          <p>No calculators match your search.</p>
        </div>
      </div>
    </section>
  );
}

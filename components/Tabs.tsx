"use client";

import { useState, type ReactNode } from "react";

export type TabDef = {
  id: string;
  label: string;
  content: ReactNode;
};

export function Tabs({ tabs, initial = 0 }: { tabs: TabDef[]; initial?: number }) {
  const [active, setActive] = useState(tabs[initial]?.id ?? tabs[0]?.id);

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Calculation mode">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={t.id === active ? "tab-btn active" : "tab-btn"}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        t.id === active ? (
          <div key={t.id} className="tab-panel active">
            {t.content}
          </div>
        ) : null,
      )}
    </>
  );
}

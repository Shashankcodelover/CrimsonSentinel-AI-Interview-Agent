"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "role", label: "Role title matches the job you want scored against" },
  { id: "years", label: "Years of experience set (drives calibration strip)" },
  { id: "edu", label: "Education filled for report header" },
  { id: "mindset", label: "Ready to name tradeoffs, failure modes, and numbers" },
];

export function WarmupChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div
      className="mb-8 border border-border-low bg-level-1/30 px-4 py-3"
      aria-label="Setup warm-up checklist"
    >
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p className="font-label text-label-caps uppercase text-muted-foreground">
          Warm-up checklist
        </p>
        <span className="font-code text-[10px] text-muted-foreground">
          {Object.values(checked).filter(Boolean).length}/{ITEMS.length}
        </span>
      </div>
      <ul className="space-y-2">
        {ITEMS.map((item) => {
          const on = !!checked[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() =>
                  setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                }
                className={cn(
                  "flex w-full items-start gap-2 text-left font-code text-[12px]",
                  on ? "text-brand" : "text-on-surface-variant"
                )}
              >
                <span aria-hidden>{on ? "☑" : "☐"}</span>
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

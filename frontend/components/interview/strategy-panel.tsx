"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { StrategyReasoning } from "@/lib/interview-insights";
import { cn } from "@/lib/utils";

type Props = {
  reasoning: StrategyReasoning;
};

export function StrategyPanel({ reasoning }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-border-low bg-level-1/60"
      aria-label="Interviewer strategy panel"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="font-label text-label-caps uppercase text-muted-foreground">
            Strategy
          </span>
          <span className="truncate font-code text-[11px] text-on-surface-variant">
            {reasoning.headline}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              reasoning.confidence === "high"
                ? "bg-brand"
                : reasoning.confidence === "medium"
                  ? "bg-secondary-container"
                  : "bg-border-high"
            )}
            title={`Reasoning confidence: ${reasoning.confidence}`}
          />
          <span className="font-code text-[10px] text-muted-foreground">
            {open ? "▾" : "▸"}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-4 pb-3">
              <p className="font-code text-[10px] uppercase tracking-wider text-muted-foreground">
                Why I&apos;m asking this
              </p>
              <ul className="space-y-1.5">
                {reasoning.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-code text-[11px] leading-snug text-on-surface-variant"
                  >
                    <span className="mt-0.5 shrink-0 text-brand/60">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-border-low pt-2 font-code text-[10px] text-muted-foreground">
                Preview · heuristic reasoning · not live model output
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

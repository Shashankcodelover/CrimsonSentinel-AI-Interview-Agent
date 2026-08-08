"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { DraftSignal } from "@/lib/interview-insights";
import { cn } from "@/lib/utils";

type Props = {
  signals: DraftSignal[];
  ghostProbe: string;
};

export function LiveEvalDraft({ signals, ghostProbe }: Props) {
  return (
    <div
      className="border-t border-border-low bg-level-0/80 px-3 py-2 md:px-4"
      aria-label="Live evaluation draft"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="font-label text-label-caps uppercase text-muted-foreground">
          Live draft
        </span>
        <span className="font-code text-[10px] text-muted-foreground">
          Provisional · not final report
        </span>
      </div>

      <div className="mb-2 flex min-h-7 flex-wrap gap-1.5">
        <AnimatePresence initial={false}>
          {signals.length === 0 ? (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-code text-[11px] text-muted-foreground/70"
            >
              Answer to surface provisional strengths / gaps…
            </motion.span>
          ) : (
            signals.map((s) => (
              <motion.span
                key={s.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "border px-2 py-0.5 font-code text-[11px]",
                  s.side === "strength"
                    ? "border-brand/35 text-brand"
                    : "border-outline/50 text-on-surface-variant"
                )}
              >
                {s.side === "strength" ? "+" : "–"} {s.label}
              </motion.span>
            ))
          )}
        </AnimatePresence>
      </div>

      <p className="border-l-2 border-primary-container/60 pl-2 font-code text-[11px] leading-snug text-on-surface-variant">
        {ghostProbe}
      </p>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Matches local mock soft cap; UI-only cadence, not a hard stop. */
export const DEMO_PROBE_CAP = 6;

type Props = {
  questionCount: number;
  cap?: number;
};

export function ProbeCadence({
  questionCount,
  cap = DEMO_PROBE_CAP,
}: Props) {
  const slots = Array.from({ length: cap }, (_, i) => i + 1);
  const current = Math.min(Math.max(questionCount, 0), cap);

  return (
    <div
      className="border-b border-border-low bg-level-0/80 px-4 py-2 md:px-6"
      aria-label={`Probe cadence ${current} of ${cap}`}
    >
      <div className="mx-auto flex max-w-container-max items-center gap-3">
        <p className="shrink-0 font-label text-label-caps uppercase text-muted-foreground">
          Cadence
        </p>
        <ol className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
          {slots.map((n) => {
            const done = n < current;
            const active = n === current && current > 0;
            return (
              <li key={n} className="flex min-w-0 flex-1 items-center gap-1.5">
                <motion.span
                  layout
                  className={cn(
                    "flex h-6 w-full max-w-10 items-center justify-center rounded-sm font-code text-[10px] tabular-nums transition-colors sm:max-w-12 sm:text-[11px]",
                    done && "bg-primary-container/50 text-brand",
                    active &&
                      "bg-primary text-[11px] font-medium text-on-primary sm:text-code-md",
                    !done &&
                      !active &&
                      "border border-border-low text-muted-foreground/70"
                  )}
                  animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                  transition={
                    active
                      ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.2 }
                  }
                >
                  Q{n}
                </motion.span>
                {n < cap ? (
                  <span
                    className={cn(
                      "hidden h-px w-2 shrink-0 sm:block sm:w-3",
                      done || active ? "bg-brand/40" : "bg-border-low"
                    )}
                    aria-hidden
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
        <p className="hidden shrink-0 font-code text-[10px] text-muted-foreground md:block">
          Soft demo arc · not a hard stop
        </p>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { getGapClosure } from "@/lib/tier-next";
import type { InterviewMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  messages: InterviewMessage[];
  finalGaps: string[];
};

export function GapClosureTracker({ messages, finalGaps }: Props) {
  const items = getGapClosure(messages, finalGaps);

  return (
    <motion.section
      className="max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Gap closure tracker"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Gap closure tracker
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          Draft signals vs final gaps
        </span>
      </div>
      <ul className="grid gap-2 sm:grid-cols-3">
        {items.map((g) => (
          <li
            key={g.id}
            className={cn(
              "border px-3 py-2 font-code text-[12px]",
              g.stillOpen
                ? "border-error/40 text-on-surface-variant"
                : "border-brand/40 text-brand"
            )}
          >
            <p className="mb-1 font-label text-label-caps uppercase text-muted-foreground">
              {g.stillOpen ? "Still open" : "Addressed"}
            </p>
            {g.label}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

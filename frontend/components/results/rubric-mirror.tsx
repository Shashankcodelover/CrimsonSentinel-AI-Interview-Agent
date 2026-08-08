"use client";

import { motion } from "framer-motion";
import type { InterviewMessage } from "@/lib/types";
import { getDraftSignals, getTopics } from "@/lib/interview-insights";
import { cn } from "@/lib/utils";

type Props = {
  messages: InterviewMessage[];
};

/** Bridges console Live Draft → final report for demo continuity. */
export function RubricMirror({ messages }: Props) {
  const signals = getDraftSignals(messages);
  const topics = getTopics(messages).filter((t) => t.touched);

  if (signals.length === 0 && topics.length === 0) return null;

  return (
    <motion.section
      className="border border-secondary-container bg-surface-container-low p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Console → Report bridge
        </h2>
        <span className="font-code text-[10px] uppercase tracking-wider text-muted-foreground">
          Same signals you saw live
        </span>
      </div>
      <p className="mb-4 font-body text-body-md text-on-surface-variant">
        Provisional chips from the interview console, mirrored here so the
        memory preview and the evaluation feel continuous.
      </p>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {signals.map((s) => (
          <span
            key={s.id}
            className={cn(
              "border px-2 py-0.5 font-code text-[11px]",
              s.side === "strength"
                ? "border-brand/35 text-brand"
                : "border-outline/50 text-on-surface-variant"
            )}
          >
            {s.side === "strength" ? "+" : "–"} {s.label}
          </span>
        ))}
      </div>
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <span
              key={t.id}
              className="border border-brand/30 px-1.5 py-0.5 font-code text-[10px] uppercase tracking-wide text-brand"
            >
              {t.label}
            </span>
          ))}
        </div>
      )}
    </motion.section>
  );
}

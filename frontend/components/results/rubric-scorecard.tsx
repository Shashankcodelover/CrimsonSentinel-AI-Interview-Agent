"use client";

import { motion } from "framer-motion";
import { getRubricScorecard } from "@/lib/tier-next";
import type { InterviewMessage } from "@/lib/types";

type Props = { messages: InterviewMessage[] };

export function RubricScorecard({ messages }: Props) {
  const axes = getRubricScorecard(messages);
  if (messages.filter((m) => m.role === "candidate").length === 0) return null;

  return (
    <motion.section
      className="max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Senior rubric scorecard"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Senior rubric scorecard
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          Local heuristic · not API grades
        </span>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {axes.map((a) => (
          <li key={a.id} className="border border-border-low/80 px-3 py-2">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <p className="font-code text-[12px] text-on-surface">{a.label}</p>
              <p className="font-code text-[12px] tabular-nums text-brand">
                {a.score}
              </p>
            </div>
            <div className="mb-1.5 h-1 overflow-hidden rounded-sm bg-level-0">
              <div
                className="h-full bg-brand/70"
                style={{ width: `${a.score}%` }}
              />
            </div>
            <p className="font-code text-[10px] text-muted-foreground">{a.note}</p>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import { getPressureMoments } from "@/lib/interview-insights";
import type { InterviewMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  messages: InterviewMessage[];
};

export function PressureMoments({ messages }: Props) {
  const moments = getPressureMoments(messages);

  if (moments.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="max-w-4xl"
      aria-label="Pressure moment highlights"
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Pressure moments
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          {moments.length} highlight{moments.length !== 1 ? "s" : ""} ·
          heuristic
        </span>
      </div>
      <p className="mb-6 font-body text-body-md text-on-surface-variant">
        The turns where the interviewer pushed hardest — and how the candidate
        responded. A senior debrief focuses here.
      </p>
      <div className="space-y-4">
        {moments.map((m, i) => (
          <motion.div
            key={`${m.questionIndex}-${m.answerIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className={cn(
              "border bg-level-1/40 p-4 md:p-5",
              m.kind === "breakthrough"
                ? "border-brand/30"
                : "border-secondary-container"
            )}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "border px-2 py-0.5 font-code text-[11px] uppercase tracking-wider",
                  m.kind === "breakthrough"
                    ? "border-brand/40 text-brand"
                    : "border-outline/50 text-on-surface-variant"
                )}
              >
                {m.label}
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                Q{Math.floor(m.questionIndex / 2) + 1} →
                A{Math.floor(m.answerIndex / 2) + 1}
              </span>
            </div>
            <p className="mb-2 font-code text-[10px] uppercase tracking-wider text-muted-foreground">
              {m.reason}
            </p>
            <div className="space-y-2">
              <div className="border-l-2 border-secondary-container pl-3">
                <p className="mb-1 font-label text-[10px] uppercase text-muted-foreground">
                  Interviewer
                </p>
                <p className="font-code text-[11px] leading-snug text-on-surface-variant">
                  {m.question}
                </p>
              </div>
              <div
                className={cn(
                  "border-l-2 pl-3",
                  m.kind === "breakthrough"
                    ? "border-brand/50"
                    : "border-primary-container/50"
                )}
              >
                <p className="mb-1 font-label text-[10px] uppercase text-muted-foreground">
                  Candidate
                </p>
                <p className="font-code text-[11px] leading-snug text-on-surface">
                  {m.answerExcerpt}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

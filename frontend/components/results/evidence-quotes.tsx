"use client";

import { motion } from "framer-motion";
import { getEvidenceQuotes } from "@/lib/evidence-quotes";
import type { InterviewMessage } from "@/lib/types";

type Props = {
  messages: InterviewMessage[];
};

export function EvidenceQuotes({ messages }: Props) {
  const quotes = getEvidenceQuotes(messages);
  if (quotes.length === 0) return null;

  return (
    <motion.section
      className="max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      aria-label="Evidence quotes from the session"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Evidence from your answers
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          Quote pins · Preview · local
        </span>
      </div>
      <ul className="space-y-3">
        {quotes.map((q) => (
          <li key={q.id} className="border-l-2 border-brand/50 pl-3">
            <p className="mb-1 font-label text-label-caps uppercase text-muted-foreground">
              {q.topic}
            </p>
            <blockquote className="font-body text-body-md text-on-surface-variant">
              “{q.quote}”
            </blockquote>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

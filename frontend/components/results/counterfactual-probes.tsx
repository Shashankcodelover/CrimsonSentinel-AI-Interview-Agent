"use client";

import { motion } from "framer-motion";
import type { InterviewMessage } from "@/lib/types";
import { getTopics } from "@/lib/interview-insights";

type Props = {
  messages: InterviewMessage[];
};

function buildCounterfactuals(messages: InterviewMessage[]): string[] {
  const touched = new Set(getTopics(messages).filter((t) => t.touched).map((t) => t.id));
  const pool: { id: string; prompt: string }[] = [
    {
      id: "reliability",
      prompt:
        "How would you prove the design survives a regional outage without silent data loss?",
    },
    {
      id: "data",
      prompt:
        "Where do you put the idempotency key, and what happens on a double-charge race?",
    },
    {
      id: "debugging",
      prompt:
        "Walk the first 10 minutes of a p99 regression — what do you rule out first?",
    },
    {
      id: "delivery",
      prompt:
        "Which alert would you page on, and which would you deliberately silence?",
    },
    {
      id: "tradeoffs",
      prompt:
        "Force a choice: 30% higher cloud spend vs accepting 200ms extra p95 — defend it.",
    },
  ];

  const unused = pool.filter((p) => !touched.has(p.id));
  const picks = (unused.length >= 2 ? unused : pool).slice(0, 2);
  return picks.map((p) => p.prompt);
}

export function CounterfactualProbes({ messages }: Props) {
  const probes = buildCounterfactuals(messages);

  return (
    <motion.section
      className="border border-dashed border-secondary-container p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
    >
      <h2 className="font-headline text-headline-sm text-on-surface">
        Probes we didn&apos;t ask
      </h2>
      <p className="mt-2 font-body text-body-md text-on-surface-variant">
        A senior panel might still push here — useful for follow-up rounds.
      </p>
      <ul className="mt-4 space-y-3">
        {probes.map((p, i) => (
          <li
            key={p}
            className="flex gap-3 border border-secondary-container bg-surface p-3"
          >
            <span className="font-label text-label-caps text-primary-container">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-code text-code-md text-on-surface">{p}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

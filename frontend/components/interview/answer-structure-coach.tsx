"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Pillar = {
  id: string;
  label: string;
  hint: string;
  keys: string[];
};

const PILLARS: Pillar[] = [
  {
    id: "claim",
    label: "Claim",
    hint: "Clear stance",
    keys: ["i would", "we should", "prefer", "recommend", "choose", "opt for"],
  },
  {
    id: "mechanism",
    label: "Mechanism",
    hint: "How it works",
    keys: ["because", "by ", "via ", "using", "pipeline", "queue", "cache", "lock", "replica"],
  },
  {
    id: "tradeoff",
    label: "Tradeoff",
    hint: "Cost vs gain",
    keys: ["tradeoff", "trade-off", "vs ", "instead", "cost", "latency", "complexity", "rather"],
  },
  {
    id: "failure",
    label: "Failure",
    hint: "Break modes",
    keys: ["fail", "timeout", "retry", "fallback", "outage", "race", "partition", "rollback"],
  },
];

export function structureCoverage(draft: string): {
  id: string;
  label: string;
  hint: string;
  hit: boolean;
}[] {
  const text = draft.toLowerCase();
  return PILLARS.map((p) => ({
    id: p.id,
    label: p.label,
    hint: p.hint,
    hit: p.keys.some((k) => text.includes(k)),
  }));
}

type Props = {
  draft: string;
};

export function AnswerStructureCoach({ draft }: Props) {
  const pillars = structureCoverage(draft);
  const hits = pillars.filter((p) => p.hit).length;

  return (
    <div
      className="mt-2 border border-border-low/80 bg-level-1/30 px-3 py-2"
      aria-label={`Answer structure ${hits} of ${pillars.length} pillars touched`}
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <p className="font-label text-label-caps uppercase text-muted-foreground">
          Structure coach
        </p>
        <span className="font-code text-[10px] text-muted-foreground">
          Preview · local · {hits}/{pillars.length}
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {pillars.map((p) => (
          <motion.li
            key={p.id}
            layout
            className={cn(
              "rounded-sm border px-2 py-1.5",
              p.hit
                ? "border-brand/40 bg-primary-container/30"
                : "border-border-low/60 bg-transparent"
            )}
            animate={{ opacity: p.hit ? 1 : 0.72 }}
          >
            <p
              className={cn(
                "font-code text-[11px]",
                p.hit ? "text-brand" : "text-on-surface-variant"
              )}
            >
              {p.hit ? "✓ " : "· "}
              {p.label}
            </p>
            <p className="mt-0.5 font-code text-[10px] text-muted-foreground">
              {p.hint}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

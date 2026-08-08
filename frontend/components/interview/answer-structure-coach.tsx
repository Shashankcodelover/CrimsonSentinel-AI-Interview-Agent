"use client";

import { motion } from "framer-motion";
import { structureCoverage } from "@/lib/answer-structure";
import { cn } from "@/lib/utils";

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

"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { MemoryChip, TopicState } from "@/lib/interview-insights";
import { cn } from "@/lib/utils";

type Props = {
  chips: MemoryChip[];
  topics: TopicState[];
};

export function MemoryRail({ chips, topics }: Props) {
  return (
    <aside
      className="flex w-full flex-col border-b border-border-low bg-surface-container-lowest md:w-56 md:shrink-0 md:border-b-0 md:border-r"
      aria-label="Interviewer memory preview"
    >
      <div className="flex items-center justify-between border-b border-border-low px-3 py-2">
        <span className="font-label text-label-caps uppercase text-muted-foreground">
          Memory
        </span>
        <span className="font-code text-[10px] uppercase tracking-wider text-brand/80">
          Preview · local
        </span>
      </div>

      <div className="space-y-2 p-3">
        <p className="font-code text-[11px] leading-snug text-muted-foreground">
          Visual stand-in for Breeth tracking — not live backend memory.
        </p>
        <AnimatePresence initial={false}>
          {chips.map((chip) => (
            <motion.div
              key={chip.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "border px-2 py-1.5 font-code text-[11px] leading-snug text-on-surface",
                chip.kind === "focus" &&
                  "border-secondary-container bg-surface-container",
                chip.kind === "signal" &&
                  "border-brand/30 bg-brand/5 text-brand",
                chip.kind === "probe" &&
                  "border-primary-container/50 bg-primary-container/10"
              )}
            >
              {chip.label}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-auto border-t border-border-low p-3">
        <p className="mb-2 font-label text-label-caps uppercase text-muted-foreground">
          Topics
        </p>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <span
              key={t.id}
              className={cn(
                "border px-1.5 py-0.5 font-code text-[10px] uppercase tracking-wide",
                t.touched
                  ? "border-brand/40 text-brand"
                  : "border-border-low text-muted-foreground/50"
              )}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { UncertaintyFlag } from "@/lib/interview-insights";
import { cn } from "@/lib/utils";

type Props = {
  flag: UncertaintyFlag | null;
};

export function UncertaintyBanner({ flag }: Props) {
  return (
    <AnimatePresence mode="wait">
      {flag && (
        <motion.div
          key={flag.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div
            role="status"
            className={cn(
              "border-b px-4 py-2 font-code text-[11px] leading-snug",
              flag.severity === "firm"
                ? "border-primary-container/50 bg-primary-container/10 text-brand"
                : "border-border-low bg-level-1 text-on-surface-variant"
            )}
          >
            <span className="mr-2 font-label text-label-caps uppercase text-muted-foreground">
              Signal
            </span>
            {flag.label}
            <span className="ml-2 text-muted-foreground/70">
              · preview heuristic
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

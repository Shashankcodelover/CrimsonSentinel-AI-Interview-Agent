"use client";

import { cn } from "@/lib/utils";

/** Soft session gravity — ~25 minutes, no hard stop. */
export const SESSION_ARC_SECONDS = 25 * 60;

type Props = {
  /** Elapsed seconds since interview start. */
  elapsedSeconds: number;
};

export function TimePressureArc({ elapsedSeconds }: Props) {
  const pct = Math.min(
    100,
    (Math.max(0, elapsedSeconds) / SESSION_ARC_SECONDS) * 100
  );
  const pastNominal = elapsedSeconds >= SESSION_ARC_SECONDS;

  let phase = "Warm-up";
  if (pct >= 80) phase = pastNominal ? "Overtime · wrap when ready" : "Closing window";
  else if (pct >= 50) phase = "Mid-session";
  else if (pct >= 20) phase = "Building pressure";

  return (
    <div
      className="flex items-center gap-3 border-b border-border-low bg-level-0 px-4 py-1.5"
      aria-label={`Session time arc ${phase}, ${Math.round(pct)} percent of nominal 25 minutes`}
    >
      <span className="shrink-0 font-label text-label-caps uppercase text-muted-foreground">
        Time arc
      </span>
      <div className="relative h-1 min-w-0 flex-1 overflow-hidden bg-level-1">
        <div
          className={cn(
            "h-full transition-[width] duration-700 ease-out",
            pastNominal
              ? "bg-primary-container"
              : pct >= 50
                ? "bg-brand/80"
                : "bg-secondary-container"
          )}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
      <span
        className={cn(
          "shrink-0 font-code text-[11px]",
          pastNominal ? "text-brand" : "text-muted-foreground"
        )}
      >
        {phase}
      </span>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

type Props = {
  pct: number;
  label: string;
};

export function ProbeDepthMeter({ pct, label }: Props) {
  return (
    <div
      className="flex items-center gap-3 border-b border-border-low bg-level-1/80 px-4 py-2"
      aria-label={`Probe depth ${label}, ${Math.round(pct)} percent`}
    >
      <span className="shrink-0 font-label text-label-caps uppercase text-muted-foreground">
        Probe depth
      </span>
      <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden bg-level-0">
        <div
          className={cn(
            "h-full transition-[width] duration-500 ease-out",
            pct >= 75
              ? "bg-primary-container"
              : pct >= 40
                ? "bg-brand"
                : "bg-secondary-container"
          )}
          style={{ width: `${Math.max(4, Math.min(100, pct))}%` }}
        />
      </div>
      <span className="shrink-0 font-code text-code-md text-brand">{label}</span>
    </div>
  );
}

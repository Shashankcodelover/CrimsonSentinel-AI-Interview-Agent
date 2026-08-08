"use client";

import { getPaceSignal } from "@/lib/tier-next";
import { cn } from "@/lib/utils";

type Props = {
  lastSendAt: number | null;
  nowTick: number;
};

export function PaceMeter({ lastSendAt, nowTick }: Props) {
  const pace = getPaceSignal(lastSendAt, nowTick);
  return (
    <p
      className={cn(
        "font-code text-[11px]",
        pace.severity === "brisk" && "text-brand",
        pace.severity === "slow" && "text-error",
        pace.severity === "calm" && "text-muted-foreground"
      )}
      aria-live="polite"
    >
      {pace.label}
      {pace.secondsSinceLastSend != null
        ? ` · ${pace.secondsSinceLastSend}s`
        : ""}
    </p>
  );
}

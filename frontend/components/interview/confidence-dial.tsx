"use client";

import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
};

export function ConfidenceDial({ value, onChange, disabled }: Props) {
  return (
    <div
      className="mt-2 flex flex-wrap items-center gap-3"
      aria-label="Answer confidence before send"
    >
      <p className="font-label text-label-caps uppercase text-muted-foreground">
        Confidence
      </p>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-28 accent-[#ffb4ac] disabled:opacity-50"
      />
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              "font-code text-[11px]",
              n <= value ? "text-brand" : "text-muted-foreground/50"
            )}
          >
            ●
          </span>
        ))}
      </div>
      <span className="font-code text-[10px] text-muted-foreground">
        Self-rate · local only
      </span>
    </div>
  );
}

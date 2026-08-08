"use client";

import { getCoverageRadar } from "@/lib/tier-next";
import type { InterviewMessage } from "@/lib/types";

type Props = {
  messages: InterviewMessage[];
  compact?: boolean;
};

export function CoverageRadar({ messages, compact }: Props) {
  const points = getCoverageRadar(messages);
  const n = points.length;
  const cx = 80;
  const cy = 80;
  const r = compact ? 48 : 58;

  function polar(i: number, value: number) {
    const angle = (-Math.PI / 2) + (i / n) * Math.PI * 2;
    const rr = r * value;
    return { x: cx + rr * Math.cos(angle), y: cy + rr * Math.sin(angle) };
  }

  const poly = points
    .map((p, i) => {
      const { x, y } = polar(i, Math.max(0.12, p.value));
      return `${x},${y}`;
    })
    .join(" ");

  const ring = points
    .map((_, i) => {
      const { x, y } = polar(i, 1);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className={
        compact
          ? "border-b border-border-low px-3 py-2"
          : "max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      }
      aria-label="Topic coverage radar"
    >
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p
          className={
            compact
              ? "font-label text-label-caps uppercase text-muted-foreground"
              : "font-headline text-headline-sm text-on-surface"
          }
        >
          {compact ? "Coverage" : "Coverage radar"}
        </p>
        <span className="font-code text-[10px] text-muted-foreground">
          Preview · local
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <svg
          viewBox="0 0 160 160"
          className={compact ? "h-24 w-24 shrink-0" : "h-36 w-36 shrink-0"}
          role="img"
        >
          <polygon
            points={ring}
            fill="none"
            stroke="currentColor"
            className="text-border-low"
            strokeWidth="1"
          />
          <polygon
            points={poly}
            fill="rgba(255,180,172,0.18)"
            stroke="#ffb4ac"
            strokeWidth="1.5"
          />
          {points.map((p, i) => {
            const { x, y } = polar(i, 1.05);
            return (
              <text
                key={p.id}
                x={x}
                y={y}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 7, fontFamily: "monospace" }}
              >
                {p.label.slice(0, 4)}
              </text>
            );
          })}
        </svg>
        <ul className="min-w-0 flex-1 space-y-1">
          {points.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-2 font-code text-[11px]"
            >
              <span className={p.touched ? "text-brand" : "text-muted-foreground"}>
                {p.label}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {Math.round(p.value * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

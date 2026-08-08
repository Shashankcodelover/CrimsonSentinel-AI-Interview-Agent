"use client";

const STEPS = [
  "Open Try demo for a 2-minute judge walkthrough",
  "On Setup, use Fill demo profile if needed",
  "In console: answer with tradeoff + failover + concrete numbers",
  "Watch Memory Rail + Structure Coach light up",
  "End Interview → Results shows radar, scorecard, quote pins",
];

export function JudgeDemoScript() {
  return (
    <section
      className="border border-border-low bg-level-1/30 px-4 py-4 md:px-6"
      aria-label="Judge demo script"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Judge demo script
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          2-minute path
        </span>
      </div>
      <ol className="space-y-2">
        {STEPS.map((s, i) => (
          <li key={s} className="flex gap-3 font-code text-[12px] text-on-surface-variant">
            <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

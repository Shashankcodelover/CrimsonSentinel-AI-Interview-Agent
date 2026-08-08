"use client";

const SIGNAL_TERMS = [
  "tradeoff",
  "trade-off",
  "tradeoffs",
  "latency",
  "p99",
  "redis",
  "distributed",
  "replica",
  "failover",
  "partition",
  "idempotent",
  "idempotency",
  "rollback",
  "observability",
  "throughput",
  "consistency",
  "scalability",
  "timeout",
  "circuit breaker",
  "first principles",
];

/** Highlight interview-signal terms inside candidate answers (visual only). */
export function SignalHighlight({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${SIGNAL_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isHit = SIGNAL_TERMS.some(
          (t) => t.toLowerCase() === part.toLowerCase()
        );
        if (isHit) {
          return (
            <mark
              key={`${part}-${i}`}
              className="rounded-sm bg-primary-container/25 px-0.5 text-brand"
            >
              {part}
            </mark>
          );
        }
        return <span key={`${i}-${part.slice(0, 8)}`}>{part}</span>;
      })}
    </>
  );
}

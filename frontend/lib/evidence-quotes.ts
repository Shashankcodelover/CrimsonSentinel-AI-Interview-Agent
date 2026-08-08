import type { InterviewMessage } from "@/lib/types";

export type EvidenceQuote = {
  id: string;
  topic: string;
  quote: string;
};

const TOPIC_KEYS: { topic: string; keys: string[] }[] = [
  { topic: "Reliability", keys: ["failover", "replica", "timeout", "retry", "circuit", "sla"] },
  { topic: "Systems", keys: ["scale", "shard", "cache", "redis", "throughput", "rate limit"] },
  { topic: "Data", keys: ["postgres", "idempoten", "transaction", "consistency", "schema"] },
  { topic: "Debugging", keys: ["latency", "p99", "trace", "metric", "observab", "incident"] },
  { topic: "Tradeoffs", keys: ["tradeoff", "trade-off", "cost", "rather than", "compromise"] },
  { topic: "Delivery", keys: ["rollback", "deploy", "alert", "on-call", "feature flag"] },
];

function sentenceAround(text: string, key: string): string | null {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(key);
  if (idx < 0) return null;
  const start = Math.max(0, text.lastIndexOf(".", idx - 1) + 1);
  let end = text.indexOf(".", idx);
  if (end < 0) end = text.length;
  const slice = text.slice(start, end + 1).trim();
  if (slice.split(/\s+/).length < 6) return null;
  return slice.length > 160 ? `${slice.slice(0, 157)}…` : slice;
}

/** Pull short candidate quotes that look like evidence for the report. */
export function getEvidenceQuotes(
  messages: InterviewMessage[],
  limit = 3
): EvidenceQuote[] {
  const answers = messages.filter((m) => m.role === "candidate");
  const out: EvidenceQuote[] = [];
  const seen = new Set<string>();

  for (const a of answers) {
    for (const def of TOPIC_KEYS) {
      for (const key of def.keys) {
        if (!a.content.toLowerCase().includes(key)) continue;
        const quote = sentenceAround(a.content, key);
        if (!quote || seen.has(quote)) continue;
        seen.add(quote);
        out.push({
          id: `${def.topic}-${out.length}`,
          topic: def.topic,
          quote,
        });
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}

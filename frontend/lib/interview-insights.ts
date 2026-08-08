import type { Candidate, InterviewMessage } from "@/lib/types";

export type TopicId =
  | "systems"
  | "reliability"
  | "data"
  | "debugging"
  | "tradeoffs"
  | "delivery";

export type TopicState = {
  id: TopicId;
  label: string;
  touched: boolean;
};

export type MemoryChip = {
  id: string;
  label: string;
  kind: "focus" | "probe" | "signal";
};

export type DraftSignal = {
  id: string;
  side: "strength" | "gap";
  label: string;
};

const TOPIC_DEFS: { id: TopicId; label: string; keys: string[] }[] = [
  {
    id: "systems",
    label: "Systems",
    keys: ["scale", "distributed", "microservice", "shard", "cache", "redis", "throughput", "api", "rate limit"],
  },
  {
    id: "reliability",
    label: "Reliability",
    keys: ["failover", "replica", "timeout", "retry", "circuit", "sla", "partition", "fault", "availability"],
  },
  {
    id: "data",
    label: "Data",
    keys: ["postgres", "sql", "consistency", "transaction", "migration", "schema", "index", "idempoten"],
  },
  {
    id: "debugging",
    label: "Debugging",
    keys: ["latency", "p99", "profil", "trace", "flame", "metric", "log", "observab", "incident"],
  },
  {
    id: "tradeoffs",
    label: "Tradeoffs",
    keys: ["tradeoff", "trade-off", "cost", "vs ", "rather than", "compromise", "first principle"],
  },
  {
    id: "delivery",
    label: "Delivery",
    keys: ["deploy", "rollback", "on-call", "oncall", "alert", "ci", "release", "feature flag"],
  },
];

function corpus(messages: InterviewMessage[]): string {
  return messages
    .filter((m) => m.role === "candidate")
    .map((m) => m.content.toLowerCase())
    .join("\n");
}

export function getTopics(
  messages: InterviewMessage[]
): TopicState[] {
  const text = corpus(messages);
  return TOPIC_DEFS.map((t) => ({
    id: t.id,
    label: t.label,
    touched: t.keys.some((k) => text.includes(k)),
  }));
}

export function getProbeDepth(
  questionCount: number,
  messages: InterviewMessage[]
): { level: number; label: string; pct: number } {
  const answers = messages.filter((m) => m.role === "candidate");
  const avgLen =
    answers.length === 0
      ? 0
      : answers.reduce((n, m) => n + m.content.length, 0) / answers.length;

  const depth = Math.min(
    100,
    questionCount * 14 + Math.min(28, Math.floor(avgLen / 40))
  );

  let label = "Opening";
  if (depth >= 75) label = "Deep probe";
  else if (depth >= 50) label = "Pressure rising";
  else if (depth >= 25) label = "Calibrating";

  return { level: Math.round(depth / 25), label, pct: depth };
}

export function getMemoryChips(
  candidate: Candidate,
  messages: InterviewMessage[]
): MemoryChip[] {
  const chips: MemoryChip[] = [
    {
      id: "role",
      label: `Role lock · ${candidate.jobRole}`,
      kind: "focus",
    },
    {
      id: "exp",
      label: `Experience · ${candidate.yearsExperience}y`,
      kind: "focus",
    },
  ];

  const topics = getTopics(messages).filter((t) => t.touched);
  for (const t of topics) {
    chips.push({
      id: `topic-${t.id}`,
      label: `Tracking · ${t.label}`,
      kind: "signal",
    });
  }

  const text = corpus(messages);
  if (text.includes("redis") || text.includes("distributed")) {
    chips.push({
      id: "probe-dist",
      label: "Open probe · multi-region failure",
      kind: "probe",
    });
  }
  if (text.includes("latency") || text.includes("p99")) {
    chips.push({
      id: "probe-lat",
      label: "Open probe · latency isolation",
      kind: "probe",
    });
  }
  if (messages.filter((m) => m.role === "candidate").length >= 2) {
    chips.push({
      id: "adapt",
      label: "Adaptation · follow-ups tightening",
      kind: "probe",
    });
  }

  return chips.slice(0, 8);
}

export function getDraftSignals(
  messages: InterviewMessage[]
): DraftSignal[] {
  const text = corpus(messages);
  const out: DraftSignal[] = [];

  if (
    text.includes("tradeoff") ||
    text.includes("trade-off") ||
    text.includes("first principle")
  ) {
    out.push({
      id: "s-trade",
      side: "strength",
      label: "Names tradeoffs explicitly",
    });
  }
  if (
    text.includes("redis") ||
    text.includes("shard") ||
    text.includes("replica")
  ) {
    out.push({
      id: "s-sys",
      side: "strength",
      label: "Concrete systems primitives",
    });
  }
  if (text.includes("rollback") || text.includes("observab")) {
    out.push({
      id: "s-ops",
      side: "strength",
      label: "Ops / rollback awareness",
    });
  }

  const answers = messages.filter((m) => m.role === "candidate");
  const short =
    answers.length > 0 &&
    answers.every((a) => a.content.trim().split(/\s+/).length < 28);
  if (short && answers.length >= 1) {
    out.push({
      id: "g-thin",
      side: "gap",
      label: "Answers still thin on detail",
    });
  }
  if (
    answers.length >= 1 &&
    !text.includes("fail") &&
    !text.includes("partition") &&
    !text.includes("timeout")
  ) {
    out.push({
      id: "g-fail",
      side: "gap",
      label: "Failure modes under-specified",
    });
  }
  if (
    answers.length >= 2 &&
    !text.includes("cost") &&
    !text.includes("tradeoff") &&
    !text.includes("trade-off")
  ) {
    out.push({
      id: "g-cost",
      side: "gap",
      label: "Cost / tradeoff lens missing",
    });
  }

  return out.slice(0, 5);
}

export function getGhostProbe(
  messages: InterviewMessage[],
  questionCount: number
): string {
  const topics = getTopics(messages).filter((t) => t.touched);
  const last = topics[topics.length - 1];

  if (questionCount <= 1 && topics.length === 0) {
    return "Likely next probe · push past the happy path into failure modes";
  }
  if (last?.id === "systems") {
    return "Likely next probe · multi-region consistency without a single point of failure";
  }
  if (last?.id === "debugging") {
    return "Likely next probe · first 15 minutes of a p99 spike after deploy";
  }
  if (last?.id === "data") {
    return "Likely next probe · idempotency keys, storage, and replay hazards";
  }
  if (last?.id === "delivery") {
    return "Likely next probe · alerting that pages humans only when actionable";
  }
  if (topics.some((t) => t.id === "tradeoffs")) {
    return "Likely next probe · force a cost vs latency choice under budget pressure";
  }
  return "Likely next probe · tighten on the weakest concrete claim so far";
}

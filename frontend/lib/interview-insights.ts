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

export type UncertaintyFlag = {
  id: string;
  label: string;
  severity: "soft" | "firm";
};

/** Frontend heuristic: thin / vague last answer → expect a deeper probe. */
export function getUncertaintyFlag(
  messages: InterviewMessage[]
): UncertaintyFlag | null {
  const answers = messages.filter((m) => m.role === "candidate");
  if (answers.length === 0) return null;

  const last = answers[answers.length - 1].content.trim();
  const words = last.split(/\s+/).filter(Boolean);
  const lower = last.toLowerCase();

  const vague =
    /\b(maybe|probably|i think|not sure|something like|kind of|sort of)\b/i.test(
      last
    );
  const thin = words.length > 0 && words.length < 22;
  const noConcrete =
    !/\d/.test(last) &&
    !TOPIC_DEFS.some((t) => t.keys.some((k) => lower.includes(k)));

  if (thin && vague) {
    return {
      id: "thin-vague",
      label: "Low signal — expect a deeper probe on the next turn",
      severity: "firm",
    };
  }
  if (thin) {
    return {
      id: "thin",
      label: "Thin answer — senior would push for concrete detail next",
      severity: "soft",
    };
  }
  if (vague && noConcrete) {
    return {
      id: "vague",
      label: "Hedging language — expect a clarifying probe",
      severity: "soft",
    };
  }
  return null;
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

/* ------------------------------------------------------------------ */
/*  Strategy Panel — "Why I'm asking this"                            */
/* ------------------------------------------------------------------ */

export type StrategyReasoning = {
  headline: string;
  bullets: string[];
  confidence: "high" | "medium" | "low";
};

/**
 * Generates the interviewer's stated reasoning for the current question.
 * Composes from existing heuristic state — topics, memory chips,
 * uncertainty flag, depth, and answer corpus. Frontend-only.
 */
export function getStrategyReasoning(
  candidate: Candidate,
  messages: InterviewMessage[],
  questionCount: number
): StrategyReasoning {
  const topics = getTopics(messages);
  const touched = topics.filter((t) => t.touched);
  const untouched = topics.filter((t) => !t.touched);
  const answers = messages.filter((m) => m.role === "candidate");
  const depth = getProbeDepth(questionCount, messages);
  const uncertainty = getUncertaintyFlag(messages);
  const text = corpus(messages);

  const bullets: string[] = [];
  let headline = "";

  // Opening — no answers yet
  if (answers.length === 0) {
    headline = `Calibrating for ${candidate.jobRole} (${candidate.yearsExperience}y)`;
    bullets.push(
      `Opening with a system design prompt to establish baseline depth for a ${candidate.yearsExperience}-year candidate.`
    );
    bullets.push(
      "Watching for: concrete algorithm choices, scale awareness, and trade-off instincts."
    );
    return { headline, bullets, confidence: "medium" };
  }

  // After answers — build contextual reasoning
  const lastAnswer = answers[answers.length - 1].content.toLowerCase();

  // Headline based on depth phase
  if (depth.pct >= 75) {
    headline = "Deep probe — testing under pressure";
  } else if (depth.pct >= 50) {
    headline = "Raising pressure — narrowing on specifics";
  } else if (depth.pct >= 25) {
    headline = "Calibrating depth — mapping knowledge boundaries";
  } else {
    headline = "Building baseline — assessing breadth first";
  }

  // Reasoning about topic coverage
  if (touched.length > 0) {
    const topicNames = touched.map((t) => t.label).join(", ");
    bullets.push(
      `You've demonstrated signal in ${topicNames} — probing ${touched.length > 1 ? "the weakest of these" : "deeper on this"} to test ceiling.`
    );
  }

  if (untouched.length > 0 && untouched.length <= 3) {
    const gapNames = untouched.map((t) => t.label).join(", ");
    bullets.push(
      `Gaps in ${gapNames} — a senior interviewer would shift here to test breadth.`
    );
  }

  // Reasoning about answer quality
  if (uncertainty) {
    if (uncertainty.severity === "firm") {
      bullets.push(
        "Last answer was thin and hedging — next probe will push for concrete mechanisms."
      );
    } else {
      bullets.push(
        "Some hedging detected — next question will require specific technical detail."
      );
    }
  } else if (answers.length > 0) {
    const lastWords = lastAnswer.split(/\s+/).filter(Boolean).length;
    if (lastWords > 60) {
      bullets.push(
        "Substantive answer — shifting domain to test whether depth holds across topics."
      );
    }
  }

  // Specific domain reasoning
  if (lastAnswer.includes("redis") || lastAnswer.includes("cache")) {
    bullets.push(
      "You mentioned caching infrastructure — probing failure modes: what happens when the cache goes down under load?"
    );
  }
  if (lastAnswer.includes("latency") || lastAnswer.includes("p99")) {
    bullets.push(
      "Performance-aware answer — next: systematic isolation when latency spikes post-deploy."
    );
  }
  if (
    !text.includes("fail") &&
    !text.includes("timeout") &&
    !text.includes("partition") &&
    answers.length >= 2
  ) {
    bullets.push(
      "No failure mode discussion yet — a senior engineer would press on this gap."
    );
  }

  // Confidence in reasoning quality
  const confidence: StrategyReasoning["confidence"] =
    touched.length >= 3 ? "high" : answers.length >= 2 ? "medium" : "low";

  // Trim to 3 most relevant bullets
  return { headline, bullets: bullets.slice(0, 3), confidence };
}

/* ------------------------------------------------------------------ */
/*  Pressure Moment Highlights                                        */
/* ------------------------------------------------------------------ */

export type PressureMoment = {
  /** Index of the interviewer question in the messages array */
  questionIndex: number;
  /** Index of the candidate answer in the messages array */
  answerIndex: number;
  question: string;
  answerExcerpt: string;
  kind: "breakthrough" | "pressure_point";
  label: string;
  reason: string;
  score: number;
};

/**
 * Scores each Q/A turn pair to find the top 2-3 pressure moments.
 * Scoring factors: depth change, topic switch, answer length delta,
 * uncertainty state, and keyword density changes.
 */
export function getPressureMoments(
  messages: InterviewMessage[]
): PressureMoment[] {
  // Extract Q/A pairs: interviewer question followed by candidate answer
  const pairs: {
    qIdx: number;
    aIdx: number;
    question: string;
    answer: string;
  }[] = [];

  for (let i = 0; i < messages.length - 1; i++) {
    if (
      messages[i].role === "interviewer" &&
      messages[i + 1]?.role === "candidate"
    ) {
      pairs.push({
        qIdx: i,
        aIdx: i + 1,
        question: messages[i].content,
        answer: messages[i + 1].content,
      });
    }
  }

  if (pairs.length < 2) return [];

  // Score each pair
  const scored: (typeof pairs[number] & {
    score: number;
    kind: PressureMoment["kind"];
    reason: string;
  })[] = pairs.map((pair, pairIdx) => {
    let score = 0;
    let kind: PressureMoment["kind"] = "pressure_point";
    const reasons: string[] = [];

    const words = pair.answer.trim().split(/\s+/).filter(Boolean).length;
    const lower = pair.answer.toLowerCase();

    // Length delta vs previous answer
    if (pairIdx > 0) {
      const prevWords = pairs[pairIdx - 1].answer
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      const delta = words - prevWords;
      if (delta > 30) {
        score += 3;
        kind = "breakthrough";
        reasons.push("Answer expanded significantly under pressure");
      } else if (delta < -20 && prevWords > 30) {
        score += 2;
        reasons.push("Answer thinned — candidate may have hit a knowledge boundary");
      }
    }

    // Topic density — concrete technical terms
    const techTerms = [
      "redis", "cache", "shard", "replica", "partition", "latency", "p99",
      "failover", "timeout", "idempoten", "transaction", "rollback", "deploy",
      "circuit", "queue", "index", "throughput", "concurrency",
    ];
    const density = techTerms.filter((t) => lower.includes(t)).length;
    if (density >= 4) {
      score += 3;
      kind = "breakthrough";
      reasons.push("High technical density — concrete systems vocabulary");
    } else if (density === 0 && words > 20) {
      score += 1;
      reasons.push("Broad answer without concrete technical anchors");
    }

    // Hedging language
    const hedges = /\b(maybe|probably|i think|not sure|kind of|sort of)\b/i;
    if (hedges.test(pair.answer)) {
      score += 1;
      reasons.push("Hedging language suggests uncertainty");
    }

    // Trade-off awareness
    if (
      lower.includes("tradeoff") ||
      lower.includes("trade-off") ||
      lower.includes("vs ") ||
      lower.includes("rather than")
    ) {
      score += 2;
      kind = "breakthrough";
      reasons.push("Explicitly named trade-offs — strong signal");
    }

    // First-principles reasoning
    if (
      lower.includes("because") &&
      (lower.includes("first") || lower.includes("principle"))
    ) {
      score += 2;
      kind = "breakthrough";
      reasons.push("First-principles reasoning detected");
    }

    // Long substantive answer (>80 words) after a short previous one
    if (words > 80 && pairIdx > 0) {
      const prevWords = pairs[pairIdx - 1].answer
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      if (prevWords < 40) {
        score += 2;
        kind = "breakthrough";
        reasons.push("Rose to deeper questioning with a substantive response");
      }
    }

    // Very short answer on a later question = pressure point
    if (words < 20 && pairIdx >= 2) {
      score += 2;
      kind = "pressure_point";
      reasons.push("Notably brief answer late in the interview");
    }

    return {
      ...pair,
      score,
      kind,
      reason: reasons[0] || "Notable turn in the interview arc",
    };
  });

  // Sort by score descending, take top 3
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).filter((s) => s.score > 0);

  return top.map((s) => ({
    questionIndex: s.qIdx,
    answerIndex: s.aIdx,
    question: s.question.length > 120
      ? s.question.slice(0, 120) + "…"
      : s.question,
    answerExcerpt: s.answer.length > 200
      ? s.answer.slice(0, 200) + "…"
      : s.answer,
    kind: s.kind,
    label:
      s.kind === "breakthrough"
        ? "Breakthrough"
        : "Pressure point",
    reason: s.reason,
    score: s.score,
  }));
}

import { getTopics, type TopicState } from "@/lib/interview-insights";
import type { InterviewMessage } from "@/lib/types";

export type RadarPoint = {
  id: string;
  label: string;
  value: number; // 0..1
  touched: boolean;
};

export function getCoverageRadar(messages: InterviewMessage[]): RadarPoint[] {
  const topics: TopicState[] = getTopics(messages);
  const answers = messages.filter((m) => m.role === "candidate");

  return topics.map((t) => {
    const value = t.touched
      ? Math.min(1, 0.55 + Math.min(0.35, answers.length * 0.07))
      : 0.1;
    return {
      id: t.id,
      label: t.label,
      value,
      touched: t.touched,
    };
  });
}

export type AxisScore = {
  id: string;
  label: string;
  score: number; // 0..100
  note: string;
};

export function getRubricScorecard(messages: InterviewMessage[]): AxisScore[] {
  const topics = getTopics(messages);
  const answers = messages.filter((m) => m.role === "candidate");
  const text = answers.map((a) => a.content.toLowerCase()).join("\n");
  const words = text.split(/\s+/).filter(Boolean).length;
  const avgWords =
    answers.length === 0
      ? 0
      : answers.reduce((n, a) => n + a.content.trim().split(/\s+/).length, 0) /
        answers.length;

  function axis(
    id: string,
    label: string,
    base: number,
    note: string
  ): AxisScore {
    return {
      id,
      label,
      score: Math.max(8, Math.min(96, Math.round(base))),
      note,
    };
  }

  const touched = topics.filter((t) => t.touched).length;
  return [
    axis(
      "breadth",
      "Breadth",
      20 + touched * 12,
      touched >= 4 ? "Wide domain coverage" : "Narrow domain set so far"
    ),
    axis(
      "depth",
      "Depth",
      15 + Math.min(50, avgWords / 2) + (text.includes("because") ? 10 : 0),
      avgWords > 60 ? "Answers carry mechanism detail" : "Push for more mechanism"
    ),
    axis(
      "reliability",
      "Reliability",
      topics.find((t) => t.id === "reliability")?.touched
        ? 62 + (text.includes("failover") || text.includes("sla") ? 18 : 8)
        : 22,
      "Failover / SLA language"
    ),
    axis(
      "tradeoffs",
      "Tradeoffs",
      text.includes("tradeoff") || text.includes("trade-off") || text.includes("cost")
        ? 70
        : 24,
      "Explicit cost/latency choices"
    ),
    axis(
      "ops",
      "Ops readiness",
      topics.find((t) => t.id === "delivery")?.touched ||
        text.includes("rollback") ||
        text.includes("alert")
        ? 68
        : 26,
      "Deploy / alert / rollback awareness"
    ),
    axis(
      "clarity",
      "Clarity",
      30 +
        Math.min(40, words / 40) -
        (/\b(maybe|i think|kind of)\b/i.test(text) ? 12 : 0),
      "Concrete vs hedging language"
    ),
  ];
}

export type PaceSignal = {
  label: string;
  severity: "calm" | "brisk" | "slow";
  secondsSinceLastSend: number | null;
};

export function getPaceSignal(
  lastSendAt: number | null,
  now = Date.now()
): PaceSignal {
  if (lastSendAt == null) {
    return { label: "Pace · waiting for first send", severity: "calm", secondsSinceLastSend: null };
  }
  const sec = Math.round((now - lastSendAt) / 1000);
  if (sec < 25)
    return { label: "Pace · brisk — good interview tempo", severity: "brisk", secondsSinceLastSend: sec };
  if (sec > 90)
    return { label: "Pace · slow — judges may expect a move", severity: "slow", secondsSinceLastSend: sec };
  return { label: "Pace · steady", severity: "calm", secondsSinceLastSend: sec };
}

export type GapClosure = {
  id: string;
  label: string;
  stillOpen: boolean;
};

export function getGapClosure(
  messages: InterviewMessage[],
  finalGaps: string[]
): GapClosure[] {
  const text = messages
    .filter((m) => m.role === "candidate")
    .map((m) => m.content.toLowerCase())
    .join("\n");

  const draftish = [
    {
      id: "fail",
      label: "Failure modes",
      open: !text.includes("fail") && !text.includes("timeout") && !text.includes("partition"),
    },
    {
      id: "cost",
      label: "Cost / tradeoff lens",
      open: !text.includes("cost") && !text.includes("tradeoff") && !text.includes("trade-off"),
    },
    {
      id: "thin",
      label: "Thin detail",
      open: messages.filter((m) => m.role === "candidate").every((a) => a.content.trim().split(/\s+/).length < 28),
    },
  ];

  return draftish.map((d) => {
    const echoed = finalGaps.some((g) =>
      g.toLowerCase().includes(d.label.split(" ")[0].toLowerCase())
    );
    return {
      id: d.id,
      label: d.label,
      stillOpen: d.open || echoed,
    };
  });
}

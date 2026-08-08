import { describe, expect, it } from "vitest";
import {
  getDraftSignals,
  getGhostProbe,
  getMemoryChips,
  getProbeDepth,
  getTopics,
  getUncertaintyFlag,
} from "@/lib/interview-insights";
import type { Candidate, InterviewMessage } from "@/lib/types";

const candidate: Candidate = {
  id: "c1",
  name: "Ada",
  jobRole: "Senior Backend",
  yearsExperience: 8,
  education: "CS",
};

describe("getTopics", () => {
  it("marks reliability when failover language appears", () => {
    const messages: InterviewMessage[] = [
      {
        role: "candidate",
        content: "I would add failover replicas and circuit breakers.",
      },
    ];
    const topics = getTopics(messages);
    expect(topics.find((t) => t.id === "reliability")?.touched).toBe(true);
  });

  it("leaves untouched topics false on empty transcript", () => {
    expect(getTopics([]).every((t) => !t.touched)).toBe(true);
  });
});

describe("getProbeDepth", () => {
  it("starts near opening on first question with short answers", () => {
    const depth = getProbeDepth(1, [
      { role: "interviewer", content: "Tell me about scaling." },
      { role: "candidate", content: "Use a cache." },
    ]);
    expect(depth.label).toBe("Opening");
    expect(depth.pct).toBeLessThan(25);
  });

  it("rises into deep probe on many long turns", () => {
    const long =
      "We shard by tenant, keep redis for hot keys, and plan failover with replicas across regions while measuring p99 latency.";
    const messages: InterviewMessage[] = Array.from({ length: 6 }, () => ({
      role: "candidate" as const,
      content: long,
    }));
    const depth = getProbeDepth(6, messages);
    expect(depth.pct).toBeGreaterThanOrEqual(75);
    expect(depth.label).toBe("Deep probe");
  });
});

describe("getUncertaintyFlag", () => {
  it("flags thin vague answers as firm", () => {
    const flag = getUncertaintyFlag([
      {
        role: "candidate",
        content: "Maybe something like a cache I think.",
      },
    ]);
    expect(flag?.severity).toBe("firm");
  });

  it("returns null for concrete detailed answers", () => {
    const flag = getUncertaintyFlag([
      {
        role: "candidate",
        content:
          "I would put an idempotency key in Postgres, retry with backoff on timeout, and fail closed if the partition lasts beyond the SLA.",
      },
    ]);
    expect(flag).toBeNull();
  });
});

describe("getMemoryChips / draft / ghost", () => {
  it("always includes role and experience focus chips", () => {
    const chips = getMemoryChips(candidate, []);
    expect(chips.some((c) => c.id === "role")).toBe(true);
    expect(chips.some((c) => c.id === "exp")).toBe(true);
  });

  it("emits tradeoff strength when named", () => {
    const signals = getDraftSignals([
      {
        role: "candidate",
        content: "The main tradeoff is cost versus latency.",
      },
    ]);
    expect(signals.some((s) => s.id === "s-trade")).toBe(true);
  });

  it("returns a ghost probe string", () => {
    expect(getGhostProbe([], 1)).toMatch(/Likely next probe/i);
  });
});

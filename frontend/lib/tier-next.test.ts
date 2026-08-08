import { describe, expect, it } from "vitest";
import {
  getCoverageRadar,
  getGapClosure,
  getPaceSignal,
  getRubricScorecard,
} from "@/lib/tier-next";
import { transcriptMarkdown } from "@/lib/export-transcript";
import type { InterviewSessionState } from "@/lib/types";

describe("getCoverageRadar", () => {
  it("lights reliability when failover language appears", () => {
    const radar = getCoverageRadar([
      {
        role: "candidate",
        content: "We keep failover replicas and honor the SLA.",
      },
    ]);
    expect(radar.find((p) => p.id === "reliability")?.touched).toBe(true);
    expect(radar.find((p) => p.id === "reliability")!.value).toBeGreaterThan(0.5);
  });
});

describe("getRubricScorecard", () => {
  it("returns six axes", () => {
    const axes = getRubricScorecard([
      {
        role: "candidate",
        content:
          "I would prefer queues because retries are safer; the tradeoff is latency; we fail closed on timeout and plan rollback alerts.",
      },
    ]);
    expect(axes).toHaveLength(6);
    expect(axes.every((a) => a.score >= 8 && a.score <= 96)).toBe(true);
  });
});

describe("getPaceSignal", () => {
  it("marks brisk when last send was recent", () => {
    const now = 1_000_000;
    expect(getPaceSignal(now - 10_000, now).severity).toBe("brisk");
  });

  it("marks slow when idle too long", () => {
    const now = 1_000_000;
    expect(getPaceSignal(now - 120_000, now).severity).toBe("slow");
  });
});

describe("getGapClosure", () => {
  it("flags missing failure modes as still open", () => {
    const gaps = getGapClosure(
      [{ role: "candidate", content: "I like caches." }],
      ["Failure modes under-specified"]
    );
    expect(gaps.find((g) => g.id === "fail")?.stillOpen).toBe(true);
  });
});

describe("transcriptMarkdown", () => {
  it("includes candidate and messages", () => {
    const session: InterviewSessionState = {
      sessionId: "s1",
      candidate: {
        id: "1",
        name: "Ada",
        jobRole: "Backend",
        yearsExperience: 5,
        education: "CS",
      },
      messages: [
        { role: "interviewer", content: "Q1" },
        { role: "candidate", content: "A1 with failover" },
      ],
      questionCount: 1,
      feedback: null,
    };
    const md = transcriptMarkdown(session);
    expect(md).toContain("Ada");
    expect(md).toContain("failover");
  });
});

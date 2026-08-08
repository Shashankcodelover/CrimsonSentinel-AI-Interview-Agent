import { describe, expect, it } from "vitest";
import { structureCoverage } from "@/lib/answer-structure";

describe("structureCoverage", () => {
  it("hits all pillars on a strong senior-style answer", () => {
    const draft =
      "I would prefer queue-backed writes because retries are safer; the tradeoff is latency under load, and we fail closed on timeout.";
    const pillars = structureCoverage(draft);
    expect(pillars.every((p) => p.hit)).toBe(true);
  });

  it("hits nothing on empty draft", () => {
    expect(structureCoverage("").every((p) => !p.hit)).toBe(true);
  });
});

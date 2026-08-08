import { describe, expect, it } from "vitest";
import { getEvidenceQuotes } from "@/lib/evidence-quotes";

describe("getEvidenceQuotes", () => {
  it("extracts a reliability quote from a long answer", () => {
    const quotes = getEvidenceQuotes([
      {
        role: "candidate",
        content:
          "For regional loss I would keep hot replicas and a failover playbook with measured RTO. That keeps the SLA honest under partition.",
      },
    ]);
    expect(quotes.length).toBeGreaterThan(0);
    expect(quotes[0].topic).toBe("Reliability");
    expect(quotes[0].quote.toLowerCase()).toMatch(/failover|replica|sla/);
  });

  it("returns empty when answers lack signal terms", () => {
    expect(
      getEvidenceQuotes([{ role: "candidate", content: "I like coding." }])
    ).toEqual([]);
  });
});

export type StructurePillar = {
  id: string;
  label: string;
  hint: string;
  hit: boolean;
};

type PillarDef = {
  id: string;
  label: string;
  hint: string;
  keys: string[];
};

const PILLARS: PillarDef[] = [
  {
    id: "claim",
    label: "Claim",
    hint: "Clear stance",
    keys: ["i would", "we should", "prefer", "recommend", "choose", "opt for"],
  },
  {
    id: "mechanism",
    label: "Mechanism",
    hint: "How it works",
    keys: [
      "because",
      "by ",
      "via ",
      "using",
      "pipeline",
      "queue",
      "cache",
      "lock",
      "replica",
    ],
  },
  {
    id: "tradeoff",
    label: "Tradeoff",
    hint: "Cost vs gain",
    keys: [
      "tradeoff",
      "trade-off",
      "vs ",
      "instead",
      "cost",
      "latency",
      "complexity",
      "rather",
    ],
  },
  {
    id: "failure",
    label: "Failure",
    hint: "Break modes",
    keys: [
      "fail",
      "timeout",
      "retry",
      "fallback",
      "outage",
      "race",
      "partition",
      "rollback",
    ],
  },
];

/** Local heuristic: which senior-answer pillars the draft currently touches. */
export function structureCoverage(draft: string): StructurePillar[] {
  const text = draft.toLowerCase();
  return PILLARS.map((p) => ({
    id: p.id,
    label: p.label,
    hint: p.hint,
    hit: p.keys.some((k) => text.includes(k)),
  }));
}

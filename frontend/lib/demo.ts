import type { Candidate } from "@/lib/types";

/** Demo profile for judges / quick walkthrough — not real PII. */
export const DEMO_CANDIDATE: Candidate = {
  id: "CAND-DEMO",
  name: "Alexander Chen",
  jobRole: "Senior Backend Engineer",
  yearsExperience: 8,
  education: "B.S. Computer Science",
};

export function formatElapsed(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
}

export function formatReportText(input: {
  name: string;
  jobRole: string;
  yearsExperience: number;
  education: string;
  summary: string;
  strengths: string[];
  gaps: string[];
  next: string[];
}): string {
  const lines = [
    `Technical Evaluation Report — ${input.name}`,
    `${input.jobRole} · ${input.yearsExperience} yrs · ${input.education}`,
    "",
    "Summary",
    input.summary,
    "",
    "Strengths",
    ...input.strengths.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Development Areas",
    ...input.gaps.map((g, i) => `${i + 1}. ${g}`),
    "",
    "Next Steps",
    ...input.next.map((n, i) => `${i + 1}. ${n}`),
    "",
    "— Crimson Sentinel",
  ];
  return lines.join("\n");
}

"use client";

import type { Candidate } from "@/lib/types";

type Props = {
  candidate: Candidate;
};

export function RoleCalibrationStrip({ candidate }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border-low bg-surface-container-low/60 px-4 py-1.5">
      <span className="font-label text-label-caps uppercase text-muted-foreground">
        Calibrated
      </span>
      <span className="font-code text-code-md text-brand">
        {candidate.jobRole}
      </span>
      <span className="font-code text-code-md text-muted-foreground">·</span>
      <span className="font-code text-code-md text-on-surface-variant">
        {candidate.yearsExperience}y · {candidate.education}
      </span>
      <span className="ml-auto hidden font-code text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
        Role-aware session
      </span>
    </div>
  );
}

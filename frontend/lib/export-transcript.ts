import type { InterviewMessage, InterviewSessionState } from "@/lib/types";

export function transcriptMarkdown(session: InterviewSessionState): string {
  const lines = [
    `# Crimson Sentinel — Transcript`,
    ``,
    `Candidate: ${session.candidate.name}`,
    `Role: ${session.candidate.jobRole} · ${session.candidate.yearsExperience}y`,
    `Session: ${session.sessionId}`,
    ``,
  ];
  for (const m of session.messages) {
    lines.push(`## ${m.role === "interviewer" ? "Interviewer" : "Candidate"}`);
    lines.push(m.content);
    lines.push("");
  }
  if (session.feedback) {
    lines.push(`## Feedback summary`);
    lines.push(session.feedback.summary);
    lines.push("");
    lines.push(`### Strengths`);
    session.feedback.strengths.forEach((s) => lines.push(`- ${s}`));
    lines.push(`### Gaps`);
    session.feedback.gaps.forEach((s) => lines.push(`- ${s}`));
    lines.push(`### Next`);
    session.feedback.next.forEach((s) => lines.push(`- ${s}`));
  }
  return lines.join("\n");
}

export function transcriptJson(session: InterviewSessionState): string {
  return JSON.stringify(
    {
      sessionId: session.sessionId,
      candidate: session.candidate,
      messages: session.messages,
      questionCount: session.questionCount,
      feedback: session.feedback,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function extractBookmarked(
  messages: InterviewMessage[],
  indexes: number[]
): InterviewMessage[] {
  return indexes
    .filter((i) => i >= 0 && i < messages.length)
    .map((i) => messages[i]);
}

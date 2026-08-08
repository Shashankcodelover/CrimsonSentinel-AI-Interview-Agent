import type { InterviewRequest, InterviewResponse } from "@/lib/types";

/**
 * Local mock by default. When Member 2 has a real URL, set
 * NEXT_PUBLIC_INTERVIEW_API_URL and restart — no other frontend change required.
 */
const INTERVIEW_API_URL =
  process.env.NEXT_PUBLIC_INTERVIEW_API_URL?.trim() || "/api/interview";

export async function postInterview(
  body: InterviewRequest
): Promise<InterviewResponse> {
  const res = await fetch(INTERVIEW_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Interview API failed (${res.status})`);
  }

  return res.json() as Promise<InterviewResponse>;
}

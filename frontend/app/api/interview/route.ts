import { NextResponse } from "next/server";
import type {
  Candidate,
  Feedback,
  InterviewResponse,
} from "@/lib/types";

const MAX_TURNS_BEFORE_END = 6;

type AnyBody = {
  sessionId?: string;
  candidate?: unknown;
  message?: unknown;
  turn?: unknown;
  end?: unknown;
};

function isCandidate(value: unknown): value is Candidate {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.id === "string" &&
    typeof c.name === "string" &&
    typeof c.jobRole === "string" &&
    typeof c.yearsExperience === "number" &&
    typeof c.education === "string"
  );
}

function buildFeedback(candidate: Candidate): Feedback {
  return {
    summary: `Solid technical interview for ${candidate.name} targeting ${candidate.jobRole}. Demonstrated structured reasoning with room to deepen operational trade-off analysis.`,
    strengths: [
      "Clear problem decomposition and first-principles reasoning under time pressure.",
      "Communicates architectural intent with concrete examples from prior experience.",
      "Adapts answers when probed — shows collaborative debugging instincts.",
    ],
    gaps: [
      "Edge-case handling around concurrency and failure modes needs more explicit coverage.",
      "Cost/ops trade-offs were secondary to performance in system design answers.",
    ],
    next: [
      "Schedule a focused system-design deep dive on reliability and cost.",
      "Assign a short take-home on observability and rollout strategy.",
      "Review DevOps / deployment failure scenarios in a follow-up panel.",
    ],
  };
}

function openingReply(candidate: Candidate): string {
  return `Welcome, ${candidate.name}. I'll be conducting a technical interview for the ${candidate.jobRole} role (${candidate.yearsExperience} years experience, ${candidate.education}).\n\nLet's start: Walk me through how you would design a rate limiter for a public API serving millions of requests per day. What algorithm would you choose, and why?`;
}

function followUpReply(turn: number, message: string): string {
  const snippet = `"${message.slice(0, 80)}${message.length > 80 ? "…" : ""}"`;
  const prompts = [
    `Good start. You mentioned aspects of: ${snippet}.\n\nProbe deeper: How would you handle distributed rate limiting across multiple regions without a single point of failure?`,
    `Interesting approach. Let's shift to debugging.\n\nA production service's p99 latency spiked from 40ms to 900ms after a deploy. How do you systematically isolate the cause in the first 15 minutes?`,
    `Solid diagnostic instincts. Next:\n\nExplain how you would model idempotency for a payment capture endpoint. What identifiers, storage, and failure modes matter most?`,
    `Clear thinking on idempotency. Let's talk data:\n\nYou need to migrate a hot PostgreSQL table (500M rows) with near-zero downtime. Outline the cutover strategy and rollback plan.`,
    `Good migration plan. Final stretch:\n\nHow would you design on-call alerting so pages are rare but actionable — what signals, thresholds, and ownership model would you use?`,
  ];
  return prompts[Math.min(turn - 1, prompts.length - 1)];
}

export async function POST(request: Request) {
  let body: AnyBody;

  try {
    body = (await request.json()) as AnyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || typeof body.sessionId !== "string") {
    return NextResponse.json(
      { error: "sessionId is required" },
      { status: 400 }
    );
  }

  // Simulate network / model latency for the thinking state in the UI
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

  // Start
  if (isCandidate(body.candidate) && body.message == null && body.end == null) {
    const response: InterviewResponse = {
      reply: openingReply(body.candidate),
      done: false,
    };
    return NextResponse.json(response);
  }

  // End
  if (body.end === true) {
    if (!isCandidate(body.candidate)) {
      return NextResponse.json(
        { error: "candidate is required to end the interview" },
        { status: 400 }
      );
    }
    const response: InterviewResponse = {
      reply: "Interview complete. Generating your evaluation report.",
      done: true,
      feedback: buildFeedback(body.candidate),
    };
    return NextResponse.json(response);
  }

  // Turn
  if (typeof body.message === "string") {
    if (!body.message.trim()) {
      return NextResponse.json(
        { error: "message cannot be empty" },
        { status: 400 }
      );
    }

    if (!isCandidate(body.candidate)) {
      return NextResponse.json(
        { error: "candidate is required for interview turns" },
        { status: 400 }
      );
    }

    const turn =
      typeof body.turn === "number" && body.turn > 0 ? body.turn : 1;

    const message =
      body.message.length > 20000
        ? `${body.message.slice(0, 20000)}\n\n[truncated for mock]`
        : body.message.trim();

    if (turn >= MAX_TURNS_BEFORE_END) {
      const response: InterviewResponse = {
        reply:
          "That's a strong close. I have enough signal to produce your evaluation.",
        done: true,
        feedback: buildFeedback(body.candidate),
      };
      return NextResponse.json(response);
    }

    const response: InterviewResponse = {
      reply: followUpReply(turn, message),
      done: false,
    };
    return NextResponse.json(response);
  }

  return NextResponse.json(
    {
      error:
        "Invalid payload. Send { sessionId, candidate } to start, { sessionId, message, turn, candidate } for a turn, or { sessionId, end: true, candidate } to finish.",
    },
    { status: 400 }
  );
}

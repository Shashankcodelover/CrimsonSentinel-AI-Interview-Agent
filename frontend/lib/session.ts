import type { Candidate, Feedback, InterviewSessionState } from "@/lib/types";

const SESSION_KEY = "crimson-sentinel-session";

export function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function saveSession(state: InterviewSessionState): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
}

export function loadSession(): InterviewSessionState | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InterviewSessionState;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function initSession(candidate: Candidate): InterviewSessionState {
  const state: InterviewSessionState = {
    sessionId: createSessionId(),
    candidate,
    messages: [],
    questionCount: 0,
    feedback: null,
  };
  saveSession(state);
  return state;
}

export function updateSessionFeedback(feedback: Feedback): void {
  const current = loadSession();
  if (!current) return;
  saveSession({ ...current, feedback });
}

export type SessionStatus =
  | { kind: "none" }
  | { kind: "in_progress"; session: InterviewSessionState }
  | { kind: "complete"; session: InterviewSessionState };

export function getSessionStatus(): SessionStatus {
  const session = loadSession();
  if (!session) return { kind: "none" };
  if (session.feedback) return { kind: "complete", session };
  if (session.messages.length > 0 || session.questionCount > 0) {
    return { kind: "in_progress", session };
  }
  return { kind: "in_progress", session };
}

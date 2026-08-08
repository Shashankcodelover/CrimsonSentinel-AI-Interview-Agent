export type Candidate = {
  id: string;
  name: string;
  jobRole: string;
  yearsExperience: number;
  education: string;
};

export type Feedback = {
  summary: string;
  strengths: string[];
  gaps: string[];
  next: string[];
};

export type InterviewStartRequest = {
  sessionId: string;
  candidate: Candidate;
};

export type InterviewTurnRequest = {
  sessionId: string;
  message: string;
  /** 1-based candidate answer count — keeps mock API serverless-safe */
  turn: number;
  candidate: Candidate;
};

export type InterviewEndRequest = {
  sessionId: string;
  end: true;
  candidate: Candidate;
};

export type InterviewRequest =
  | InterviewStartRequest
  | InterviewTurnRequest
  | InterviewEndRequest;

export type InterviewResponse = {
  reply: string;
  done: boolean;
  feedback?: Feedback;
};

export type InterviewMessage = {
  role: "interviewer" | "candidate";
  content: string;
};

export type InterviewSessionState = {
  sessionId: string;
  candidate: Candidate;
  messages: InterviewMessage[];
  questionCount: number;
  feedback: Feedback | null;
};

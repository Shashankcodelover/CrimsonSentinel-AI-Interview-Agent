"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { Textarea } from "@/components/ui/textarea";
import { postInterview } from "@/lib/interview-api";
import { loadSession, saveSession, updateSessionFeedback } from "@/lib/session";
import type { InterviewMessage, InterviewSessionState } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function InterviewPage() {
  const router = useRouter();
  const [session, setSession] = useState<InterviewSessionState | null>(null);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const existing = loadSession();
    if (!existing) {
      router.replace("/setup");
      return;
    }
    setSession(existing);
    setBootstrapping(false);
  }, [router]);

  useEffect(() => {
    if (!session || startedRef.current) return;
    if (session.messages.length > 0) {
      startedRef.current = true;
      return;
    }

    startedRef.current = true;
    void startInterview(session);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once when session loads empty
  }, [session]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.messages, thinking]);

  async function startInterview(current: InterviewSessionState) {
    setThinking(true);
    setError(null);
    try {
      const res = await postInterview({
        sessionId: current.sessionId,
        candidate: current.candidate,
      });
      const messages: InterviewMessage[] = [
        { role: "interviewer", content: res.reply },
      ];
      const next: InterviewSessionState = {
        ...current,
        messages,
        questionCount: 1,
      };
      setSession(next);
      saveSession(next);

      if (res.done && res.feedback) {
        updateSessionFeedback(res.feedback);
        router.push("/results");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start interview");
      startedRef.current = false;
    } finally {
      setThinking(false);
    }
  }

  async function sendMessage() {
    if (!session || thinking) return;
    if (!draft.trim()) {
      setError("Answer cannot be empty. Type a response before sending.");
      return;
    }

    const message = draft.trim();
    const optimistic: InterviewSessionState = {
      ...session,
      messages: [...session.messages, { role: "candidate", content: message }],
    };
    setSession(optimistic);
    saveSession(optimistic);
    setDraft("");
    setThinking(true);
    setError(null);

    try {
      const turn =
        optimistic.messages.filter((m) => m.role === "candidate").length;
      const res = await postInterview({
        sessionId: session.sessionId,
        message,
        turn,
        candidate: session.candidate,
      });

      const withReply: InterviewSessionState = {
        ...optimistic,
        messages: [
          ...optimistic.messages,
          { role: "interviewer", content: res.reply },
        ],
        questionCount: res.done
          ? optimistic.questionCount
          : optimistic.questionCount + 1,
      };
      setSession(withReply);
      saveSession(withReply);

      if (res.done && res.feedback) {
        updateSessionFeedback(res.feedback);
        router.push("/results");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setThinking(false);
    }
  }

  async function endInterview() {
    if (!session || thinking) return;
    setThinking(true);
    setError(null);
    try {
      const res = await postInterview({
        sessionId: session.sessionId,
        end: true,
        candidate: session.candidate,
      });
      const next: InterviewSessionState = {
        ...session,
        messages: [
          ...session.messages,
          { role: "interviewer", content: res.reply },
        ],
        feedback: res.feedback ?? null,
      };
      setSession(next);
      saveSession(next);
      if (res.feedback) updateSessionFeedback(res.feedback);
      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to end interview");
    } finally {
      setThinking(false);
    }
  }

  if (bootstrapping || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-level-0 font-code text-code-md text-on-surface-variant">
        Loading console…
      </div>
    );
  }

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-level-0">
      <SiteHeader />

      <div className="flex items-center justify-between border-b border-border-low px-4 py-2">
        <div className="min-w-0">
          <p className="truncate font-code text-code-md text-on-surface">
            {session.candidate.name} · {session.candidate.jobRole}
          </p>
          <p className="font-label text-label-caps uppercase text-muted-foreground">
            Session {session.sessionId.slice(0, 8)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-label text-label-caps uppercase text-muted-foreground">
              Questions
            </p>
            <p className="font-code text-code-md text-brand">
              {String(session.questionCount).padStart(2, "0")}
            </p>
          </div>
          <button
            type="button"
            disabled={thinking}
            onClick={() => void endInterview()}
            className="rounded-sm border border-border-high bg-transparent px-3 py-1.5 font-code text-code-md text-muted-foreground transition-colors hover:border-on-surface hover:text-on-surface disabled:opacity-50"
          >
            End Interview
          </button>
        </div>
      </div>

      <div className="h-0.5 w-full bg-level-1">
        <div
          className="h-full bg-primary-container transition-all duration-500"
          style={{
            width: `${Math.min(100, (session.questionCount / 6) * 100)}%`,
          }}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <section className="min-h-0 flex-1 overflow-y-auto border-b border-border-low md:border-b-0 md:border-r">
          <div className="space-y-6 p-4 md:p-6">
            <AnimatePresence initial={false}>
              {session.messages.map((msg, i) => (
                <motion.article
                  key={`${msg.role}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "max-w-3xl",
                    msg.role === "candidate" && "ml-auto"
                  )}
                >
                  <p className="mb-2 font-label text-label-caps uppercase text-muted-foreground">
                    {msg.role === "interviewer" ? "Interviewer" : "You"}
                  </p>
                  <div
                    className={cn(
                      "whitespace-pre-wrap border px-4 py-3 font-body text-body-md text-on-surface",
                      msg.role === "interviewer"
                        ? "border-secondary-container bg-surface-container-low"
                        : "border-primary-container/40 bg-level-1"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 font-code text-code-md text-on-surface-variant"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-container opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary-container" />
                </span>
                Thinking…
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </section>

        <section className="flex w-full flex-col bg-level-1 md:w-[44%]">
          <div className="flex items-center justify-between border-b border-border-low px-4 py-2">
            <span className="font-label text-label-caps uppercase text-muted-foreground">
              Answer
            </span>
            <span className="font-code text-code-md text-muted-foreground">
              monospace · autosize
            </span>
          </div>
          <div className="flex flex-1 flex-col p-3">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={thinking}
              placeholder="// Type your answer…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void sendMessage();
                }
              }}
              className="min-h-[160px] flex-1 resize-none rounded-sm border-0 bg-[#0f0f0f] p-4 font-code text-code-md leading-[22px] text-on-surface shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary-container/50 md:min-h-[240px] md:text-code-md"
            />
            {error && (
              <p role="alert" className="mt-2 font-code text-code-md text-error">
                {error}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="font-code text-code-md text-muted-foreground">
                Ctrl/⌘ + Enter to send
              </p>
              <button
                type="button"
                disabled={thinking}
                onClick={() => void sendMessage()}
                className="rounded-sm bg-primary-container px-6 py-2 font-code text-code-md text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { Textarea } from "@/components/ui/textarea";
import { formatElapsed } from "@/lib/demo";
import {
  getDraftSignals,
  getGhostProbe,
  getMemoryChips,
  getProbeDepth,
  getStrategyReasoning,
  getTopics,
  getUncertaintyFlag,
} from "@/lib/interview-insights";
import { postInterview } from "@/lib/interview-api";
import { loadSession, saveSession, updateSessionFeedback } from "@/lib/session";
import type { InterviewMessage, InterviewSessionState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProbeDepthMeter } from "@/components/interview/probe-depth-meter";
import { MemoryRail } from "@/components/interview/memory-rail";
import { LiveEvalDraft } from "@/components/interview/live-eval-draft";
import { RoleCalibrationStrip } from "@/components/interview/role-calibration-strip";
import { SignalHighlight } from "@/components/interview/signal-highlight";
import { TimePressureArc } from "@/components/interview/time-pressure-arc";
import { UncertaintyBanner } from "@/components/interview/uncertainty-banner";
import { ProbeCadence } from "@/components/interview/probe-cadence";
import { AnswerStructureCoach } from "@/components/interview/answer-structure-coach";
import { CoverageRadar } from "@/components/interview/coverage-radar";
import { StickyNotes } from "@/components/interview/sticky-notes";
import { ConfidenceDial } from "@/components/interview/confidence-dial";
import { PaceMeter } from "@/components/interview/pace-meter";
import { StrategyPanel } from "@/components/interview/strategy-panel";
import { PrefsBar } from "@/components/shared/prefs-bar";
import { loadBookmarks, loadPrefs, toggleBookmark } from "@/lib/ui-prefs";

export default function InterviewPage() {
  const router = useRouter();
  const [session, setSession] = useState<InterviewSessionState | null>(null);
  const [draft, setDraft] = useState("");
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confidence, setConfidence] = useState(3);
  const [lastSendAt, setLastSendAt] = useState<number | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const existing = loadSession();
    if (!existing) {
      router.replace("/setup");
      return;
    }
    setSession(existing);
    setBookmarks(loadBookmarks(existing.sessionId));
    setFocusMode(loadPrefs().focusMode);
    setBootstrapping(false);
  }, [router]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowTick(Date.now());
      setFocusMode(loadPrefs().focusMode);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!session || startedRef.current) return;
    if (session.messages.length > 0) {
      startedRef.current = true;
      if (!session.startedAt) {
        const withStart = { ...session, startedAt: new Date().toISOString() };
        setSession(withStart);
        saveSession(withStart);
      }
      return;
    }

    startedRef.current = true;
    void startInterview(session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.messages, thinking]);

  useEffect(() => {
    if (!thinking) {
      textareaRef.current?.focus();
    }
  }, [thinking]);

  useEffect(() => {
    if (!session?.startedAt) return;
    const start = Date.parse(session.startedAt);
    const tick = () =>
      setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [session?.startedAt]);

  useEffect(() => {
    if (!confirmEnd) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConfirmEnd(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmEnd]);

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
        startedAt: current.startedAt ?? new Date().toISOString(),
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
      startedAt: session.startedAt ?? new Date().toISOString(),
    };
    setSession(optimistic);
    saveSession(optimistic);
    setDraft("");
    setThinking(true);
    setError(null);

    try {
      const turn = optimistic.messages.filter((m) => m.role === "candidate")
        .length;
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
      setLastSendAt(Date.now());
      setConfidence(3);

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
    setConfirmEnd(false);
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

  const wordCount = draft.trim()
    ? draft.trim().split(/\s+/).filter(Boolean).length
    : 0;

  if (bootstrapping || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-level-0 font-code text-code-md text-on-surface-variant">
        Loading console…
      </div>
    );
  }

  const probe = getProbeDepth(session.questionCount, session.messages);
  const memoryChips = getMemoryChips(session.candidate, session.messages);
  const topics = getTopics(session.messages);
  const draftSignals = getDraftSignals(session.messages);
  const ghostProbe = getGhostProbe(session.messages, session.questionCount);
  const uncertainty = getUncertaintyFlag(session.messages);
  const strategy = getStrategyReasoning(session.candidate, session.messages, session.questionCount);

  return (
    <div
      className={cn(
        "flex h-svh flex-col overflow-hidden bg-level-0",
        focusMode && "interview-focus-mode"
      )}
    >
      <SiteHeader />

      <div className="flex items-center justify-between gap-3 border-b border-border-low px-4 py-2">
        <div className="min-w-0">
          <p className="truncate font-code text-code-md text-on-surface">
            {session.candidate.name} · {session.candidate.jobRole}
          </p>
          <p className="font-label text-label-caps uppercase text-muted-foreground">
            Session {session.sessionId.slice(0, 8)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <PrefsBar />
          <div className="hidden text-right sm:block">
            <p className="font-label text-label-caps uppercase text-muted-foreground">
              Elapsed
            </p>
            <p className="font-code text-code-md tabular-nums text-on-surface">
              {formatElapsed(elapsed)}
            </p>
          </div>
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
            onClick={() => setShowDiagnostics((prev) => !prev)}
            className={cn(
              "rounded-sm border bg-transparent px-3 py-1.5 font-code text-[11px] uppercase tracking-wider transition-colors",
              showDiagnostics
                ? "border-brand/50 text-brand"
                : "border-border-high text-muted-foreground hover:border-on-surface hover:text-on-surface"
            )}
          >
            {showDiagnostics ? "Hide Diagnostics" : "Show Diagnostics"}
          </button>
          <button
            type="button"
            disabled={thinking}
            onClick={() => setConfirmEnd(true)}
            className="rounded-sm border border-border-high bg-transparent px-3 py-1.5 font-code text-code-md text-muted-foreground transition-colors hover:border-on-surface hover:text-on-surface disabled:opacity-50"
          >
            End Interview
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDiagnostics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <RoleCalibrationStrip candidate={session.candidate} />
            <ProbeCadence questionCount={session.questionCount} />
            <TimePressureArc elapsedSeconds={elapsed} />
            <ProbeDepthMeter pct={probe.pct} label={probe.label} />
            <UncertaintyBanner flag={uncertainty} />
          </motion.div>
        )}
      </AnimatePresence>

      <StrategyPanel reasoning={strategy} />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="flex w-full shrink-0 flex-col md:w-56">
          <MemoryRail chips={memoryChips} topics={topics} />
          <CoverageRadar messages={session.messages} compact />
        </div>

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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="font-label text-label-caps uppercase text-muted-foreground">
                      {msg.role === "interviewer" ? "Interviewer" : "You"}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setBookmarks(
                          toggleBookmark(session.sessionId, i)
                        )
                      }
                      className={cn(
                        "font-code text-[10px]",
                        bookmarks.includes(i)
                          ? "text-brand"
                          : "text-muted-foreground hover:text-on-surface"
                      )}
                      aria-label={
                        bookmarks.includes(i)
                          ? "Remove bookmark"
                          : "Bookmark moment"
                      }
                    >
                      {bookmarks.includes(i) ? "★ Bookmarked" : "☆ Bookmark"}
                    </button>
                  </div>
                  <div
                    className={cn(
                      "whitespace-pre-wrap border px-4 py-3 font-body text-body-md text-on-surface",
                      msg.role === "interviewer"
                        ? "border-secondary-container bg-surface-container-low"
                        : "border-primary-container/40 bg-level-1"
                    )}
                  >
                    {msg.role === "candidate" ? (
                      <SignalHighlight text={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            <div aria-live="polite" aria-atomic="true">
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
            </div>
            <div ref={bottomRef} />
          </div>
        </section>

        <section className="flex w-full flex-col bg-level-1 md:w-[40%]">
          <div className="flex items-center justify-between border-b border-border-low px-4 py-2">
            <span className="font-label text-label-caps uppercase text-muted-foreground">
              Answer
            </span>
            <span className="font-code text-code-md text-muted-foreground">
              {wordCount} words · monospace
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-3">
            <Textarea
              ref={textareaRef}
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
              className="min-h-[120px] flex-1 resize-none rounded-sm border-0 bg-[#0f0f0f] p-4 font-code text-code-md leading-[22px] text-on-surface shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary-container/50 md:min-h-[180px] md:text-code-md"
            />
            <AnswerStructureCoach draft={draft} />
            <ConfidenceDial
              value={confidence}
              onChange={setConfidence}
              disabled={thinking}
            />
            <div className="mt-2">
              <PaceMeter lastSendAt={lastSendAt} nowTick={nowTick} />
            </div>
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
          <StickyNotes sessionId={session.sessionId} />
          <LiveEvalDraft signals={draftSignals} ghostProbe={ghostProbe} />
        </section>
      </div>

      <AnimatePresence>
        {confirmEnd && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="end-interview-title"
            onClick={() => setConfirmEnd(false)}
          >
            <motion.div
              className="w-full max-w-md border border-secondary-container bg-surface-container p-6 shadow-crimson"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                id="end-interview-title"
                className="font-headline text-headline-sm text-on-surface"
              >
                End interview?
              </h2>
              <p className="mt-3 font-body text-body-md text-on-surface-variant">
                This generates your evaluation report from the answers so far.
                You can&apos;t continue this session afterward.
              </p>
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmEnd(false)}
                  className="rounded border border-border-high px-4 py-2 font-code text-code-md text-muted-foreground hover:border-on-surface hover:text-on-surface"
                >
                  Keep going
                </button>
                <button
                  type="button"
                  onClick={() => void endInterview()}
                  className="rounded bg-primary-container px-4 py-2 font-code text-code-md text-white hover:opacity-90"
                >
                  End &amp; view report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

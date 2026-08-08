"use client";

import { motion } from "framer-motion";
import { getTopics, type TopicState } from "@/lib/interview-insights";
import type { InterviewMessage } from "@/lib/types";

type Props = {
  messages: InterviewMessage[];
};

function firstAnswerSlice(messages: InterviewMessage[]): InterviewMessage[] {
  const out: InterviewMessage[] = [];
  let seenCandidate = false;
  for (const m of messages) {
    out.push(m);
    if (m.role === "candidate") {
      seenCandidate = true;
      break;
    }
  }
  return seenCandidate ? out : [];
}

function topicDelta(early: TopicState[], late: TopicState[]) {
  const gained = late.filter(
    (t) => t.touched && !early.find((e) => e.id === t.id)?.touched
  );
  const open = late.filter((t) => !t.touched);
  return { gained, open };
}

export function SessionDiff({ messages }: Props) {
  const answers = messages.filter((m) => m.role === "candidate");
  if (answers.length < 2) return null;

  const earlyTopics = getTopics(firstAnswerSlice(messages));
  const lateTopics = getTopics(messages);
  const { gained, open } = topicDelta(earlyTopics, lateTopics);
  const wordGrowth =
    answers[answers.length - 1].content.trim().split(/\s+/).length -
    answers[0].content.trim().split(/\s+/).length;

  return (
    <motion.section
      className="max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      aria-label="Session diff since first answer"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          What changed since Q1
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          Session narrative · local
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="mb-1.5 font-label text-label-caps uppercase text-muted-foreground">
            Topics gained
          </p>
          {gained.length === 0 ? (
            <p className="font-code text-[11px] text-muted-foreground/80">
              Same domains as opening — depth may still have moved.
            </p>
          ) : (
            <ul className="space-y-1">
              {gained.map((t) => (
                <li key={t.id} className="font-code text-[12px] text-brand">
                  + {t.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="mb-1.5 font-label text-label-caps uppercase text-muted-foreground">
            Still open
          </p>
          {open.length === 0 ? (
            <p className="font-code text-[11px] text-brand">
              Broad coverage across the local rubric map.
            </p>
          ) : (
            <ul className="space-y-1">
              {open.slice(0, 4).map((t) => (
                <li
                  key={t.id}
                  className="font-code text-[12px] text-on-surface-variant"
                >
                  · {t.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="mb-1.5 font-label text-label-caps uppercase text-muted-foreground">
            Answer gravity
          </p>
          <p className="font-code text-[12px] text-on-surface-variant">
            {wordGrowth > 12
              ? "Later answers grew denser than the opener."
              : wordGrowth < -8
                ? "Later answers got shorter — possible fatigue or hedging."
                : "Answer length stayed roughly steady across turns."}
          </p>
          <p className="mt-2 font-code text-[11px] text-muted-foreground">
            {answers.length} candidate turns in session
          </p>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { useState } from "react";
import type { InterviewMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  messages: InterviewMessage[];
  bookmarks?: number[];
};

export function TurnScrubber({ messages, bookmarks = [] }: Props) {
  const [idx, setIdx] = useState(() => Math.max(0, messages.length - 1));
  if (messages.length === 0) return null;
  const msg = messages[Math.min(idx, messages.length - 1)];
  const starred = bookmarks.includes(idx);

  return (
    <section
      className="max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      aria-label="Turn scrubber"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Turn scrubber
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          {idx + 1} / {messages.length}
          {starred ? " · bookmarked" : ""}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={messages.length - 1}
        value={idx}
        onChange={(e) => setIdx(Number(e.target.value))}
        className="mb-3 w-full accent-[#ffb4ac]"
        aria-label="Scrub interview turns"
      />
      <p className="mb-1 font-label text-label-caps uppercase text-muted-foreground">
        {msg.role === "interviewer" ? "Interviewer" : "You"}
      </p>
      <p
        className={cn(
          "whitespace-pre-wrap border px-3 py-2 font-body text-body-md text-on-surface",
          msg.role === "interviewer"
            ? "border-secondary-container bg-surface-container-low"
            : "border-primary-container/40 bg-level-1"
        )}
      >
        {msg.content}
      </p>
    </section>
  );
}

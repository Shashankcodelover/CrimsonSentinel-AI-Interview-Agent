"use client";

import { useEffect, useState } from "react";
import { loadBookmarks } from "@/lib/ui-prefs";
import type { InterviewMessage } from "@/lib/types";

type Props = {
  sessionId: string;
  messages: InterviewMessage[];
};

export function BookmarkedMoments({ sessionId, messages }: Props) {
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    setIndexes(loadBookmarks(sessionId));
  }, [sessionId, messages.length]);

  const items = indexes
    .filter((i) => i >= 0 && i < messages.length)
    .map((i) => ({ i, msg: messages[i] }));

  if (items.length === 0) return null;

  return (
    <section
      className="max-w-4xl border border-border-low bg-level-1/40 px-4 py-4 md:px-6"
      aria-label="Bookmarked moments"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-headline text-headline-sm text-on-surface">
          Bookmarked moments
        </h2>
        <span className="font-code text-[10px] text-muted-foreground">
          Starred mid-interview
        </span>
      </div>
      <ul className="space-y-3">
        {items.map(({ i, msg }) => (
          <li key={i} className="border-l-2 border-brand/50 pl-3">
            <p className="mb-1 font-label text-label-caps uppercase text-muted-foreground">
              Turn {i + 1} · {msg.role}
            </p>
            <p className="font-body text-body-md text-on-surface-variant">
              {msg.content.length > 220
                ? `${msg.content.slice(0, 217)}…`
                : msg.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

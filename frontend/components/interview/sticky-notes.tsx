"use client";

import { useEffect, useState } from "react";
import { loadNotes, saveNotes } from "@/lib/ui-prefs";

type Props = { sessionId: string };

export function StickyNotes({ sessionId }: Props) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(loadNotes(sessionId));
  }, [sessionId]);

  return (
    <div className="border-t border-border-low bg-level-0/90">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-1.5 font-label text-label-caps uppercase text-muted-foreground hover:text-on-surface"
      >
        Sticky notes
        <span className="font-code text-[10px]">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            saveNotes(sessionId, e.target.value);
          }}
          placeholder="// Private scratchpad — stays in this browser tab"
          className="min-h-[72px] w-full resize-y border-0 bg-[#0f0f0f] px-3 py-2 font-code text-[11px] text-on-surface outline-none placeholder:text-muted-foreground/50"
          aria-label="Private interview notes"
        />
      )}
    </div>
  );
}

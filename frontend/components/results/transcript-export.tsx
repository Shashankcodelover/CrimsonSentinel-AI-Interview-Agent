"use client";

import {
  downloadText,
  transcriptJson,
  transcriptMarkdown,
} from "@/lib/export-transcript";
import type { InterviewSessionState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = { session: InterviewSessionState };

export function TranscriptExport({ session }: Props) {
  const base = `crimson-${session.candidate.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex flex-wrap gap-2 print:hidden" aria-label="Export transcript">
      <button
        type="button"
        onClick={() =>
          downloadText(
            `${base}-transcript.md`,
            transcriptMarkdown(session),
            "text/markdown;charset=utf-8"
          )
        }
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-11 rounded border-border-high bg-transparent px-6 font-code text-code-md text-muted-foreground hover:border-on-surface hover:bg-transparent hover:text-on-surface"
        )}
      >
        Export Markdown
      </button>
      <button
        type="button"
        onClick={() =>
          downloadText(
            `${base}-transcript.json`,
            transcriptJson(session),
            "application/json;charset=utf-8"
          )
        }
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-11 rounded border-border-high bg-transparent px-6 font-code text-code-md text-muted-foreground hover:border-on-surface hover:bg-transparent hover:text-on-surface"
        )}
      >
        Export JSON
      </button>
    </div>
  );
}

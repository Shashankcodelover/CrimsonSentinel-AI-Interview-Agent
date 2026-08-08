"use client";

import { useEffect, useState } from "react";
import { loadPrefs, savePrefs, type UiPrefs } from "@/lib/ui-prefs";
import { cn } from "@/lib/utils";

export function PrefsBar() {
  const [prefs, setPrefs] = useState<UiPrefs>({
    focusMode: false,
    reduceMotion: false,
  });

  useEffect(() => {
    const p = loadPrefs();
    setPrefs(p);
    savePrefs(p);
  }, []);

  function patch(partial: Partial<UiPrefs>) {
    const next = { ...prefs, ...partial };
    setPrefs(next);
    savePrefs(next);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => patch({ focusMode: !prefs.focusMode })}
        className={cn(
          "rounded border px-2 py-1 font-code text-[10px]",
          prefs.focusMode
            ? "border-brand/50 text-brand"
            : "border-border-low text-muted-foreground hover:text-on-surface"
        )}
        aria-pressed={prefs.focusMode}
      >
        Focus mode
      </button>
      <button
        type="button"
        onClick={() => patch({ reduceMotion: !prefs.reduceMotion })}
        className={cn(
          "rounded border px-2 py-1 font-code text-[10px]",
          prefs.reduceMotion
            ? "border-brand/50 text-brand"
            : "border-border-low text-muted-foreground hover:text-on-surface"
        )}
        aria-pressed={prefs.reduceMotion}
      >
        Reduce motion
      </button>
      <span className="hidden font-code text-[10px] text-muted-foreground sm:inline">
        Press ? for shortcuts
      </span>
    </div>
  );
}

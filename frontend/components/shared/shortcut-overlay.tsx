"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const ROWS = [
  { keys: "?", label: "Toggle this shortcut overlay" },
  { keys: "Ctrl/⌘ + Enter", label: "Send answer (interview)" },
  { keys: "G then H", label: "Go home" },
  { keys: "G then S", label: "Go setup" },
  { keys: "G then I", label: "Go interview" },
  { keys: "G then R", label: "Go results" },
];

export function ShortcutOverlay() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pendingG, setPendingG] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing =
        tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable;

      if (e.key === "?" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        setPendingG(false);
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.toLowerCase() === "g") {
        setPendingG(true);
        window.setTimeout(() => setPendingG(false), 1200);
        return;
      }
      if (pendingG) {
        const k = e.key.toLowerCase();
        if (k === "h") router.push("/");
        if (k === "s") router.push("/setup");
        if (k === "i") router.push("/interview");
        if (k === "r") router.push("/results");
        setPendingG(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pendingG, router]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="Keyboard shortcuts"
        >
          <motion.div
            className="w-full max-w-md border border-border-high bg-level-1 p-5"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 font-headline text-headline-sm text-on-surface">
              Keyboard shortcuts
            </h2>
            <ul className="space-y-2">
              {ROWS.map((r) => (
                <li
                  key={r.keys}
                  className="flex items-center justify-between gap-3 font-code text-[12px]"
                >
                  <span className="text-brand">{r.keys}</span>
                  <span className="text-on-surface-variant">{r.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-code text-[10px] text-muted-foreground">
              Press Esc or ? to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

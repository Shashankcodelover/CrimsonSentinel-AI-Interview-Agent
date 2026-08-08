"use client";

import { useEffect, useState } from "react";
import { sessionStorageHealthy } from "@/lib/ui-prefs";

export function SessionHealthBanner() {
  const [storageOk, setStorageOk] = useState(true);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setStorageOk(sessionStorageHealthy());
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (storageOk && online) return null;

  return (
    <div
      role="status"
      className="border-b border-error/40 bg-error/10 px-4 py-2 font-code text-[12px] text-on-surface"
    >
      {!storageOk && (
        <p>
          Session storage blocked — progress may not persist in this browser.
        </p>
      )}
      {!online && (
        <p>You appear offline — the mock API needs a network to this origin.</p>
      )}
    </div>
  );
}

"use client";

import { SessionHealthBanner } from "@/components/shared/session-health-banner";
import { ShortcutOverlay } from "@/components/shared/shortcut-overlay";

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionHealthBanner />
      {children}
      <ShortcutOverlay />
    </>
  );
}

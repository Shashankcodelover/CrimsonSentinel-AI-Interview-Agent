"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BadgeCheck, TriangleAlert, Route } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { formatReportText } from "@/lib/demo";
import { clearSession, loadSession } from "@/lib/session";
import type { Feedback, InterviewSessionState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RubricMirror } from "@/components/results/rubric-mirror";
import { CounterfactualProbes } from "@/components/results/counterfactual-probes";

export default function ResultsPage() {
  const router = useRouter();
  const [session, setSession] = useState<InterviewSessionState | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  useEffect(() => {
    const existing = loadSession();
    if (!existing?.feedback) {
      router.replace(existing ? "/interview" : "/setup");
      return;
    }
    setSession(existing);
  }, [router]);

  async function copyReport() {
    if (!session?.feedback) return;
    const text = formatReportText({
      name: session.candidate.name,
      jobRole: session.candidate.jobRole,
      yearsExperience: session.candidate.yearsExperience,
      education: session.candidate.education,
      summary: session.feedback.summary,
      strengths: session.feedback.strengths,
      gaps: session.feedback.gaps,
      next: session.feedback.next,
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2500);
    }
  }

  if (!session?.feedback) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background font-code text-code-md text-on-surface-variant">
        Loading report…
      </div>
    );
  }

  const { candidate, feedback } = session;

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-background">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-container-max flex-1 flex-col gap-12 px-margin-mobile py-16 md:px-margin-desktop md:py-20 print:gap-8 print:py-8">
        <motion.section
          className="max-w-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-[36px] leading-tight tracking-tight text-on-surface md:text-display-lg">
            Technical Evaluation Report — {candidate.name}
          </h1>
          <p className="mt-6 border-l-4 border-primary-container py-2 pl-6 font-body text-body-lg text-on-surface-variant">
            “{feedback.summary}”
          </p>
          <p className="mt-4 font-code text-code-md text-muted-foreground">
            {candidate.jobRole} · {candidate.yearsExperience} yrs ·{" "}
            {candidate.education}
          </p>
        </motion.section>

        <RubricMirror messages={session.messages} />

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12 print:gap-4">
          <StrengthsCard strengths={feedback.strengths} />
          <ScoreCard feedback={feedback} />
          <GapsCard gaps={feedback.gaps} />
          <NextCard next={feedback.next} />
        </div>

        <CounterfactualProbes messages={session.messages} />

        <div className="flex flex-wrap gap-4 print:hidden">
          <Link
            href="/setup"
            onClick={() => clearSession()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded bg-primary-container px-6 font-code text-code-md text-white hover:bg-primary-container/90"
            )}
          >
            New Interview
          </Link>
          <button
            type="button"
            onClick={() => void copyReport()}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded border-border-high bg-transparent px-6 font-code text-code-md text-muted-foreground hover:border-on-surface hover:bg-transparent hover:text-on-surface"
            )}
          >
            {copyState === "copied"
              ? "Copied"
              : copyState === "failed"
                ? "Copy failed"
                : "Copy report"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded border-border-high bg-transparent px-6 font-code text-code-md text-muted-foreground hover:border-on-surface hover:bg-transparent hover:text-on-surface"
            )}
          >
            Print
          </button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded border-border-high bg-transparent px-6 font-code text-code-md text-muted-foreground hover:border-on-surface hover:bg-transparent hover:text-on-surface"
            )}
          >
            Back to Home
          </Link>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}

function StrengthsCard({ strengths }: { strengths: string[] }) {
  return (
    <motion.div
      className="rounded border border-secondary-container p-6 md:col-span-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="mb-6 flex items-center gap-2">
        <BadgeCheck className="size-5 text-primary-container" aria-hidden />
        <h2 className="font-headline text-headline-sm text-brand">
          Strengths Identified
        </h2>
      </div>
      <div className="space-y-4">
        {strengths.map((item, i) => (
          <div key={item} className="flex items-start gap-4">
            <div className="rounded border border-secondary-container bg-surface-container p-2">
              <span className="font-label text-label-caps text-on-surface-variant">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="font-body text-body-md text-on-surface-variant">
              <span className="mb-1 block font-code text-code-md font-bold text-on-surface">
                Signal {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ScoreCard({ feedback }: { feedback: Feedback }) {
  const score = Math.min(
    96,
    70 + feedback.strengths.length * 6 - feedback.gaps.length * 3
  );
  const bars = [
    { label: "System Design", value: Math.min(98, score + 3) },
    { label: "Algorithmic Thinking", value: Math.max(72, score - 4) },
    { label: "Communication", value: Math.min(95, score + 1) },
  ];

  return (
    <motion.div
      className="flex flex-col justify-between rounded border-l-4 border-primary-container bg-surface-container p-6 md:col-span-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div>
        <h2 className="mb-4 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
          Aggregate Score
        </h2>
        <div className="mb-2 font-display text-display-lg text-brand">
          {score}/100
        </div>
        <p className="font-code text-code-md text-on-surface-variant">
          Derived from session strengths & gaps
        </p>
      </div>
      <div className="mt-8 space-y-4">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between font-label text-label-caps text-on-surface-variant">
              <span>{bar.label}</span>
              <span>{bar.value}%</span>
            </div>
            <div className="h-unit w-full overflow-hidden rounded-none bg-surface">
              <div
                className="h-full bg-primary-container"
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GapsCard({ gaps }: { gaps: string[] }) {
  return (
    <motion.div
      className="rounded border border-secondary-container p-6 md:col-span-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="mb-6 flex items-center gap-2">
        <TriangleAlert className="size-5 text-outline" aria-hidden />
        <h2 className="font-headline text-headline-sm text-on-surface">
          Development Areas
        </h2>
      </div>
      <ul className="space-y-3">
        {gaps.map((gap) => (
          <li key={gap} className="flex items-start gap-3">
            <span className="mt-1 font-code text-code-md text-on-surface-variant">
              ›
            </span>
            <p className="font-body text-body-md text-on-surface-variant">
              {gap}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function NextCard({ next }: { next: string[] }) {
  return (
    <motion.div
      className="rounded border border-secondary-container bg-surface-container p-6 md:col-span-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="mb-6 flex items-center gap-2">
        <Route className="size-5 text-primary-container" aria-hidden />
        <h2 className="font-headline text-headline-sm text-brand">Next Steps</h2>
      </div>
      <p className="mb-6 font-body text-body-md text-on-surface-variant">
        Recommended actions based on this evaluation:
      </p>
      <div className="space-y-4">
        {next.map((item, i) => (
          <div
            key={item}
            className="flex items-center justify-between gap-4 rounded border border-secondary-container bg-surface p-4"
          >
            <span className="font-code text-code-md text-on-surface">{item}</span>
            <span className="shrink-0 border border-secondary-container px-4 py-2 font-code text-code-md text-on-surface-variant">
              {i === 0 ? "Action" : "Assign"}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

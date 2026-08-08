"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { DEMO_CANDIDATE } from "@/lib/demo";
import {
  clearSession,
  getSessionStatus,
  initSession,
  type SessionStatus,
} from "@/lib/session";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function LandingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<SessionStatus>({ kind: "none" });

  useEffect(() => {
    setStatus(getSessionStatus());
  }, []);

  function startDemo() {
    clearSession();
    initSession(DEMO_CANDIDATE);
    router.push("/interview");
  }

  return (
    <div className="flex min-h-screen flex-col bg-level-0">
      <SiteHeader />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(153,27,27,0.18),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(255,180,172,0.06),transparent_40%),linear-gradient(180deg,#0a0a0a_0%,#121414_55%,#0d0e0f_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e3e2e2 1px, transparent 1px), linear-gradient(to bottom, #e3e2e2 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {status.kind !== "none" && (
          <div className="relative z-10 border-b border-secondary-container bg-surface-container-low/90 px-margin-mobile py-3 md:px-margin-desktop">
            <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-3">
              <p className="font-code text-code-md text-on-surface-variant">
                {status.kind === "complete"
                  ? `Report ready for ${status.session.candidate.name}.`
                  : `In-progress session for ${status.session.candidate.name}.`}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={status.kind === "complete" ? "/results" : "/interview"}
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "rounded bg-primary-container font-code text-code-md text-white hover:bg-primary-container/90"
                  )}
                >
                  {status.kind === "complete" ? "View report" : "Resume interview"}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearSession();
                    setStatus({ kind: "none" });
                  }}
                  className="rounded border border-border-high px-3 py-1.5 font-code text-code-md text-muted-foreground hover:border-on-surface hover:text-on-surface"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="relative mx-auto flex w-full max-w-container-max flex-1 flex-col justify-center px-margin-mobile py-20 md:px-margin-desktop md:py-28">
          <motion.p
            className="mb-6 font-label text-label-caps uppercase text-on-surface-variant"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            AI Technical Interview Platform
          </motion.p>

          <motion.h1
            className="font-display text-[40px] leading-[1.1] tracking-tight text-brand md:text-display-lg"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Crimson Sentinel
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl border-l-4 border-primary-container pl-6 font-body text-body-lg text-on-surface-variant"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Engineering-grade interviews that probe depth, not buzzwords —
            then return a structured evaluation your team can act on.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              href="/setup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded bg-primary-container px-8 font-code text-code-md text-white shadow-crimson hover:bg-primary-container/90"
              )}
            >
              Start Interview
            </Link>
            <button
              type="button"
              onClick={startDemo}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded border-border-high bg-transparent px-6 font-code text-code-md text-muted-foreground hover:border-brand hover:bg-transparent hover:text-brand"
              )}
            >
              Try demo
            </button>
            <Link
              href="/#process"
              className="font-code text-code-md text-muted-foreground underline-offset-4 hover:text-on-surface hover:underline"
            >
              How it works
            </Link>
          </motion.div>
        </section>

        <section
          id="platform"
          className="relative border-t border-secondary-container bg-surface py-20"
        >
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <motion.h2
              className="font-headline text-headline-lg text-on-surface"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
            >
              Built for signal, not theater
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl font-body text-body-md text-on-surface-variant"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              A focused console for candidates. A precise report for hiring
              teams. No distraction layers — just the interview and the
              evidence.
            </motion.p>
          </div>
        </section>

        <section
          id="process"
          className="relative border-t border-secondary-container bg-level-0 py-20"
        >
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <h2 className="font-headline text-headline-lg text-on-surface">
              Process
            </h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-gutter">
              {[
                {
                  step: "01",
                  title: "Candidate setup",
                  body: "Capture role, experience, and education so the session starts context-aware.",
                },
                {
                  step: "02",
                  title: "Live interview",
                  body: "Answer in a monospace console while the agent tracks depth and question count.",
                },
                {
                  step: "03",
                  title: "Evaluation report",
                  body: "Receive summary, strengths, gaps, and next steps — ready for hiring decisions.",
                },
              ].map((item, i) => (
                <motion.li
                  key={item.step}
                  className="border-t border-secondary-container pt-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="font-label text-label-caps text-primary-container">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-headline text-headline-sm text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-body-md text-on-surface-variant">
                    {item.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}

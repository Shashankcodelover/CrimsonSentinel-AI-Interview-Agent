"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { initSession } from "@/lib/session";
import { DEMO_CANDIDATE } from "@/lib/demo";
import type { Candidate } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WarmupChecklist } from "@/components/setup/warmup-checklist";
import { PrefsBar } from "@/components/shared/prefs-bar";

const empty: Candidate = {
  id: "",
  name: "",
  jobRole: "",
  yearsExperience: 0,
  education: "",
};

const fieldClass =
  "h-11 w-full rounded-sm border border-border-high bg-[#0f0f0f] px-3 font-code text-code-md text-on-surface outline-none placeholder:text-muted-foreground/70 caret-primary-container focus:border-primary-container focus:ring-2 focus:ring-primary-container/30";

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState<Candidate>(empty);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof Candidate>(key: K, value: Candidate[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !form.id.trim() ||
      !form.name.trim() ||
      !form.jobRole.trim() ||
      !form.education.trim()
    ) {
      setError("All fields are required before starting the interview.");
      return;
    }

    if (Number.isNaN(form.yearsExperience) || form.yearsExperience < 0) {
      setError("Years of experience must be a non-negative number.");
      return;
    }

    initSession({
      ...form,
      id: form.id.trim(),
      name: form.name.trim(),
      jobRole: form.jobRole.trim(),
      education: form.education.trim(),
    });
    router.push("/interview");
  }

  return (
    <div className="flex min-h-screen flex-col bg-level-0">
      <SiteHeader />

      <main className="relative flex flex-1 flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(153,27,27,0.12),transparent_45%)]"
        />

        <div className="relative mx-auto w-full max-w-container-max flex-1 px-margin-mobile py-16 md:px-margin-desktop md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <p className="font-label text-label-caps uppercase text-on-surface-variant">
              Candidate Setup
            </p>
            <h1 className="mt-4 font-display text-[36px] leading-tight tracking-tight text-on-surface md:text-display-lg">
              Prepare your profile
            </h1>
            <p className="mt-4 border-l-4 border-primary-container pl-6 font-body text-body-lg text-on-surface-variant">
              Context shapes the interview. Enter your details so the agent can
              calibrate difficulty and domain focus.
            </p>
            <div className="mt-6">
              <PrefsBar />
            </div>
          </motion.div>

          <div className="relative mt-10 max-w-2xl">
            <WarmupChecklist />
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-4 max-w-2xl space-y-6 border border-secondary-container bg-surface-container-low p-6 md:p-8"
          >
            <Field
              id="candidate-id"
              label="Candidate ID"
              value={form.id}
              onChange={(v) => update("id", v)}
              placeholder="e.g. CAND-2048"
              autoComplete="off"
            />
            <Field
              id="candidate-name"
              label="Full Name"
              value={form.name}
              onChange={(v) => update("name", v)}
              placeholder="e.g. Alexander Chen"
              autoComplete="name"
            />
            <Field
              id="job-role"
              label="Job Role"
              value={form.jobRole}
              onChange={(v) => update("jobRole", v)}
              placeholder="e.g. Senior Backend Engineer"
              autoComplete="organization-title"
            />
            <div className="space-y-2">
              <label
                htmlFor="years-experience"
                className="font-label text-label-caps uppercase text-on-surface-variant"
              >
                Years of Experience
              </label>
              <input
                id="years-experience"
                type="number"
                min={0}
                step={1}
                value={
                  Number.isFinite(form.yearsExperience)
                    ? form.yearsExperience
                    : 0
                }
                onChange={(e) =>
                  update("yearsExperience", Number(e.target.value))
                }
                className={fieldClass}
              />
            </div>
            <Field
              id="education"
              label="Education"
              value={form.education}
              onChange={(v) => update("education", v)}
              placeholder="e.g. B.S. Computer Science"
              autoComplete="off"
            />

            {error && (
              <p
                role="alert"
                className="border border-error-container/40 bg-error-container/10 px-4 py-3 font-code text-code-md text-error"
              >
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded bg-primary-container px-8 font-code text-code-md text-white shadow-crimson transition-opacity hover:opacity-90"
              >
                Begin Interview
              </button>
              <button
                type="button"
                onClick={() => setForm(DEMO_CANDIDATE)}
                className="inline-flex h-11 items-center justify-center rounded border border-border-high px-4 font-code text-code-md text-muted-foreground transition-colors hover:border-on-surface hover:text-on-surface"
              >
                Fill demo profile
              </button>
              <p className="font-code text-code-md text-muted-foreground">
                Session stays local until the interview starts.
              </p>
            </div>
          </motion.form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="font-label text-label-caps uppercase text-on-surface-variant"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(fieldClass)}
      />
    </div>
  );
}

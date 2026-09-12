# Crimson Sentinel — Autonomous Cognitive AI Interview Agent

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-19%20Passed-brightgreen?logo=vitest)](https://vitest.dev/)
[![Status](https://img.shields.io/badge/Calibration-L5%20to%20L7+-crimson)](#)

> An autonomous, multi-signal, Socratic technical assessment platform engineered to evaluate senior and principal software engineering talent on deep distributed systems, fault tolerance, and operational trade-offs.

---

## 1. Problem Statement

Traditional technical interviewing is profoundly broken:
1. **Trivia & LeetCode Bias**: Rote algorithmic puzzles test memorization over real-world systems architecture, production intuition, and failure handling.
2. **Interviewer Variability & Fatigue**: Human interviewers suffer from cognitive fatigue, subjective biases, inconsistent calibration, and unstandardized rubric scoring.
3. **Superficial Screening**: Standard automated screening tools rely on keyword matchers or shallow multiple-choice tests easily defeated by superficial buzzwords.

**Crimson Sentinel** solves this by acting as an autonomous **Senior Staff Interviewer**. It deploys dynamic Socratic escalation, deepens probes when buzzwords are used, and conducts a multi-dimensional technical evaluation with verifiable transcript evidence.

---

## 2. Core Capabilities & Architectural Pillars

### A. Dynamic Socratic Escalation
Rather than following a static decision tree, Crimson Sentinel reads between the lines of candidate responses. If a candidate mentions "caching with Redis", Sentinel immediately probes cache stampede prevention, eviction mechanics (`allkeys-lru` vs `volatile-lfu`), replication topology, and split-brain resolution.

### B. Breeth Adaptive Memory Rail & Ghost Probes
A real-time cognitive tracker visualizes active architectural topics across turns, monitoring coverage across 6 key systems dimensions:
- Distributed Ingestion & Stream Processing
- Storage Internals & Consensus (WAL, Raft, LSM)
- Edge Networking & Rate Limiting
- High-Concurrency & Contention Control
- Resilience & Blast Radius Isolation
- Observability & Incident Diagnostics

### C. Objective 4-Quadrant Scoring Engine
Every session generates a comprehensive hiring-committee-ready dossier scored across 4 foundational dimensions:
1. **First-Principles Foundation (30%)**: Hardware mechanics, memory models, I/O efficiency, and theoretical bounds.
2. **Scale & System Trade-offs (25%)**: CAP/PACELC trade-offs, cost awareness, and high-throughput bottlenecks.
3. **Operational Resilience (25%)**: Circuit breakers, gracefully degraded modes, and failover mechanics.
4. **Communication Precision (20%)**: Architectural clarity, structured thinking, and collaborative debugging instincts.

### D. Comprehensive Result Dossier
- **Evidence Quotes**: Links exact transcript quotes to specific rubric ratings.
- **Turn Scrubber & Bookmarking**: Replay critical pressure moments and inspect candidate pivots.
- **Counterfactual Probes**: What questions *should* have been asked if the candidate took an alternate design path.
- **Gap Closure Tracker**: Verifies whether initial architectural omissions were successfully resolved during follow-up turns.

---

## 3. System Architecture

```
[ Candidate Browser ] 
         │  (WebSockets / HTTP SSE)
         ▼
[ Next.js 15 App Router Frontend ]
  ├── Strategy Panel (Live Diagnostics HUD)
  ├── Monospace Adaptive Answer Console
  ├── Real-time Signal Highlighter & Sentiment Dial
  └── Interactive Multi-Axis Coverage Radar
         │
         ▼  (Strict JSON Session Protocol)
[ Sentinel Reasoning Engine (/api/interview) ]
  ├── Socratic Turn Manager & Escalation Heuristics
  ├── Breeth Cognitive Memory Rail
  ├── Signal-to-Noise Ratio & Keyword Extractor
  └── Rubric Calibrator & Tier Normalizer
         │
         ▼
[ Technical Evaluation Dossier ]
  ├── 4-Quadrant Calibrated Scorecard
  ├── Verifiable Transcript Evidence Chains
  └── Hiring Committee Next-Step Recommendations
```

---

## 4. Technology Stack

- **Framework**: Next.js 15 (App Router, Server Actions, React 19)
- **Language**: TypeScript 5.5 (Strict mode, zero `any` types)
- **Styling**: Tailwind CSS with custom Crimson Design Tokens (`#991b1b` / `#ffb4ac`)
- **Animation**: Framer Motion 11
- **Icons**: Lucide React
- **Testing**: Vitest with React Testing Library (19/19 unit tests passing)

---

## 5. Project Directory Structure

```
CrimsonSentinel-AI-Interview-Agent/
├── frontend/
│   ├── app/
│   │   ├── api/interview/route.ts      # Multi-turn Socratic API engine
│   │   ├── interview/page.tsx          # Real-time interactive interview console
│   │   ├── results/page.tsx            # Comprehensive Evaluation Dossier
│   │   ├── setup/page.tsx              # Candidate profile configuration
│   │   └── page.tsx                    # Production landing page & demo runner
│   ├── components/                     # Modular UI components (Radar, Scrubber, HUD)
│   ├── lib/                            # Insights engine, session state, math algorithms
│   └── tests/                          # Automated Vitest test suites
├── prompts/
│   ├── SystemPrompt.md                 # Staff interviewer cognitive protocol
│   ├── InterviewPrompt.md              # Multi-domain opening challenges
│   ├── FollowUpPrompt.md               # Socratic escalation heuristics
│   ├── EvaluationPrompt.md             # 4-quadrant rubric scoring guidelines
│   └── FeedbackPrompt.md               # Candidate debrief & growth vectors
├── docs/
│   ├── technical-spec/                 # Deep architectural specifications
│   ├── candidate-profiles/             # L4/L5/L6 calibration benchmarks
│   └── curriculum/                     # Systems curriculum & question bank
├── ARCHITECTURE.md                     # Detailed technical architecture document
└── README.md                           # This document
```

---

## 6. Quick Start & Verification

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+ or pnpm

### Installation & Run
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Automated Testing & Verification
```bash
# Run unit tests
npm test

# Run TypeScript typecheck
npm run typecheck

# Build for production
npm run build
```

---

## 7. License
MIT License. Built with architectural rigor by the Crimson Sentinel Engineering Team.

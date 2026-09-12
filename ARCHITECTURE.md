# Crimson Sentinel — Architecture Specification

## 1. High Level Architecture

```
                    ┌────────────────────────────┐
                    │     Candidate Browser      │
                    └──────────────┬─────────────┘
                                   │ HTTPS / WSS
                                   ▼
                    ┌────────────────────────────┐
                    │   Next.js 15 Presentation  │
                    │         Layer (Web)        │
                    └──────────────┬─────────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
┌───────────────────────────┐             ┌───────────────────────────┐
│     Client State Engine   │             │   Sentinel Core API       │
│  - Session Storage Sync   │             │   - Turn Orchestrator     │
│  - Real-Time Keyword Extr │             │   - Breeth Memory Rail    │
│  - Polar Radar Calculator │             │   - Cognitive Socratic    │
│  - Latency / Pace Watcher │             │     Escalation Engine     │
└───────────────────────────┘             └─────────────┬─────────────┘
                                                        │
                                                        ▼
                                          ┌───────────────────────────┐
                                          │  Evaluation Synthesis     │
                                          │  - 4-Quadrant Scoring     │
                                          │  - Evidence Chain Binder  │
                                          │  - Hiring Committee Brief │
                                          └───────────────────────────┘
```

---

## 2. Frontend Layer (Next.js 15 App Router)

The frontend is constructed with high-efficiency atomic components:
- **`app/page.tsx`**: Editorial-grade landing page with real-time demo launcher and interactive system preview.
- **`app/setup/page.tsx`**: Role, seniority, and domain calibration config with warm-up checklist.
- **`app/interview/page.tsx`**: Interactive command center with:
  - Dynamic Strategy Panel (collapsible diagnostic HUD)
  - Monospace answer workspace with auto-sizing
  - Breeth Memory Rail showing active architectural concepts
  - Real-time Polar Coverage Radar updating with every keystroke
- **`app/results/page.tsx`**: Senior Staff Evaluation Dossier with:
  - 4-Quadrant Rubric Scorecard (First-Principles, Scale/Trade-offs, Operational Resilience, Communication)
  - Interactive Turn Scrubber and moment bookmarks
  - Counterfactual probes and gap-closure verification tracker
  - Transcript export in Markdown and structured JSON

---

## 3. Sentinel Cognitive Engine (`app/api/interview/route.ts`)

The interview engine implements an adaptive finite-state machine (FSM):

```
[INIT] ──> [OPENING_PROBE] ──> [CANDIDATE_REPLY]
                                      │
                                      ▼
                        [KEYWORD_&_SIGNAL_EXTRACTION]
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
     [SHALLOW_BUZZWORDS?]                     [SUBSTANTIVE_REASONING?]
                 │                                         │
                 ▼                                         ▼
     [SOCRATIC_DEEP_PROBE]                    [FAILURE_DOMAIN_STRESS_TEST]
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      │
                                      ▼
                             [TURN_COUNTER >= 6?]
                            ├── NO  ──> [NEXT_SOCRATIC_TURN]
                            └── YES ──> [SYNTHESIZE_EVALUATION]
```

### Signal Extraction Engine
Identifies high-entropy systems terms:
- **Storage/Databases**: `LSM-tree`, `B+ Tree`, `WAL`, `ACID`, `2PL`, `MVCC`, `SSTable`, `Compaction`
- **Distributed Protocols**: `Raft`, `Paxos`, `Gossip`, `Vector Clock`, `Quorum`, `Split-Brain`
- **Networking/Scale**: `Anycast`, `Consistent Hashing`, `Token Bucket`, `Tail Latency`, `p99`, `eBPF`
- **Resilience**: `Circuit Breaker`, `Dead Letter Queue`, `Bulkhead`, `Chaos Engineering`, `Backpressure`

---

## 4. Breeth Adaptive Memory Layer

The memory layer tracks conceptual continuity across turns:
- **Concept History**: Maintains an unforgeable trace of topics discussed.
- **Coverage Index**: Calculates coverage % across the 6 systems pillars.
- **Unaddressed Vulnerabilities**: Flags critical components proposed by the candidate that lacked error handling or cost modeling.

---

## 5. Rubric Calibration & Scoring

Evaluation scores are computed deterministically based on empirical signal frequency and depth:
- **First-Principles Score**: `f(low_level_mechanics, algorithmic_rigor, hardware_sympathy)`
- **Scale & Trade-offs Score**: `f(bottleneck_mitigation, cost_awareness, latency_budgeting)`
- **Resilience Score**: `f(circuit_breakers, failover_correctness, blast_radius_control)`
- **Communication Score**: `f(structure, conciseness, precision_under_stress)`

The aggregate score is mapped directly to standard engineering levels:
- **90+**: Principal Engineer (L7+)
- **80–89**: Senior Staff Engineer (L6)
- **70–79**: Senior Engineer (L5)
- **50–69**: Mid-Level Software Engineer (L4)

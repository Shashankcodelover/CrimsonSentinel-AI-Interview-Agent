# Crimson Sentinel — Technical Specification

## 1. System Overview
Crimson Sentinel is an autonomous, multi-signal AI interviewing platform built to evaluate candidates on senior and principal engineering expectations. Unlike traditional trivia-based or coding-sandbox platforms, Crimson Sentinel operates as an adaptive Socratic conversational partner that assesses architectural soundness, trade-off awareness, and operational resilience under real-world production stress.

## 2. Component Architecture
```
+-------------------------------------------------------------+
|               Next.js 15 App Router Frontend                |
|  - Strategy Panel & Real-time Diagnostic HUD                |
|  - Interactive Coverage Radar (Multi-Dimensional)           |
|  - Breeth Adaptive Memory Rail & Ghost Probes               |
|  - Rubric Mirror & Dynamic Gap-Closure Tracker              |
+-------------------------------------------------------------+
                              |
                              | HTTP / SSE
                              v
+-------------------------------------------------------------+
|              Sentinel Cognitive Reasoning Engine            |
|  - Multi-Turn Socratic State Machine                        |
|  - Signal-to-Noise Keyword & Entity Extractor               |
|  - Rubric Calibration Engine (Staff/Principal Benchmarks)   |
|  - Fallback Resilient Deterministic Evaluator               |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                Evaluation Dossier Generator                 |
|  - 4-Quadrant Quantitative Scoring (0-100)                  |
|  - Evidence Quote Linking & Counterfactual Generation       |
|  - Actionable Hiring Committee Recommendation               |
+-------------------------------------------------------------+
```

## 3. Key Telemetry & Metrics Tracked
- **Signal Density**: Ratio of specific architectural concepts (WAL, quorum, Raft, TTL, p99, backpressure) to generic filler text.
- **Probe Depth**: Dynamic integer level (1 to 5) reflecting how deep the candidate has penetrated into low-level mechanics.
- **Cognitive Uncertainty**: Real-time evaluation of hedge language, contradictions, and response latency.
- **Domain Coverage**: 6-axis polar coverage tracking ingestion, storage, networking, resilience, observability, and cost.

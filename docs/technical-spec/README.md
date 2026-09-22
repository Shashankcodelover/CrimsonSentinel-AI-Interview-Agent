# Crimson Sentinel — Technical Specification

## 1. System Overview
Crimson Sentinel is a technical interview front-end application and mock service built to evaluate candidates through structured conversational turns. It combines a Next.js console interface with client-side heuristic evaluation modules that score candidate text on architectural terminology, trade-off awareness, and system design concepts.

## 2. Component Architecture
```
+-------------------------------------------------------------+
|               Next.js 15 App Router Frontend                |
|  - Candidate Setup & Warm-up Checklist (/setup)             |
|  - Monospace Chat Console & Diagnostics HUD (/interview)    |
|  - Answer Structure Coach (Claim / Mech / Tradeoff / Fail)   |
|  - 6-Axis Polar Topic Coverage Radar (SVG)                  |
|  - Strategy Panel, Probe Cadence & Depth Meter              |
|  - Evaluation Dossier & Rubric Mirror (/results)            |
+-------------------------------------------------------------+
                              |
                              | HTTP JSON (fetch)
                              v
+-------------------------------------------------------------+
|                    Mock API Routes & Store                  |
|  - Simulated Latency Turn Handler (POST /api/interview)     |
|  - In-Memory Candidate Mesh Store (GET/POST/DEL /api/cands) |
|  - Probe Corridor Provisioning (GET/POST/DEL /api/corridors)|
|  - RFC 4180 CSV & JSON Payload Parsers                      |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                Evaluation Report Generator                  |
|  - Quantitative Scoring Formula (0-100)                     |
|  - Evidence Quote Extraction & Pressure Moment Analysis     |
|  - Transcript Export (Markdown & JSON)                      |
+-------------------------------------------------------------+
```

## 3. Key Telemetry & Metrics Tracked
- **Signal Term Density**: Frequency of concrete architectural terminology (e.g. WAL, quorum, Raft, TTL, p99, backpressure) detected in candidate responses.
- **Probe Depth**: Depth percentage (0–100%) calculated from turn index and average response character length.
- **Uncertainty Flags**: Detection of hedging phrases (e.g. "maybe", "probably", "i think") and concise answers under 22 words.
- **Domain Coverage**: 6-axis polar coverage mapping keyword presence across Systems, Reliability, Data, Debugging, Tradeoffs, and Delivery.

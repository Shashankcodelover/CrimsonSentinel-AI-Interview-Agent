# Crimson Sentinel — Multi-Dimensional Evaluation Prompt Specification

## Evaluation Objective
Synthesize the complete multi-turn dialogue between the candidate and Crimson Sentinel into an objective, calibrated, and hiring-committee-ready dossier.

---

## Rubric Matrix & Weighting

```
+------------------------------------+---------+----------------------------------------------+
| Dimension                          | Weight  | Key Indicators Evaluated                     |
+------------------------------------+---------+----------------------------------------------+
| 1. First-Principles Foundation     |   30%   | Kernel I/O, memory models, consensus theory, |
|                                    |         | algorithmic complexity, storage internals    |
| 2. Scale & Systems Trade-offs      |   25%   | CAP/PACELC theorem, partitioning, caching,   |
|                                    |         | cost vs performance, tail latency budgets    |
| 3. Operational Resilience          |   25%   | Failure isolation, circuit breakers, chaos,  |
|                                    |         | telemetry, observability, graceful decay     |
| 4. Communication & Precision       |   20%   | Quantitative rigor, clear boundary contracts,|
|                                    |         | receptive to feedback, structured delivery   |
+------------------------------------+---------+----------------------------------------------+
```

---

## Scoring Scale (1 to 100)
- **90–100 (Principal / L7+)**: Effortless mastery; introduces counter-intuitive trade-offs; designs for failure before prompted; proves mathematical bounds.
- **80–89 (Senior Staff / L6)**: Strong ownership; clear architectural boundaries; identifies bottleneck under high stress; comprehensive recovery plans.
- **70–79 (Senior / L5)**: Competent core system design; occasionally relies on high-level services without detailing internal failure modes; responds well to probing.
- **50–69 (Mid-Level / L4)**: Struggles with distributed edge cases; relies on optimistic happy-path designs; lacks depth in concurrency control.
- **< 50 (Under-leveled)**: Superficial buzzword usage; inability to articulate data consistency or failure containment.

---

## JSON Output Schema
```json
{
  "aggregate_score": 85,
  "calibrated_tier": "Staff Engineer (L6)",
  "summary": "Executive hiring summary...",
  "quadrants": {
    "first_principles": { "score": 88, "evidence": ["..."] },
    "scale_tradeoffs": { "score": 84, "evidence": ["..."] },
    "resilience": { "score": 82, "evidence": ["..."] },
    "communication": { "score": 86, "evidence": ["..."] }
  },
  "strengths": [
    "Identified LSM-tree write amplification trade-offs under high-throughput ingestion.",
    "Formulated robust circuit breaker fallback using degraded read replicas."
  ],
  "gaps": [
    "Did not quantify cross-region WAN bandwidth saturation under peak rebalancing.",
    "Left split-brain lease expiry edge cases unaddressed during Raft leader partition."
  ],
  "next_steps": [
    "Conduct deep-dive on distributed database replication lag.",
    "Assign take-home on idempotent payment settlement state machine."
  ]
}
```

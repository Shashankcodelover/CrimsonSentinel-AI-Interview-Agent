# Frontend features catalog

Branch: **`feature/next-level`** (never push/merge to `main` unless asked).

This folder is the teammate map of what the frontend has built, where the code lives, and what Member 2 needs to wire for real Breeth / backend intelligence.

| Doc | Audience |
|-----|----------|
| [CONNECT.md](./CONNECT.md) | Member 2 — how to plug real API signals into existing UI |
| Per-feature `README.md` folders below | Anyone — status, files, local vs backend |

## Quick status

| Feature | Status | Needs backend? |
|---------|--------|----------------|
| [probe-depth-meter](./probe-depth-meter/) | Shipped | Optional later |
| [probe-cadence](./probe-cadence/) | Shipped | No |
| [adaptive-memory-rail](./adaptive-memory-rail/) | Shipped (preview) | **Yes for real Breeth** |
| [live-eval-draft](./live-eval-draft/) | Shipped (preview) | Optional |
| [ghost-next-probe](./ghost-next-probe/) | Shipped (preview) | Optional |
| [role-calibration](./role-calibration/) | Shipped | No |
| [signal-highlighter](./signal-highlighter/) | Shipped | No |
| [time-pressure-arc](./time-pressure-arc/) | Shipped | No |
| [uncertainty-flags](./uncertainty-flags/) | Shipped (preview) | Optional |
| [answer-structure-coach](./answer-structure-coach/) | Shipped (preview) | Optional |
| [rubric-mirror](./rubric-mirror/) | Shipped | Optional |
| [session-diff](./session-diff/) | Shipped | No |
| [counterfactual-probes](./counterfactual-probes/) | Shipped (templates) | Optional |
| [evidence-quotes](./evidence-quotes/) | Shipped (preview) | Optional |
| memory-confidence-heat | **Not built** — Tier C | **Required** |
| adaptive-follow-up-graph | **Not built** — Tier C | **Required** |

Brainstorm + tiers also live in [`../FEATURES.md`](../FEATURES.md). Day-to-day teammate state: [`../TEAM_NOTES.md`](../TEAM_NOTES.md).

## Checks teammates should run

```bash
cd frontend
npm run typecheck
npm run lint
npm test
npm run build
```

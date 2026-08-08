# Probe Depth Meter

**Status:** Shipped  
**Branch:** `feature/next-level`

## Code

| Layer | Path |
|-------|------|
| UI | `frontend/components/interview/probe-depth-meter.tsx` |
| Heuristic / data | `getProbeDepth in lib/interview-insights.ts` |
| Wired from | `app/interview/page.tsx` and/or `app/results/page.tsx` |

## Connect (Member 2)

Optional probeDepthPct on turn response

See [../CONNECT.md](../CONNECT.md) for the optional response shape. Until server fields exist, keep the Preview · local label in UI.

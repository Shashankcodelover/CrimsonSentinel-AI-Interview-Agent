# Connect frontend features to the real interview API

**Locked path:** `POST /api/interview` only. Do not invent new endpoints for the hackathon unless the whole team agrees.

Frontend default: local mock at `/api/interview`.  
Swap with: `NEXT_PUBLIC_INTERVIEW_API_URL` in `frontend/.env.local` (see `frontend/.env.example`).

Client: `frontend/lib/interview-api.ts`  
Types: `frontend/lib/types.ts`  
Local heuristics (preview UI): `frontend/lib/interview-insights.ts`, `frontend/lib/answer-structure.ts`

---

## Contract today (required)

### Start
```json
{ "sessionId": "...", "candidate": { "id", "name", "jobRole", "yearsExperience", "education" } }
```
→ `{ "reply": "...", "done": false }`

### Turn
```json
{ "sessionId": "...", "message": "..." }
```
Mock also accepts `turn` + `candidate` for serverless safety. Shared contract can stay minimal.
→ `{ "reply": "...", "done": false }`

### End
```json
{ "sessionId": "...", "end": true }
```
→ `{ "reply": "...", "done": true, "feedback": { "summary", "strengths": [], "gaps": [], "next": [] } }`

---

## Optional additive fields (discuss before shipping)

Keep `reply` / `done` / `feedback` as-is. Frontend can adopt these **only if present**:

```ts
type InterviewResponseExtras = {
  // Adaptive Memory Rail — replaces local preview chips
  memoryHints?: { id?: string; label: string; confidence?: number; kind?: "focus" | "probe" | "signal" }[];

  // Live Evaluation Draft — replaces keyword strengths/gaps
  draftSignals?: { id?: string; side: "strength" | "gap"; label: string }[];

  // Ghost Next Probe / Counterfactuals
  nextProbeHint?: string;
  counterfactualProbes?: string[];

  // Uncertainty Flags
  uncertainty?: { label: string; severity: "soft" | "firm" } | null;

  // Probe Depth (0–100) if Breeth scores intensity
  probeDepthPct?: number;

  // Tier Next — optional scorecard / radar
  axisScores?: { id: string; label: string; score: number; note?: string }[];
  topicWeights?: { id: string; label: string; value: number }[];
};
```

### Wiring rule for Member 2

1. Ship extras as **optional** on the same POST response.
2. Tell frontend the deployed URL for `NEXT_PUBLIC_INTERVIEW_API_URL`.
3. Frontend will prefer server fields when present, else keep “Preview · local” heuristics.
4. Until extras land, judges must see preview labels so we don’t claim real Breeth.

### Do not change without a team ping

- New paths besides `POST /api/interview`
- Renaming `feedback.summary|strengths|gaps|next`
- Removing `done` or `reply`

---

## Feature → connect map

| UI feature | Works today with mock? | What backend should send to “go live” |
|------------|------------------------|--------------------------------------|
| Memory Rail | Yes (local) | `memoryHints[]` (+ optional `confidence`) |
| Live Eval Draft | Yes (local) | `draftSignals[]` |
| Ghost Next Probe | Yes (local) | `nextProbeHint` |
| Uncertainty banner | Yes (local) | `uncertainty` |
| Counterfactual cards | Yes (templates) | `counterfactualProbes[]` |
| Probe Depth | Yes (local) | `probeDepthPct` |
| Role Calibration | Yes | Uses `candidate` from start — already wired |
| Results report body | Yes | Final `feedback` on end — already wired |
| Session Diff / Structure Coach / Signal highlight / Cadence / Time arc / Sticky notes / Bookmarks / Export / Focus / Shortcuts / Warm-up / Pace / Health | Yes | Frontend-only; no API change |
| Coverage Radar / Rubric Scorecard / Gap Closure | Yes (local) | Optional `topicWeights` / `axisScores` |

---

## Suggested Member 2 order

1. Deploy real `POST /api/interview` matching the locked contract → frontend only sets env URL.  
2. Add optional `memoryHints` (biggest demo win for “adaptive memory”).  
3. Add `draftSignals` + `nextProbeHint`.  
4. Add confidence → unlock **Memory Confidence Heat** (Tier C, not built yet).  
5. Follow-up graph last (needs causality metadata).

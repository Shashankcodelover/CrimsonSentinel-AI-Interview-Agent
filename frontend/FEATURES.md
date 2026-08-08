# Crimson Sentinel — Feature Brainstorm

Branch: `feature/next-level`  
Baseline: Landing → Setup → Interview → Results (mock `POST /api/interview`) — **do not break**.  
Scope: frontend vision + Tier A builds only. Breeth memory / real adaptation = Member 2.

---

## Idea catalog (14)

### 1. Adaptive Memory Rail
**Pitch:** A live side rail that fills with “what the interviewer is tracking” chips as answers land — visual stand-in for Breeth memory.  
**Why judges care:** Makes the *novel* product claim (adaptive memory) visible on screen in a demo.  
**Needs:** Frontend-only (heuristic from transcript + candidate role). Label as preview, not real Breeth.  
**Effort:** S · **Risk:** low

### 2. Probe Depth Meter
**Pitch:** A thin vertical “pressure” gauge that rises with each turn — calm → deep probe.  
**Why judges care:** Instant visual language of an interview intensifying, like a senior dialing up.  
**Needs:** Frontend-only (derived from question count / answer length).  
**Effort:** S · **Risk:** none

### 3. Live Evaluation Draft
**Pitch:** Tiny provisional Strengths / Gaps chips that appear mid-session from answer signals — a ghost of the final report.  
**Why judges care:** Bridges console → results; shows evaluation is forming, not a black box at the end.  
**Needs:** Frontend-only heuristic; results still come from mock/API feedback.  
**Effort:** S · **Risk:** low

### 4. Topic Coverage Constellation
**Pitch:** Compact map of domains (Systems, Reliability, Data, Debugging…) that light up when touched.  
**Why judges care:** Shows calibration across a senior eng rubric in one glance.  
**Needs:** Frontend-only keyword → topic map.  
**Effort:** S · **Risk:** low

### 5. Ghost Next Probe
**Pitch:** Soft teaser line: “Likely next probe: failure modes under partition…” based on last answer themes.  
**Why judges care:** Feels predictive / senior-interviewer; great live narration.  
**Needs:** Frontend-only template strings from topics.  
**Effort:** S · **Risk:** low

### 6. Answer Signal Highlighter
**Pitch:** Soft underline on tradeoff / scale / latency terms inside the candidate bubble.  
**Why judges care:** Looks like the AI is “reading” for signal, not just chatting.  
**Needs:** Frontend-only.  
**Effort:** S · **Risk:** low

### 7. Role Calibration Strip
**Pitch:** Header strip: “Calibrated for Senior Backend · 8 yrs · systems-heavy.” Updates if setup changes.  
**Why judges care:** Proves the session is role-aware from second one.  
**Needs:** Frontend-only (already have candidate on session).  
**Effort:** S · **Risk:** none

### 8. Soft Time Pressure Arc
**Pitch:** Optional soft arc that fills over ~25 minutes — no hard stop, just presence.  
**Why judges care:** Real interviews have time gravity; demoable without voice.  
**Needs:** Frontend-only.  
**Effort:** S · **Risk:** low

### 9. Session Diff View (pre-results)
**Pitch:** Brief interstitial: “What changed since Q1” — topics gained, open probes.  
**Why judges care:** Narrative beat before the report lands.  
**Needs:** Frontend-only.  
**Effort:** M · **Risk:** low

### 10. Rubric Mirror on Results
**Pitch:** Results page animates the same chips/topics from the console into final strengths/gaps.  
**Why judges care:** Continuity — “the memory became the report.”  
**Needs:** Frontend-only if chips stay client-side.  
**Effort:** M · **Risk:** low

### 11. Counterfactual Probe Cards
**Pitch:** After End, show 2 “probes we didn’t ask” that a senior might still want.  
**Why judges care:** Signals depth beyond the happy path.  
**Needs:** Frontend templates OK for demo; better with backend.  
**Effort:** M · **Risk:** low

### 12. Honest Uncertainty Flags
**Pitch:** When answers are thin, UI shows “Low signal — expect deeper probe” before the next reply.  
**Why judges care:** Real seniors call out shallow answers; rare in AI demos.  
**Needs:** Frontend heuristic; true adaptation needs Member 2.  
**Effort:** M · **Risk:** low

### 13. Memory Confidence Heat
**Pitch:** Each memory chip has a confidence bar fed by *real* Breeth scores.  
**Why judges care:** Separates toy heuristics from production memory.  
**Needs:** **Backend** — Breeth must expose per-item confidence.  
**Effort:** L · **Risk:** high (new API shape)

### 14. Adaptive Follow-up Graph
**Pitch:** Graph of why Q3 followed Q2 (edge labels = remembered weak spot).  
**Why judges care:** Explains adaptation causality — hackathon “wow” if real.  
**Needs:** **Backend** — interview graph / Breeth links.  
**Effort:** L · **Risk:** high

---

## TIER A — BUILD TONIGHT

Frontend-only · S · low risk · high visual payoff. Building these **in order**:

1. **Probe Depth Meter** — intensity gauge in the console chrome.  
2. **Adaptive Memory Rail** — live “tracking” chips (+ topic lights).  
3. **Live Evaluation Draft** — provisional strength/gap chips mid-interview.  
4. **Ghost Next Probe** — one-line likely-next teaser under the meter.

Status: **shipped on `feature/next-level`** — Probe Depth, Memory Rail (+ topics), Live Evaluation Draft, Ghost Next Probe.

**Follow-on commits (same branch, still frontend-only):**
- Role Calibration Strip  
- Answer Signal Highlighter  
- Soft Time Pressure Arc  
- Honest Uncertainty Flags  
- Rubric Mirror (console → report)  
- Counterfactual Probes on results  
- Session Diff View on results  
- Probe Cadence spine (Q1–Q6 soft arc)  
- Answer Structure Coach (claim / mechanism / tradeoff / failure)  
- Evidence Quote Pins on results  

Teammate catalog: **`frontend/features/`** · Connect guide: **`frontend/features/CONNECT.md`**.

---

## TIER B — DOCUMENT AS ROADMAP

Still useful for judge talk; several items promoted into follow-on commits above.

| Idea | Status |
|------|--------|
| Answer Signal Highlighter | **Shipped** on feature/next-level |
| Role Calibration Strip | **Shipped** on feature/next-level |
| Soft Time Pressure Arc | **Shipped** on feature/next-level |
| Session Diff View | **Shipped** on feature/next-level |
| Rubric Mirror on Results | **Shipped** on feature/next-level |
| Counterfactual Probe Cards | **Shipped** on feature/next-level |
| Honest Uncertainty Flags | **Shipped** on feature/next-level |

Pitch line for judges: *“You see memory and depth live in the console; the report mirrors those signals, shows what shifted since Q1, and still lists probes a senior might ask next.”*

---

## TIER C — NEEDS BACKEND (FLAG FOR MEMBER 2)

**Do not implement. Do not invent endpoints.** Locked contract remains `POST /api/interview`.

| Idea | What’s needed before frontend |
|------|-------------------------------|
| Memory Confidence Heat | Optional fields on turn replies, e.g. `memoryHints: [{ label, confidence }]` — **discuss** before changing contract |
| Adaptive Follow-up Graph | Either enrich `reply` metadata or a separate future endpoint — **Member 2 owns Breeth** |

Talking points for Member 2:
- Frontend can keep showing a **preview** rail forever.
- When Breeth is ready, swap heuristic chips for server-provided `memoryHints` via the same POST response (additive, optional) — no new path required if they agree.
- Until then, UI must say “Preview · local signal” so judges aren’t misled.

---

## What exists vs vision

| State | Items |
|-------|--------|
| **Shipped baseline** | Landing, Setup, Interview, Results, mock API, demo/timer/copy/print |
| **Shipped Tier A + follow-ons** | Probe Depth, Probe Cadence, Memory Rail, Live Draft, Ghost Probe, Role Calibration, Signal Highlight, Time Arc, Uncertainty Flags, Structure Coach, Rubric Mirror, Counterfactuals, Session Diff, Evidence Quotes |
| **Roadmap (Tier B remaining)** | Polish / judge-demo hardening only — core Tier B items shipped |
| **Backend-gated (Tier C)** | Real Breeth confidence + follow-up graph |

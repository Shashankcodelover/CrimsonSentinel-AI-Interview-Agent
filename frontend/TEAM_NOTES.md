# Frontend team notes

Last updated: 2026-08-08. For teammates, not judges. Rewrite in place — don’t append history here.

## What works right now

- Next.js app in `/frontend`: Landing `/`, Setup `/setup`, Interview `/interview`, Results `/results`.
- Full click-through against **local mock** `POST /api/interview`.
- **Try demo**, setup **Fill demo profile**, **Resume / View report** banner.
- Interview: Probe Depth, Cadence, Memory Rail, Coverage Radar, Live Draft, Ghost Probe, Role Calibration, signal highlight, time arc, uncertainty, Structure Coach, Confidence Dial, Pace Meter, Sticky Notes, Moment Bookmarks, Focus Mode, Prefs.
- Results: Rubric Mirror, Coverage Radar, Senior Scorecard, Session Diff, Evidence Quotes, Turn Scrubber, Bookmarks, Gap Closure, Counterfactuals, Markdown/JSON export, Copy/Print.
- Landing: Judge demo script · Setup: Warm-up checklist · Global: Session health + `?` shortcuts.
- Feature map: **`frontend/features/`** (+ `TIER-NEXT.md`, `CONNECT.md`).
- Active branch: **`feature/next-level`** — **never push/merge to main unless asked**.
- Checks: `npm run typecheck && npm run lint && npm test && npm run build`.

## What's not done / known gaps

- No real backend wired yet — mock only.
- Footer nav links are dead `#` placeholders.
- Results aggregate score bars + Tier Next scorecard are UI-only (derived client-side).
- Tier C (real Breeth confidence heat + follow-up graph) needs Member 2.
- Don’t run `npm run build` while `npm run dev` shares the same `.next` folder.

## How to run this locally

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

No env required for the mock. Optional: copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_INTERVIEW_API_URL` when a real backend URL exists.

## The one shared contract with the backend

Only shared surface. Frontend uses the local mock until you set `NEXT_PUBLIC_INTERVIEW_API_URL`.

`POST /api/interview`

**Start** `{ "sessionId", "candidate": { "id", "name", "jobRole", "yearsExperience", "education" } }`  
→ `{ "reply", "done": false }`

**Turn** `{ "sessionId", "message" }`  
→ `{ "reply", "done": false }`

**End** → `{ "reply", "done": true, "feedback": { "summary", "strengths": [], "gaps": [], "next": [] } }`

Local mock may also accept extra fields (`turn`, `candidate`) for serverless convenience. Shared shape above is what we align on. See `frontend/features/CONNECT.md` for optional additive fields.

## What the next person should do

1. Click **Try demo** and walk Landing → Interview → End → Results (use Judge demo script).
2. Member 2: match the contract; give frontend the URL for `NEXT_PUBLIC_INTERVIEW_API_URL`.
3. Frontend: don’t turn the mock into a real backend — swap the env URL only.
4. Prefer server `memoryHints` when ready; keep Preview · local until then.

## Notes / decisions worth knowing

- `sessionStorage`, not a DB — auth/DB out of frontend scope.
- Monospace autosize answer box; **no** fake line numbers.
- Brand text `#ffb4ac`; button fill `#991b1b` + white.
- Native inputs/buttons on setup/interview after Base UI hydration flakiness.

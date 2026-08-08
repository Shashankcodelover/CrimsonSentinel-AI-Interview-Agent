# Frontend team notes

Last updated: 2026-08-08. For teammates, not judges. Rewrite in place — don’t append history here.

## What works right now

- Next.js app in `/frontend` only: Landing `/`, Setup `/setup`, Interview `/interview`, Results `/results`.
- Full click-through works against a **local mock**: Setup → Interview (send answers, thinking state, question count, End) → Results shows `summary`, `strengths[]`, `gaps[]`, `next[]`.
- Mock lives at `/frontend/app/api/interview/route.ts`. It is temporary. Not Member 2’s backend.
- Candidate fields on setup: `id`, `name`, `jobRole`, `yearsExperience`, `education`.
- Session kept in browser `sessionStorage`. Refresh mid-interview restores the transcript; no white screen in testing we did.
- Stitch-based dark UI, `next/font`, footer year 2026. Production `npm run build` succeeds.
- Phone-width (~390px) was spot-checked on landing / interview / results; usable, not a polished mobile design pass.

## What's not done / known gaps

- No real backend wired yet — mock only.
- Footer nav (Documentation, etc.) are dead `#` links.
- Results “aggregate score” bars are UI-only (derived client-side), not from the API.
- `docs/technical-spec/` exists but is empty in this repo right now; we built against the shared POST shape below.
- Don’t run `npm run build` while `npm run dev` is up on the same folder — it can break the running API until you restart dev.

## How to run this locally

From a clean clone:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

No env vars required for the mock. Optional later: copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_INTERVIEW_API_URL` when a real backend URL exists.

## The one shared contract with the backend

This is the only frontend ↔ backend surface. Frontend currently hits the **local mock**. When a real backend URL exists, set `NEXT_PUBLIC_INTERVIEW_API_URL` and restart — that’s the swap. Don’t invent other shared APIs from the frontend side.

`POST /api/interview`

**Start**

```json
{ "sessionId": "...", "candidate": { "id": "...", "name": "...", "jobRole": "...", "yearsExperience": 0, "education": "..." } }
```

→ `{ "reply": "...", "done": false }`

**Turn**

```json
{ "sessionId": "...", "message": "..." }
```

→ `{ "reply": "...", "done": false }`

**End** (same endpoint; signal completion)

→ `{ "reply": "...", "done": true, "feedback": { "summary": "...", "strengths": [], "gaps": [], "next": [] } }`

Note: the local mock also accepts extra fields (`turn`, `candidate` on turns/end) so it can stay serverless-friendly. The **shared** shape above is what we align on. When your backend is up, send Preetham the deployed URL — no other coordination needed on our side.

## What the next person should do

1. Run the app locally and click Landing → Setup → Interview (a few answers) → End → Results.
2. If you’re Member 2: implement against the contract above; when deployed, give frontend the URL for `NEXT_PUBLIC_INTERVIEW_API_URL`.
3. If you’re frontend: don’t rewrite the mock into a “real” backend — swap URL only.
4. Push/deploy is waiting on Preetham’s call (not done until asked).

## Notes / decisions worth knowing

- `sessionStorage`, not a database — auth/DB out of frontend scope.
- Answer box is monospace + autosize; **no** fake synced line numbers (they desync on wrap).
- Brand text uses coral `#ffb4ac` for contrast on dark; solid crimson `#991b1b` is for buttons.
- Setup/interview actions use native inputs/buttons after Base UI hydration/submit flakiness with shadcn defaults.

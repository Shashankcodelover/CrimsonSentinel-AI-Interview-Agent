# Frontend team notes

Last updated: 2026-08-08. For teammates, not judges. Rewrite in place — don’t append history here.

## What works right now

- Next.js app in `/frontend` only: Landing `/`, Setup `/setup`, Interview `/interview`, Results `/results`.
- Full click-through works against a **local mock**: Setup → Interview (send answers, thinking state, question count, End) → Results shows `summary`, `strengths[]`, `gaps[]`, `next[]`.
- **Try demo** on landing (skips form with a demo candidate). **Fill demo profile** on setup. **Resume / View report** banner if a session exists in this browser tab.
- Interview extras: elapsed timer, end confirmation modal, word count, autofocus after replies, `aria-live` thinking state.
- Results: **Copy report** + **Print** (actions hidden when printing).
- Mock at `/frontend/app/api/interview/route.ts` — temporary, not Member 2’s backend.
- Session in `sessionStorage`. Refresh mid-interview restores transcript.
- Stitch-based dark UI, footer year 2026. `npm run build` succeeds. Phone-width spot-checked.

## What's not done / known gaps

- No real backend wired yet — mock only.
- Footer nav links are dead `#` placeholders.
- Results aggregate score bars are UI-only (derived client-side), not from the API.
- `docs/technical-spec/` folder is empty in-repo; contract below is what we build against.
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

Local mock may also accept extra fields (`turn`, `candidate`) for serverless convenience. Shared shape above is what we align on. Send Preetham the deployed URL when ready — no other coordination needed.

## What the next person should do

1. Click **Try demo** and walk Landing → Interview → End → Results.
2. Member 2: match the contract; give frontend the URL for `NEXT_PUBLIC_INTERVIEW_API_URL`.
3. Frontend: don’t turn the mock into a real backend — swap the env URL only.

## Notes / decisions worth knowing

- `sessionStorage`, not a DB — auth/DB out of frontend scope.
- Monospace autosize answer box; **no** fake line numbers.
- Brand text `#ffb4ac`; button fill `#991b1b` + white.
- Native inputs/buttons on setup/interview after Base UI hydration flakiness.

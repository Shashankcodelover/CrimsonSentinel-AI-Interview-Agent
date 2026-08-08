# Frontend team notes

Last updated: 2026-08-08. For teammates, not judges. Rewrite in place — don’t append history here.

## What works right now

- Next.js app in `/frontend`: Landing `/`, Setup `/setup`, Interview `/interview`, Results `/results`.
- Full click-through against **local mock** `POST /api/interview`.
- **Try demo**, setup **Fill demo profile**, **Resume / View report** banner.
- Interview: elapsed timer, end confirmation, word count, autofocus, aria-live.
- Results: Copy report + Print.
- **Tier A (feature/next-level):** Probe Depth Meter · Adaptive Memory Rail (preview · local) with topic lights · Live Evaluation Draft chips · Ghost Next Probe line. All frontend heuristics — labeled so judges know it’s not live Breeth yet.
- Repo target: **https://github.com/ULLAS-7/CrimsonSentinel-AI-Interview-Agent.git** only (`frontend` already merged to `main` via PR #1).
- See `frontend/FEATURES.md` for brainstorm / Tier B+C.

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

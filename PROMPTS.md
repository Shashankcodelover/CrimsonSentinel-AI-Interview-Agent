# AI Usage Log

## Prompt 1

### Tool Used
Cursor Agent (Composer) + create-next-app + shadcn CLI

### Purpose
Scaffold Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion inside `/frontend`, with design tokens from Stitch reference and production font/config setup (next/font, tailwind.config.ts).

### Prompt
Scaffold a Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion app inside /frontend using design-reference as visual source of truth; only touch /frontend; append PROMPTS.md; build one screen at a time starting with landing.

### Output Summary
Created Next.js 15 app in `/frontend` (kept `design-reference/`). Installed Framer Motion and initialized shadcn/ui (button, input, label, textarea, card, progress, badge, separator). Added `tailwind.config.ts` + Crimson design tokens in `globals.css`, next/font for IBM Plex Serif / Inter / JetBrains Mono, shared SiteHeader/SiteFooter (footer year 2026), and Landing page at `/`.

### Manual Changes
None yet.

### Timestamp
2026-08-08T11:50:00+05:30

## Prompt 2

### Tool Used
Cursor Agent (Composer)

### Purpose
Build and verify the Landing page against the Stitch design system (brand-first hero, dark surfaces, crimson accents, editorial typography).

### Prompt
Build Landing page using Stitch reference for style; show it working before moving to the next screen.

### Output Summary
Landing page at `/` with brand-level "Crimson Sentinel" hero, supporting sentence, dual CTAs, atmospheric radial/grid background, Platform + Process sections with Framer Motion fade-ups, and shared header/footer. Fixed Tailwind `@apply dark` crash.

### Manual Changes
None.

### Timestamp
2026-08-08T11:55:00+05:30

## Prompt 3

### Tool Used
Cursor Agent (Composer)

### Purpose
Fix WCAG AA contrast for brand text on dark backgrounds (deep crimson `#991b1b` failed as large text; switched brand/accent text to Stitch coral `#ffb4ac`).

### Prompt
Check text contrast against the dark background meets WCAG AA.

### Output Summary
Introduced `text-brand` (`#ffb4ac`) for logo/hero/report accents; kept solid `#991b1b` for primary button fills with white text. Brightened `on-surface-variant` to `#f0d4d0` for body secondary text.

### Manual Changes
None.

### Timestamp
2026-08-08T12:00:00+05:30

## Prompt 4

### Tool Used
Cursor Agent (Composer)

### Purpose
Build Candidate setup screen collecting id, name, jobRole, yearsExperience, education; persist session and route to interview.

### Prompt
Build candidate setup screen (candidate: id, name, jobRole, yearsExperience, education).

### Output Summary
Added `/setup` form with Stitch technical inputs, validation, `lib/session.ts` (sessionStorage), and navigation to `/interview`.

### Manual Changes
None.

### Timestamp
2026-08-08T12:05:00+05:30

## Prompt 5

### Tool Used
Cursor Agent (Composer)

### Purpose
Build Interview console + mock POST `/api/interview` with start/turn/end contract, thinking state, question count, autosizing monospace textarea (no fake line numbers).

### Prompt
Interview console — sends message, receives reply, tracks question count, shows thinking state; mock API at /frontend/app/api/interview/route.ts; no literal synced line numbers.

### Output Summary
Implemented `/interview` console and `app/api/interview/route.ts` mock (start/turn/end + feedback). Thinking pulse while awaiting API; autosizing `Textarea` with monospace editor look; End Interview path.

### Manual Changes
None.

### Timestamp
2026-08-08T12:10:00+05:30

## Prompt 6

### Tool Used
Cursor Agent (Composer)

### Purpose
Build Results / feedback report from session feedback (summary, strengths[], gaps[], next[]) matching Stitch report layout.

### Prompt
Results / feedback report — renders summary, strengths[], gaps[], next[].

### Output Summary
Implemented `/results` with Stitch-style bento: strengths, aggregate score bars, development areas, next steps; footer year 2026; Framer Motion section fades. Verified full flow Landing → Setup → Interview (thinking + Q count) → Results against mock API.

### Manual Changes
None.

### Timestamp
2026-08-08T12:15:00+05:30

## Prompt 8

### Tool Used
Cursor Agent (Composer)

### Purpose
Harden mock API for deploy (stateless/serverless), support 4–5+ answers before end, empty/long answer handling, and document frontend deploy steps before push.

### Prompt
Full flow QA checklist + push frontend branch to GitHub for deploy readiness.

### Output Summary
Mock API now client-driven (candidate + turn on each request) so Vercel serverless works. Raised max turns to 6; empty-answer validation + long-message truncate; frontend README with Vercel root=`frontend`.

### Manual Changes
None.

### Timestamp
2026-08-08T12:00:00+05:30

## Prompt 9

### Tool Used
Cursor Agent (Composer)

### Purpose
User asked to NOT push yet — analyse/upgrade/test the frontend against a full judge-style checklist, fix logging style for PROMPTS.md, and add TEAM_NOTES.md for teammates. Push deferred to next message.

### Prompt
Push the company code to this repo "https://github.com/ULLAS-7/CrimsonSentinel-AI-Interview-Agent.git" With standard form By making the branch of front end Start meeting the professional way and push all of them before pushing cheque out all the things of working correctly Cheque to the testing whether the distinct which satisfies or not " Full flow once, start to finish: Landing → Start → Setup form submit → Interview (send at least 4–5 answers) → End → Results renders all four feedback fields
 Refresh the page mid-interview — confirm it doesn't hard-crash (fine if it just restarts, not fine if it white-screens)
 Resize browser to phone width (or open on your actual phone) — recheck the screens you fixed for hydration/contrast still hold up narrow
 Submit an empty answer and a very long answer in the interview textarea — confirm the mock doesn't choke
 Open the live URL in an incognito/private window — this is close to what a judge does on a cold, un-cached first visit
 Check the browser console for errors on each screen — a clean console matters more than it seems for a technical judge glancing at devtools" I need the fully working Website able to push on the Github so I can able to deploy  And make sure to follow the prompt initial prompt and make sure to update the files which has been mentioned earlier without ending the things As of now just analyse the things and upgrade the project and test them And you can also give maintain the file that should give the guide for the member 2 Or the backend or any Other things so they can able to mai....e familiar thing for the other agents and fallow this "Update how you log to /PROMPTS.md from now on..." Also create TEAM_NOTES.md ... and next i will give in next response

### Output Summary
Starting analysis + QA pass now. Will not push/create remote branch until the user's next message. Noticed Prompt 7 was skipped earlier (Prompt 8 already exists) — leaving history alone, appending only. Noticed mock API already looks serverless-hardened (candidate+turn on each request, max turns 6) from a prior pass — verifying that still matches the interview client before claiming green.

### Manual Changes
None yet this turn.

### Timestamp
2026-08-08T12:10:46+05:30

## Prompt 10

### Tool Used
Cursor Agent (Composer) + PowerShell Invoke-RestMethod

### Purpose
Log a real QA failure discovered mid-checklist — not a feature request.

### Prompt
(Internal QA while executing user's checklist from Prompt 9)

### Output Summary
FAILED: ran 
pm run build while 
pm run dev (turbopack) was still up. Build rewrote .next/ and the dev server started returning 500 ENOENT on /api/interview (missing build-manifest / app-paths-manifest). Dev process exited. Fix: restart 
pm run dev cleanly, then re-run API + browser checklist. Also noting MODULE_TYPELESS_PACKAGE_JSON warning on 	ailwind.config.ts — will add "type": "module" if it doesn't break Next.

### Manual Changes
None yet — restarting server next.

### Timestamp
2026-08-08T12:14:29+05:30

## Prompt 11

### Tool Used
Cursor Agent (Composer) + browser CDP + PowerShell API calls + 
pm run build

### Purpose
Finish the judge-style QA checklist from Prompt 9 (no GitHub push yet), write TEAM_NOTES.md, log what actually passed/failed.

### Prompt
(Continuation of Prompt 9 — analyse / upgrade / test; push deferred to next user message)

### Output Summary
QA results after fixing the dead dev server from Prompt 10:
- PASS production build (
pm run build)
- PASS empty message → API 400 message cannot be empty; UI shows alert "Answer cannot be empty..."
- PASS ~25k char long message → mock replies (truncates payload server-side)
- PASS API 5 turns + end → feedback has summary + strengths(3) + gaps(2) + next(3)
- PASS UI mid-interview refresh → restored Q count / transcript, no white screen
- PASS phone-width (390px) landing/results — brand coral still readable, hamburger nav, no layout blowup
- PASS cold visit (cleared storage) landing + setup; /interview with no session redirects to /setup
- PASS full UI path to /results with all four feedback fields present in DOM text
- Added rontend/TEAM_NOTES.md for teammates/backend
- Added "type": "module" to frontend package.json to quiet the tailwind.config.ts module warning
- DID NOT push / create frontend branch yet — waiting on user's next message as they said

### Manual Changes
None from user. Agent-only: TEAM_NOTES.md, package.json type module, PROMPTS appends.

### Timestamp
2026-08-08T12:19:22+05:30

## Prompt 12

### Tool Used
Cursor Agent (Composer)

### Purpose
Rewrite TEAM_NOTES.md for teammates with exact sections requested; stay out of backend design; document mock + one shared POST contract; wire NEXT_PUBLIC_INTERVIEW_API_URL so the "one env var swap" claim is real. No push.

### Prompt
"Create /frontend/TEAM_NOTES.md now, populated with the real current state of the frontend based on everything built so far (Prompts 1-7 in /PROMPTS.md). This file is for teammates, not judges — plain, direct language, no formal template.
SCOPE — STAY OUT OF BACKEND ... Only describe the frontend, and the ONE place it touches the backend: the POST /api/interview contract...
WRITE THESE SECTIONS: What works / What's not done / How to run / The one shared contract / What the next person should do / Notes...
Just tell me All the project or entire website of this front end part is ready and testable... And ready for And just cumulative conversation and I will tell when to push... After pushing before deploying Whether we can able to Say our entire project or entire website fully workable to other members far from our Al Ngero is best NG Rock But there is a issue we can able to save only one link But other other pages will not be loaded..."

### Output Summary
Rewrote frontend/TEAM_NOTES.md to the requested sections only (no backend implementation advice). Noted docs/technical-spec/ is empty so contract is the shared POST shape we built against. Added NEXT_PUBLIC_INTERVIEW_API_URL in lib/interview-api.ts + .env.example so swapping off the mock is actually one env var. Did not push.

### Manual Changes
None.

### Timestamp
2026-08-08T12:26:35+05:30

## Prompt 13

### Tool Used
Cursor Agent (Composer) + git

### Purpose
User said push now — commit the staged frontend work on branch rontend and push remotely in a clean, professional way.

### Prompt
OK you can push it out Will well structured manner

### Output Summary
About to commit all staged frontend scaffolding + screens + mock API + TEAM_NOTES/PROMPTS on branch rontend, then push. Noted origin currently points at Shashankcodelover/CrimsonSentinel-AI-Interview-Agent; will also push to ULLAS-7 URL from earlier ask if accessible.

### Manual Changes
None.

### Timestamp
2026-08-08T12:32:44+05:30

## Prompt 14

### Tool Used
Cursor Agent (Composer) + git push

### Purpose
Record successful push of frontend branch after Prompt 13 commit.

### Prompt
(Continuation of "OK you can push it out Will well structured manner")

### Output Summary
Committed 814ae27 on branch frontend. Pushed successfully to:
- origin (Shashankcodelover/CrimsonSentinel-AI-Interview-Agent) frontend
- ullas (ULLAS-7/CrimsonSentinel-AI-Interview-Agent) frontend
PR links printed by GitHub for both remotes. Local upstream set back to origin/frontend.

### Manual Changes
None.

### Timestamp
2026-08-08T12:33:16+05:30

## Prompt 15

### Tool Used
Cursor Agent (Composer)

### Purpose
Judge/user-minded feature pass: make the frontend more attractive and usable for demos without touching backend.

### Prompt
OK all good try to add some more features some good features let us improve the project Okay think like a user or the judge and cheque out that what are the essential features are needed to build these more efficient and more attractive and more Performance are more attractive feat....just think of that and just build out
Performance are more attractive feat....just think of that and just build out

### Output Summary
Shipped: Landing Try demo + resume/report banner; Setup Fill demo profile; Interview elapsed timer, end confirm modal, word count, autofocus after thinking, aria-live; Results Copy report + Print; Textarea forwardRef; reduced-motion + basic print CSS; TEAM_NOTES rewritten. Still mock-only — no backend work.

### Manual Changes
None.

### Timestamp
2026-08-08T12:58:27+05:30

## Prompt 16

### Tool Used
Cursor Agent (Composer) + git

### Purpose
Start next-level feature work: branch feature/next-level, brainstorm into FEATURES.md, build Tier A only. First commit pending polish so baseline is clean.

### Prompt
We have a working, deployed baseline... create feature/next-level off main... TASK 1 Brainstorm 12-15 ideas... TASK 5 Build Tier A only... TASK 6 Log everything...

### Output Summary
Committing prior demo/polish features onto frontend, then creating feature/next-level from main and merging frontend (main has no /frontend folder yet — merge brings the working baseline without losing it).

### Manual Changes
None.

### Timestamp
2026-08-08T13:07:14+05:30

## Prompt 17

### Tool Used
Cursor Agent (Composer)

### Purpose
Brainstorm 14 high-signal Crimson Sentinel features, tier A/B/C, write FEATURES.md. No Tier A code in this entry yet.

### Prompt
(Same as Prompt 16 user message — brainstorm + tier + FEATURES.md + build Tier A + log)

### Output Summary
Created frontend/FEATURES.md with 14 ideas, specs (pitch/judge/frontend-vs-backend/effort/risk), Tier A (Probe Depth, Memory Rail, Live Evaluation Draft, Ghost Next Probe), Tier B roadmap, Tier C flagged for Member 2 (no new endpoints). Branch feature/next-level active with baseline merged from frontend.

### Manual Changes
None.

### Timestamp
2026-08-08T13:07:58+05:30

## Prompt 18

### Tool Used
Cursor Agent (Composer)

### Purpose
Build Tier A #1 — Probe Depth Meter — show working before next Tier A feature.

### Prompt
TASK 5 — Build Tier A only... Probe Depth Meter first.

### Output Summary
Added lib/interview-insights.ts and ProbeDepthMeter in interview chrome. Depth label moves Opening → Calibrating → Pressure rising → Deep probe. Updated TEAM_NOTES. Baseline flow unchanged.

### Manual Changes
None.

### Timestamp
2026-08-08T13:08:53+05:30

## Prompt 19

### Tool Used
Cursor Agent (Composer) + git remote

### Purpose
Align remotes to ULLAS-7 only (frontend already merged to main there), continue Tier A #2–4 (Memory Rail, Live Draft, Ghost Next Probe), then push feature/next-level to that repo.

### Prompt
https://github.com/ULLAS-7/CrimsonSentinel-AI-Interview-Agent.git For this repo you want to contribute Already dsa one branch of front end and you said somewhere there is no front end that's been not merged cheque out that deletes already exist and for this and according to that you want to work on the things and you can able to go with the type 2 and at hand you want to Make all the project all the folders should be updated to the same repo not any other repo ok be aware of this and you can start And I think it's already merged to the front end branch Ok you can continue

### Output Summary
Confirmed origin/main on ULLAS-7 includes frontend via PR #1 merge. Removed Shashankcodelover as origin; origin now only ULLAS-7. Built Memory Rail + topic lights, Live Evaluation Draft, Ghost Next Probe into interview console (still labeled Preview/local). Updated FEATURES.md + TEAM_NOTES. Next: commit + push feature/next-level to ULLAS-7.

### Manual Changes
None.

### Timestamp
2026-08-08T13:18:24+05:30

## Prompt 20

### Tool Used
Cursor Agent (Composer) + git

### Purpose
User clarified: keep Tier A work on a separate branch; do not merge or touch main. Commit + push feature/next-level only to ULLAS-7.

### Prompt
don't merge for main as of now maintain a new brach and continue don't touch main branch

### Output Summary
Staying on feature/next-level. Committing FEATURES.md + Tier A UI (probe depth, memory rail, live draft, ghost probe) and pushing only that branch to origin (ULLAS-7). No checkout of main, no merge into main, no force updates to main.

### Manual Changes
None.

### Timestamp
2026-08-08T13:19:47+05:30

## Prompt 21

### Tool Used
Cursor Agent (Composer) + git

### Purpose
User wants frequent commits on feature/next-level only (never main) for judge commit history; continue Tier improvements one commit at a time.

### Prompt
My main thing was do not teach any main branch whatever you do or whenever you push to the new branch Dutch maintain the new branch do not push to the main branch and commit as much as possible because whenever you do one set of work just commit to it Okay because we need also want to commit as much as possible to get into the guidance of the interview or the Invigilator the Z will be They will be a judgement according to this committee okay so just commit as much as possible when you will find your work has to be done And to the new branch it will be the best and you can continue your work the tier one or tie ray you can improve the project according to your plan

### Output Summary
Policy locked: feature/next-level only, no main. Starting incremental commits — first: Role Calibration Strip.

### Manual Changes
None.

### Timestamp
2026-08-08T13:22:42+05:30

## Prompt 22

### Tool Used
Cursor Agent (Composer) + git

### Purpose
Frequent feature commits on feature/next-level only: calibration strip, signal highlight, rubric mirror, counterfactuals; update docs; never touch main.

### Prompt
(Continuation of Prompt 21 — commit often on new branch, continue Tier plan)

### Output Summary
Separate commits pushed to origin/feature/next-level only:
- f1bad55 Role calibration strip
- 985e34a Signal term highlighting
- 48917fd Rubric mirror on results
- ee66913 Counterfactual probes
Docs (FEATURES + TEAM_NOTES) updated in this follow-up commit. main not checked out, not merged, not pushed.

### Manual Changes
None.

### Timestamp
2026-08-08T13:25:03+05:30

## Prompt 23

### Tool Used
Cursor Agent (Composer) + git

### Purpose
Lock policy: commit often on feature/next-level only, never main; finish Session Diff + docs; continue Tier plan.

### Prompt
My main thing was do not teach any main branch whatever you do or whenever you push to the new branch Dutch maintain the new branch do not push to the main branch and commit as much as possible because whenever you do one set of work just commit to it Okay because we need also want to commit as much as possible to get into the guidance of the interview or the Invigilator the Z will be They will be a judgement according to this committee okay so just commit as much as possible when you will find your work has to be done And to the new branch it will be the best and you can continue your work the tier one or tie ray you can improve the project according to your plan

### Output Summary
Policy confirmed. Fixed TopicId typing on counterfactuals. Shipped Session Diff on results (What changed since Q1). Updated FEATURES/TEAM_NOTES. Commits + push only to origin/feature/next-level — main never touched.

### Manual Changes
None.

### Timestamp
2026-08-08T13:35:00+05:30

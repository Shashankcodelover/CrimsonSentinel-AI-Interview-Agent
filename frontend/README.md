# Crimson Sentinel — Frontend

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion UI for the AI Technical Interview Platform.

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Screens

| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/setup` | Candidate profile form |
| `/interview` | Live interview console |
| `/results` | Feedback report |
| `POST /api/interview` | Mock interview API (until real backend is wired) |

## Production build

```bash
cd frontend
npm run build
npm start
```

## Deploy (Vercel)

1. Import the GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Next.js (auto-detected).
4. Deploy.

Or from the `frontend` folder:

```bash
npx vercel
```

## Notes

- Session state is stored in `sessionStorage` for the mock flow.
- Design tokens follow `frontend/design-reference/`.
- Footer year is 2026; fonts via `next/font` (IBM Plex Serif, Inter, JetBrains Mono).
- **Feature catalog for teammates:** [`features/README.md`](./features/README.md) + backend wiring [`features/CONNECT.md`](./features/CONNECT.md).
- Active work branch: `feature/next-level` (do not push to `main` unless asked).

## Checks

```bash
cd frontend
npm run typecheck
npm run lint
npm test
npm run build
```

# A–Z verification (Tier Next)

Branch: `feature/next-level` · Date: 2026-08-08

## Automated gates

| Gate | Command | Result |
|------|---------|--------|
| Unit tests | `npm test` | **19/19 pass** |
| Typecheck | `npm run typecheck` | **pass** |
| Lint | `npm run lint` | **pass** |
| Production build | `npm run build` | **pass** |

## Page / feature smoke (manual + code-wired)

| Surface | Features checked | Status |
|---------|------------------|--------|
| `/` Landing | Hero CTAs, resume banner, Judge demo script, PrefsBar | Wired |
| `/setup` | Form validation, Fill demo, Warm-up checklist, PrefsBar | Wired |
| `/interview` | Cadence, depth, memory, radar, bookmarks, confidence, pace, notes, focus, structure coach, send/end | Wired |
| `/results` | Mirror, radar, scorecard, diff, quotes, scrubber, bookmarks, gap closure, counterfactuals, export, copy/print | Wired |
| Global | Session health banner, `?` shortcuts (`G` then H/S/I/R) | Wired |
| Mock API | `POST /api/interview` start/turn/end (unchanged contract) | Intact |

Heuristic unit coverage: topics, probe depth, uncertainty, structure pillars, coverage radar, scorecard, pace, gap closure, transcript markdown.

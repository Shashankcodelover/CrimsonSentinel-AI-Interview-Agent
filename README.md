# Crimson Sentinel — AI Interview Agent UI

Crimson Sentinel is a Next.js front-end application and mock API that simulates a technical interview platform. It provides an interview console, real-time client-side heuristic feedback, in-memory data management for candidate profiles and question corridors, and structured evaluation reporting.

## Features

### Candidate Setup (`/setup`)
- Collects candidate profile details (ID, full name, target job role, years of experience, education).
- Validates form fields and prevents empty or invalid numeric submissions.
- Provides a demo profile filler for testing (`Alexander Chen`, Senior Backend Engineer).
- Displays an interactive warm-up preparation checklist.
- Persists session state to browser `sessionStorage`.

### Live Interview Console (`/interview`)
- Monospace chat interface supporting turn-based messaging between interviewer and candidate.
- Tracks elapsed interview duration and question counts.
- Displays a collapsible diagnostics HUD containing:
  - **Role Calibration Strip**: Displays the active candidate profile context.
  - **Probe Cadence Bar**: Tracks the current question turn against a 6-question cadence.
  - **Time Pressure Arc**: Visualizes elapsed time against a nominal 25-minute benchmark.
  - **Probe Depth Meter**: Calculates depth progression based on turn count and answer length.
  - **Uncertainty Banner**: Flags hedging phrases (e.g., "maybe", "i think") or brief answers.
- **Interviewer Strategy Panel**: Shows heuristic explanations for the current question topic.
- **Memory Rail & Coverage Radar**: Visualizes touched technical topics and displays an SVG radar chart covering 6 domains (Systems, Reliability, Data, Debugging, Tradeoffs, Delivery).
- **Answer Structure Coach**: Evaluates draft responses in real time across four structural pillars (Claim, Mechanism, Tradeoff, Failure) using keyword detection.
- **Signal Highlighter**: Highlights technical systems terminology in candidate messages.
- **Pace Meter & Confidence Dial**: Calculates seconds elapsed between turns and provides a 1–5 candidate self-rating slider.
- **Turn Bookmarking & Private Scratchpad**: Stars specific transcript turns and saves private sticky notes to `sessionStorage`.
- Handles interview completion through an exit confirmation modal or upon reaching the 6-turn limit.

### Evaluation Report (`/results`)
- Displays an aggregate score (0–100) and domain score bars derived from session signals.
- Presents structured cards for candidate summary, identified strengths, development gaps, and recommended next steps.
- **Rubric Mirror & Senior Rubric Scorecard**: Displays provisional interview signals and rates 6 evaluation axes (Breadth, Depth, Reliability, Tradeoffs, Ops readiness, Clarity).
- **Gap Closure Tracker & Pressure Moments**: Compares draft signals against final gaps and highlights critical interview turns based on length deltas and technical term density.
- **Session Diff & Evidence Quotes**: Shows domain progression since turn 1 and extracts representative quotes from candidate responses.
- **Turn Scrubber**: Slider to inspect the conversation turn by turn.
- **Export & Utility Controls**: Exports transcripts to Markdown (`.md`) or JSON (`.json`), copies summary text to clipboard, and provides print-ready styling.

### In-Memory Mesh Service & CRUD API (`/api/candidates`, `/api/corridors`)
- `cognitiveMeshService.ts` maintains an in-memory store of mock candidates, probe corridors, and assessment rubrics.
- REST endpoints support listing, creating, deleting, and bulk purging candidates and corridors.
- Supports CSV string parsing and JSON ingestion for batch importing candidate profiles and probe corridors.

### Simulated Interview API (`POST /api/interview`)
- Simulates realistic API latency (700–1200ms delay).
- Serves an opening system design question, cycles through scripted follow-up technical questions with candidate answer quote snippets, and generates structured feedback upon completion.

### Interactive Modals
- **Cognitive Topology Mesh**: Interface to visualize active corridors, candidates, and metrics with corridor provisioning and severing controls.
- **Bulk Ingestion Studio**: Interface to upload CSV/JSON candidate and corridor data directly to the API endpoints.
- **Polygraph Analyzer**: Visual modal demonstrating mock metrics (deception, cognitive load, truth confidence) generated with random numbers and animated graphs.
- **Keyboard Shortcut Overlay**: Modal listing app-wide keyboard shortcuts (`?`, `G+H`, `G+S`, `G+I`, `G+R`).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19, Tailwind CSS 4, shadcn/ui, Base UI
- **Animations & Icons**: Framer Motion, Lucide React
- **Testing**: Vitest 4 (28 unit tests)
- **End-to-End**: Python Playwright test script (`flow_test.py`)

## Quickstart & Setup

### Prerequisites
- Node.js 18+
- npm

### Installation
Clone the repository and install dependencies in the `frontend` directory:

```bash
cd frontend
npm install
```

### Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Tests
Run the Vitest test suite from the `frontend` directory:

```bash
npm test
```

### Production Build
```bash
npm run build
npm start
```

### End-to-End Verification Test
With the development server running on `http://localhost:3001`:

```bash
python flow_test.py
```

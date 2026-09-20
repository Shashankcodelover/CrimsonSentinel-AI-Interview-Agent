# ⚔️ Crimson Sentinel — AI Interview Agent UI

This project provides a mock UI and basic in-memory service for an AI technical interview platform. 

## Features

- **Mock Assessment Dashboard**: A front-end interface built with Next.js and Tailwind CSS that visualizes an interview command center.
- **In-Memory Data Service**: `cognitiveMeshService.ts` provides a hardcoded, in-memory store of mock candidates, "probe corridors" (question mapping), and assessment rubrics.
- **CSV/JSON Parsing**: Includes basic string parsing to load candidate mock data from CSV/JSON into the in-memory array.
- **Automated Tests**: A suite of Vitest unit tests validating the mock data structures and UI state.

## 🚀 Quickstart & Setup

### Prerequisites
- Node.js 18+

### Installation
```bash
npm install
```

### Launch Server
```bash
npm run dev
# Dashboard listening at http://localhost:3000
```

### Run Tests
```bash
npm run test
```

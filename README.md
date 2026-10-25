# BarkTrack — Find Your Way Around NU

BarkTrack is an independent student project prototype for a self-service campus navigation kiosk. It is designed to help students, faculty, staff, visitors, and first-time guests explore NU Main, NU Mendiola, NU Annex 1, and NU Annex 2.

> **Prototype data notice:** Indoor maps, buildings, rooms, floors, and sample routes are illustrative content. They are not official NU campus information and must not be used for real-world navigation. Replace them only with authorized, verified campus data.

## Current prototype

The interactive frontend demonstrates the visitor journey:

- Landing page with two paths: **Find a Room** and **Navigate Between Buildings**.
- Indoor selection for NU Main, NU Annex 1, and NU Annex 2, plus campus-scoped sample destination search. NU Mendiola is not shown as an indoor campus card.
- NU Main, NU Annex 1, and NU Annex 2 open to random interactive sample 1st-floor plans, with seven distinct floor layouts, separate room directories, selectable destinations, and highlighted sample paths with step-by-step guidance. All layouts and routes are fictional, not real NU plans.
- Building and destination detail panels, plus clearly illustrative indoor route previews.
- Outdoor trip form for NU Main, NU Mendiola, and NU Annex 2 (Mendiola), with origin/destination swapping.
- Destination location information, optional sample indoor room selection, and a connected indoor-guide handoff.
- An explicit unavailable-route state. No outdoor line, distance, time, street names, or steps are shown without verified route and entrance data.
- Helpful empty states, persistent campus identity, home/back controls, and configurable inactivity reset.
- Responsive layouts for kiosk, desktop, and tablet screens.

The NU official contact directory publishes a general Main address and lists Main, Annex 1, and Annex 2 Mendiola, but the public source reviewed does not provide verified pedestrian connections or exact navigation entrances. Details and decisions are documented in [the source review](docs/reports/official-location-source-review.md).

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```powershell
npm run build
npm run preview
```

The prototype is frontend-only. It does not require accounts, a backend, a database, or environment variables.

## Repository layout

```text
.
├── .agents/       # Agent guidance
├── .github/       # Collaboration templates and workflows
├── backend/       # Optional future destination API/admin service
├── data/          # Campus and destination catalog (sample content)
├── deployment/    # Kiosk deployment planning
├── docs/          # Overview, architecture, decisions, roadmap, research
├── frontend/      # React + TypeScript kiosk application
├── map/           # Map coordinate and geometry helpers
├── routing/       # Indoor sample routes and future verified outdoor routing
└── tests/          # Verification plans and future automated tests
```

See [docs/onboarding.md](docs/onboarding.md), [docs/project_structure.md](docs/project_structure.md), and [LOCAL_PREVIEW.md](LOCAL_PREVIEW.md).

## Data accuracy

- Keep destinations structured in `data/campuses.ts` with a campus ID, building, floor, category, and map position.
- Mark mock records as samples. Do not invent real room positions, floor plans, routes, entrance points, distances, travel times, or accessibility attributes.
- Treat the current indoor route line and instructions as interface samples only.
- Keep outdoor navigation separate from indoor floor-plan navigation. Enable outdoor guidance only after verifying building endpoints and route data.
- Do not collect unnecessary visitor information. The kiosk timeout clears the visitor's selections and query.

## Status and scope

The app is a working interaction prototype, not a production wayfinding service. Map rights, verified indoor information, outdoor route data, target kiosk hardware, accessibility evaluation, and official deployment authorization remain open. Future administrative tools must be authenticated and restricted to authorized maintainers.

**BarkTrack — Sniff Out Your Destination.**





# Architecture notes

## Current prototype

A React + TypeScript + Vite single-page kiosk interface reads a structured TypeScript campus catalog and renders it through a custom SVG-based schematic map. Indoor search, map rendering, and sample route-preview logic live in separate repository areas. No backend, database, accounts, or server-side map updates are present.

## Components

- **`frontend/`**: landing, campus selection, search, destination/building details, indoor directions, and inter-building planning UI.
- **`data/campuses.ts`**: campus records and clearly marked fictional destination examples. `data/maps/nu-main/sampleFloorPlan.ts` stores the random Main layout hit areas.
- **`frontend/src/components/CampusMap.tsx`**: campus map presentation, pan/zoom, floor selector, pins, and building interactions. NU Main uses the fictional room-interactive plan in `MainFloorPlan.tsx`; other campus demos use schematic maps.
- **`map/mapGeometry.ts`**: conversion between catalog percentage coordinates and the indoor SVG map viewBox.
- **`routing/sampleRoute.ts`**: illustrative indoor route preview; it is not a verified route calculation service.
- **`frontend/src/pages/InterBuildingPage.tsx`**: separate outdoor route selection and explicit unavailable-data state, with an indoor directory handoff.
- **`backend/`**: reserved for a future authorized destination-management API if required.

## Outdoor and indoor route boundary

Outdoor inter-building routes and indoor floor-plan routes are separate systems. The current outdoor page supports location selection and swapping, but displays no route until verified building entrances and pedestrian route geometry are available. It also withholds unsupported distance/time estimates and turn-by-turn instructions. The indoor route line is labeled as a sample. See the [official location source review](reports/official-location-source-review.md).

## Trust and usability boundaries

Campus map, room, and route data requires authorized sourcing and review. The current interface labels synthetic content as sample data. Replace sample indoor routes with graph-based routing only when verified walkable geometry and accessible-route attributes are available. Public kiosk navigation does not request accounts or visitor identity.

## Selected prototype stack

See [decision 0001](decision/0001-technology-and-map-platform.md). The frontend implementation uses React, TypeScript, Vite, and a custom SVG schematic rather than a real map service.

## Open decisions

- Official map/directory sources, permission, accuracy owner, and update cadence.
- Verified entrance points and outdoor route service/data for inter-building guidance.
- Target kiosk hardware, browser, offline behavior, and deployment.
- Whether administrators need a backend and authenticated editing interface.
- Verified indoor route graph, vertical transitions, and accessibility metadata.


# BarkTrack prototype onboarding

1. Read the [project README](../README.md), [overview](project_overview.md), and [architecture](architecture.md).
2. Use `cd frontend; npm install; npm run dev` to start the local kiosk prototype.
3. Review the structured sample directory in `data/campuses.ts`, interface and map renderer in `frontend/src/`, map geometry helpers in `map/`, and route logic in `routing/` before changing navigation behavior.
4. Never present sample indoor floor plans, buildings, room positions, or routes as verified campus information. Outdoor routes remain unavailable until entrances and walking data are verified.
5. Review [the official location source notes](reports/official-location-source-review.md) before modifying real-world location details.
6. Record changes to technical decisions, map sources, data handling, or route behavior in the relevant documentation.

# Decision 0001: prototype technology and map platform

- **Status:** Accepted for prototype
- **Date:** 2026-10-25

## Context

The project needs a working end-to-end demonstration before authorized campus maps and room data are available. The original README proposed several possible technologies without selecting them.

## Decision

Use React, TypeScript, and Vite for the static frontend prototype, with a structured TypeScript campus catalog and custom SVG schematic map. Do not add a backend or database until persistent administration is needed. The schematic maps and sample destinations are demonstrative only. No NU floor plan, room coordinate, or walking route is claimed as real.

## Rationale

This supports campus selection, search, floor selection, map interaction, destination details, and route-preview states without making map-provider or backend assumptions. The map renderer, directory data, and route-preview logic are separate so each can be replaced with authorized information later.

## Revisit when

The team confirms target kiosk hardware, authorized map formats and licenses, offline requirements, accessibility routing data, and whether campus-data editing needs a backend.

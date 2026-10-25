# Project overview

## Purpose

BarkTrack is an independent student project prototype for a touchscreen-friendly campus navigation kiosk. It is intended to help students, faculty, staff, and visitors find rooms and facilities inside a selected campus and move between supported NU Manila buildings.

## Intended users

- Students, including freshmen and transferees.
- Faculty and staff looking for rooms and services.
- Visitors and guests unfamiliar with campus.
- Authorized maintainers who update verified destination and route information.

## Core workflows

### Find a room

1. A visitor selects an indoor campus and searches for a room, building, office, or facility.
2. The kiosk lists campus-scoped destinations with building and floor information.
3. Selecting a destination opens its floor and details panel. NU Main defaults to a random sample 1st-floor plan; each of its seven sample floors has a distinct layout and many clickable rooms.
4. The random Main layout and its highlighted route steps are fictional demo content, not verified room locations or real NU directions.

### Navigate between buildings

1. A visitor selects an origin and destination from NU Main, NU Mendiola, and NU Annex 2 (Mendiola), and can swap them.
2. BarkTrack displays available destination information and may accept an optional sample room inside the destination.
3. Outdoor directions, distances, durations, and turns appear only when entrances and walking route data are verified. Until then, BarkTrack shows an unavailable state without drawing an assumed route.
4. The user can open the destination's clearly labeled sample indoor directory.

## Principles

- Campus information and route guidance must come from authorized, verified sources.
- Distinguish unavailable or unverified information from confirmed destinations.
- Keep outdoor routing separate from indoor floor-plan routing.
- Make touch interactions clear and support accessible route information where verified.
- Keep kiosk sessions free of unnecessary personal data.
- Do not imply official NU endorsement or authorization.

## Scope and status

The current repository contains a working frontend interaction prototype. It is not a production navigation service. See the [official location source review](reports/official-location-source-review.md) for the limits on currently verified route information.



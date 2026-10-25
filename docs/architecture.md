# Architecture notes

## Status

Conceptual. The README suggests possible technologies but none is selected. Record choices in `docs/decision/` before adding framework-specific configuration.

## Planned logical components

- **Kiosk interface:** touch-friendly search, results, destination details, map, and directions.
- **Map presentation:** campus/building/floor layers and highlighted routes where map data supports them.
- **Destination catalog:** verified buildings, rooms, facilities, aliases, and metadata.
- **Optional backend:** destination administration and data delivery if a static or local-first design is insufficient.
- **Optional route graph:** walkable connections between entrances, floors, and destinations, with accessibility attributes where verified.

## Trust and usability boundaries

Campus map, room, and route data needs an authorized source and a review/update process. The interface should identify unavailable data and avoid showing a confident route when the route is incomplete. Do not collect identifiable visitor data unless a clear, approved need exists.

## Open decisions

- Frontend language/framework and kiosk browser/runtime.
- Map format and rendering library.
- Whether the first version needs a backend or database.
- Authoritative campus map and directory sources and update ownership.
- Route graph representation, vertical transitions, and accessible route rules.
- Kiosk hardware, network assumptions, privacy, reset behavior, and deployment.

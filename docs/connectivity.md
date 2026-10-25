# Component connectivity

This is an intended flow, not an implemented API contract. Exact interfaces belong in `docs/contracts/` after implementation choices are agreed.

```text
Touchscreen kiosk
      | search and selection
      v
Kiosk interface ------> Map renderer
      |                      ^
      +---- destination and route data
                             |
                 Verified campus map/catalog
                             ^
                             |
          Optional admin service and storage
```

A kiosk should be able to present a clean, usable state after each visitor session. If a backend is introduced, the client should use a documented API rather than connect directly to a database. Treat map and route data as versioned content with provenance and review status.

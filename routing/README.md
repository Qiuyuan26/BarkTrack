# Inter-building routing

Outdoor inter-building navigation is a separate system from indoor sample route guidance. Its selection and unavailable states live in `frontend/src/pages/InterBuildingPage.tsx`. Do not draw an outdoor route until exact entrances and pedestrian route data are verified. Keep routing-service integration and outdoor route data separate from `data/campuses.ts` and indoor floor-map geometry.

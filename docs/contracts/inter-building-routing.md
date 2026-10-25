# Inter-building route contract (proposed)

## Status

UI flow implemented; external routing contract is not configured and no route is currently calculable in BarkTrack.

## Required input

- Origin building/campus ID and verified entrance ID.
- Destination building/campus ID and verified entrance ID.
- Travel mode and accessibility constraints when supported.
- Optional destination room ID for a separate indoor leg.

## Required output when a route exists

- Route geometry, ordered outdoor instructions, source/provider, retrieved/verified time, and any supported distance/duration estimates.
- Explicit accessibility and coverage limitations.
- A distinct handoff to the destination's indoor directory/route.

## Unavailable behavior

If either entrance or a walking route cannot be verified, return an unavailable result. Do not interpolate between markers, draw a placeholder route as fact, or estimate distance/time. An optional indoor destination remains visibly sample content until verified.

## Security and accuracy

Store no visitor identity for basic route requests. Follow routing-provider terms and NU data authorization. Provide a review/update process for closures and stale route data.

# Official location source review

- **Reviewed:** 2026-10-25
- **Purpose:** Decide which real-world location facts BarkTrack can safely display and whether inter-building routes can be enabled.

## Sources reviewed

- [NU Manila contact page](https://www.nu.edu.ph/nu-manila/contact-us)
- [NU contact page](https://www.nu.edu.ph/contact-us)

## Findings

NU's Manila contact page gives the general address `551 M.F. Jhocson St., Sampaloc, Manila, Philippines 1008` and lists map links for Main Building, Annex 1 Building, and Annex 2 Mendiola. The NU contact page separately names NU Manila Main Building, Annex 1, and Annex 2.

The reviewed public pages do not provide a verified walking network between these buildings, a verified entrance for each origin/destination, route distance/time, turn-by-turn instructions, accessible path attributes, or a separate verified address for the project's `NU Mendiola` selector. The Main campus address is therefore displayed only as a general official address, not as a confirmed route entrance. Other specific addresses and all route details remain unavailable in the prototype.

## Implementation decision

The inter-building UI supports choosing and swapping NU Main, NU Mendiola, and NU Annex 2 (Mendiola). It does not draw a line or invent street names, distance, duration, or steps. It shows an unavailable-route state and links to NU's official directory. Users can open the destination's clearly labeled sample indoor directory, optionally with a sample room preselected.

Before enabling outdoor directions, obtain authorized entrance points and verified route geometry or integrate a suitable routing service with validated building endpoints. Review accessibility, closures, licensing, and update ownership.

## Main Building floor plan

The reviewed [NU Manila contact page](https://www.nu.edu.ph/nu-manila/contact-us) exposes public location/map links for buildings, but no indoor floor-plan asset. The repository's data/maps folder also contained no image, SVG, or PDF floor plan. BarkTrack now uses an explicitly random interactive sample plan for the NU Main demo view. It is not the real Main Building layout. A verified interactive Main Building floor plan still needs an authorized NU-provided plan and checked room positions.


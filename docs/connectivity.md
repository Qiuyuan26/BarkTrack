# Component connectivity

```text
Kiosk visitor
   | selects origin + destination
   v
Inter-building planner ----> verified outdoor routing data/service (not configured)
   | route available                   | no route data
   v                                   v
outdoor map + directions        explicit unavailable state
   |
   | arrival / choose room
   v
campus indoor directory --> indoor floor-plan renderer --> indoor route preview
```

Outdoor and indoor routing are separate systems. A successful outdoor result must use verified building entrances and pedestrian route data. If those are missing, show an unavailable state and suppress route geometry, distance, duration, and turn instructions. The user may still open a clearly labeled sample indoor directory for the destination building. See [the source review](reports/official-location-source-review.md).

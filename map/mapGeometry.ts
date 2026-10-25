export type MapPoint = { x: number; y: number }

/** Convert percentage coordinates used by the catalog to the schematic SVG viewBox. */
export function destinationToSvgPoint(point: MapPoint): MapPoint {
  return { x: point.x * 10, y: point.y * 7 }
}

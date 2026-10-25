import { destinationToSvgPoint, type MapPoint } from '../map/mapGeometry'
import { floorPlansForCampus } from '../data/maps/floorPlans'
import type { SampleFloorPlan } from '../data/maps/sampleFloorPlanFactory'

export type RoutePoint = MapPoint

const sampleStartingPoints: Record<string, RoutePoint> = {
  'Sample Main Entrance': { x: 12.5, y: 83.5 },
  'Sample Information Desk': { x: 31, y: 61.5 },
  'Sample Lobby': { x: 68, y: 28 },
}

/** Schematic route preview only; never use as directions inside a real building. */
export function sampleRoutePath(destination: RoutePoint, startName: string): string {
  const source = destinationToSvgPoint(sampleStartPointPosition(startName))
  const target = destinationToSvgPoint(destination)
  const bendX = (source.x + target.x) / 2
  return `M ${source.x} ${source.y} C ${bendX} ${source.y}, ${bendX} ${target.y}, ${target.x} ${target.y}`
}

export function sampleStartPointPosition(startName: string): RoutePoint {
  return sampleStartingPoints[startName] ?? sampleStartingPoints['Sample Main Entrance']
}

export function sampleFloorStartPoint(plan: SampleFloorPlan, startName: string): MapPoint {
  if (startName === 'Sample Lobby') return { x: 600, y: 370 }
  if (startName === 'Sample Information Desk') return { x: 220, y: 370 }
  return plan.entry
}

/** Draw an illustrative corridor path for the selected campus and its distinct floor layout. */
export function sampleCampusFloorRoute(campusId: string, floor: string, destinationId: string, startName: string): string | null {
  const plan = floorPlansForCampus(campusId).find((item) => item.floor === floor)
  const room = plan?.rooms.find((item) => item.id === destinationId)
  if (!plan || !room) return null
  const source = sampleFloorStartPoint(plan, startName)
  const destination = { x: room.x + room.width / 2, y: room.y + room.height / 2 }
  const center = { x: 600, y: 370 }
  const points: MapPoint[] = [source]
  if (plan.layout === 'spine') {
    points.push({ x: 600, y: source.y }, { x: 600, y: destination.y }, destination)
  } else if (plan.layout === 'gallery') {
    const hallY = destination.y < 255 ? 260 : destination.y > 485 ? 465 : 370
    points.push({ x: source.x, y: hallY }, { x: destination.x, y: hallY }, destination)
  } else if (plan.layout === 'atrium' || plan.layout === 'commons') {
    points.push({ x: center.x, y: source.y }, center, { x: destination.x, y: center.y }, destination)
  } else if (plan.layout === 'offset') {
    const hallY = source.y < destination.y ? 210 : 535
    points.push({ x: source.x, y: hallY }, { x: destination.x, y: hallY }, destination)
  } else if (plan.layout === 'studio') {
    points.push({ x: source.x, y: 370 }, { x: destination.x, y: 370 }, destination)
  } else {
    points.push({ x: source.x, y: 370 }, { x: destination.x, y: 370 }, destination)
  }
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

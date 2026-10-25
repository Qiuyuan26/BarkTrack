import type { Destination } from '../campuses'

export type FloorLayout = 'grid' | 'spine' | 'gallery' | 'atrium' | 'studio' | 'offset' | 'commons'
export type SampleFloorRoom = { id: string; x: number; y: number; width: number; height: number; destination: Destination }
export type FloorSeed = { floor: string; short: string; prefix: string; layout: FloorLayout; columns: number; rows: number; omit?: number[]; names: string[] }
export type SampleFloorPlan = { campusId: string; buildingName: string; floor: string; layout: FloorLayout; columns: number; rows: number; omit?: number[]; entry: { x: number; y: number }; rooms: SampleFloorRoom[] }

function makeSlots(columns: number, rows: number, omit: number[], layout: FloorLayout) {
  const left = 72, top = 82, totalWidth = 1056, totalHeight = 558
  const gapX = layout === 'spine' || layout === 'offset' ? 24 : 14
  const gapY = layout === 'gallery' ? 22 : 14
  const width = (totalWidth - gapX * (columns - 1)) / columns
  const height = (totalHeight - gapY * (rows - 1)) / rows
  return Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns, row = Math.floor(index / columns)
    const stagger = layout === 'offset' && row % 2 === 1 ? 28 : 0
    return { x: left + column * (width + gapX) + stagger, y: top + row * (height + gapY), width: width - stagger, height }
  }).filter((_, index) => !omit.includes(index))
}

function categoryFor(name: string): string {
  const text = name.toLowerCase()
  if (text.includes('restroom')) return 'Restroom'
  if (text.includes('elevator')) return 'Elevator'
  if (text.includes('lab')) return 'Laboratory'
  if (text.includes('office') || text.includes('registrar') || text.includes('security')) return 'Office'
  if (text.includes('library')) return 'Library'
  if (text.includes('service') || text.includes('clinic') || text.includes('information')) return 'Student services'
  if (text.includes('lounge') || text.includes('cafe') || text.includes('commons')) return 'Facility'
  if (text.includes('stairs') || text.includes('stairwell')) return 'Stairwell'
  return 'Classroom'
}

export function buildSampleFloorPlans(campusId: string, buildingName: string, seeds: FloorSeed[]): SampleFloorPlan[] {
  return seeds.map((seed) => {
    const slots = makeSlots(seed.columns, seed.rows, seed.omit ?? [], seed.layout)
    const rooms = seed.names.slice(0, slots.length).map((rawName, index) => {
      const slot = slots[index]
      const number = `${seed.prefix}${String(index + 1).padStart(2, '0')}`
      const name = rawName.startsWith('Sample ') ? rawName : `Sample ${rawName}`
      const destination: Destination = {
        id: `${campusId}-${seed.short.toLowerCase()}-${number}`,
        campusId,
        name,
        category: categoryFor(rawName),
        building: `Sample ${buildingName}`,
        floor: seed.floor,
        detail: `Fictional ${rawName.toLowerCase()} entry on the random ${seed.floor} demo plan.`,
        x: ((slot.x + slot.width / 2) / 1200) * 100,
        y: ((slot.y + slot.height / 2) / 740) * 100,
        verified: false,
      }
      return { id: destination.id, ...slot, destination }
    })
    const entry = campusId === 'annex1' ? { x: 82, y: 370 } : campusId === 'annex2' ? { x: 1118, y: 370 } : { x: 600, y: 650 }
    return { campusId, buildingName, floor: seed.floor, layout: seed.layout, columns: seed.columns, rows: seed.rows, omit: seed.omit, entry, rooms }
  })
}

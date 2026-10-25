import { sampleMainDestinations } from './maps/nu-main/sampleFloorPlan'
import { sampleAnnex1Destinations } from './maps/nu-annex1/sampleFloorPlan'
import { sampleAnnex2Destinations } from './maps/nu-annex2/sampleFloorPlan'

export type Campus = {
  id: string
  name: string
  subtitle: string
  description: string
  tint: string
  floors: string[]
}

export type Destination = {
  id: string
  campusId: string
  name: string
  category: string
  building: string
  floor: string
  detail: string
  x: number
  y: number
  verified: false
}

export const campuses: Campus[] = [
  { id: 'main', name: 'NU Main', subtitle: 'Manila', description: 'Explore the Main campus map and destination directory.', tint: 'blue', floors: ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'] },
  { id: 'mendiola', name: 'NU Mendiola', subtitle: 'Mendiola', description: 'Explore the Mendiola campus map and destination directory.', tint: 'gold', floors: ['1st Floor', '2nd Floor', '3rd Floor'] },
  { id: 'annex1', name: 'NU Annex 1', subtitle: 'Annex 1', description: 'Explore the Annex 1 sample floor directory.', tint: 'green', floors: ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'] },
  { id: 'annex2', name: 'NU Annex 2', subtitle: 'Mendiola', description: 'Explore the Annex 2 sample floor directory.', tint: 'gold', floors: ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'] },
]

// Entire directory below is invented prototype content, not NU room or route data.
const sampleDestinations: Omit<Destination, 'campusId'>[] = [
  { id: 'room-201', name: 'Sample Room 201', category: 'Classroom', building: 'Sample Building A', floor: '2nd Floor', detail: 'Illustrative classroom entry for interface demonstration.', x: 56, y: 38, verified: false },
  { id: 'computer-lab', name: 'Sample Computer Laboratory', category: 'Laboratory', building: 'Sample Building A', floor: '2nd Floor', detail: 'Illustrative laboratory entry for interface demonstration.', x: 70, y: 58, verified: false },
  { id: 'library', name: 'Sample Library', category: 'Library', building: 'Sample Building B', floor: '1st Floor', detail: 'Illustrative facility entry for interface demonstration.', x: 32, y: 62, verified: false },
  { id: 'registrar', name: 'Sample Registrar Office', category: 'Student services', building: 'Sample Building B', floor: '1st Floor', detail: 'Illustrative office entry for interface demonstration.', x: 41, y: 42, verified: false },
  { id: 'restroom', name: 'Sample Restroom', category: 'Restroom', building: 'Sample Building A', floor: '1st Floor', detail: 'Illustrative facility entry for interface demonstration.', x: 76, y: 38, verified: false },
  { id: 'elevator', name: 'Sample Elevator', category: 'Elevator', building: 'Sample Building A', floor: '1st Floor', detail: 'Illustrative navigation point for interface demonstration.', x: 63, y: 72, verified: false },
  { id: 'office-305', name: 'Sample Faculty Office 305', category: 'Office', building: 'Sample Building C', floor: '3rd Floor', detail: 'Illustrative office entry for interface demonstration.', x: 51, y: 50, verified: false },
]

export function destinationsForCampus(campusId: string): Destination[] {
  if (campusId === 'main') return sampleMainDestinations
  if (campusId === 'annex1') return sampleAnnex1Destinations
  if (campusId === 'annex2') return sampleAnnex2Destinations
  const campus = campuses.find((item) => item.id === campusId)
  if (!campus) return []
  const campusLabel = campus.name.replace('NU ', '')
  return sampleDestinations.map((destination) => ({
    ...destination,
    id: `${campusId}-${destination.id}`,
    campusId,
    building: destination.building.replace('Sample Building', `Sample ${campusLabel} Building`),
  }))
}


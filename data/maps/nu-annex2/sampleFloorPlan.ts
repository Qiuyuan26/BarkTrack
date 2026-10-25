import { buildSampleFloorPlans, type FloorSeed } from '../sampleFloorPlanFactory'

const seeds: FloorSeed[] = [
  { floor: '1st Floor', short: '1F', prefix: '1', layout: 'spine', columns: 3, rows: 6, names: ['Annex 2 Lobby','Information Desk','Student Services','Room 104','Room 105','Faculty Office','Computer Lab','Room 108','Registrar Desk','Room 110','Restroom','Elevator','Clinic','Room 114','Study Room','Stairwell'] },
  { floor: '2nd Floor', short: '2F', prefix: '2', layout: 'commons', columns: 4, rows: 4, omit: [5,6], names: ['Room 201','Room 202','Business Lab','Room 204','Study Commons','Faculty Office','Room 207','Seminar Room','Room 209','Project Space','Restroom','Elevator','Room 213','Meeting Room','Room 215','Stairwell'] },
  { floor: '3rd Floor', short: '3F', prefix: '3', layout: 'grid', columns: 4, rows: 4, names: ['Room 301','Room 302','Faculty Office','Room 304','Computer Lab','Room 306','Room 307','Study Room','Seminar Room','Room 310','Restroom','Elevator','Room 313','Collaboration Room','Room 315','Stairwell'] },
  { floor: '4th Floor', short: '4F', prefix: '4', layout: 'gallery', columns: 5, rows: 3, names: ['Room 401','Room 402','Faculty Office','Room 404','Lecture Room','Room 406','Design Lab','Room 408','Room 409','Project Lab','Restroom','Elevator','Room 413','Study Lounge','Stairwell'] },
  { floor: '5th Floor', short: '5F', prefix: '5', layout: 'offset', columns: 3, rows: 6, names: ['Room 501','Room 502','Faculty Office','Room 504','Computer Lab','Room 506','Study Room','Room 508','Seminar Room','Room 510','Restroom','Elevator','Room 513','Meeting Room','Room 515','Stairwell'] },
  { floor: '6th Floor', short: '6F', prefix: '6', layout: 'studio', columns: 6, rows: 3, names: ['Room 601','Media Lab','Room 603','Faculty Office','Room 605','Computer Lab','Room 607','Room 608','Project Studio','Room 610','Restroom','Elevator','Room 613','Workshop','Room 615','Stairwell','Room 617','Study Room'] },
  { floor: '7th Floor', short: '7F', prefix: '7', layout: 'atrium', columns: 4, rows: 4, omit: [5,6,9,10], names: ['Room 701','Room 702','Event Room','Room 704','Faculty Office','Room 706','Business Lab','Room 708','Room 709','Presentation Room','Restroom','Elevator','Room 713','Study Lounge','Room 715','Stairwell'] },
]

export const sampleAnnex2FloorPlans = buildSampleFloorPlans('annex2', 'NU Annex 2 Building', seeds)
export const sampleAnnex2Destinations = sampleAnnex2FloorPlans.flatMap((plan) => plan.rooms.map((room) => room.destination))

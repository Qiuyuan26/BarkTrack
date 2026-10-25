import { buildSampleFloorPlans, type FloorSeed } from '../sampleFloorPlanFactory'

const seeds: FloorSeed[] = [
  { floor: '1st Floor', short: '1F', prefix: '1', layout: 'gallery', columns: 5, rows: 3, names: ['Annex 1 Lobby','Welcome Desk','Student Services','Room 107','Room 108','Reading Room','Registrar Counter','Faculty Office','Room 111','Computer Lab','Restroom','Elevator','Security Desk','Cafe','Stairwell'] },
  { floor: '2nd Floor', short: '2F', prefix: '2', layout: 'grid', columns: 4, rows: 4, names: ['Room 201','Room 202','Language Lab','Faculty Office 204','Room 205','Collaboration Room','Computer Lab','Room 208','Seminar Room','Room 210','Restroom','Elevator','Room 213','Study Room','Meeting Room','Stairwell'] },
  { floor: '3rd Floor', short: '3F', prefix: '3', layout: 'offset', columns: 3, rows: 6, names: ['Room 301','Faculty Office','Room 303','Design Lab','Room 305','Room 306','Study Lounge','Room 308','Computer Lab','Room 310','Restroom','Elevator','Room 313','Project Room','Room 315','Stairwell'] },
  { floor: '4th Floor', short: '4F', prefix: '4', layout: 'studio', columns: 6, rows: 3, names: ['Room 401','Digital Studio','Room 403','Media Lab','Room 405','Faculty Office','Room 407','Seminar Room','Room 409','Project Lab','Room 411','Restroom','Elevator','Room 414','Collaboration Room','Stairwell','Room 417','Study Room'] },
  { floor: '5th Floor', short: '5F', prefix: '5', layout: 'spine', columns: 3, rows: 6, names: ['Room 501','Lecture Room','Room 503','Faculty Office','Room 505','Computer Lab','Room 507','Research Lab','Room 509','Study Room','Restroom','Elevator','Room 513','Meeting Room','Room 515','Stairwell'] },
  { floor: '6th Floor', short: '6F', prefix: '6', layout: 'atrium', columns: 4, rows: 4, omit: [5,6,9,10], names: ['Room 601','Room 602','Research Room','Faculty Office','Room 605','Room 606','Innovation Lab','Room 608','Room 609','Media Room','Room 611','Restroom','Elevator','Room 614','Project Studio','Stairwell'] },
  { floor: '7th Floor', short: '7F', prefix: '7', layout: 'commons', columns: 4, rows: 4, omit: [5,6], names: ['Room 701','Room 702','Event Room','Room 704','Annex 1 Commons','Room 706','Faculty Office','Room 708','Room 709','Presentation Room','Room 711','Restroom','Elevator','Room 714','Workshop','Stairwell'] },
]

export const sampleAnnex1FloorPlans = buildSampleFloorPlans('annex1', 'NU Annex 1 Building', seeds)
export const sampleAnnex1Destinations = sampleAnnex1FloorPlans.flatMap((plan) => plan.rooms.map((room) => room.destination))

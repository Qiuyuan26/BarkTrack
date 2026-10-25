import { buildSampleFloorPlans, type FloorSeed } from '../sampleFloorPlanFactory'

const seeds: FloorSeed[] = [
  { floor: '1st Floor', short: '1F', prefix: '1', layout: 'grid', columns: 4, rows: 4, names: ['Main Lobby','Information Desk','Library','Registrar Office','Student Services','Campus Clinic','Room 107','Computer Lab 108','Study Room','Faculty Office','Restroom','Elevator','Security Desk','Cafe','Room 115','Stairwell'] },
  { floor: '2nd Floor', short: '2F', prefix: '2', layout: 'spine', columns: 3, rows: 6, names: ['Lecture Hall 201','Room 202','Room 203','Computer Lab 204','Faculty Office 205','Room 206','Study Room 207','Science Lab 208','Room 209','Meeting Room 210','Restroom','Elevator','Room 213','Room 214','Project Room 215','Stairwell'] },
  { floor: '3rd Floor', short: '3F', prefix: '3', layout: 'gallery', columns: 5, rows: 3, names: ['Room 301','Room 302','Design Studio 303','Faculty Office 304','Office 305','Room 306','Computer Lab 307','Room 308','Seminar Room 309','Room 310','Restroom','Elevator','Room 313','Study Lounge','Room 315'] },
  { floor: '4th Floor', short: '4F', prefix: '4', layout: 'atrium', columns: 4, rows: 4, omit: [5,6,9,10], names: ['Room 401','Room 402','Room 403','Room 404','Faculty Office 405','Room 406','Media Lab 407','Room 408','Room 409','Research Lab 410','Room 411','Restroom','Elevator','Room 414','Project Studio 415','Stairwell'] },
  { floor: '5th Floor', short: '5F', prefix: '5', layout: 'studio', columns: 6, rows: 3, names: ['Room 501','Computer Lab 502','Room 503','Maker Space 504','Room 505','Faculty Office 506','Room 507','Seminar Room 508','Room 509','Media Lab 510','Room 511','Restroom','Elevator','Room 514','Studio 515','Stairwell','Room 517','Study Room 518'] },
  { floor: '6th Floor', short: '6F', prefix: '6', layout: 'offset', columns: 3, rows: 6, names: ['Room 601','Room 602','Faculty Office 603','Room 604','Learning Lab 605','Room 606','Room 607','Seminar Room 608','Room 609','Room 610','Restroom','Elevator','Room 613','Room 614','Collaboration Room 615','Stairwell'] },
  { floor: '7th Floor', short: '7F', prefix: '7', layout: 'commons', columns: 4, rows: 4, omit: [5,6], names: ['Room 701','Room 702','Event Hall 703','Room 704','Study Lounge 705','Room 706','Faculty Office 707','Room 708','Room 709','Presentation Room 710','Room 711','Restroom','Elevator','Room 714','Project Lab 715','Stairwell'] },
]

export const sampleMainFloorPlans = buildSampleFloorPlans('main', 'NU Main Building', seeds)
export const sampleMainDestinations = sampleMainFloorPlans.flatMap((plan) => plan.rooms.map((room) => room.destination))

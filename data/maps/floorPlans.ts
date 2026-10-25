import { sampleMainFloorPlans } from './nu-main/sampleFloorPlan'
import { sampleAnnex1FloorPlans } from './nu-annex1/sampleFloorPlan'
import { sampleAnnex2FloorPlans } from './nu-annex2/sampleFloorPlan'
import type { SampleFloorPlan } from './sampleFloorPlanFactory'

const plansByCampus: Record<string, SampleFloorPlan[]> = {
  main: sampleMainFloorPlans,
  annex1: sampleAnnex1FloorPlans,
  annex2: sampleAnnex2FloorPlans,
}

export function floorPlansForCampus(campusId: string): SampleFloorPlan[] {
  return plansByCampus[campusId] ?? []
}

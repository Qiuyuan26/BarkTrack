import type { Campus, Destination } from '../../../data/campuses'
import { floorPlansForCampus } from '../../../data/maps/floorPlans'
import { sampleCampusFloorRoute, sampleFloorStartPoint } from '../../../routing/sampleRoute'

type Point = { x: number; y: number }
type Props = {
  campus: Campus
  floor: string
  destinations: Destination[]
  selected: Destination | null
  start: string
  showDirections: boolean
  zoom: number
  offset: Point
  onSelect: (destination: Destination) => void
}

export default function CampusFloorPlan({ campus, floor, destinations, selected, start, showDirections, zoom, offset, onSelect }: Props) {
  const plan = floorPlansForCampus(campus.id).find((item) => item.floor === floor)
  const destinationIds = new Set(destinations.map((item) => item.id))
  const rooms = plan?.rooms.filter((room) => destinationIds.has(room.id)) ?? []
  const startPoint = plan ? sampleFloorStartPoint(plan, start) : { x: 600, y: 650 }
  const routePath = selected && showDirections ? sampleCampusFloorRoute(campus.id, floor, selected.id, start) : null

  return <svg className="main-floorplan-svg" viewBox="0 0 1200 740" role="group" aria-label={`Random sample ${campus.name}, ${floor} floor plan; fictional layout`}>
    <rect width="1200" height="740" fill="#e8e6e1"/>
    <g transform={`translate(${offset.x} ${offset.y}) translate(600 370) scale(${zoom}) translate(-600 -370)`}>
      <rect x="35" y="35" width="1130" height="670" fill="#f0efeb" stroke="#82847f" strokeWidth="2"/>
      <text x="62" y="62" className="plan-small-note">BARKTRACK · {floor.toUpperCase()} · RANDOM SAMPLE LAYOUT</text>
      <rect x="63" y="70" width="1074" height="590" fill="#fffefa" stroke="#40494c" strokeWidth="8"/>
      <LayoutFeatures layout={plan?.layout ?? 'grid'}/>
      <g className="plan-furniture">
        {rooms.map((room) => <g key={`furniture-${room.id}`}>
          <rect x={room.x + 12} y={room.y + 44} width={Math.max(34, room.width - 24)} height={Math.min(22, Math.max(12, room.height * .18))} rx="3"/>
          <path d={`M${room.x + 20} ${room.y + 49}v12m28-12v12m28-12v12m28-12v12`}/>
        </g>)}
      </g>
      {rooms.map((room) => {
        const active = selected?.id === room.id
        const label = room.destination.name.replace(/^Sample /, '')
        return <g key={room.id} className={`plan-room-hit ${active ? 'plan-room-active' : ''}`} role="button" tabIndex={0} aria-label={`Select ${room.destination.name}, ${floor}`} onClick={() => onSelect(room.destination)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(room.destination) }}>
          <rect x={room.x} y={room.y} width={room.width} height={room.height} rx="3"/>
          <text x={room.x + 10} y={room.y + 24} textLength={Math.min(room.width - 18, label.length * 6.5)} lengthAdjust="spacingAndGlyphs">{label.toUpperCase()}</text>
          <text x={room.x + 10} y={room.y + 39} className="plan-room-subtitle">{room.destination.category.toUpperCase()} · SAMPLE</text>
        </g>
      })}
      {routePath && selected && <g className="plan-route-overlay"><path d={routePath}/><circle cx={startPoint.x} cy={startPoint.y} r="11"/><text x={startPoint.x + 14} y={startPoint.y + 4}>START</text><circle className="plan-route-end" cx={(selected.x / 100) * 1200} cy={(selected.y / 100) * 740} r="9"/></g>}
      <g className="plan-entry-mark"><circle cx={startPoint.x} cy={startPoint.y} r="5"/><text x={startPoint.x - 36} y={startPoint.y + 24}>SAMPLE ENTRY</text></g>
    </g>
  </svg>
}

function LayoutFeatures({ layout }: { layout: string }) {
  if (layout === 'spine') return <g className="plan-corridors"><rect x="560" y="75" width="80" height="580"/><rect x="82" y="355" width="1036" height="42"/><text x="581" y="330" transform="rotate(-90 581 330)">SAMPLE CENTRAL SPINE</text></g>
  if (layout === 'gallery') return <g className="plan-corridors"><rect x="75" y="255" width="1050" height="35"/><rect x="75" y="450" width="1050" height="35"/><text x="500" y="278">GALLERY HALL</text><text x="500" y="473">GALLERY HALL</text></g>
  if (layout === 'atrium') return <g className="plan-corridors"><rect x="425" y="246" width="350" height="248" rx="8"/><rect x="445" y="266" width="310" height="208" rx="5"/><text x="540" y="375">SAMPLE ATRIUM</text><text x="540" y="394">OPEN TO BELOW</text></g>
  if (layout === 'studio') return <g className="plan-corridors"><rect x="75" y="352" width="1050" height="38"/><rect x="392" y="75" width="35" height="580"/><rect x="768" y="75" width="35" height="580"/><text x="520" y="376">STUDIO GALLERY</text></g>
  if (layout === 'offset') return <g className="plan-corridors"><path d="M75 190h1050v32H75zM75 365h1050v32H75zM75 540h1050v32H75z"/><path d="M220 190v175m500-175v175m-300 32v175m500-175v175"/><text x="505" y="211">SAMPLE CONNECTOR</text><text x="505" y="386">SAMPLE CONNECTOR</text></g>
  if (layout === 'commons') return <g className="plan-corridors"><rect x="410" y="245" width="380" height="250" rx="10"/><rect x="435" y="270" width="330" height="200" rx="8"/><text x="520" y="370">7F COMMONS</text><text x="510" y="391">SAMPLE SHARED SPACE</text><path d="M600 75v160m0 270v180M75 370h310m430 0h310"/></g>
  return <g className="plan-corridors"><rect x="75" y="354" width="1050" height="36"/><rect x="582" y="75" width="36" height="580"/><text x="500" y="377">SAMPLE CENTRAL HALL</text></g>
}

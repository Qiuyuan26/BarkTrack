import { useRef, useState, type PointerEvent } from 'react'
import { ChevronDown, MapPin, Minus, Plus, RotateCcw, Signpost } from 'lucide-react'
import type { Campus, Destination } from '../../../data/campuses'
import { sampleRoutePath, sampleStartPointPosition } from '../../../routing/sampleRoute'
import CampusFloorPlan from './CampusFloorPlan'

type Point = { x: number; y: number }
type Props = {
  campus: Campus
  destinations: Destination[]
  buildings: string[]
  selected: Destination | null
  start: string
  floor: string
  setFloor: (floor: string) => void
  showDirections: boolean
  zoom: number
  setZoom: (update: (zoom: number) => number) => void
  offset: Point
  setOffset: (point: Point) => void
  onDestination: (item: Destination) => void
  onBuilding: (name: string) => void
  onCampusList: () => void
}

export default function CampusMap(props: Props) {
  const { campus, destinations, buildings, selected, start, floor, setFloor, showDirections, zoom, setZoom, offset, setOffset, onDestination, onBuilding, onCampusList } = props
  const [dragging, setDragging] = useState(false)
  const dragOrigin = useRef<Point>({ x: 0, y: 0 })
  const viewOrigin = useRef<Point>({ x: 0, y: 0 })
  const planAvailable = ['main', 'annex1', 'annex2'].includes(campus.id)

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button,[role="button"]')) return
    setDragging(true)
    dragOrigin.current = { x: event.clientX, y: event.clientY }
    viewOrigin.current = offset
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    setOffset({ x: viewOrigin.current.x + (event.clientX - dragOrigin.current.x) / 2, y: viewOrigin.current.y + (event.clientY - dragOrigin.current.y) / 2 })
  }
  function resetView() { setZoom(() => 1); setOffset({ x: 0, y: 0 }) }

  return <section className="map-stage" aria-label={`${campus.name} interactive sample floor plan`}>
    <div className="map-stage-top">
      <div className="map-breadcrumb"><button onClick={onCampusList}>Campuses</button><span>/</span><b>{campus.name}</b></div>
      <span className="map-sample-badge"><span/> {planAvailable ? 'RANDOM SAMPLE FLOOR PLAN' : 'SAMPLE MAP'}</span>
    </div>
    <div className="map-canvas" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)} style={{ cursor: dragging ? 'grabbing' : 'grab' }}>
      {planAvailable
        ? <CampusFloorPlan campus={campus} floor={floor} destinations={destinations} selected={selected} start={start} showDirections={showDirections} zoom={zoom} offset={offset} onSelect={onDestination}/>
        : <SampleCampusMap campus={campus} floor={floor} destinations={destinations} buildings={buildings} selected={selected} start={start} showDirections={showDirections} zoom={zoom} offset={offset} onDestination={onDestination} onBuilding={onBuilding}/>}
      <div className="map-attribution"><span className="attribution-pip"/> {planAvailable ? 'Fictional layout · not an NU floor plan' : 'Schematic preview · not to scale · not verified'}</div>
      <div className="map-controls"><button className="icon-button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.8, value + .15))}><Plus size={18}/></button><span>{Math.round(zoom * 100)}%</span><button className="icon-button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(.8, value - .15))}><Minus size={18}/></button><i/><button className="icon-button" aria-label="Reset map view" onClick={resetView}><RotateCcw size={16}/></button></div>
      <div className="map-legend"><b>MAP KEY</b><span><i className="legend-dot"/> Destination</span>{!planAvailable && <span><i className="legend-line"/> Sample route</span>}</div>
      <label className="floor-picker"><span>SAMPLE FLOOR</span><select aria-label="Select sample floor" value={floor} onChange={(event) => setFloor(event.target.value)}>{campus.floors.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label>
    </div>
  </section>
}

function SampleCampusMap({ campus, floor, destinations, buildings, selected, start, showDirections, zoom, offset, onDestination, onBuilding }: {
  campus: Campus; floor: string; destinations: Destination[]; buildings: string[]; selected: Destination | null; start: string; showDirections: boolean; zoom: number; offset: Point; onDestination: (item: Destination) => void; onBuilding: (name: string) => void
}) {
  const visibleMarkers = destinations.filter((item) => item.floor === floor)
  return <><div className="map-grid-bg"/><div className="map-drawing" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}>
    <svg className="map-paths" viewBox="0 0 1000 700" aria-label={`Illustrative schematic map for ${campus.name}`}>
      <path className="path-main" d="M85 585 C185 540 200 465 308 430 S436 376 486 300 620 250 683 195 809 160 922 88"/><path className="path-branch" d="M125 167 C210 212 260 265 348 268 S488 210 570 235 731 333 879 353"/><path className="path-branch" d="M348 268 C366 341 412 400 486 432 S610 493 630 590"/><path className="path-branch" d="M682 195 C704 267 697 301 741 350 S800 435 810 532"/><path className="path-side" d="M145 580 L306 624 L486 600 L630 590 L810 532 L918 556"/><path className="path-side" d="M125 167 L183 80 L362 68 L519 94 L684 195"/><path className="route-line" d={sampleRoutePath(selected ?? { x: 0, y: 0 }, start)} style={{ opacity: showDirections ? 1 : 0 }}/>
    </svg>
    {buildings[0] && <BuildingBlock className="map-block-a" label="A" name={buildings[0]} onClick={() => onBuilding(buildings[0])}/>}{buildings[1] && <BuildingBlock className="map-block-b" label="B" name={buildings[1]} onClick={() => onBuilding(buildings[1])}/>}{buildings[2] && <BuildingBlock className="map-block-c" label="C" name={buildings[2]} onClick={() => onBuilding(buildings[2])}/>}
    {visibleMarkers.map((item) => <button key={item.id} className={`destination-marker ${selected?.id === item.id ? 'marker-selected' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => onDestination(item)} aria-label={`Select ${item.name}`}><span><MapPin size={15}/></span></button>)}{selected && selected.floor === floor && <div className="destination-label" style={{ left: `${selected.x}%`, top: `${selected.y - 7}%` }}><b>{selected.name}</b><small>{selected.building} · {selected.floor}</small></div>}{showDirections && <div className="start-marker" style={{ left: `${sampleStartPointPosition(start).x}%`, top: `${sampleStartPointPosition(start).y}%` }}><span><Signpost size={15}/></span><b>START</b></div>}
  </div></>
}

function BuildingBlock({ className, label, name, onClick }: { className: string; label: string; name: string; onClick: () => void }) {
  return <div className={`map-block ${className}`} role="button" tabIndex={0} onClick={onClick} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onClick() }}><span className="block-number">{label}</span><div><b>{name}</b><small>Illustrative footprint</small></div></div>
}


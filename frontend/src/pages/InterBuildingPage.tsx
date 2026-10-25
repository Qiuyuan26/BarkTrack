import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeInfo, Building2, ChevronDown, Footprints, MapPin, Route, Shuffle } from 'lucide-react'
import { campuses, destinationsForCampus, type Destination } from '../../../data/campuses'

type BuildingOption = {
  id: string
  name: string
  indoorCampusId: string
  address: string
  addressStatus: string
}

const officialLocationSource = 'https://www.nu.edu.ph/nu-manila/contact-us'
const buildings: BuildingOption[] = [
  { id: 'main', name: 'NU Main', indoorCampusId: 'main', address: '551 M.F. Jhocson St., Sampaloc, Manila, Philippines 1008', addressStatus: 'Address listed by NU' },
  { id: 'mendiola', name: 'NU Mendiola', indoorCampusId: 'mendiola', address: 'Information not available', addressStatus: 'Specific entrance not verified' },
  { id: 'annex2', name: 'NU Annex 2 (Mendiola)', indoorCampusId: 'annex2', address: 'Information not available', addressStatus: 'Specific entrance not verified' },
]

type Props = {
  onHome: () => void
  onFindRoom: (campusId: string, destinationId?: string) => void
}

export default function InterBuildingPage({ onHome, onFindRoom }: Props) {
  const [originId, setOriginId] = useState('main')
  const [destinationId, setDestinationId] = useState('annex2')
  const [roomId, setRoomId] = useState('')
  const [phase, setPhase] = useState<'select' | 'route'>('select')
  const origin = buildings.find((item) => item.id === originId) ?? buildings[0]
  const destination = buildings.find((item) => item.id === destinationId) ?? buildings[2]
  const sampleRooms = useMemo(() => destinationsForCampus(destination.indoorCampusId), [destination.indoorCampusId])
  const selectedRoom: Destination | undefined = sampleRooms.find((item) => item.id === roomId)

  function setOrigin(value: string) {
    setOriginId(value)
    if (value === destinationId) setDestinationId(buildings.find((item) => item.id !== value)?.id ?? 'annex2')
  }
  function swapLocations() {
    setOriginId(destinationId)
    setDestinationId(originId)
  }
  function beginRoute() {
    if (originId === destinationId) return
    setPhase('route')
  }

  return <main className="inter-page">
    <header className="inter-header"><button className="back-link" onClick={onHome}><ArrowLeft size={18}/> Home</button><div className="inter-brand"><span className="brand-mark">B</span><b>BarkTrack</b><span className="inter-separator"/> <span>BETWEEN BUILDINGS</span></div><a className="header-help" href={officialLocationSource} target="_blank" rel="noreferrer">NU location source <ArrowRight size={14}/></a></header>
    <div className="inter-content">
      <div className="inter-title"><div className="section-kicker">OUTDOOR NAVIGATION <span/> PHASE 01</div><h1>Go beyond<br/><em>one building.</em></h1><p>Choose where you are and where you want to go. BarkTrack will show a route when verified walking data is available.</p></div>
      {phase === 'select' ? <div className="inter-layout"><section className="inter-card route-form-card"><div className="inter-card-heading"><span className="inter-icon"><Route size={20}/></span><div><h2>Plan a building-to-building trip</h2><p>Select your starting and destination locations.</p></div></div><div className="trip-selectors"><label>STARTING LOCATION<span className="select-wrap"><MapPin size={17}/><select value={originId} onChange={(event) => setOrigin(event.target.value)}>{buildings.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><ChevronDown size={16}/></span></label><button className="swap-button" aria-label="Swap starting location and destination" title="Swap locations" onClick={swapLocations}><Shuffle size={17}/></button><label>DESTINATION BUILDING<span className="select-wrap destination-select"><Building2 size={17}/><select value={destinationId} onChange={(event) => { setDestinationId(event.target.value); setRoomId('') }}>{buildings.map((item) => <option key={item.id} value={item.id} disabled={item.id === originId}>{item.name}</option>)}</select><ChevronDown size={16}/></span></label></div><div className="trip-summary"><div className="trip-endpoint"><span className="endpoint-dot origin-dot"/><div><small>FROM</small><b>{origin.name}</b></div></div><div className="trip-line"><span/><span/><span/></div><div className="trip-endpoint"><span className="endpoint-dot destination-dot"><MapPin size={13}/></span><div><small>TO</small><b>{destination.name}</b></div></div></div><div className="inter-card-divider"/><div className="destination-info-heading"><div><small>DESTINATION INFORMATION</small><h3>{destination.name}</h3></div><span className="verified-status"><BadgeInfo size={15}/> ENTRY NOT VERIFIED</span></div><div className="destination-info-grid"><div><small>Address</small><b>{destination.address}</b><span>{destination.addressStatus}</span></div><div><small>Available entrance</small><b>Information not available</b><span>Confirm with NU before travel</span></div></div><label className="room-select-label">OPTIONAL: FINAL INDOOR DESTINATION<span className="select-wrap"><Building2 size={16}/><select value={roomId} onChange={(event) => setRoomId(event.target.value)}><option value="">Go to building only</option>{sampleRooms.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.floor} (sample)</option>)}</select><ChevronDown size={15}/></span><small className="room-sample-note">Room choices are sample records and are not verified NU locations.</small></label><button className="button button-primary inter-primary" onClick={beginRoute}>Navigate to building <ArrowRight size={17}/></button><div className="source-note"><BadgeInfo size={16}/><span>NU’s public directory names Main, Annex 1, and Annex 2 Mendiola, but it does not provide verified walking connections or entrance details here. This prototype will not estimate a route.</span></div></section>
        <aside className="inter-side-card"><div className="side-map-placeholder"><div className="side-map-grid"/><div className="side-location origin-location"><span><Building2 size={16}/></span><b>{origin.name}</b></div><div className="side-location destination-location"><span><MapPin size={16}/></span><b>{destination.name}</b></div><div className="no-route-overlay"><span><Footprints size={20}/></span><b>No verified route yet</b><small>Map and route details will appear when approved route data is added.</small></div></div><div className="side-caption"><span>INTER-BUILDING MAP</span><b>Outdoor route preview</b><small>Street names, distance, and travel time are not available until verified.</small></div><button className="side-text-button" onClick={() => onFindRoom(destination.indoorCampusId)}>Open destination indoor guide <ArrowRight size={15}/></button></aside></div> : <div className="inter-layout route-result-layout"><section className="inter-card route-result-card"><button className="back-link" onClick={() => setPhase('select')}><ArrowLeft size={16}/> Edit trip</button><div className="route-status-banner"><span><Footprints size={21}/></span><div><b>We can’t calculate this route yet.</b><small>No verified pedestrian route data or confirmed entrances are configured for this trip.</small></div></div><div className="route-result-points"><div><span className="endpoint-dot origin-dot"/><small>STARTING LOCATION</small><b>{origin.name}</b><em>{origin.address}</em></div><ArrowRight size={20}/><div><span className="endpoint-dot destination-dot"><MapPin size={13}/></span><small>DESTINATION</small><b>{destination.name}</b><em>{destination.address}</em></div></div><div className="no-route-map"><div className="side-map-grid"/><span><Route size={23}/></span><b>Route unavailable</b><small>BarkTrack has not drawn a route, distance, travel time, or turn-by-turn steps.</small></div><div className="no-route-reason"><BadgeInfo size={17}/><span>Check NU’s official location information and signage before traveling. Walking directions will appear here only after route geometry and entrances are verified.</span></div><a className="official-source-link" href={officialLocationSource} target="_blank" rel="noreferrer">View NU’s official location directory <ArrowUpRight size={15}/></a></section><aside className="inter-card arrival-card"><div className="arrival-badge">NEXT STEP</div><span className="arrival-icon"><Building2 size={22}/></span><h2>Already at<br/><em>{destination.name}?</em></h2><p>Open its indoor guide to look for a room or facility. Indoor entries are clearly labeled sample content.</p>{selectedRoom && <div className="chosen-room"><small>SELECTED INDOOR DESTINATION</small><b>{selectedRoom.name}</b><span>{selectedRoom.floor} · Sample data</span></div>}<button className="button button-primary full-width" onClick={() => onFindRoom(destination.indoorCampusId, selectedRoom?.id)}>{selectedRoom ? 'Open sample room guide' : 'Find a room inside'} <ArrowRight size={17}/></button><button className="button button-quiet full-width" onClick={() => setPhase('select')}>Choose different buildings</button><small className="arrival-disclaimer">This continues to a sample indoor directory; it does not confirm arrival or supply a verified outdoor route.</small></aside></div>}
    </div><footer className="inter-footer"><span>BARKTRACK <i/> STUDENT PROJECT PROTOTYPE</span><span>Outdoor and indoor navigation are separate route systems.</span></footer>
  </main>
}


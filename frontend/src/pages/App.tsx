import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BadgeInfo, Building2,
  Check, ChevronDown, CircleHelp, Compass, DoorOpen, Home, MapPin,
  Minus, Plus, RotateCcw, Search, Signpost, Sparkles, X, Route,
} from 'lucide-react'
import { campuses, destinationsForCampus, type Campus, type Destination } from '../../../data/campuses'
import CampusMap from '../components/CampusMap'
import InterBuildingPage from './InterBuildingPage'

type Screen = 'landing' | 'campuses' | 'map' | 'interbuilding'
type Point = { x: number; y: number }

const startPoints = ['Sample Main Entrance', 'Sample Information Desk', 'Sample Lobby']

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><span className="brand-mark" aria-hidden="true">B</span><span><b>BarkTrack</b>{!compact && <small>NU CAMPUS GUIDE</small>}</span></div>
}

function CampusIllustration({ tint }: { tint: string }) {
  return <div className={`campus-art art-${tint}`} aria-hidden="true"><div className="art-sun"/><div className="art-building art-building-one"><i/><i/><i/><i/><i/><i/></div><div className="art-building art-building-two"><i/><i/><i/><i/></div><div className="art-building art-building-three"><i/><i/><i/><i/><i/></div><div className="art-walk"/><span className="art-pin"><MapPin size={17}/></span></div>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [campus, setCampus] = useState<Campus | null>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Destination | null>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const [floor, setFloor] = useState('1st Floor')
  const [showDirections, setShowDirections] = useState(false)
  const [start, setStart] = useState(startPoints[0])
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const [helpOpen, setHelpOpen] = useState(false)
  const timeoutMinutes = 2
  const lastActivity = useRef(Date.now())

  const destinations = useMemo(() => campus ? destinationsForCampus(campus.id) : [], [campus])
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    if (!term) return destinations
    return destinations.filter((item) => [item.name, item.category, item.building, item.floor].some((value) => value.toLocaleLowerCase().includes(term)))
  }, [destinations, query])
  const buildings = useMemo(() => [...new Set(destinations.map((item) => item.building))], [destinations])
  const resultItems = query.trim() ? filtered : filtered.slice(0, 6)

  function resetAll() {
    setScreen('landing'); setCampus(null); setQuery(''); setSelected(null); setSelectedBuilding(null)
    setShowDirections(false); setZoom(1); setOffset({ x: 0, y: 0 }); setFloor('1st Floor')
  }
  function touchActivity() { lastActivity.current = Date.now() }

  useEffect(() => {
    if (screen === 'landing') return
    const timer = window.setInterval(() => {
      if (Date.now() - lastActivity.current >= timeoutMinutes * 60_000) resetAll()
    }, 5_000)
    const activity = () => touchActivity()
    window.addEventListener('pointerdown', activity)
    window.addEventListener('keydown', activity)
    return () => { window.clearInterval(timer); window.removeEventListener('pointerdown', activity); window.removeEventListener('keydown', activity) }
  }, [screen, timeoutMinutes])

  function chooseCampus(item: Campus) {
    setCampus(item); setFloor(item.floors[0]); setScreen('map'); setQuery(''); setSelected(null); setSelectedBuilding(null); setShowDirections(false); setZoom(1); setOffset({ x: 0, y: 0}); touchActivity()
  }
  function chooseDestination(destination: Destination) {
    setSelected(destination); setSelectedBuilding(destination.building); setFloor(destination.floor); setShowDirections(false); setQuery(destination.name); touchActivity()
  }
  function chooseBuilding(name: string) {
    setSelectedBuilding(name); setSelected(null); setShowDirections(false); touchActivity()
  }
  function resetView() { setZoom(1); setOffset({ x: 0, y: 0 }) }
  const visibleMarkers = destinations.filter((item) => item.floor === floor)
  const selectedPoint = selected ? { x: selected.x, y: selected.y } : null

  return <div className="app-shell" onPointerDownCapture={touchActivity}>
    {screen === 'landing' && <main className="landing">
      <header className="landing-header"><Brand/><button className="header-help" onClick={() => setHelpOpen(true)}><CircleHelp size={18}/> How to use</button></header>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span/> YOUR INTERACTIVE CAMPUS NAVIGATION GUIDE</div><h1>Find your way<br/><em>around NU.</em></h1><p>Find rooms inside campus or navigate between NU buildings.</p><div className="hero-actions"><button className="button button-primary button-large" onClick={() => setScreen('campuses')}>Find a room <ArrowRight size={19}/></button><button className="button button-outline hero-building-action" onClick={() => setScreen('interbuilding')}><Route size={18}/> Navigate between buildings</button></div><div className="hero-note"><span className="pulse-dot"/> A campus guide, ready when you are.</div></div>
        <div className="hero-visual"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-card card-back"><div className="mini-grid"/><span className="mini-pin pin-a"><MapPin size={17}/></span><span className="mini-pin pin-b"><MapPin size={17}/></span></div><div className="hero-card card-front"><div className="map-label"><span className="map-label-dot"/> CAMPUS MAP <span className="map-label-live">SAMPLE</span></div><svg className="hero-map" viewBox="0 0 500 330" role="img" aria-label="Decorative sample campus map illustration"><path d="M35 263 C105 225 119 220 161 186 S238 180 270 142 340 118 384 67 420 58 471 45"/><path d="M53 71 C123 110 131 135 193 140 S289 208 342 226 400 252 460 274"/><path d="M151 40 C169 89 208 104 231 157 S245 252 291 293"/><path d="M85 210 C117 173 130 112 175 74"/></svg><div className="hero-block block-one"/><div className="hero-block block-two"/><div className="hero-block block-three"/><div className="hero-block block-four"/><div className="hero-destination"><span><MapPin size={14}/></span><div><b>Your destination</b><small>Directions made simple</small></div><ArrowUpRight size={15}/></div></div><div className="hero-sticker"><Compass size={17}/><span>Explore<br/>with ease</span></div></div>
      </section><footer className="landing-footer"><span>DESIGNED FOR THE NU COMMUNITY</span><span>Find a room <i/> Navigate between buildings</span></footer>
      {helpOpen && <div className="modal-scrim" onClick={() => setHelpOpen(false)}><section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" aria-label="Close help" onClick={() => setHelpOpen(false)}><X size={19}/></button><span className="modal-icon"><Compass size={22}/></span><h2 id="help-title">A little help finding your way</h2><p>Choose a campus, search for a destination, then select it to see its sample details on the map.</p><ol><li><span>1</span>Pick NU Main, Mendiola, or Annex 1.</li><li><span>2</span>Search for a room or explore a sample building.</li><li><span>3</span>Choose a starting point to preview sample directions.</li></ol><div className="sample-notice"><BadgeInfo size={17}/> Maps, rooms, and directions in this prototype are illustrative samples.</div><button className="button button-primary full-width" onClick={() => setHelpOpen(false)}>Got it</button></section></div>}
    </main>}

    {screen === 'interbuilding' && <InterBuildingPage onHome={resetAll} onFindRoom={(campusId, destinationId) => { const targetCampus = campuses.find((item) => item.id === campusId); if (!targetCampus) return; const target = destinationId ? destinationsForCampus(campusId).find((item) => item.id === destinationId) ?? null : null; setCampus(targetCampus); setFloor(target?.floor ?? targetCampus.floors[0]); setSelected(target); setSelectedBuilding(target?.building ?? null); setQuery(target?.name ?? ''); setShowDirections(false); setZoom(1); setOffset({ x: 0, y: 0 }); setScreen('map'); touchActivity() }} />}
    {screen === 'campuses' && <main className="campus-page"><header className="subpage-header"><button className="back-link" onClick={() => setScreen('landing')}><ArrowLeft size={19}/> Back</button><Brand compact/><button className="header-help" onClick={() => setHelpOpen(true)}><CircleHelp size={18}/> Help</button></header><section className="campus-content"><div className="section-kicker">STEP 01 <span/> CHOOSE YOUR DESTINATION</div><h1>Which campus<br/>are you exploring?</h1><p className="section-intro">Select a campus to open its map and destination guide.</p><div className="campus-grid">{campuses.filter((item) => item.id !== 'mendiola').map((item, index) => <article className="campus-card" key={item.id}><CampusIllustration tint={item.tint}/><div className="campus-card-body"><div className="campus-card-overline">CAMPUS 0{index + 1}</div><h2>{item.name}</h2><p>{item.description}</p><button className="button button-outline" onClick={() => chooseCampus(item)}>Explore campus <ArrowRight size={17}/></button></div></article>)}</div><div className="data-footnote"><BadgeInfo size={17}/><span>Illustrative preview: campus maps and destination details are sample content awaiting verification.</span></div></section><footer className="simple-footer">BARKTRACK <i/> FIND YOUR WAY AROUND NU</footer>{helpOpen && <div className="modal-scrim" onClick={() => setHelpOpen(false)}><section className="help-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" onClick={() => setHelpOpen(false)} aria-label="Close"><X size={19}/></button><span className="modal-icon"><Compass size={22}/></span><h2>Choose how to get around</h2><p>Find a room inside one campus, or plan a trip between the supported NU buildings.</p><div className="sample-notice"><BadgeInfo size={17}/> Sample maps are not real NU floor plans.</div><button className="button button-primary full-width" onClick={() => setHelpOpen(false)}>Got it</button></section></div>}</main>}

    {screen === 'map' && campus && <main className="map-page">
      <header className="map-topbar"><div className="map-brand-area"><button className="back-link top-back" onClick={() => setScreen('campuses')}><ArrowLeft size={18}/><span>Campuses</span></button><div className="top-divider"/><Brand compact/></div><div className="current-campus"><span className="campus-pulse"/> <span className="campus-overline">EXPLORING</span><b>{campus.name}</b><ChevronDown size={16}/></div><button className="home-button" onClick={resetAll}><Home size={17}/><span>Home</span></button></header>
      <div className={`map-workspace ${selected || selectedBuilding ? 'has-details' : ''}`}>
        <aside className="search-panel"><div className="panel-heading"><div><div className="section-kicker">FLOOR DIRECTORY</div><h1>Find a place</h1></div><span className="heading-compass"><Compass size={22}/></span></div><p className="panel-subtitle">Find a room, service, or campus spot.</p><label className="search-box"><Search size={19}/><input value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); setSelectedBuilding(null); setShowDirections(false); touchActivity() }} placeholder="Search for a room, office, department, or facility..." aria-label="Search destinations"/><kbd>Ã¢Å’â€¢</kbd></label>
          <div className="result-head"><span>{query ? 'SEARCH RESULTS' : 'SUGGESTED PLACES'}</span><small>{query.trim() ? `${filtered.length} matches` : `${filtered.length} places`}</small></div><div className="result-list">{resultItems.length ? resultItems.map((item) => <button className={`result-item ${selected?.id === item.id ? 'result-active' : ''}`} key={item.id} onClick={() => chooseDestination(item)}><span className={`result-icon icon-${item.category.toLowerCase().replaceAll(' ', '-')}`}><DestinationIcon category={item.category}/></span><span className="result-copy"><b>{item.name}</b><small>{item.building} <i/> {item.floor}</small></span><ArrowUpRight size={16}/></button>) : <div className="empty-results"><Search size={22}/><b>No matching places</b><span>Try a room number or a different keyword.</span></div>}</div>
          <div className="quick-categories"><div className="result-head"><span>EXPLORE BY TYPE</span></div><div className="category-chips">{['Classroom', 'Office', 'Library', 'Restroom'].map((item) => <button key={item} onClick={() => { setQuery(item); setSelected(null); setSelectedBuilding(null) }}>{item}</button>)}</div></div><div className="sample-warning"><BadgeInfo size={16}/><span><b>Sample map data</b>Locations and directions are illustrative, not verified NU information.</span></div>
        </aside>
        <CampusMap campus={campus} destinations={destinations} buildings={buildings} selected={selected} start={start} floor={floor} setFloor={(value) => { setFloor(value); setSelected(null); setSelectedBuilding(null); setShowDirections(false) }} showDirections={showDirections} zoom={zoom} setZoom={setZoom} offset={offset} setOffset={setOffset} onDestination={chooseDestination} onBuilding={chooseBuilding} onCampusList={() => setScreen('campuses')} />
        {(selected || selectedBuilding) && <aside className="details-panel">{showDirections && selected ? <DirectionsPanel campus={campus} destination={selected} start={start} onStartChange={setStart} onBack={() => setShowDirections(false)} onHome={resetAll}/> : selected ? <DestinationPanel campus={campus} destination={selected} onDirections={() => setShowDirections(true)} onBack={() => { setSelected(null); setSelectedBuilding(null); setQuery('') }} onHome={resetAll}/> : <BuildingPanel name={selectedBuilding!} destinations={destinations.filter((item) => item.building === selectedBuilding)} floors={campus.floors} onSelect={chooseDestination} onClose={() => setSelectedBuilding(null)}/>}</aside>}
      </div><footer className="map-footer"><span>Ã‚Â© BARKTRACK <i/> STUDENT PROJECT PROTOTYPE</span><span><BadgeInfo size={14}/> All locations and routes shown are sample data</span></footer>
    </main>}
  </div>
}

function DestinationIcon({ category }: { category: string }) {
  if (category === 'Classroom') return <DoorOpen size={18}/>
  if (category === 'Office' || category === 'Student services') return <Building2 size={18}/>
  if (category === 'Library') return <BookIcon/>
  if (category === 'Elevator') return <ArrowUpRight size={18}/>
  return <MapPin size={18}/>
}
function BookIcon() { return <span className="book-glyph">Ã¢â€“Â¤</span> }

function WelcomePanel({ campus, destinations, floors, onSelect, onBuilding }: { campus: Campus; destinations: Destination[]; floors: string[]; onSelect: (item: Destination) => void; onBuilding: (name: string) => void }) {
  return <div className="detail-inner"><div className="panel-eyebrow"><span className="eyebrow-mark"><Compass size={17}/></span> YOUR CAMPUS, AT A GLANCE</div><h2>Explore<br/><em>{campus.name}.</em></h2><p className="detail-lede">Start with a building, or search for a place you have in mind.</p><div className="detail-sample-tag"><span/> SAMPLE CAMPUS DIRECTORY</div><div className="panel-divider"/><div className="stats-row"><div><b>{destinations.length.toString().padStart(2, '0')}</b><small>Sample places</small></div><div><b>{new Set(destinations.map((item) => item.building)).size.toString().padStart(2, '0')}</b><small>Sample buildings</small></div><div><b>{floors.length.toString().padStart(2, '0')}</b><small>Sample floors</small></div></div><div className="panel-section-title">EXPLORE SAMPLE BUILDINGS</div><div className="building-list">{[...new Set(destinations.map((item) => item.building))].map((building, index) => <button key={building} onClick={() => onBuilding(building)}><span className={`building-mini mini-${index}`}><Building2 size={17}/></span><span><b>{building}</b><small>Illustrative map footprint</small></span><ArrowRight size={16}/></button>)}</div><div className="panel-hint"><Sparkles size={17}/><span><b>Not sure where to start?</b><small>Search a destination or tap any map pin.</small></span></div></div>
}
function DestinationPanel({ campus, destination, onDirections, onBack, onHome }: { campus: Campus; destination: Destination; onDirections: () => void; onBack: () => void; onHome: () => void }) {
  return <div className="detail-inner"><div className="panel-top-actions"><button className="back-link" onClick={onBack}><ArrowLeft size={16}/> Back to map</button><button className="icon-button" onClick={onHome} aria-label="Home"><Home size={16}/></button></div><div className="selected-tag"><span/> DESTINATION SELECTED</div><span className="large-result-icon"><DestinationIcon category={destination.category}/></span><div className="category-label">{destination.category.toUpperCase()}</div><h2 className="destination-title">{destination.name}</h2><p className="detail-lede">{destination.detail}</p><div className="detail-fields"><InfoField label="Campus" value={campus.name}/><InfoField label="Building" value={destination.building}/><InfoField label="Floor" value={destination.floor}/><InfoField label="Accessibility" value="Information not available"/></div><div className="sample-callout"><BadgeInfo size={16}/><span>This is sample content. Confirm location details with an authorized NU source.</span></div><button className="button button-primary full-width directions-button" onClick={onDirections}>Show sample directions <ArrowRight size={18}/></button><button className="button button-quiet full-width map-back-button" onClick={onBack}>Back to map</button></div>
}
function InfoField({ label, value }: { label: string; value: string }) { return <div className="info-field"><small>{label}</small><b>{value}</b></div> }
function BuildingPanel({ name, destinations, floors, onSelect, onClose }: { name: string; destinations: Destination[]; floors: string[]; onSelect: (item: Destination) => void; onClose: () => void }) {
  return <div className="detail-inner"><div className="panel-top-actions"><button className="back-link" onClick={onClose}><ArrowLeft size={16}/> Back to map</button><span className="building-type-tag">SAMPLE BUILDING</span></div><span className="large-result-icon building-detail-icon"><Building2 size={22}/></span><div className="category-label">BUILDING INFORMATION</div><h2 className="destination-title">{name}</h2><p className="detail-lede">Illustrative building panel. Real building purpose and map position are not available yet.</p><div className="detail-fields"><InfoField label="Available floors" value={floors.join(', ')}/><InfoField label="Departments" value="Information not available"/><InfoField label="Verified facilities" value="Information not available"/></div><div className="panel-section-title">SAMPLE DESTINATIONS</div><div className="building-destinations">{destinations.map((item) => <button key={item.id} onClick={() => onSelect(item)}><span><b>{item.name}</b><small>{item.floor} Ã‚Â· {item.category}</small></span><ArrowRight size={16}/></button>)}</div><div className="sample-callout"><BadgeInfo size={16}/><span>Building labels and floor configurations are sample content.</span></div></div>
}
function DirectionsPanel({ campus, destination, start, onStartChange, onBack, onHome }: { campus: Campus; destination: Destination; start: string; onStartChange: (value: string) => void; onBack: () => void; onHome: () => void }) {
  return <div className="detail-inner directions-inner"><div className="panel-top-actions"><button className="back-link" onClick={onBack}><ArrowLeft size={16}/> Destination details</button><button className="icon-button" onClick={onHome} aria-label="Home"><Home size={16}/></button></div><div className="selected-tag"><span/> SAMPLE ROUTE</div><span className="large-result-icon route-icon"><Signpost size={21}/></span><div className="category-label">DIRECTIONS PREVIEW</div><h2 className="destination-title">Getting there.</h2><p className="detail-lede">Follow the blue sample path on the map. This random plan and its directions are illustrative, not real NU wayfinding.</p><label className="start-select-label">STARTING POINT<select value={start} onChange={(event) => onStartChange(event.target.value)}>{startPoints.map((point) => <option key={point}>{point}</option>)}</select><ChevronDown size={15}/></label><div className="route-summary"><div><span className="route-start-dot"/><span className="route-connector"/><span className="route-end-dot"><MapPin size={13}/></span></div><div><b>{start}</b><small>{campus.name} Ã‚Â· sample starting point</small><b>{destination.name}</b><small>{destination.building} Ã‚Â· {destination.floor}</small></div></div><div className="route-steps"><div className="panel-section-title">HOW TO GET THERE <span>SAMPLE GUIDE</span></div><div><span>01</span><p>Find the green START marker at {start}.</p></div><div><span>02</span><p>Follow the blue highlighted sample path along the hallways.</p></div><div><span>03</span><p>Stop at the highlighted room in {destination.building}.</p></div><div><span>04</span><p>You are looking for {destination.name} on {destination.floor}.</p></div></div><div className="sample-callout"><BadgeInfo size={16}/><span>This route is for interface demonstration only. Follow verified campus signage.</span></div></div>
}










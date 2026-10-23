import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, ChevronRight, CircleHelp, Gamepad2, Grid2X2, House, MapPin, Pause, Play, Signal, SkipBack, SkipForward, Sparkles, UserRound, Wifi } from 'lucide-react'
import './carplay.css'

const links = [
  { name: 'Home', path: '/', icon: House, color: 'pink', end: true },
  { name: 'Work', path: '/work', icon: BriefcaseBusiness, color: 'blue' },
  { name: 'Play', path: '/play', icon: Sparkles, color: 'green' },
  { name: 'About', path: '/about', icon: UserRound, color: 'purple' },
]

const projects = [
  { slug: 'campaign-one', number: '01', title: 'Campaign concept one', category: 'CAMPAIGN · YEAR', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85', summary: 'A place to share the idea, the audience, and the work behind the work.' },
  { slug: 'campaign-two', number: '02', title: 'Campaign concept two', category: 'BRAND PLATFORM · YEAR', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85', summary: 'A second project story, ready for its strategy, collaborators, and outcomes.' },
]

function StatusBar() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 30000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <header className="cp-header">
      <NavLink to="/" className="cp-signature">Keren Mandelzis<span>✳</span></NavLink>
      <div className="cp-status"><Signal size={15} /><Wifi size={15} /><span>CREATIVE SIGNAL</span><time>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time></div>
    </header>
  )
}

function Dock({ onApps }) {
  return (
    <aside className="cp-dock" aria-label="Portfolio navigation">
      <nav>{links.map(({ name, path, icon: Icon, color, end }) => <NavLink key={name} to={path} end={end} title={name} aria-label={name} className={({ isActive }) => `cp-dock-link ${color}${isActive ? ' selected' : ''}`}><Icon size={21} /></NavLink>)}</nav>
      <button className="cp-apps-button" type="button" onClick={onApps} aria-label="Open navigation menu" title="All sections"><Grid2X2 size={20} /></button>
    </aside>
  )
}

function Launcher({ close }) {
  return <div className="cp-launcher" role="dialog" aria-label="All portfolio sections">{links.map(({ name, path, icon: Icon, color }) => <NavLink key={name} to={path} className={`cp-launcher-item ${color}`} onClick={close}><span><Icon size={27} /></span>{name}</NavLink>)}</div>
}

function Home() {
  const [activeProject, setActiveProject] = useState(0)
  const [playing, setPlaying] = useState(false)
  const project = projects[activeProject]
  const cycleProject = (direction) => setActiveProject((current) => (current + direction + projects.length) % projects.length)

  return (
    <div className="cp-dashboard">
      <NavLink to="/work" className="cp-map-panel" aria-label="Explore selected work">
        <div className="cp-map-grid" /><div className="cp-water" />
        <i className="cp-road road-a" /><i className="cp-road road-b" /><i className="cp-road road-c" />
        <span className="cp-map-label map-label-a">IDEA AVENUE</span><span className="cp-map-label map-label-b">BRAND DISTRICT</span><span className="cp-map-label map-label-c">STORY PARK</span>
        <svg className="cp-route" viewBox="0 0 500 400" preserveAspectRatio="none" aria-hidden="true"><path d="M105 350 C125 300 105 270 162 246 S226 205 218 165 S270 126 328 98 S383 86 414 48" /></svg>
        <div className="cp-destination"><MapPin size={19} fill="currentColor" /><span>YOUR NEXT BIG IDEA</span></div>
        <div className="cp-you-are-here"><i /><span>YOU ARE HERE</span></div>
        <div className="cp-directions"><ArrowUpRight size={24} /><span><strong>Make it memorable.</strong><small>EXPLORE THE WORK</small></span><ChevronRight size={17} /></div>
        <div className="cp-map-footer"><span>CREATIVE ROUTE</span><span>02 PROJECTS <ArrowUpRight size={13} /></span></div>
      </NavLink>
      <div className="cp-home-stack">
        <section className="cp-media-panel">
          <div className="cp-album-art" style={{ backgroundImage: `url("${project.image}")` }}><span>NOW SHOWING</span></div>
          <div className="cp-media-info"><span className="cp-kicker">FEATURED PROJECT · {project.number}</span><NavLink to={`/work/${project.slug}`} className="cp-media-title">{project.title}<ArrowUpRight size={15} /></NavLink><span className="cp-artist">A campaign in progress</span><div className="cp-progress"><i /></div><div className="cp-controls"><span>THE IDEA</span><button onClick={() => cycleProject(-1)} aria-label="Previous project"><SkipBack size={17} fill="currentColor" /></button><button className="cp-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause preview' : 'Play preview'}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><button onClick={() => cycleProject(1)} aria-label="Next project"><SkipForward size={17} fill="currentColor" /></button><NavLink to={`/work/${project.slug}`} aria-label="Open featured project"><ArrowUpRight size={16} /></NavLink></div></div>
        </section>
        <NavLink to="/about" className="cp-calendar-panel"><div className="cp-calendar-stamp"><span>LET'S</span><strong>MAKE</strong></div><div><span className="cp-kicker">THE NEXT CHAPTER</span><strong className="cp-calendar-title">Something good<br />starts here.</strong><span className="cp-calendar-note">Available for the right idea</span></div><ArrowUpRight className="cp-calendar-arrow" size={19} /></NavLink>
      </div>
    </div>
  )
}

function PageHeading({ kicker, title, description }) {
  return <header className="cp-page-heading"><div><span className="cp-kicker">{kicker}</span><h1>{title}</h1></div>{description && <p>{description}</p>}</header>
}

function Work() {
  return <section className="cp-route-page"><PageHeading kicker="WORK / ALL PROJECTS" title="The good stuff." description="Campaigns, concepts, and brand worlds." /><div className="cp-project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div><div className="cp-route-footer"><span>SELECT A PROJECT TO EXPLORE</span><span>02 PROJECTS</span></div></section>
}

function ProjectCard({ project }) {
  return <NavLink to={`/work/${project.slug}`} className="cp-project-card"><div className="cp-project-thumb" style={{ backgroundImage: `url("${project.image}")` }}><span>{project.number}</span><ArrowUpRight size={17} /></div><div className="cp-project-copy"><span className="cp-kicker">{project.category}</span><strong>{project.title}</strong><span>{project.summary}</span></div></NavLink>
}

function Campaign() {
  const { campaignName } = useParams()
  const project = projects.find(({ slug }) => slug === campaignName)
  if (!project) return <NotFound />
  return <section className="cp-route-page cp-campaign-page"><NavLink to="/work" className="cp-back-link"><ArrowLeft size={15} /> ALL PROJECTS</NavLink><div className="cp-project-hero" style={{ backgroundImage: `url("${project.image}")` }}><span className="cp-project-number">PROJECT {project.number}</span><div><span className="cp-kicker">{project.category}</span><h1>{project.title}</h1></div></div><div className="cp-brief"><span className="cp-kicker">THE BRIEF</span><p>{project.summary}</p><span className="cp-kicker">MORE DETAILS COMING SOON</span></div></section>
}

function PlayPage() {
  return <section className="cp-route-page"><PageHeading kicker="PLAY / SIDE QUESTS" title="Just because." description="Experiments, curiosities, and things made for the fun of it." /><div className="cp-play-grid"><article className="cp-play-tile cp-play-wide"><Sparkles size={25} /><span className="cp-kicker">IN THE WORKS</span><strong>Little experiments.<br />Big what-ifs.</strong><span>A home for ideas that take the scenic route.</span></article><article className="cp-play-tile cp-play-photo"><span className="cp-kicker">OFF THE CLOCK</span><strong>More play,<br />less polish.</strong></article><article className="cp-play-tile cp-play-accent"><Gamepad2 size={24} /><span className="cp-kicker">CURRENT MOOD</span><strong>Curious<br />by default.</strong><ArrowUpRight size={17} /></article></div></section>
}

function AboutPage() {
  return <section className="cp-route-page"><PageHeading kicker="ABOUT / THE DRIVER" title="Hi, I'm Keren." description="An advertising creative who likes a good question, a sharp idea, and making things people feel." /><div className="cp-about-grid"><div className="cp-portrait"><span className="cp-monogram">K<span>.</span></span><span className="cp-kicker">THE HUMAN BEHIND THE IDEAS</span></div><div className="cp-about-copy"><span className="cp-kicker">A LITTLE ABOUT ME</span><p>I bring curiosity, care, and a collaborative spirit to the work. This is where the longer story goes: what I believe, how I work, and the people I hope to make things with.</p><NavLink to="/work" className="cp-inline-link">TAKE A LOOK AROUND <ArrowUpRight size={15} /></NavLink></div></div></section>
}

function NotFound() {
  return <section className="cp-route-page cp-not-found"><CircleHelp size={28} /><PageHeading kicker="OFF THE MAP" title="Wrong turn." description="That page isn't on this route yet." /><NavLink to="/" className="cp-inline-link"><ArrowLeft size={15} /> BACK TO HOME</NavLink></section>
}

export default function CarPlayPortfolio() {
  const [launcherOpen, setLauncherOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setLauncherOpen(false), [location.pathname])
  return <div className="cp-cockpit"><div className="cp-screen"><StatusBar /><div className="cp-screen-body"><Dock onApps={() => setLauncherOpen((open) => !open)} /><main className="cp-content" key={location.pathname}>{launcherOpen && <Launcher close={() => setLauncherOpen(false)} />}<Routes><Route path="/" element={<Home />} /><Route path="/work" element={<Work />} /><Route path="/work/:campaignName" element={<Campaign />} /><Route path="/play" element={<PlayPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFound />} /></Routes></main></div></div></div>
}
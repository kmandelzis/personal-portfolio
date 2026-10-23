import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import { ArrowDownRight, ArrowLeft, ArrowUpRight, CircleHelp, Gamepad2, House, Layers3, UserRound } from 'lucide-react'

const navigation = [
  { label: 'Home', path: '/', icon: House, end: true },
  { label: 'Work', path: '/work', icon: Layers3 },
  { label: 'Play', path: '/play', icon: Gamepad2 },
  { label: 'About', path: '/about', icon: UserRound },
]

const campaigns = [
  { slug: 'campaign-one', number: '01', title: 'Campaign concept one', category: 'CAMPAIGN · YEAR', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85', color: 'coral' },
  { slug: 'campaign-two', number: '02', title: 'Campaign concept two', category: 'BRAND PLATFORM · YEAR', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85', color: 'lime' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="wordmark" to="/" aria-label="Portfolio home">K<span>.</span></NavLink>
      <nav className="side-nav" aria-label="Main navigation">
        {navigation.map(({ label, path, icon: Icon, end }) => (
          <NavLink key={label} to={path} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <span className="online-dot" />
        <span>CREATIVE PORTFOLIO</span>
      </div>
    </aside>
  )
}

function Home() {
  return (
    <div className="page home-page">
      <header className="topline"><span>INDEPENDENT CREATIVE PORTFOLIO</span><span>CAMPAIGNS · CONCEPTS · IDEAS</span></header>
      <section className="intro">
        <p className="eyebrow"><span className="eyebrow-mark" /> CREATIVE THINKING, MADE TO MOVE</p>
        <h1>Ideas that<br /><span>go places.</span></h1>
        <div className="intro-bottom">
          <p>I'm Keren, an advertising creative making brands harder to forget and stories worth passing on.</p>
          <NavLink className="text-link" to="/work">EXPLORE THE WORK <ArrowDownRight size={16} /></NavLink>
        </div>
      </section>
      <section className="featured" aria-labelledby="featured-heading">
        <div className="section-heading"><h2 id="featured-heading">Selected work</h2><NavLink to="/work">ALL PROJECTS <ArrowUpRight size={14} /></NavLink></div>
        <div className="campaign-grid">
          {campaigns.map((campaign) => <CampaignCard key={campaign.slug} campaign={campaign} />)}
        </div>
      </section>
      <footer className="page-footer"><span>INDEPENDENT BY NATURE</span><span>SCROLL TO EXPLORE <ArrowDownRight size={13} /></span></footer>
    </div>
  )
}

function CampaignCard({ campaign }) {
  return (
    <NavLink className={`campaign-card ${campaign.color}`} to={`/work/${campaign.slug}`}>
      <div className="campaign-image" style={{ backgroundImage: `url("${campaign.image}")` }}>
        <span className="campaign-number">{campaign.number}</span>
        <span className="campaign-open"><ArrowUpRight size={18} /></span>
      </div>
      <div className="campaign-meta"><span>{campaign.category}</span><h3>{campaign.title}</h3></div>
    </NavLink>
  )
}

function Work() {
  return (
    <div className="page inner-page">
      <header className="topline"><span>THE GOOD STUFF</span><span>WORK / INDEX</span></header>
      <div className="inner-heading"><p className="eyebrow"><span className="eyebrow-mark" /> A FEW THINGS I'VE MADE</p><h1>Work<span className="period">.</span></h1><p className="lede">Campaigns, concepts, and brand worlds built to make a little noise.</p></div>
      <div className="work-list">{campaigns.map((campaign) => <CampaignCard key={campaign.slug} campaign={campaign} />)}</div>
    </div>
  )
}

function Campaign() {
  const { campaignName } = useParams()
  const campaign = campaigns.find(({ slug }) => slug === campaignName)
  if (!campaign) return <NotFound />
  return (
    <div className="page inner-page campaign-detail">
      <header className="topline"><NavLink to="/work"><ArrowLeft size={14} /> BACK TO WORK</NavLink><span>PROJECT / {campaign.number}</span></header>
      <div className={`detail-image ${campaign.color}`} style={{ backgroundImage: `url("${campaign.image}")` }} />
      <p className="eyebrow"><span className="eyebrow-mark" /> {campaign.category}</p>
      <h1>{campaign.title}<span className="period">.</span></h1>
      <p className="lede">Campaign details coming soon.</p>
    </div>
  )
}

function SimplePage({ label, title, description }) {
  return <div className="page inner-page"><header className="topline"><span>CREATIVE PORTFOLIO</span><span>{label.toUpperCase()}</span></header><div className="inner-heading"><p className="eyebrow"><span className="eyebrow-mark" /> {label.toUpperCase()}</p><h1>{title}<span className="period">.</span></h1><p className="lede">{description}</p></div></div>
}

function NotFound() {
  return <div className="page inner-page"><header className="topline"><span>CREATIVE PORTFOLIO</span><span>404</span></header><div className="inner-heading"><p className="eyebrow"><CircleHelp size={14} /> WRONG TURN</p><h1>Not found<span className="period">.</span></h1><NavLink className="text-link" to="/work">BACK TO WORK <ArrowLeft size={15} /></NavLink></div></div>
}

export default function App() {
  return <div className="app-shell"><Sidebar /><main className="main-content"><Routes><Route path="/" element={<Home />} /><Route path="/work" element={<Work />} /><Route path="/work/:campaignName" element={<Campaign />} /><Route path="/play" element={<SimplePage label="Play" title="Off the clock" description="Experiments, side quests, and things made just because." />} /><Route path="/about" element={<SimplePage label="About me" title="The person behind it" description="A little more about me, how I think, and what I bring to the table." />} /><Route path="*" element={<NotFound />} /></Routes></main></div>
}
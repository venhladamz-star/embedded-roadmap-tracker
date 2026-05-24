// Navbar.jsx — Top navigation bar
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Cpu, Search, Settings, ChevronRight } from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'
import { WEEKS } from '../data/courseData'
import { useState } from 'react'

export default function Navbar() {
  const { stats } = useProgressContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchVal, setSearchVal] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [results, setResults] = useState([])

  const totalResources = Object.values(WEEKS).reduce((acc, w) => acc + w.resources.length, 0)
  const pct = Math.round((stats.weeksCompleted / 16) * 100)

  function handleSearch(val) {
    setSearchVal(val)
    if (val.trim().length < 2) { setResults([]); return }
    const q = val.toLowerCase()
    const found = []
    Object.values(WEEKS).forEach(week => {
      if (week.title.toLowerCase().includes(q)) {
        found.push({ type: 'week', id: week.id, label: `Tuần ${week.num}: ${week.title}`, phase: week.phase })
      }
      week.resources.forEach(r => {
        if (r.title.toLowerCase().includes(q)) {
          found.push({ type: 'resource', id: week.id, label: r.title, sub: `Tuần ${week.num}` })
        }
      })
    })
    setResults(found.slice(0, 8))
  }

  function handleResultClick(r) {
    navigate(`/week/${r.id}`)
    setSearchVal('')
    setResults([])
    setSearchOpen(false)
  }

  return (
    <nav className="sticky top-0 z-40 flex items-center gap-4 px-5 h-12 bg-oc-surface border-b border-oc-border">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 flex-shrink-0 no-underline">
        <div className="w-7 h-7 bg-oc-bg border border-oc-border rounded flex items-center justify-center">
          <Cpu size={14} className="text-oc-link" />
        </div>
        <span className="text-sm font-semibold text-oc-text tracking-tight">
          embedded<span className="text-oc-muted font-normal">-roadmap</span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 ml-2">
        {[
          { to: '/', label: 'Dashboard' },
          { to: '/roadmap', label: 'Lộ trình' },
          { to: '/resources', label: 'Tài liệu' },
          { to: '/progress', label: 'Tiến trình' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors no-underline
              ${location.pathname === to
                ? 'text-oc-text bg-oc-overlay'
                : 'text-oc-muted hover:text-oc-body hover:bg-oc-overlay'}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden md:block">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-oc-bg border border-oc-border rounded w-52 focus-within:border-oc-primary transition-colors">
          <Search size={13} className="text-oc-faint flex-shrink-0" />
          <input
            type="text"
            value={searchVal}
            onChange={e => { handleSearch(e.target.value); setSearchOpen(true) }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            placeholder="Tìm tuần, tài liệu..."
            className="bg-transparent text-xs text-oc-body placeholder-oc-faint outline-none w-full font-code"
          />
        </div>
        {searchOpen && results.length > 0 && (
          <div className="absolute top-full mt-1 right-0 w-72 bg-oc-modal border border-oc-border rounded shadow-2xl z-50 py-1">
            {results.map((r, i) => (
              <button
                key={i}
                onMouseDown={() => handleResultClick(r)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-oc-overlay transition-colors"
              >
                <ChevronRight size={12} className="text-oc-faint" />
                <span className="text-oc-body flex-1 truncate">{r.label}</span>
                {r.sub && <span className="text-oc-faint">{r.sub}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress pill */}
      <div className="flex items-center gap-2 px-3 py-1 bg-oc-bg border border-oc-border rounded-full text-xs">
        <div className="w-16 progress-track">
          <div
            className="progress-fill bg-oc-success-fg"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-medium text-oc-body font-code">
          {stats.weeksCompleted}/16
        </span>
      </div>

      {/* Settings */}
      <Link to="/progress" className="p-1.5 text-oc-muted hover:text-oc-body transition-colors rounded">
        <Settings size={15} />
      </Link>
    </nav>
  )
}

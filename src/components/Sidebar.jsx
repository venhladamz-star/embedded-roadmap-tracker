// Sidebar.jsx — Fixed sidebar for WeekDetail page
import { Link, useNavigate } from 'react-router-dom'
import { Cpu, ChevronDown, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react'
import { useState } from 'react'
import { PHASES, WEEKS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'

export default function Sidebar({ currentWeekId }) {
  const { stats, getWeekStatus, isWeekDone } = useProgressContext()
  const navigate = useNavigate()
  const [openPhases, setOpenPhases] = useState(() => {
    // Open the phase that contains the current week
    const set = new Set()
    PHASES.forEach(p => {
      if (p.weeks.includes(currentWeekId)) set.add(p.id)
    })
    return set
  })

  const pct = Math.round((stats.weeksCompleted / 16) * 100)

  function togglePhase(id) {
    setOpenPhases(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  function weekIcon(weekId) {
    const status = getWeekStatus(weekId)
    if (status === 'done')   return <CheckCircle2 size={14} className="text-oc-success-fg flex-shrink-0" />
    if (status === 'active') return <Clock size={14} className="text-oc-warning flex-shrink-0" />
    return <Circle size={14} className="text-oc-faint flex-shrink-0" />
  }

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col bg-oc-surface border-r border-oc-border h-screen sticky top-12 overflow-y-auto"
      style={{ maxHeight: 'calc(100vh - 48px)' }}
    >
      {/* Overall progress */}
      <div className="px-4 pt-4 pb-3 border-b border-oc-border">
        <div className="text-xs text-oc-muted mb-1 font-medium">
          {stats.weeksCompleted}/16 tuần · {pct}%
        </div>
        <div className="progress-track">
          <div className="progress-fill bg-oc-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Phase accordions */}
      <div className="py-2">
        {PHASES.map(phase => {
          const phaseWeeksDone = phase.weeks.filter(wId => isWeekDone(wId)).length
          const isOpen = openPhases.has(phase.id)

          return (
            <div key={phase.id}>
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-oc-muted hover:text-oc-body hover:bg-oc-overlay transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: phase.accent }}
                />
                <span className="flex-1 text-left">{phase.title}</span>
                <span className="font-code text-oc-faint">{phaseWeeksDone}/{phase.weeks.length}</span>
                {isOpen
                  ? <ChevronDown size={12} className="text-oc-faint" />
                  : <ChevronRight size={12} className="text-oc-faint" />
                }
              </button>

              {/* Week list */}
              {isOpen && (
                <div>
                  {phase.weeks.map(wId => {
                    const week = WEEKS[wId]
                    const isActive = wId === currentWeekId
                    return (
                      <button
                        key={wId}
                        onClick={() => navigate(`/week/${wId}`)}
                        className={`w-full flex items-center gap-2 pl-7 pr-4 py-2 text-xs transition-colors text-left
                          ${isActive
                            ? 'week-active text-oc-text'
                            : 'text-oc-muted hover:text-oc-body hover:bg-oc-overlay'
                          }`}
                      >
                        {weekIcon(wId)}
                        <span className="flex-1 truncate">W{week.num}: {week.title}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom links */}
      <div className="mt-auto border-t border-oc-border px-4 py-3 space-y-1">
        <Link to="/resources" className="flex items-center gap-2 text-xs text-oc-muted hover:text-oc-body transition-colors no-underline py-1">
          Thư viện tài liệu
        </Link>
        <Link to="/progress" className="flex items-center gap-2 text-xs text-oc-muted hover:text-oc-body transition-colors no-underline py-1">
          Tiến trình & Thành tích
        </Link>
      </div>
    </aside>
  )
}

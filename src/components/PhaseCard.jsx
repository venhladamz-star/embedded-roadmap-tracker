// PhaseCard.jsx — Phase summary card for Dashboard
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { WEEKS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'

export default function PhaseCard({ phase }) {
  const navigate = useNavigate()
  const { isWeekDone, getWeekStatus } = useProgressContext()
  const doneCount = phase.weeks.filter(wId => isWeekDone(wId)).length
  const total = phase.weeks.length
  const pct = Math.round((doneCount / total) * 100)

  const week1 = WEEKS[phase.weeks[0]]
  const weekRange = `Tuần ${WEEKS[phase.weeks[0]].num}–${WEEKS[phase.weeks[total-1]].num}`

  return (
    <div
      className="bg-oc-surface border border-oc-border rounded-lg p-4 hover:border-oc-border-h cursor-pointer transition-colors group"
      onClick={() => navigate(`/week/${phase.weeks[0]}`)}
      style={{ borderTop: `3px solid ${phase.accent}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-oc-muted mb-1 font-code">{weekRange}</div>
          <div className="text-sm font-semibold text-oc-text tracking-tight">Phase {phase.num}</div>
          <div className="text-sm text-oc-body">{phase.title}</div>
        </div>
        <ChevronRight
          size={16}
          className="text-oc-faint group-hover:text-oc-muted transition-colors mt-0.5"
        />
      </div>

      {/* Progress bar */}
      <div className="mb-2 progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: phase.accent }}
        />
      </div>

      <div className="text-xs text-oc-muted font-code">
        {doneCount}/{total} tuần hoàn thành
      </div>

      {/* Week dots */}
      <div className="flex gap-1.5 mt-3">
        {phase.weeks.map(wId => {
          const status = getWeekStatus(wId)
          return (
            <div
              key={wId}
              className="h-1.5 flex-1 rounded-full transition-colors"
              style={{
                background: status === 'done' ? phase.accent :
                           status === 'active' ? phase.accent + '60' :
                           '#21262D'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

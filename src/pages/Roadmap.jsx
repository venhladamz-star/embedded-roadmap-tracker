// Roadmap.jsx — Timeline view of all 16 weeks
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react'
import { PHASES, WEEKS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'

function WeekNode({ week, phase, status, isLast }) {
  const navigate = useNavigate()

  const statusIcon = {
    done:   <CheckCircle2 size={18} className="text-oc-success-fg" />,
    active: <Clock size={18} className="text-oc-warning" />,
    todo:   <Circle size={18} className="text-oc-faint" />,
  }[status]

  const statusLabel = {
    done:   'Hoàn thành',
    active: 'Đang học',
    todo:   'Chưa bắt đầu',
  }[status]

  const statusClass = {
    done:   'bg-oc-done-bg border-oc-success/50 text-oc-success-fg',
    active: 'bg-yellow-900/20 border-oc-warning/40 text-oc-warning',
    todo:   'bg-oc-modal border-oc-border text-oc-muted',
  }[status]

  return (
    <div className="flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 bg-oc-surface"
          style={{ borderColor: status === 'done' ? '#238636' : status === 'active' ? '#D29922' : '#30363D' }}
        >
          <span className="text-xs font-code font-medium text-oc-muted">{week.num}</span>
        </div>
        {!isLast && <div className="w-px flex-1 bg-oc-border mt-1" style={{ minHeight: 40 }} />}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-4 p-4 bg-oc-surface border border-oc-border rounded-lg
          hover:border-oc-border-h cursor-pointer transition-colors group"
        onClick={() => navigate(`/week/${week.id}`)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {statusIcon}
              <span className="text-sm font-semibold text-oc-text tracking-tight">{week.title}</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-oc-muted font-code">W{week.num}</span>
              <span className="text-xs text-oc-muted">·</span>
              <span className="text-xs text-oc-muted">{week.resources.length} tài liệu</span>
              <span className="text-xs text-oc-muted">·</span>
              <span className="text-xs text-oc-muted">{week.exercises.length} bài tập</span>
              <span
                className={`chip text-xs ${statusClass}`}
                style={{ padding: '1px 8px' }}
              >
                {statusLabel}
              </span>
            </div>
          </div>
          <ArrowRight size={14} className="text-oc-faint group-hover:text-oc-muted transition-colors mt-1 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

export default function Roadmap() {
  const { getWeekStatus } = useProgressContext()

  return (
    <div className="max-w-2xl mx-auto px-5 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-oc-text tracking-tight mb-1">
          Bản đồ lộ trình
        </h1>
        <p className="text-sm text-oc-muted">16 tuần · 4 giai đoạn · Embedded Software</p>
      </div>

      {PHASES.map(phase => (
        <section key={phase.id} className="mb-8">
          {/* Phase header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-oc-border" />
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                background: `${phase.accent}18`,
                color: phase.accent,
                borderColor: `${phase.accent}44`,
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: phase.accent }} />
              Phase {phase.num}: {phase.title}
              <span className="font-code opacity-70">(Tuần {WEEKS[phase.weeks[0]].num}–{WEEKS[phase.weeks[3]].num})</span>
            </div>
            <div className="h-px flex-1 bg-oc-border" />
          </div>

          {/* Weeks */}
          <div>
            {phase.weeks.map((wId, i) => (
              <WeekNode
                key={wId}
                week={WEEKS[wId]}
                phase={phase}
                status={getWeekStatus(wId)}
                isLast={i === phase.weeks.length - 1}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

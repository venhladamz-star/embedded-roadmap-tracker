// Progress.jsx — Progress tracking, stats, achievements
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, BookOpen, CheckSquare2, Flame, Trophy, ChevronRight, AlertTriangle, X } from 'lucide-react'
import { PHASES, WEEKS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'

const ACHIEVEMENTS = [
  { id: 'phase1',   label: 'Phase Master I',    desc: 'Hoàn thành Phase 1: Củng cố nền',         emoji: '🎖️', color: '#2F81F7' },
  { id: 'phase2',   label: 'Phase Master II',   desc: 'Hoàn thành Phase 2: Ngoại vi & Giao tiếp', emoji: '🎖️', color: '#238636' },
  { id: 'phase3',   label: 'Phase Master III',  desc: 'Hoàn thành Phase 3: FreeRTOS',             emoji: '🎖️', color: '#D29922' },
  { id: 'phase4',   label: 'Phase Master IV',   desc: 'Hoàn thành Phase 4: Hoàn thiện & Dự án',  emoji: '🏆', color: '#F85149' },
  { id: 'halfway',  label: 'Halfway There!',    desc: 'Hoàn thành 8/16 tuần',                     emoji: '⚡', color: '#58A6FF' },
  { id: 'engineer', label: 'Embedded Engineer', desc: 'Hoàn thành cả 16 tuần',                    emoji: '🚀', color: '#3FB950' },
  { id: 'streak7',  label: 'Streak 7 ngày',     desc: 'Học 7 ngày liên tiếp',                     emoji: '🔥', color: '#F78166' },
]

const STATUS_STYLES = {
  done:   { bg: '#0A3622', border: '#238636', text: '#3FB950', label: 'Hoàn thành' },
  active: { bg: '#2D1500', border: '#D29922', text: '#D29922', label: 'Đang học' },
  todo:   { bg: '#21262D', border: '#30363D', text: '#8B949E', label: 'Chưa bắt đầu' },
}

export default function Progress() {
  const navigate = useNavigate()
  const { stats, getWeekStatus, getWeekProgress, resetProgress } = useProgressContext()
  const [showConfirm, setShowConfirm] = useState(false)

  const totalResources = Object.values(WEEKS).reduce((a, w) => a + w.resources.length, 0)
  const totalExercises = Object.values(WEEKS).reduce((a, w) => a + w.exercises.length, 0)

  function handleReset() {
    resetProgress()
    setShowConfirm(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 fade-in">
      <h1 className="text-xl font-semibold text-oc-text tracking-tight mb-6">Tiến trình học tập</h1>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: <BarChart3 size={16} className="text-oc-link" />, label: 'Tuần hoàn thành', value: `${stats.weeksCompleted}/16`, color: '#2F81F7' },
          { icon: <BookOpen size={16} className="text-oc-success-fg" />, label: 'Tài liệu đã học', value: `${stats.resourcesDone}/${totalResources}`, color: '#3FB950' },
          { icon: <CheckSquare2 size={16} className="text-oc-warning" />, label: 'Bài tập xong', value: `${stats.exercisesDone}/${totalExercises}`, color: '#D29922' },
          { icon: <Flame size={16} className="text-oc-accent" />, label: 'Streak hiện tại', value: `${stats.streak} ngày`, color: '#F78166' },
        ].map((s, i) => (
          <div key={i} className="bg-oc-surface border border-oc-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-oc-muted">{s.label}</span></div>
            <div className="text-xl font-semibold font-code" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Week table */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-oc-text mb-3">Chi tiết từng tuần</h2>
        <div className="bg-oc-surface border border-oc-border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-oc-muted font-medium bg-oc-modal border-b border-oc-border">
            <div className="col-span-1">Tuần</div>
            <div className="col-span-4">Tên</div>
            <div className="col-span-3">Tiến trình</div>
            <div className="col-span-2">Trạng thái</div>
            <div className="col-span-2"></div>
          </div>
          {Object.values(WEEKS).map(week => {
            const status = getWeekStatus(week.id)
            const wd = getWeekProgress(week.id)
            const doneRes = week.resources.filter(r => wd.resources[r.id]).length
            const pct = Math.round((doneRes / week.resources.length) * 100)
            const st = STATUS_STYLES[status]
            const phase = PHASES.find(p => p.id === week.phase)

            return (
              <div
                key={week.id}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 border-b border-oc-border last:border-0 hover:bg-oc-overlay cursor-pointer transition-colors"
                onClick={() => navigate(`/week/${week.id}`)}
              >
                <div className="col-span-1 text-xs font-code text-oc-muted">W{week.num}</div>
                <div className="col-span-4 text-sm text-oc-body truncate">{week.title}</div>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="flex-1 progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, background: phase?.accent }}
                    />
                  </div>
                  <span className="text-xs font-code text-oc-muted">{pct}%</span>
                </div>
                <div className="col-span-2">
                  <span
                    className="chip text-xs"
                    style={{ background: st.bg, color: st.text, border: `1px solid ${st.border}` }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <ChevronRight size={13} className="text-oc-faint" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-oc-text mb-3 flex items-center gap-2">
          <Trophy size={14} className="text-oc-warning" /> Thành tích
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map(a => {
            const unlocked = stats.badges.includes(a.id)
            return (
              <div
                key={a.id}
                className={`rounded-lg border p-4 text-center transition-colors
                  ${unlocked
                    ? 'bg-oc-surface border-oc-border-h'
                    : 'bg-oc-modal border-oc-border opacity-50'
                  }`}
              >
                <div className="text-3xl mb-2" style={{ filter: unlocked ? 'none' : 'grayscale(1)' }}>
                  {a.emoji}
                </div>
                <div className={`text-xs font-semibold mb-1 ${unlocked ? 'text-oc-text' : 'text-oc-muted'}`}>
                  {a.label}
                </div>
                <div className="text-xs text-oc-muted leading-tight">{a.desc}</div>
                {unlocked && (
                  <div className="mt-2">
                    <span className="chip text-xs bg-oc-done-bg text-oc-success-fg border border-oc-success/30">
                      Mở khóa ✓
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <div className="bg-oc-surface border border-oc-error/30 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-oc-error mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-oc-text mb-1">Reset tiến trình</div>
              <div className="text-xs text-oc-muted mb-3">
                Xóa toàn bộ dữ liệu học: tài liệu đã tick, bài tập, ghi chú, streak. Không thể hoàn tác.
              </div>
              <button
                onClick={() => setShowConfirm(true)}
                className="px-4 py-2 text-xs font-medium border border-oc-error text-oc-error rounded
                  hover:bg-oc-error hover:text-white transition-colors"
              >
                Reset tất cả tiến trình
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-oc-modal border border-oc-border rounded-lg p-6 max-w-md w-full fade-in">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-semibold text-oc-text">Xác nhận reset tiến trình?</h3>
              <button onClick={() => setShowConfirm(false)} className="text-oc-muted hover:text-oc-body">
                <X size={14} />
              </button>
            </div>
            <p className="text-xs text-oc-muted mb-5">
              Toàn bộ tiến trình học, ghi chú và thành tích sẽ bị xóa vĩnh viễn. Bạn có chắc không?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-xs border border-oc-border text-oc-muted rounded hover:border-oc-border-h hover:text-oc-body transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs bg-oc-error border border-oc-error text-white rounded hover:bg-oc-error/80 transition-colors"
              >
                Xác nhận reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

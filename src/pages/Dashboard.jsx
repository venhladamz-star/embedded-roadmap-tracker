// Dashboard.jsx — Main dashboard / homepage
import { useNavigate } from 'react-router-dom'
import { Cpu, ArrowRight, Zap, BookOpen, Target, Flame } from 'lucide-react'
import { PHASES, WEEKS, GOALS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'
import PhaseCard from '../components/PhaseCard'
import ProgressRing from '../components/ProgressRing'

export default function Dashboard() {
  const navigate = useNavigate()
  const { stats, getWeekStatus, getCurrentWeek } = useProgressContext()
  const currentWeekId = getCurrentWeek()
  const currentWeek = WEEKS[currentWeekId]
  const currentPhase = PHASES.find(p => p.weeks.includes(currentWeekId))

  return (
    <div className="max-w-5xl mx-auto px-5 py-8 fade-in">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 p-6 bg-oc-surface border border-oc-border rounded-lg">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-oc-bg border border-oc-border rounded flex items-center justify-center">
              <Cpu size={16} className="text-oc-link" />
            </div>
            <span className="text-xs font-medium text-oc-muted">embedded-roadmap-tracker</span>
          </div>
          <h1 className="text-2xl font-semibold text-oc-text tracking-tight mb-2">
            Lộ trình Embedded Software 16 tuần
          </h1>
          <p className="text-sm text-oc-muted max-w-md">
            Dành cho sinh viên Kỹ thuật điều khiển & Tự động hóa. 
            Học từ tài liệu ngoài, track tiến trình, chinh phục từng tuần.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen size={14} className="text-oc-success-fg" />
              <span className="text-oc-body">{stats.resourcesDone} tài liệu đã học</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target size={14} className="text-oc-link" />
              <span className="text-oc-body">{stats.exercisesDone} bài tập xong</span>
            </div>
            {stats.streak > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Flame size={14} className="text-oc-accent" />
                <span className="text-oc-body">Streak {stats.streak} ngày</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <ProgressRing done={stats.weeksCompleted} total={16} size={110} strokeWidth={7} />
          <span className="text-xs text-oc-muted">tuần hoàn thành</span>
        </div>
      </div>

      {/* Phase cards */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-oc-muted uppercase tracking-widest mb-4">
          4 Giai đoạn học
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map(phase => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </section>

      {/* Continue learning */}
      {currentWeek && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold text-oc-muted uppercase tracking-widest mb-4">
            Tiếp tục học
          </h2>
          <div
            className="flex items-center justify-between gap-4 p-5 bg-oc-surface border border-oc-border rounded-lg
              hover:border-oc-border-h transition-colors cursor-pointer pulse-accent"
            onClick={() => navigate(`/week/${currentWeekId}`)}
            style={{ borderLeft: `3px solid ${currentPhase?.accent || '#F78166'}` }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="chip text-xs font-medium"
                  style={{
                    background: `${currentPhase?.accent}22`,
                    color: currentPhase?.accent,
                    border: `1px solid ${currentPhase?.accent}44`,
                  }}
                >
                  Phase {currentPhase?.num} — {currentPhase?.title}
                </span>
                <span className="text-xs text-oc-muted font-code">Tuần {currentWeek.num}</span>
              </div>
              <h3 className="text-base font-semibold text-oc-text tracking-tight">
                {currentWeek.title}
              </h3>
              <p className="text-xs text-oc-muted mt-1">
                {currentWeek.resources.length} tài liệu · {currentWeek.exercises.length} bài tập
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded
                bg-oc-success border border-oc-success text-white hover:bg-oc-success/90 transition-colors flex-shrink-0"
            >
              Vào tuần {currentWeek.num} <ArrowRight size={14} />
            </button>
          </div>
        </section>
      )}

      {/* Goals */}
      <section>
        <h2 className="text-xs font-semibold text-oc-muted uppercase tracking-widest mb-4">
          Mục tiêu sau 16 tuần
        </h2>
        <div className="bg-oc-surface border border-oc-border rounded-lg overflow-hidden">
          {GOALS.map((goal, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-5 py-3 border-b border-oc-border last:border-0"
            >
              <div className="w-5 h-5 rounded-full bg-oc-overlay border border-oc-border flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-oc-muted font-code">{i + 1}</span>
              </div>
              <span className="text-sm text-oc-body">{goal}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

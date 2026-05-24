// WeekDetail.jsx — Core page for individual week learning
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { PHASES, WEEKS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'
import Sidebar from '../components/Sidebar'
import ResourceCard from '../components/ResourceCard'
import ExerciseRow from '../components/ExerciseRow'

export default function WeekDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const weekId = id || 'w1'
  const week = WEEKS[weekId]
  const { getWeekProgress, toggleResource, toggleExercise, saveNote, saveExNote, isWeekDone } = useProgressContext()

  const weekData = getWeekProgress(weekId)
  const phase = PHASES.find(p => p.id === week?.phase)

  // Notes with debounce
  const [noteText, setNoteText] = useState(weekData.notes || '')
  const [noteSavedAt, setNoteSavedAt] = useState(null)
  const noteDebounce = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sync note when week changes
  useEffect(() => {
    setNoteText(weekData.notes || '')
    setNoteSavedAt(null)
  }, [weekId])

  function handleNoteChange(val) {
    setNoteText(val)
    clearTimeout(noteDebounce.current)
    noteDebounce.current = setTimeout(() => {
      saveNote(weekId, val)
      setNoteSavedAt(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
  }

  if (!week) {
    return (
      <div className="flex items-center justify-center h-96 text-oc-muted">
        Không tìm thấy tuần học này.
      </div>
    )
  }

  // All weeks in order for navigation
  const weekIds = Object.keys(WEEKS)
  const currentIdx = weekIds.indexOf(weekId)
  const prevWeekId = currentIdx > 0 ? weekIds[currentIdx - 1] : null
  const nextWeekId = currentIdx < weekIds.length - 1 ? weekIds[currentIdx + 1] : null

  // Progress count
  const requiredResources = week.resources.filter(r => r.tag === 'required')
  const doneMandatory = requiredResources.filter(r => weekData.resources[r.id]).length
  const totalResources = week.resources.length
  const doneResources = week.resources.filter(r => weekData.resources[r.id]).length
  const weekDone = isWeekDone(weekId)

  return (
    <div className="flex h-[calc(100vh-48px)]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-12 z-40 md:z-auto
        ${sidebarOpen ? 'left-0' : '-left-72'}
        md:left-auto transition-all duration-200 md:transition-none
      `}>
        <Sidebar currentWeekId={weekId} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 py-6 fade-in">
          {/* Mobile menu button */}
          <button
            className="md:hidden mb-4 px-3 py-1.5 text-xs text-oc-muted border border-oc-border rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Menu tuần
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-oc-muted mb-4">
            <span
              className="cursor-pointer hover:text-oc-body transition-colors"
              onClick={() => navigate('/roadmap')}
            >
              Lộ trình
            </span>
            <ChevronRight size={12} className="text-oc-faint" />
            <span style={{ color: phase?.accent }}>{phase?.title}</span>
            <ChevronRight size={12} className="text-oc-faint" />
            <span className="text-oc-body">Tuần {week.num}</span>
          </div>

          {/* Week header */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              {/* Phase badge */}
              <span
                className="chip text-xs font-medium flex-shrink-0 mt-0.5"
                style={{
                  background: `${phase?.accent}20`,
                  color: phase?.accent,
                  border: `1px solid ${phase?.accent}40`,
                }}
              >
                Phase {phase?.num}
              </span>
              {weekDone && (
                <span className="chip text-xs font-medium bg-oc-done-bg text-oc-success-fg border border-oc-success/40">
                  <CheckCircle2 size={11} /> Hoàn thành
                </span>
              )}
            </div>
            <h1 className="text-xl font-semibold text-oc-text tracking-tight mb-3">
              Tuần {week.num}: {week.title}
            </h1>

            {/* Resource progress */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${totalResources > 0 ? (doneResources/totalResources)*100 : 0}%`, background: phase?.accent }}
                />
              </div>
              <span className="text-xs font-code text-oc-muted flex-shrink-0">
                {doneResources}/{totalResources} tài liệu
                {requiredResources.length > 0 && (
                  <span className="text-oc-faint"> · {doneMandatory}/{requiredResources.length} bắt buộc</span>
                )}
              </span>
            </div>
          </div>

          {/* Prev / Next nav */}
          <div className="flex items-center justify-between mb-8">
            {prevWeekId ? (
              <button
                onClick={() => navigate(`/week/${prevWeekId}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-oc-muted border border-oc-border rounded
                  hover:border-oc-border-h hover:text-oc-body transition-colors"
              >
                <ChevronLeft size={13} />
                Tuần {WEEKS[prevWeekId].num}
              </button>
            ) : <div />}
            {nextWeekId && (
              <button
                onClick={() => navigate(`/week/${nextWeekId}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-oc-muted border border-oc-border rounded
                  hover:border-oc-border-h hover:text-oc-body transition-colors"
              >
                Tuần {WEEKS[nextWeekId].num}
                <ChevronRight size={13} />
              </button>
            )}
          </div>

          {/* ── SECTION A: Objectives ── */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-oc-text mb-3 flex items-center gap-2">
              <span className="text-oc-muted">A.</span> Học gì tuần này?
            </h2>
            <div className="bg-oc-surface border border-oc-border rounded-lg divide-y divide-oc-border overflow-hidden">
              {week.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <span className="text-oc-faint text-xs font-code mt-0.5 flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <span className="text-sm text-oc-body font-code">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION B: Resources ── */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-oc-text flex items-center gap-2">
                <span className="text-oc-muted">B.</span> Tài liệu học
              </h2>
              <span className="text-xs text-oc-muted font-code">
                {doneResources}/{totalResources}
              </span>
            </div>
            <div className="space-y-3">
              {week.resources.map(r => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  done={!!weekData.resources[r.id]}
                  onToggle={() => toggleResource(weekId, r.id)}
                />
              ))}
            </div>
            {doneMandatory === requiredResources.length && requiredResources.length > 0 && (
              <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-oc-done-bg border border-oc-success/40 rounded-lg text-xs text-oc-success-fg">
                <CheckCircle2 size={14} />
                Tất cả tài liệu bắt buộc đã hoàn thành! Tuần này được tính là xong.
              </div>
            )}
          </section>

          {/* ── SECTION C: Exercises ── */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-oc-text mb-3 flex items-center gap-2">
              <span className="text-oc-muted">C.</span> Bài tập thực hành
            </h2>
            <div className="space-y-3">
              {week.exercises.map(ex => (
                <ExerciseRow
                  key={ex.id}
                  exercise={ex}
                  done={!!weekData.exercises[ex.id]}
                  note={weekData.exNotes?.[ex.id] || ''}
                  onToggle={() => toggleExercise(weekId, ex.id)}
                  onNoteChange={(val) => saveExNote(weekId, ex.id, val)}
                />
              ))}
            </div>
          </section>

          {/* ── SECTION D: Personal Notes ── */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-oc-text flex items-center gap-2">
                <span className="text-oc-muted">D.</span> Ghi chú cá nhân
              </h2>
              {noteSavedAt && (
                <span className="text-xs text-oc-faint font-code">Lưu lúc {noteSavedAt}</span>
              )}
            </div>
            <textarea
              value={noteText}
              onChange={e => handleNoteChange(e.target.value)}
              placeholder="// ghi chú, điều thú vị, câu hỏi chưa hiểu..."
              className="w-full px-4 py-3 bg-oc-bg border border-oc-border rounded-lg
                text-sm text-oc-body placeholder-oc-faint outline-none focus:border-oc-primary
                font-code transition-colors leading-relaxed"
              style={{ minHeight: 140 }}
            />
          </section>

          {/* Next week CTA */}
          {nextWeekId && weekDone && (
            <div className="flex justify-end">
              <button
                onClick={() => navigate(`/week/${nextWeekId}`)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded
                  bg-oc-success border border-oc-success text-white hover:bg-oc-success/90 transition-colors"
              >
                Tiếp theo: Tuần {WEEKS[nextWeekId].num} →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

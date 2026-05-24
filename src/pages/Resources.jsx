// Resources.jsx — All resources library with filters
import { useState, useMemo } from 'react'
import { Search, ExternalLink, CheckCircle2, Circle, Play, FileText, MonitorSmartphone, GitBranch, Wrench, FileType2 } from 'lucide-react'
import { PHASES, WEEKS, RESOURCE_TYPE_LABELS } from '../data/courseData'
import { useProgressContext } from '../context/ProgressContext'
import { useNavigate } from 'react-router-dom'

const TYPE_ICONS = {
  video:       <Play size={13} className="text-oc-error" />,
  article:     <FileText size={13} className="text-oc-link" />,
  interactive: <MonitorSmartphone size={13} className="text-oc-warning" />,
  github:      <GitBranch size={13} className="text-oc-body" />,
  tool:        <Wrench size={13} className="text-oc-success-fg" />,
  pdf:         <FileType2 size={13} className="text-oc-warning" />,
}

const TAG_STYLES = {
  required:    'text-oc-accent bg-red-900/30 border-oc-accent/30',
  recommended: 'text-oc-warning bg-yellow-900/20 border-oc-warning/30',
  optional:    'text-oc-muted bg-oc-modal border-oc-border',
}
const TAG_LABELS = { required: 'Bắt buộc', recommended: 'Khuyến nghị', optional: 'Tùy chọn' }

export default function Resources() {
  const navigate = useNavigate()
  const { getWeekProgress, toggleResource } = useProgressContext()

  const [typeFilter, setTypeFilter] = useState('all')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Flatten all resources
  const allResources = useMemo(() => {
    const arr = []
    Object.values(WEEKS).forEach(week => {
      const phase = PHASES.find(p => p.id === week.phase)
      week.resources.forEach(r => {
        arr.push({ ...r, weekId: week.id, weekNum: week.num, weekTitle: week.title, phase })
      })
    })
    return arr
  }, [])

  const filtered = useMemo(() => {
    return allResources.filter(r => {
      const wd = getWeekProgress(r.weekId)
      const isDone = !!wd.resources[r.id]

      if (typeFilter !== 'all' && r.type !== typeFilter) return false
      if (phaseFilter !== 'all' && r.phase.id !== phaseFilter) return false
      if (statusFilter === 'done' && !isDone) return false
      if (statusFilter === 'todo' && isDone) return false
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) &&
          !r.source.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [allResources, typeFilter, phaseFilter, statusFilter, search, getWeekProgress])

  const totalDone = allResources.filter(r => !!getWeekProgress(r.weekId).resources[r.id]).length

  return (
    <div className="max-w-5xl mx-auto px-5 py-8 fade-in">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-oc-text tracking-tight mb-1">Thư viện tài liệu</h1>
          <p className="text-sm text-oc-muted font-code">{totalDone}/{allResources.length} tài liệu đã học</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-oc-surface border border-oc-border rounded w-64
          focus-within:border-oc-primary transition-colors">
          <Search size={13} className="text-oc-faint" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm tài liệu..."
            className="bg-transparent text-xs text-oc-body placeholder-oc-faint outline-none w-full font-code"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1">
          {['all', 'video', 'article', 'github', 'tool', 'interactive', 'pdf'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-xs rounded border transition-colors
                ${typeFilter === t
                  ? 'bg-oc-primary/20 border-oc-primary/50 text-oc-link'
                  : 'bg-oc-surface border-oc-border text-oc-muted hover:text-oc-body hover:border-oc-border-h'
                }`}
            >
              {t === 'all' ? 'Tất cả' : RESOURCE_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Phase filter */}
        <div className="flex gap-1">
          {['all', 'p1', 'p2', 'p3', 'p4'].map(p => {
            const phase = PHASES.find(ph => ph.id === p)
            return (
              <button
                key={p}
                onClick={() => setPhaseFilter(p)}
                className={`px-3 py-1.5 text-xs rounded border transition-colors
                  ${phaseFilter === p
                    ? 'bg-oc-modal border-oc-border-h text-oc-text'
                    : 'bg-oc-surface border-oc-border text-oc-muted hover:text-oc-body'
                  }`}
              >
                {p === 'all' ? 'P1-P4' : `P${phase?.num}`}
              </button>
            )
          })}
        </div>

        {/* Status filter */}
        <div className="flex gap-1">
          {[
            { val: 'all', label: 'Tất cả' },
            { val: 'done', label: 'Đã học' },
            { val: 'todo', label: 'Chưa học' },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setStatusFilter(val)}
              className={`px-3 py-1.5 text-xs rounded border transition-colors
                ${statusFilter === val
                  ? 'bg-oc-success/20 border-oc-success/50 text-oc-success-fg'
                  : 'bg-oc-surface border-oc-border text-oc-muted hover:text-oc-body'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-oc-muted mb-4 font-code">
        {filtered.length} tài liệu
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(r => {
          const wd = getWeekProgress(r.weekId)
          const isDone = !!wd.resources[r.id]
          return (
            <div
              key={r.id}
              className={`p-4 rounded-lg border transition-colors
                ${isDone ? 'resource-done' : 'bg-oc-surface border-oc-border hover:border-oc-border-h'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0
                  ${isDone ? 'bg-oc-success/20' : 'bg-oc-modal'}`}>
                  {isDone ? <CheckCircle2 size={14} className="text-oc-success-fg" /> : TYPE_ICONS[r.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-0.5">
                    <span className="text-sm font-medium text-oc-text flex-1 truncate">{r.title}</span>
                    <span className={`chip text-xs flex-shrink-0 border ${TAG_STYLES[r.tag]}`}>
                      {TAG_LABELS[r.tag]}
                    </span>
                  </div>
                  <div className="text-xs text-oc-muted mb-1">
                    {r.source} ·{' '}
                    <button
                      className="text-oc-link hover:underline"
                      onClick={() => navigate(`/week/${r.weekId}`)}
                    >
                      Tuần {r.weekNum}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-oc-link hover:text-oc-primary-h no-underline"
                    >
                      <ExternalLink size={11} />
                      Mở ↗
                    </a>
                    <button
                      onClick={() => toggleResource(r.weekId, r.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ml-auto
                        ${isDone ? 'text-oc-success-fg' : 'text-oc-faint hover:text-oc-muted'}`}
                    >
                      {isDone ? <><CheckCircle2 size={11} /> Đã học</> : <><Circle size={11} /> Đánh dấu</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-oc-muted">
          <div className="text-3xl mb-3">🔍</div>
          <div className="text-sm">Không tìm thấy tài liệu phù hợp</div>
        </div>
      )}
    </div>
  )
}

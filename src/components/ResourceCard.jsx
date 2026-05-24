// ResourceCard.jsx — Single resource card with toggle
import { ExternalLink, Play, FileText, MonitorSmartphone, Github, Wrench, FileType2, CheckCircle2, Circle } from 'lucide-react'

const ICONS = {
  video:       <Play size={15} className="text-oc-error" />,
  article:     <FileText size={15} className="text-oc-link" />,
  interactive: <MonitorSmartphone size={15} className="text-oc-warning" />,
  github:      <Github size={15} className="text-oc-body" />,
  tool:        <Wrench size={15} className="text-oc-success-fg" />,
  pdf:         <FileType2 size={15} className="text-oc-warning" />,
}

const TAG_STYLES = {
  required:    'bg-red-900/30 text-oc-accent border border-oc-accent/40',
  recommended: 'bg-yellow-900/20 text-oc-warning border border-oc-warning/30',
  optional:    'bg-oc-modal text-oc-muted border border-oc-border',
}

const TAG_LABELS = {
  required:    'Bắt buộc',
  recommended: 'Khuyến nghị',
  optional:    'Tùy chọn',
}

export default function ResourceCard({ resource, done, onToggle }) {
  const icon = ICONS[resource.type] || <FileText size={15} />

  return (
    <div
      className={`rounded-lg border p-4 transition-all duration-150
        ${done
          ? 'resource-done'
          : 'bg-oc-surface border-oc-border hover:border-oc-border-h'
        }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`mt-0.5 w-8 h-8 rounded flex items-center justify-center flex-shrink-0
          ${done ? 'bg-oc-success/20' : 'bg-oc-modal'}`}>
          {done
            ? <CheckCircle2 size={15} className="text-oc-success-fg" />
            : icon
          }
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className={`text-sm font-medium ${done ? 'text-oc-success-fg' : 'text-oc-text'}`}>
              {resource.title}
            </span>
            <span className={`chip text-xs flex-shrink-0 ${TAG_STYLES[resource.tag]}`}>
              {TAG_LABELS[resource.tag]}
              {done && resource.tag === 'required' && ' ✓'}
            </span>
          </div>
          <div className="text-xs text-oc-muted mb-3">
            <span className="font-medium text-oc-body">{resource.source}</span>
            {resource.desc && <span> · {resource.desc}</span>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded
                bg-oc-modal border border-oc-border text-oc-body
                hover:border-oc-border-h hover:text-oc-text transition-colors no-underline"
            >
              <ExternalLink size={12} />
              {done ? 'Xem lại ↗' : 'Mở tài liệu ↗'}
            </a>

            <button
              onClick={onToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors
                ${done
                  ? 'bg-oc-success/20 border border-oc-success text-oc-success-fg'
                  : 'bg-transparent border border-oc-border text-oc-muted hover:border-oc-border-h hover:text-oc-body'
                }`}
            >
              {done
                ? <><CheckCircle2 size={12} /> Đã học</>
                : <><Circle size={12} /> Đánh dấu</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

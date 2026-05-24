// ExerciseRow.jsx — Exercise checkbox + note input
import { CheckSquare2, Square, Clock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function ExerciseRow({ exercise, done, note, onToggle, onNoteChange }) {
  const [localNote, setLocalNote] = useState(note || '')
  const debounceRef = useRef(null)

  useEffect(() => {
    setLocalNote(note || '')
  }, [note])

  function handleNoteChange(val) {
    setLocalNote(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onNoteChange(val)
    }, 800)
  }

  return (
    <div className={`rounded-lg border p-4 transition-colors duration-150
      ${done ? 'bg-oc-done-bg border-oc-success/50' : 'bg-oc-surface border-oc-border hover:border-oc-border-h'}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className="mt-0.5 flex-shrink-0 transition-colors"
        >
          {done
            ? <CheckSquare2 size={18} className="text-oc-success-fg" />
            : <Square size={18} className="text-oc-faint hover:text-oc-muted" />
          }
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-medium ${done ? 'text-oc-success-fg line-through opacity-70' : 'text-oc-text'}`}>
              {exercise.title}
            </span>
            {exercise.required && (
              <span className="chip text-xs bg-red-900/30 text-oc-accent border border-oc-accent/40">
                Bắt buộc
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-oc-faint ml-auto font-code">
              <Clock size={11} />
              {exercise.est}
            </span>
          </div>
          <p className="text-xs text-oc-muted mb-2">{exercise.desc}</p>
          <input
            type="text"
            value={localNote}
            onChange={e => handleNoteChange(e.target.value)}
            placeholder="Ghi chú / link code của bạn..."
            className="w-full px-3 py-1.5 text-xs bg-oc-bg border border-oc-border rounded
              text-oc-body placeholder-oc-faint outline-none focus:border-oc-primary
              font-code transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

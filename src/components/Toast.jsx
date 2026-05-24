// Toast.jsx — Badge unlock notification
import { useEffect, useState } from 'react'
import { Award, X } from 'lucide-react'

const BADGE_INFO = {
  phase1:   { label: 'Phase Master I',      emoji: '🎖️' },
  phase2:   { label: 'Phase Master II',     emoji: '🎖️' },
  phase3:   { label: 'Phase Master III',    emoji: '🎖️' },
  phase4:   { label: 'Phase Master IV',     emoji: '🏆' },
  halfway:  { label: 'Halfway There!',      emoji: '⚡' },
  engineer: { label: 'Embedded Engineer',   emoji: '🚀' },
  streak7:  { label: 'Streak 7 ngày!',      emoji: '🔥' },
}

export default function Toast({ badge, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (badge) {
      setVisible(true)
      const t = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 250)
      }, 3500)
      return () => clearTimeout(t)
    }
  }, [badge, onClose])

  if (!badge) return null
  const info = BADGE_INFO[badge] || { label: badge, emoji: '🏅' }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 
        bg-oc-surface border border-oc-success rounded-lg shadow-2xl
        ${visible ? 'toast-enter' : 'toast-exit'}`}
      style={{ minWidth: 280 }}
    >
      <div className="text-2xl">{info.emoji}</div>
      <div className="flex-1">
        <div className="text-xs text-oc-success-fg font-medium mb-0.5">Badge mới mở khóa!</div>
        <div className="text-sm font-semibold text-oc-text">{info.label}</div>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 250) }}
        className="text-oc-muted hover:text-oc-body transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}

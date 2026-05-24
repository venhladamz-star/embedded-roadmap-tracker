// Footer.jsx — Footer component
import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 bg-oc-surface border-t border-oc-border flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2 text-oc-muted text-xs">
        <Cpu size={12} className="text-oc-link" />
        <span>embedded-roadmap-tracker · Lộ trình 16 tuần</span>
      </div>
      <div className="text-xs text-oc-faint font-medium tracking-wide">
        Built by <span className="text-oc-text font-semibold hover:text-oc-primary transition-colors">Vũ Khuê</span>
      </div>
    </footer>
  )
}

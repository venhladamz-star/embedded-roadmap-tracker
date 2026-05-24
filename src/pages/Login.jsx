// Login.jsx — Google Sign-In page (Octo Code design)
import { useState } from 'react'
import { Cpu, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function handleLogin() {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError('Đăng nhập thất bại. Thử lại nhé!')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-oc-bg flex items-center justify-center px-4">
      {/* Background grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#E6EDF3 1px, transparent 1px),
                            linear-gradient(90deg, #E6EDF3 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-sm fade-in">
        {/* Card */}
        <div className="bg-oc-surface border border-oc-border rounded-lg overflow-hidden">
          {/* Top accent bar */}
          <div className="h-0.5 bg-gradient-to-r from-phase1 via-phase2 to-phase3" />

          <div className="p-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-oc-bg border border-oc-border rounded-lg flex items-center justify-center">
                <Cpu size={20} className="text-oc-link" />
              </div>
              <div>
                <div className="text-sm font-semibold text-oc-text tracking-tight">
                  embedded-roadmap
                </div>
                <div className="text-xs text-oc-muted">tracker · 16 tuần</div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-xl font-semibold text-oc-text tracking-tight mb-1">
              Chào mừng trở lại
            </h1>
            <p className="text-sm text-oc-muted mb-8">
              Đăng nhập để lưu tiến trình học của bạn lên cloud — truy cập từ mọi thiết bị.
            </p>

            {/* Google Sign-In Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3
                bg-white text-gray-800 font-medium text-sm rounded-lg border border-gray-200
                hover:bg-gray-50 active:bg-gray-100 transition-colors
                disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin text-gray-500" />
              ) : (
                /* Google SVG icon */
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </g>
                </svg>
              )}
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập với Google'}
            </button>

            {/* Error */}
            {error && (
              <p className="mt-3 text-xs text-oc-error text-center">{error}</p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-oc-border" />
              <span className="text-xs text-oc-faint">lộ trình 16 tuần</span>
              <div className="flex-1 h-px bg-oc-border" />
            </div>

            {/* Phase pills */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Củng cố nền',          weeks: 'W1–4',  color: '#2F81F7' },
                { label: 'Ngoại vi & Giao tiếp', weeks: 'W5–8',  color: '#238636' },
                { label: 'FreeRTOS',              weeks: 'W9–12', color: '#D29922' },
                { label: 'Hoàn thiện & Dự án',   weeks: 'W13–16',color: '#F85149' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded bg-oc-modal border border-oc-border"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <div>
                    <div className="text-xs text-oc-body leading-none">{p.label}</div>
                    <div className="text-xs text-oc-faint font-code">{p.weeks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-oc-faint mt-4">
          Dữ liệu học của bạn được lưu riêng tư trên Firebase
        </p>
      </div>
    </div>
  )
}

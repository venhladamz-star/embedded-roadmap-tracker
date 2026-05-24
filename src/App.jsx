// App.jsx — Root application with Auth guard + routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProgressProvider, useProgressContext } from './context/ProgressContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import WeekDetail from './pages/WeekDetail'
import Resources from './pages/Resources'
import Progress from './pages/Progress'

// ── Loading screen ────────────────────────────────────────
function LoadingScreen({ message = 'Đang tải...' }) {
  return (
    <div className="min-h-screen bg-oc-bg flex flex-col items-center justify-center gap-3">
      <Loader2 size={24} className="text-oc-muted animate-spin" />
      <span className="text-sm text-oc-muted font-code">{message}</span>
    </div>
  )
}

// ── App content (inside auth + progress providers) ────────
function AppContent() {
  const { user, loading: authLoading } = useAuth()
  const { cloudLoading, newBadge }     = useProgressContext()

  if (authLoading) return <LoadingScreen message="Đang xác thực..." />
  if (!user)       return <Login />
  if (cloudLoading) return <LoadingScreen message="Đang tải tiến trình..." />

  return (
    <div className="min-h-screen bg-oc-bg flex flex-col justify-between">
      <div className="flex-1">
        <Navbar />
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/roadmap"   element={<Roadmap />} />
          <Route path="/week/:id"  element={<WeekDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/progress"  element={<Progress />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
      <Toast badge={newBadge} onClose={() => {}} />
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

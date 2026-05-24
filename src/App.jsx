// App.jsx — Root application with routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider, useProgressContext } from './context/ProgressContext'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import WeekDetail from './pages/WeekDetail'
import Resources from './pages/Resources'
import Progress from './pages/Progress'

function AppContent() {
  const { newBadge } = useProgressContext()

  return (
    <div className="min-h-screen bg-oc-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/week/:id" element={<WeekDetail />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <Toast badge={newBadge} onClose={() => {}} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </BrowserRouter>
  )
}

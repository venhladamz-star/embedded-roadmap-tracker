// ProgressContext.jsx — Global context passing uid from auth
import { createContext, useContext } from 'react'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from './AuthContext'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const progress = useProgress(user?.uid || null)

  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressContext must be used within ProgressProvider')
  return ctx
}

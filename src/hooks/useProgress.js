// useProgress.js — localStorage + Firestore cloud sync
import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { PHASES, WEEKS } from '../data/courseData'

const STORAGE_KEY = 'emb_progress_v1'

const defaultState = () => ({
  version: 1,
  lastDate: null,
  streak: { count: 0, lastDate: null },
  weeks: {},
  badges: [],
})

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

function isWeekDone(weekData, weekId) {
  const week = WEEKS[weekId]
  if (!week) return false
  const required = week.resources.filter(r => r.tag === 'required')
  // Nếu không có resource bắt buộc → không auto-done
  if (required.length === 0) return false
  return required.every(r => weekData?.resources?.[r.id] === true)
}

function getWeekDefault(weekId) {
  const week = WEEKS[weekId]
  if (!week) return {}
  const resources = {}
  week.resources.forEach(r => { resources[r.id] = false })
  const exercises = {}
  week.exercises.forEach(e => { exercises[e.id] = false })
  return { resources, exercises, notes: '', exNotes: {}, doneAt: null }
}

function isPhaseDone(phaseId, weeksData) {
  const phase = PHASES.find(p => p.id === phaseId)
  if (!phase) return false
  return phase.weeks.every(wId => isWeekDone(weeksData[wId], wId))
}

function computeBadges(weeksData) {
  const badges = []
  PHASES.forEach(p => {
    if (isPhaseDone(p.id, weeksData)) badges.push(`phase${p.num}`)
  })
  const doneCount = Object.keys(WEEKS).filter(wId => isWeekDone(weeksData[wId], wId)).length
  if (doneCount >= 8)  badges.push('halfway')
  if (doneCount >= 16) badges.push('engineer')
  return badges
}

// ── Firestore helpers ────────────────────────────────────────
function fsDocRef(uid) {
  return doc(db, 'users', uid, 'progress', 'data')
}

async function loadFromCloud(uid) {
  try {
    const snap = await getDoc(fsDocRef(uid))
    if (snap.exists()) return snap.data()
  } catch (e) {
    console.warn('Firestore load failed, using local:', e)
  }
  return null
}

async function saveToCloud(uid, data) {
  try {
    await setDoc(fsDocRef(uid), data)
  } catch (e) {
    console.warn('Firestore save failed:', e)
  }
}

// ── Main hook ────────────────────────────────────────────────
export function useProgress(uid = null) {
  const [progress, setProgress]   = useState(defaultState)
  const [cloudLoading, setCloudLoading] = useState(!!uid)
  const [newBadge, setNewBadge]   = useState(null)
  const saveTimerRef = useRef(null)

  // ── Load progress when uid changes ──────────────────────
  useEffect(() => {
    if (!uid) {
      // Not logged in → use localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setProgress(JSON.parse(raw))
        else setProgress(defaultState())
      } catch (_) {
        setProgress(defaultState())
      }
      setCloudLoading(false)
      return
    }

    // Logged in → load from Firestore (fallback to localStorage)
    setCloudLoading(true)
    setProgress(defaultState()) // reset while loading
    loadFromCloud(uid).then(cloudData => {
      if (cloudData) {
        setProgress(cloudData)
      } else {
        // First time this user — try migrate from localStorage
        try {
          const raw = localStorage.getItem(STORAGE_KEY)
          if (raw) setProgress(JSON.parse(raw))
          else setProgress(defaultState())
        } catch (_) {
          setProgress(defaultState())
        }
      }
      setCloudLoading(false)
    })
  }, [uid])

  // ── Persist to localStorage + debounce Firestore save ───
  const persist = useCallback((data) => {
    // Always save localStorage as cache
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch (_) {}
    // Debounce cloud save (2s)
    if (uid) {
      clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => saveToCloud(uid, data), 2000)
    }
  }, [uid])

  // ── Streak helper ────────────────────────────────────────
  const touchStreak = useCallback((state) => {
    const today = getTodayStr()
    const s = state.streak
    if (s.lastDate === today) return state
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const newCount = s.lastDate === yesterday ? s.count + 1 : 1
    const next = { ...state, streak: { count: newCount, lastDate: today } }
    if (newCount >= 7 && !state.badges.includes('streak7')) {
      return { ...next, badges: [...state.badges, 'streak7'] }
    }
    return next
  }, [])

  // ── Core update ─────────────────────────────────────────
  const update = useCallback((updater) => {
    setProgress(prev => {
      let next = updater(prev)
      // Badges
      const newBadges = computeBadges(next.weeks)
      const added = newBadges.filter(b => !prev.badges.includes(b))
      if (added.length > 0) {
        next = { ...next, badges: [...new Set([...prev.badges, ...newBadges])] }
        setNewBadge(added[0])
        setTimeout(() => setNewBadge(null), 4000)
      }
      next = touchStreak(next)
      persist(next)
      return next
    })
  }, [persist, touchStreak])

  // ── Public actions ───────────────────────────────────────
  const getWeekProgress = useCallback((weekId) =>
    progress.weeks[weekId] || getWeekDefault(weekId), [progress])

  const toggleResource = useCallback((weekId, resourceId) => {
    update(prev => {
      const wd = prev.weeks[weekId] || getWeekDefault(weekId)
      const newVal = !wd.resources[resourceId]
      const newWd = { ...wd, resources: { ...wd.resources, [resourceId]: newVal } }
      if (isWeekDone(newWd, weekId) && !newWd.doneAt) newWd.doneAt = Date.now()
      else if (!isWeekDone(newWd, weekId)) newWd.doneAt = null
      return { ...prev, weeks: { ...prev.weeks, [weekId]: newWd } }
    })
  }, [update])

  const toggleExercise = useCallback((weekId, exerciseId) => {
    update(prev => {
      const wd = prev.weeks[weekId] || getWeekDefault(weekId)
      return { ...prev, weeks: { ...prev.weeks, [weekId]: {
        ...wd, exercises: { ...wd.exercises, [exerciseId]: !wd.exercises[exerciseId] }
      }}}
    })
  }, [update])

  const saveNote = useCallback((weekId, note) => {
    update(prev => {
      const wd = prev.weeks[weekId] || getWeekDefault(weekId)
      return { ...prev, weeks: { ...prev.weeks, [weekId]: { ...wd, notes: note } } }
    })
  }, [update])

  const saveExNote = useCallback((weekId, exId, note) => {
    update(prev => {
      const wd = prev.weeks[weekId] || getWeekDefault(weekId)
      return { ...prev, weeks: { ...prev.weeks, [weekId]: {
        ...wd, exNotes: { ...wd.exNotes, [exId]: note }
      }}}
    })
  }, [update])

  const resetProgress = useCallback(() => {
    const fresh = defaultState()
    setProgress(fresh)
    persist(fresh)
    if (uid) saveToCloud(uid, fresh) // immediate reset
  }, [persist, uid])

  // ── Computed stats ───────────────────────────────────────
  const stats = (() => {
    const weekIds = Object.keys(WEEKS)
    const weeksCompleted = weekIds.filter(wId => isWeekDone(progress.weeks[wId], wId)).length
    let resourcesDone = 0, exercisesDone = 0
    weekIds.forEach(wId => {
      const wd = progress.weeks[wId]
      if (wd) {
        resourcesDone += Object.values(wd.resources).filter(Boolean).length
        exercisesDone += Object.values(wd.exercises).filter(Boolean).length
      }
    })
    return { weeksCompleted, resourcesDone, exercisesDone, streak: progress.streak.count, badges: progress.badges }
  })()

  const getWeekStatus = (weekId) => {
    const wd = progress.weeks[weekId]
    if (isWeekDone(wd, weekId)) return 'done'
    if (!wd) return 'todo'
    const anyDone = Object.values(wd.resources).some(Boolean) ||
                    Object.values(wd.exercises).some(Boolean) ||
                    (wd.notes && wd.notes.trim())
    return anyDone ? 'active' : 'todo'
  }

  const getCurrentWeek = () => {
    for (const wId of Object.keys(WEEKS)) {
      if (!isWeekDone(progress.weeks[wId], wId)) return wId
    }
    return 'w16'
  }

  return {
    progress,
    stats,
    cloudLoading,
    newBadge,
    getWeekProgress,
    getWeekStatus,
    getCurrentWeek,
    toggleResource,
    toggleExercise,
    saveNote,
    saveExNote,
    resetProgress,
    isWeekDone: (wId) => isWeekDone(progress.weeks[wId], wId),
  }
}

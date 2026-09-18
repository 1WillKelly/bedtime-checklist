import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { createDefaultSettings } from '../models/defaultRoutine'
import type { AppSettings, ArtStyle, RoutineItem, RoutineSession } from '../models/types'
import {
  beginCompletion,
  canResume,
  createSession,
  finishCompletion,
  moveTask,
  routineSignature,
  selectActiveTasks,
  startRoutine,
} from './routineMachine'
import {
  clearSession,
  loadSession,
  loadSettings,
  saveSession,
  saveSettings,
} from '../utils/storage'

export type SetupStep = 'welcome' | 'name' | 'routine'

/**
 * The whole app state, in one hook. Configuration and tonight's session are
 * persisted under separate keys so editing settings never corrupts progress
 * and clearing progress never loses configuration.
 */
export function useAppState() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings())
  const [setupStep, setSetupStep] = useState<SetupStep>('welcome')
  const [parentOpen, setParentOpen] = useState(false)

  const tasks = useMemo(() => selectActiveTasks(settings.routine), [settings.routine])
  const tasksRef = useRef(tasks)
  tasksRef.current = tasks

  const [session, setSession] = useState<RoutineSession>(() => {
    const stored = loadSession()
    const active = selectActiveTasks(settings.routine)
    // Resume if the same routine was in progress recently; otherwise start fresh.
    if (stored && canResume(stored, active)) return stored
    return createSession(active)
  })

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  useEffect(() => {
    saveSession(session)
  }, [session])

  /** Throw away tonight's progress and begin again at the opening screen. */
  const resetSession = useCallback((nextTasks?: RoutineItem[]) => {
    clearSession()
    setSession(createSession(nextTasks ?? tasksRef.current))
  }, [])

  const completeSetup = useCallback(
    (name: string, routine: RoutineItem[]) => {
      // Functional update so fields setup does not touch — artStyle — survive.
      setSettings((current) => ({ ...current, child: { name }, routine, setupComplete: true }))
      resetSession(selectActiveTasks(routine))
    },
    [resetSession],
  )

  const toggleTask = useCallback((id: string) => {
    setSettings((current) => ({
      ...current,
      routine: current.routine.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    }))
  }, [])

  const reorderTask = useCallback((id: string, delta: number) => {
    setSettings((current) => ({ ...current, routine: moveTask(current.routine, id, delta) }))
  }, [])

  /**
   * Applied immediately rather than on Save: the settings list below the
   * toggle shows the same artwork, so it doubles as a live preview.
   */
  const setArtStyle = useCallback((artStyle: ArtStyle) => {
    setSettings((current) => ({ ...current, artStyle }))
  }, [])

  const setChildName = useCallback((name: string) => {
    setSettings((current) => ({ ...current, child: { name } }))
  }, [])

  /**
   * Save from parent settings. Progress is preserved when the routine is
   * unchanged, and rebuilt when the parent edited which steps are on.
   */
  const saveParentSettings = useCallback((name: string, routine: RoutineItem[]) => {
    const nextTasks = selectActiveTasks(routine)
    setSettings((current) => ({ ...current, child: { name }, routine }))
    setSession((current) => {
      if (current.signature === routineSignature(nextTasks)) return current
      clearSession()
      return createSession(nextTasks)
    })
    setParentOpen(false)
  }, [])

  const resetTonight = useCallback((name: string, routine: RoutineItem[]) => {
    const nextTasks = selectActiveTasks(routine)
    setSettings((current) => ({ ...current, child: { name }, routine }))
    clearSession()
    setSession(createSession(nextTasks))
    setParentOpen(false)
  }, [])

  /**
   * Wipe everything and return to first-run setup. The escape hatch for a
   * parent who wants to start completely over rather than just re-run tonight.
   */
  const resetEverything = useCallback(() => {
    const fresh = createDefaultSettings()
    setSettings(fresh)
    clearSession()
    setSession(createSession(selectActiveTasks(fresh.routine)))
    setSetupStep('welcome')
    setParentOpen(false)
  }, [])

  const beginBedtime = useCallback(() => {
    setSession((current) => startRoutine(current, tasksRef.current))
  }, [])

  /** Tap on the big button: lock and light up the star. */
  const completeCurrentTask = useCallback(() => {
    setSession((current) => beginCompletion(current, tasksRef.current))
  }, [])

  /** Celebration finished: advance, or finish the routine. */
  const advanceAfterCelebration = useCallback(() => {
    setSession((current) => finishCompletion(current, tasksRef.current))
  }, [])

  return {
    settings,
    tasks,
    session,
    setupStep,
    setSetupStep,
    parentOpen,
    openParent: useCallback(() => setParentOpen(true), []),
    closeParent: useCallback(() => setParentOpen(false), []),
    completeSetup,
    toggleTask,
    reorderTask,
    setArtStyle,
    setChildName,
    saveParentSettings,
    resetTonight,
    resetEverything,
    beginBedtime,
    completeCurrentTask,
    advanceAfterCelebration,
  }
}

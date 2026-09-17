/** One step in a bedtime routine. Nothing here is specific to a child or family. */
export type RoutineItem = {
  id: string
  title: string
  /** Key into the illustration registry (see components/illustrations.tsx). */
  illustration: string
  enabled: boolean
  order: number
}

export type ChildProfile = {
  /** May be an empty string — the app falls back to neutral copy. */
  name: string
}

/** Long-lived configuration. Persisted separately from tonight's session. */
export type AppSettings = {
  child: ChildProfile
  routine: RoutineItem[]
  setupComplete: boolean
}

export type SessionPhase = 'start' | 'routine' | 'goodnight'

/** Tonight's progress. Cheap to throw away and rebuild. */
export type RoutineSession = {
  phase: SessionPhase
  currentIndex: number
  completedIds: string[]
  /**
   * True while a completion celebration is playing. Never persisted — a
   * refresh mid-animation should land on an interactive screen.
   */
  transitioning: boolean
  /** Active task ids at the time the session started, used to detect edits. */
  signature: string
  updatedAt: number
}

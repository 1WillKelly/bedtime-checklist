import type { RoutineItem, RoutineSession } from '../models/types'

/** The enabled tasks, in their configured order. This is the routine. */
export function selectActiveTasks(routine: RoutineItem[]): RoutineItem[] {
  return routine.filter((item) => item.enabled).sort((a, b) => a.order - b.order)
}

/** Identifies the set + order of tasks, so we can spot a mid-session edit. */
export function routineSignature(tasks: RoutineItem[]): string {
  return tasks.map((task) => task.id).join('|')
}

export function createSession(tasks: RoutineItem[]): RoutineSession {
  return {
    phase: 'start',
    currentIndex: 0,
    completedIds: [],
    transitioning: false,
    signature: routineSignature(tasks),
    updatedAt: Date.now(),
  }
}

export function currentTask(
  session: RoutineSession,
  tasks: RoutineItem[],
): RoutineItem | undefined {
  return tasks[session.currentIndex]
}

export function isSessionComplete(session: RoutineSession): boolean {
  return session.phase === 'goodnight'
}

/**
 * Step 1 of a completion: lock the screen and light up the progress star.
 *
 * The lock is the double-tap guard. If a session is already transitioning —
 * or the routine is already over — this returns the *same object reference*,
 * so a burst of taps can never advance more than one task.
 */
export function beginCompletion(
  session: RoutineSession,
  tasks: RoutineItem[],
): RoutineSession {
  if (session.transitioning) return session
  if (session.phase !== 'routine') return session

  const task = currentTask(session, tasks)
  if (!task) return session

  return {
    ...session,
    transitioning: true,
    completedIds: session.completedIds.includes(task.id)
      ? session.completedIds
      : [...session.completedIds, task.id],
    updatedAt: Date.now(),
  }
}

/** Step 2: the celebration finished — move to the next task, or to goodnight. */
export function finishCompletion(
  session: RoutineSession,
  tasks: RoutineItem[],
): RoutineSession {
  if (!session.transitioning) return session

  const nextIndex = session.currentIndex + 1
  const done = nextIndex >= tasks.length

  return {
    ...session,
    transitioning: false,
    currentIndex: done ? session.currentIndex : nextIndex,
    phase: done ? 'goodnight' : 'routine',
    updatedAt: Date.now(),
  }
}

/** Parent tapped Start on the opening screen. */
export function startRoutine(
  session: RoutineSession,
  tasks: RoutineItem[],
): RoutineSession {
  if (tasks.length === 0) {
    return { ...session, phase: 'goodnight', transitioning: false, updatedAt: Date.now() }
  }
  return { ...session, phase: 'routine', transitioning: false, updatedAt: Date.now() }
}

/**
 * Whether a stored session should be picked back up. We resume rather than
 * restart when the same routine was in progress recently — bedtime crosses
 * midnight, so elapsed time is a better test than the calendar date.
 */
export const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000

export function canResume(
  session: RoutineSession,
  tasks: RoutineItem[],
  now = Date.now(),
): boolean {
  if (session.signature !== routineSignature(tasks)) return false
  if (now - session.updatedAt > SESSION_MAX_AGE_MS) return false
  return session.currentIndex >= 0 && session.currentIndex < Math.max(tasks.length, 1)
}

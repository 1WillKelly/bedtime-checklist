import { describe, expect, it } from 'vitest'

import { DEFAULT_ROUTINE } from '../models/defaultRoutine'
import type { RoutineItem } from '../models/types'
import {
  beginCompletion,
  canResume,
  createSession,
  finishCompletion,
  routineSignature,
  selectActiveTasks,
  startRoutine,
} from './routineMachine'

function routine(overrides: Partial<RoutineItem>[] = []): RoutineItem[] {
  return DEFAULT_ROUTINE.map((item, index) => ({ ...item, ...overrides[index] }))
}

/** Run a whole routine to the end, one begin/finish pair per task. */
function runAll(tasks: RoutineItem[]) {
  let session = startRoutine(createSession(tasks), tasks)
  for (let i = 0; i < tasks.length; i++) {
    session = beginCompletion(session, tasks)
    session = finishCompletion(session, tasks)
  }
  return session
}

describe('selectActiveTasks', () => {
  it('keeps only enabled tasks', () => {
    const tasks = selectActiveTasks(routine([{ enabled: false }, {}, { enabled: false }]))
    expect(tasks).toHaveLength(DEFAULT_ROUTINE.length - 2)
    expect(tasks.map((t) => t.id)).not.toContain('bath')
    expect(tasks.map((t) => t.id)).not.toContain('brush-teeth')
  })

  it('sorts by order, not by array position', () => {
    const shuffled: RoutineItem[] = [
      { id: 'c', title: 'C', illustration: 'generic', enabled: true, order: 2 },
      { id: 'a', title: 'A', illustration: 'generic', enabled: true, order: 0 },
      { id: 'b', title: 'B', illustration: 'generic', enabled: true, order: 1 },
    ]
    expect(selectActiveTasks(shuffled).map((t) => t.id)).toEqual(['a', 'b', 'c'])
  })

  it('returns an empty routine when everything is disabled', () => {
    expect(selectActiveTasks(routine().map((t) => ({ ...t, enabled: false })))).toEqual([])
  })
})

describe('progression', () => {
  it('moves through tasks in order', () => {
    const tasks = selectActiveTasks(routine())
    let session = startRoutine(createSession(tasks), tasks)

    expect(session.currentIndex).toBe(0)

    session = finishCompletion(beginCompletion(session, tasks), tasks)
    expect(session.currentIndex).toBe(1)
    expect(session.completedIds).toEqual(['bath'])

    session = finishCompletion(beginCompletion(session, tasks), tasks)
    expect(session.currentIndex).toBe(2)
    expect(session.completedIds).toEqual(['bath', 'potty'])
  })

  it('lights the progress star as soon as the tap lands, before the advance', () => {
    const tasks = selectActiveTasks(routine())
    const started = startRoutine(createSession(tasks), tasks)
    const celebrating = beginCompletion(started, tasks)

    expect(celebrating.completedIds).toHaveLength(1)
    expect(celebrating.currentIndex).toBe(0)
    expect(celebrating.transitioning).toBe(true)
  })

  it('finishing the last task ends the routine', () => {
    const tasks = selectActiveTasks(routine())
    const session = runAll(tasks)

    expect(session.phase).toBe('goodnight')
    expect(session.completedIds).toHaveLength(tasks.length)
    expect(session.transitioning).toBe(false)
  })

  it('ends after the last task of a shortened routine', () => {
    const tasks = selectActiveTasks(
      routine().map((item, index) => ({ ...item, enabled: index < 2 })),
    )
    expect(tasks).toHaveLength(2)
    expect(runAll(tasks).phase).toBe('goodnight')
  })

  it('does nothing once the routine is over', () => {
    const tasks = selectActiveTasks(routine())
    const done = runAll(tasks)
    expect(beginCompletion(done, tasks)).toBe(done)
  })
})

describe('double-tap protection', () => {
  it('ignores extra taps while a celebration is playing', () => {
    const tasks = selectActiveTasks(routine())
    const started = startRoutine(createSession(tasks), tasks)

    let session = beginCompletion(started, tasks)
    // A toddler mashing the button: five more taps in the same window.
    for (let i = 0; i < 5; i++) session = beginCompletion(session, tasks)

    expect(session.completedIds).toEqual(['bath'])
    expect(session.currentIndex).toBe(0)

    session = finishCompletion(session, tasks)
    expect(session.currentIndex).toBe(1)
    expect(session.completedIds).toEqual(['bath'])
  })

  it('never skips a task across a burst of taps', () => {
    const tasks = selectActiveTasks(routine())
    let session = startRoutine(createSession(tasks), tasks)

    for (let step = 0; step < tasks.length; step++) {
      session = beginCompletion(session, tasks)
      session = beginCompletion(session, tasks)
      session = beginCompletion(session, tasks)
      session = finishCompletion(session, tasks)
    }

    expect(session.completedIds).toEqual(tasks.map((t) => t.id))
    expect(session.phase).toBe('goodnight')
  })

  it('a stray finish without a begin changes nothing', () => {
    const tasks = selectActiveTasks(routine())
    const started = startRoutine(createSession(tasks), tasks)
    expect(finishCompletion(started, tasks)).toBe(started)
  })

  it('cannot be completed before the routine has started', () => {
    const tasks = selectActiveTasks(routine())
    const fresh = createSession(tasks)
    expect(fresh.phase).toBe('start')
    expect(beginCompletion(fresh, tasks)).toBe(fresh)
  })
})

describe('startRoutine', () => {
  it('goes straight to goodnight when no tasks are enabled', () => {
    expect(startRoutine(createSession([]), []).phase).toBe('goodnight')
  })
})

describe('canResume', () => {
  const tasks = selectActiveTasks(routine())

  it('resumes a recent session for the same routine', () => {
    const session = { ...createSession(tasks), updatedAt: Date.now() - 60_000 }
    expect(canResume(session, tasks)).toBe(true)
  })

  it('does not resume a stale session', () => {
    const session = { ...createSession(tasks), updatedAt: Date.now() - 13 * 60 * 60 * 1000 }
    expect(canResume(session, tasks)).toBe(false)
  })

  it('does not resume when the parent changed the routine', () => {
    const session = createSession(tasks)
    const edited = selectActiveTasks(routine([{ enabled: false }]))
    expect(routineSignature(edited)).not.toBe(session.signature)
    expect(canResume(session, edited)).toBe(false)
  })
})

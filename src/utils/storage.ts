import { createDefaultSettings, DEFAULT_ROUTINE } from '../models/defaultRoutine'
import type { AppSettings, RoutineItem, RoutineSession } from '../models/types'
import { cleanName } from './copy'

const SETTINGS_KEY = 'goodnight-checklist:settings:v1'
const SESSION_KEY = 'goodnight-checklist:session:v1'

/** localStorage can throw (private mode, disabled cookies). Never let it break the app. */
function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeRaw(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage unavailable — the app still works, it just won't remember.
  }
}

function removeRaw(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Merge stored routine state onto the current defaults. Tasks added in a
 * later release appear automatically; tasks the parent turned off stay off.
 */
function mergeRoutine(stored: unknown): RoutineItem[] {
  const byId = new Map<string, Record<string, unknown>>()
  if (Array.isArray(stored)) {
    for (const entry of stored) {
      if (isRecord(entry) && typeof entry.id === 'string') byId.set(entry.id, entry)
    }
  }

  const merged = DEFAULT_ROUTINE.map((item) => {
    const saved = byId.get(item.id)
    if (!saved) return { ...item }
    return {
      ...item,
      title: typeof saved.title === 'string' && saved.title ? saved.title : item.title,
      enabled: typeof saved.enabled === 'boolean' ? saved.enabled : item.enabled,
      order: typeof saved.order === 'number' ? saved.order : item.order,
    }
  })

  // Preserve any custom tasks a future version may have added.
  for (const [id, saved] of byId) {
    if (merged.some((item) => item.id === id)) continue
    if (typeof saved.title !== 'string') continue
    merged.push({
      id,
      title: saved.title,
      illustration: typeof saved.illustration === 'string' ? saved.illustration : 'generic',
      enabled: typeof saved.enabled === 'boolean' ? saved.enabled : true,
      order: typeof saved.order === 'number' ? saved.order : merged.length,
    })
  }

  return merged.sort((a, b) => a.order - b.order)
}

export function loadSettings(): AppSettings {
  const raw = readRaw(SETTINGS_KEY)
  const fallback = createDefaultSettings()
  if (!raw) return fallback

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed)) return fallback

    const child = isRecord(parsed.child) ? parsed.child : {}
    return {
      child: { name: cleanName(typeof child.name === 'string' ? child.name : '') },
      routine: mergeRoutine(parsed.routine),
      setupComplete: parsed.setupComplete === true,
    }
  } catch {
    return fallback
  }
}

export function saveSettings(settings: AppSettings): void {
  writeRaw(SETTINGS_KEY, JSON.stringify(settings))
}

type StoredSession = Omit<RoutineSession, 'transitioning'>

export function loadSession(): RoutineSession | null {
  const raw = readRaw(SESSION_KEY)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed)) return null
    const phase = parsed.phase
    if (phase !== 'start' && phase !== 'routine' && phase !== 'goodnight') return null

    return {
      phase,
      currentIndex: typeof parsed.currentIndex === 'number' ? parsed.currentIndex : 0,
      completedIds: Array.isArray(parsed.completedIds)
        ? parsed.completedIds.filter((id): id is string => typeof id === 'string')
        : [],
      // Always land on an interactive screen after a refresh.
      transitioning: false,
      signature: typeof parsed.signature === 'string' ? parsed.signature : '',
      updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : 0,
    }
  } catch {
    return null
  }
}

export function saveSession(session: RoutineSession): void {
  const stored: StoredSession = {
    phase: session.phase,
    currentIndex: session.currentIndex,
    completedIds: session.completedIds,
    signature: session.signature,
    updatedAt: session.updatedAt,
  }
  writeRaw(SESSION_KEY, JSON.stringify(stored))
}

export function clearSession(): void {
  removeRaw(SESSION_KEY)
}

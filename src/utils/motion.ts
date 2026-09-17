/**
 * Reading animation durations back out of the design tokens.
 *
 * The CSS tokens are the single source of truth for timing (including the
 * prefers-reduced-motion overrides), and the interaction lock in JS has to
 * match them exactly. The catch: getComputedStyle normalises custom property
 * values, so `800ms` can come back as `.8s`. A bare parseFloat on that reads
 * as 0.8 and the lock collapses to nothing — which is precisely the window a
 * fast-tapping toddler needs to skip a task. Always parse the unit.
 */

export function parseCssDuration(raw: string, fallback: number): number {
  const value = raw.trim().toLowerCase()
  const amount = Number.parseFloat(value)
  if (!Number.isFinite(amount) || amount <= 0) return fallback
  if (value.endsWith('ms')) return amount
  if (value.endsWith('s')) return amount * 1000
  return fallback
}

/** Reads a duration custom property off :root, in milliseconds. */
export function readDurationToken(name: string, fallback: number): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') return fallback
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name)
    return parseCssDuration(raw, fallback)
  } catch {
    return fallback
  }
}

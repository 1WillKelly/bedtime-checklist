/**
 * Progressive-enhancement haptics.
 *
 * iOS Safari does not implement navigator.vibrate, so on the primary target
 * these calls simply do nothing. The app must feel complete without them —
 * treat anything here as a bonus, never as feedback the UI depends on.
 */

type Pattern = number | number[]

function vibrate(pattern: Pattern): void {
  try {
    const nav = typeof navigator === 'undefined' ? undefined : navigator
    if (!nav || typeof nav.vibrate !== 'function') return
    nav.vibrate(pattern)
  } catch {
    // Some browsers throw when vibration is blocked by policy. Never surface it.
  }
}

/** A light tick as a control is pressed down. */
export function tapFeedback(): void {
  vibrate(10)
}

/** A slightly richer pulse when a task is completed. */
export function successFeedback(): void {
  vibrate([12, 40, 18])
}

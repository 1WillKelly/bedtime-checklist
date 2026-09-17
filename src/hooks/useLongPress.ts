import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

type Options = {
  /** How long the press must be held, in ms. */
  duration?: number
  onLongPress: () => void
}

/**
 * Hold-to-activate, used for the parent escape hatch. A deliberate hold is
 * something a toddler is very unlikely to produce by accident, and unlike a
 * tap target it costs no visual prominence during the routine.
 */
export function useLongPress({ duration = 1600, onLongPress }: Options) {
  const timer = useRef<number | null>(null)
  const [holding, setHolding] = useState(false)
  const callback = useRef(onLongPress)
  callback.current = onLongPress

  const cancel = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
    setHolding(false)
  }, [])

  const start = useCallback(() => {
    if (timer.current !== null) return
    setHolding(true)
    timer.current = window.setTimeout(() => {
      timer.current = null
      setHolding(false)
      callback.current()
    }, duration)
  }, [duration])

  useEffect(() => cancel, [cancel])

  return {
    holding,
    duration,
    handlers: {
      onPointerDown: start,
      onPointerUp: cancel,
      onPointerLeave: cancel,
      onPointerCancel: cancel,
      // Keyboard equivalent for parents using assistive tech.
      onKeyDown: (event: ReactKeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          start()
        }
      },
      onKeyUp: cancel,
      onBlur: cancel,
    },
  }
}

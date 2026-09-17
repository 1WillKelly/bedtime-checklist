import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

import { tapFeedback } from '../utils/haptics'
import styles from './CompletionButton.module.css'

type Props = {
  label: string
  onPress: () => void
  /** While locked the button stays visually depressed and ignores input. */
  locked?: boolean
  variant?: 'action' | 'nav' | 'danger'
  /** Overrides the visible label for assistive tech (e.g. adds the task name). */
  ariaLabel?: string
  /** Gold accent ticks — reserved for the main child-facing action. */
  sparkles?: boolean
}

const Ticks = () => (
  <svg viewBox="0 0 20 30" aria-hidden="true" focusable="false">
    <path
      d="M3 6h9M2 15h7M3 24h9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

/**
 * Every button in the app. The child-facing variant is designed so a toddler
 * can hit it without aiming, and so a burst of taps produces one activation.
 */
export function CompletionButton({
  label,
  onPress,
  locked = false,
  variant = 'action',
  ariaLabel,
  sparkles = false,
}: Props) {
  const [pressed, setPressed] = useState(false)
  /** Pointers currently down — multiple fingers at once is normal here. */
  const activePointers = useRef(new Set<number>())

  useEffect(() => {
    if (locked) {
      activePointers.current.clear()
      setPressed(false)
    }
  }, [locked])

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (locked) return
      activePointers.current.add(event.pointerId)
      setPressed(true)
      tapFeedback()
    },
    [locked],
  )

  const releasePointer = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    activePointers.current.delete(event.pointerId)
    if (activePointers.current.size === 0) setPressed(false)
  }, [])

  const handleClick = useCallback(() => {
    // Re-checked here on purpose: `disabled` alone can be raced by a second
    // touch dispatched in the same frame as the state update.
    if (locked) return
    onPress()
  }, [locked, onPress])

  return (
    <button
      type="button"
      className={[
        styles.button,
        styles[variant],
        locked ? styles.locked : pressed ? styles.pressed : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerDown={handlePointerDown}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onPointerLeave={releasePointer}
      onClick={handleClick}
      disabled={locked}
      aria-label={ariaLabel ?? label}
    >
      {sparkles && (
        <span className={`${styles.sparkle} ${styles.sparkleLeft}`} aria-hidden="true">
          <Ticks />
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {sparkles && (
        <span className={`${styles.sparkle} ${styles.sparkleRight}`} aria-hidden="true">
          <Ticks />
        </span>
      )}
    </button>
  )
}

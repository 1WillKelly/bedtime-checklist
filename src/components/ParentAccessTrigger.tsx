import type { CSSProperties } from 'react'

import { useLongPress } from '../hooks/useLongPress'
import styles from './ParentAccessTrigger.module.css'

type Props = {
  onOpen: () => void
  /** Lightens the dot for use on the dark goodnight screen. */
  tone?: 'day' | 'night'
  /** Lays the dot out in flow (for the routine header) instead of floating it. */
  inline?: boolean
}

const HOLD_MS = 1600

/**
 * The parent's way in. A small, low-contrast dot in the corner that needs a
 * 1.6s hold — out of the child's tap path, and invisible to a child's intent,
 * without hiding it from a parent who knows where to look.
 */
export function ParentAccessTrigger({ onOpen, tone = 'day', inline = false }: Props) {
  const { holding, handlers } = useLongPress({ duration: HOLD_MS, onLongPress: onOpen })

  return (
    <button
      type="button"
      className={[
        styles.trigger,
        inline ? styles.inline : styles.floating,
        tone === 'night' ? styles.onNight : '',
        holding ? styles.holding : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--hold-duration': `${HOLD_MS}ms` } as CSSProperties}
      aria-label="Parent settings. Press and hold to open."
      {...handlers}
    >
      <svg className={styles.ring} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <circle className={styles.ringPath} cx="18" cy="18" r="15.9" pathLength="100" />
      </svg>
      <span className={styles.dot} aria-hidden="true" />
    </button>
  )
}

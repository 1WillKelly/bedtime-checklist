import type { ReactNode } from 'react'

import { ParentAccessTrigger } from './ParentAccessTrigger'
import styles from './ScreenHeader.module.css'

type Props = {
  /** The centre slot — the progress chain during the routine, empty after it. */
  children?: ReactNode
  onRestart: () => void
  onOpenParentSettings: () => void
  tone?: 'day' | 'night'
}

const RestartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * The persistent header: restart on the left, progress in the middle, parent
 * settings on the right.
 *
 * Both corner controls are small, muted, and pinned to the top of the screen —
 * well out of the thumb path that the big completion button owns. Restart is
 * visible rather than hidden because a parent needs it at any moment; it is
 * safe to leave in view because it always asks before clearing anything.
 */
export function ScreenHeader({ children, onRestart, onOpenParentSettings, tone = 'day' }: Props) {
  return (
    <div className={`${styles.header} ${tone === 'night' ? styles.onNight : ''}`}>
      <button
        type="button"
        className={styles.corner}
        onClick={onRestart}
        aria-label="Start bedtime over"
      >
        <RestartIcon />
      </button>

      <div className={styles.center}>{children}</div>

      <span className={styles.parentSlot}>
        <ParentAccessTrigger tone={tone} onOpen={onOpenParentSettings} inline />
      </span>
    </div>
  )
}

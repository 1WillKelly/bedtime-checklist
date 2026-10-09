import type { ReactNode } from 'react'

import styles from './ScreenHeader.module.css'

type Props = {
  /** Below the settings link — the progress chain during the routine, empty after it. */
  children?: ReactNode
  onOpenSettings: () => void
  tone?: 'day' | 'night'
}

/**
 * The persistent header: a Settings link on top, wordless progress below it.
 *
 * One visible door to the parent screen, rather than a hidden long-press plus
 * a separate restart. A single tap only ever *navigates* — it changes nothing —
 * so a stray toddler tap lands somewhere harmless with a Back button, and
 * everything destructive lives behind a confirmation on the settings page.
 * It is a word rather than an icon so a parent never has to guess, and it is
 * small, muted and pinned to the top, well out of the thumb path that the big
 * completion button owns.
 */
export function ScreenHeader({ children, onOpenSettings, tone = 'day' }: Props) {
  return (
    <div className={`${styles.header} ${tone === 'night' ? styles.onNight : ''}`}>
      <button type="button" className={styles.settings} onClick={onOpenSettings}>
        Settings
      </button>

      {children && <div className={styles.center}>{children}</div>}
    </div>
  )
}

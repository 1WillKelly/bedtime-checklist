import type { ReactNode } from 'react'

import styles from './ScreenHeader.module.css'

type Props = {
  /** The centre slot — the progress chain during the routine, empty after it. */
  children?: ReactNode
  onOpenSettings: () => void
  tone?: 'day' | 'night'
}

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2.8v2.4M12 18.8v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

/**
 * The persistent header: settings on the left, wordless progress in the middle.
 *
 * One visible door to the parent screen, rather than a hidden long-press plus
 * a separate restart. A single tap only ever *navigates* — it changes nothing —
 * so a stray toddler tap lands somewhere harmless with a Back button, and
 * everything destructive lives behind a confirmation on the settings page.
 * The control is small, muted and pinned to the top corner, well out of the
 * thumb path that the big completion button owns.
 */
export function ScreenHeader({ children, onOpenSettings, tone = 'day' }: Props) {
  return (
    <div className={`${styles.header} ${tone === 'night' ? styles.onNight : ''}`}>
      <button
        type="button"
        className={styles.corner}
        onClick={onOpenSettings}
        aria-label="Parent settings"
      >
        <SettingsIcon />
      </button>

      <div className={styles.center}>{children}</div>

      {/* Balances the settings button so the progress chain stays centred. */}
      <span className={styles.spacer} aria-hidden="true" />
    </div>
  )
}

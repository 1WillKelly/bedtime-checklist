import type { ReactNode } from 'react'

import styles from './ScreenHeader.module.css'

type Props = {
  /** The centre slot — the progress chain during the routine, empty after it. */
  children?: ReactNode
  onOpenSettings: () => void
  tone?: 'day' | 'night'
}

const SettingsIcon = () => (
  // Gear outline generated on an 8-tooth polar layout (see the commit that
  // added it); rounded joins keep the teeth friendly rather than mechanical.
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12.41 4.21 L14.0 1.69 L17.87 3.3 L17.22 6.2 L17.8 6.78 L20.7 6.13 L22.31 10.0 L19.79 11.59 L19.79 12.41 L22.31 14.0 L20.7 17.87 L17.8 17.22 L17.22 17.8 L17.87 20.7 L14.0 22.31 L12.41 19.79 L11.59 19.79 L10.0 22.31 L6.13 20.7 L6.78 17.8 L6.2 17.22 L3.3 17.87 L1.69 14.0 L4.21 12.41 L4.21 11.59 L1.69 10.0 L3.3 6.13 L6.2 6.78 L6.78 6.2 L6.13 3.3 L10.0 1.69 L11.59 4.21 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
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

import type { ReactNode } from 'react'

import { NightSky } from './NightSky'
import styles from './Screen.module.css'

type Props = {
  children: ReactNode
  /** `night` paints the starry background and flips text to light. */
  tone?: 'day' | 'night'
  skySeed?: number
  skyMood?: 'awake' | 'calm'
  className?: string
}

/**
 * Full-viewport screen shell. Owns safe-area padding and the day/night split
 * so no individual screen has to think about either.
 */
export function Screen({ children, tone = 'day', skySeed, skyMood, className }: Props) {
  return (
    <div
      className={[
        styles.screen,
        tone === 'night' ? styles.night : styles.day,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {tone === 'night' && <NightSky seed={skySeed} mood={skyMood} />}
      <div className={styles.inner}>{children}</div>
    </div>
  )
}

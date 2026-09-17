import type { CSSProperties } from 'react'

import { NightSky } from './NightSky'
import { ProgressIndicator } from './ProgressIndicator'
import styles from './CompletionEffect.module.css'

type Props = {
  /** Encouragement headline, e.g. "Nice job, Leo!". */
  message: string
  /** The step that was just finished, e.g. "Bath complete!". */
  caption: string
  /** Title of the task coming next, or null if this was the last one. */
  nextTitle: string | null
  total: number
  completed: number
}

const RAY_COUNT = 10

const HeroStar = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <path
      d="M60 8l14.8 31.6L109 44l-25 23.4 6.6 34L60 85.4 29.4 101.4l6.6-34L11 44l34.2-4.4L60 8Z"
      fill="currentColor"
      stroke="var(--c-gold-deep)"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="47" cy="55" r="4.4" fill="#5b3f00" />
    <circle cx="73" cy="55" r="4.4" fill="#5b3f00" />
    <path
      d="M50 69c3 3.6 7 5.4 10 5.4s7-1.8 10-5.4"
      fill="none"
      stroke="#5b3f00"
      strokeWidth="3.6"
      strokeLinecap="round"
    />
    <circle cx="36" cy="63" r="5" fill="#ff9c8f" opacity="0.55" />
    <circle cx="84" cy="63" r="5" fill="#ff9c8f" opacity="0.55" />
  </svg>
)

/**
 * The reward. A short full-screen night beat between two task screens: it
 * marks the win, shows the star chain growing, and names what comes next —
 * then dismisses itself. It is never interactive, which is also what makes
 * it a safe place to absorb a toddler's stray taps while progression is locked.
 */
export function CompletionEffect({ message, caption, nextTitle, total, completed }: Props) {
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <NightSky seed={completed + 3} />

      <div className={styles.progressSlot}>
        <ProgressIndicator
          total={total}
          completed={completed}
          currentIndex={completed}
          celebratingIndex={completed - 1}
          tone="night"
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.headline}>{message}</h2>
        <div className={styles.starWrap}>
          {Array.from({ length: RAY_COUNT }, (_, index) => (
            <span
              key={index}
              className={styles.ray}
              style={{ '--angle': `${(360 / RAY_COUNT) * index}deg` } as CSSProperties}
            />
          ))}
          <span className={styles.hero}>
            <HeroStar />
          </span>
        </div>
        <p className={styles.caption}>{caption}</p>
      </div>

      {nextTitle ? (
        <div className={styles.nextUp}>
          <span className={styles.nextLabel}>
            Next up:
            <span className={styles.nextTitle}>{nextTitle}</span>
          </span>
        </div>
      ) : (
        <span />
      )}
    </div>
  )
}

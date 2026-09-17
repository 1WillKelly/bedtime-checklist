import { Fragment } from 'react'

import styles from './ProgressIndicator.module.css'

type Props = {
  total: number
  completed: number
  /** Index of the step currently on screen. */
  currentIndex: number
  /** Index that just completed, so exactly one star pops. */
  celebratingIndex?: number | null
  tone?: 'day' | 'night'
}

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 2.4l2.8 6 6.6.8-4.9 4.5 1.3 6.6L12 17l-5.8 3.3 1.3-6.6L2.6 9.2l6.6-.8L12 2.4Z"
      fill="currentColor"
    />
  </svg>
)

/**
 * Wordless progress: a chain of stars that fill in as the routine advances.
 * Deliberately never says "3 of 8" — a pre-reader has to be able to read it.
 */
export function ProgressIndicator({
  total,
  completed,
  currentIndex,
  celebratingIndex = null,
  tone = 'day',
}: Props) {
  return (
    <div
      className={`${styles.track} ${tone === 'night' ? styles.onNight : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={completed}
      aria-label={`${completed} of ${total} bedtime steps done`}
    >
      {Array.from({ length: total }, (_, index) => {
        const done = index < completed
        return (
          <Fragment key={index}>
            {index > 0 && (
              <span className={`${styles.link} ${done ? styles.linkDone : ''}`} aria-hidden="true" />
            )}
            <span
              className={[
                styles.node,
                done ? styles.done : '',
                index === celebratingIndex ? styles.justDone : '',
                !done && index === currentIndex ? styles.current : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              <Star />
            </span>
          </Fragment>
        )
      })}
    </div>
  )
}

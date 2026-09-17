import { Fragment } from 'react'

import type { RoutineItem } from '../models/types'
import { getIllustration } from './illustrations'
import styles from './ProgressIndicator.module.css'

type Props = {
  /** The routine, in order — each step shows its own picture in the chain. */
  tasks: RoutineItem[]
  completed: number
  /** Index of the step currently on screen. */
  currentIndex: number
  /** Index that just completed, so exactly one node pops. */
  celebratingIndex?: number | null
  tone?: 'day' | 'night'
}

/**
 * Wordless progress: a chain of the night's steps, each showing its own
 * picture, filling in gold as they are finished.
 *
 * Showing the pictures rather than identical dots means the chain answers
 * "what's coming next?" as well as "how far along are we?" — a pre-reader can
 * look ahead and see the books before the books arrive. Deliberately never
 * says "3 of 8".
 */
export function ProgressIndicator({
  tasks,
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
      aria-valuemax={tasks.length}
      aria-valuenow={completed}
      aria-label={`${completed} of ${tasks.length} bedtime steps done`}
    >
      {tasks.map((task, index) => {
        const done = index < completed
        const isCurrent = !done && index === currentIndex
        return (
          <Fragment key={task.id}>
            {index > 0 && (
              <span className={`${styles.link} ${done ? styles.linkDone : ''}`} aria-hidden="true" />
            )}
            <span
              className={[
                styles.node,
                done ? styles.done : '',
                index === celebratingIndex ? styles.justDone : '',
                isCurrent ? styles.current : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
              title={task.title}
            >
              <span className={styles.glyph}>{getIllustration(task.illustration).glyph}</span>
            </span>
          </Fragment>
        )
      })}
    </div>
  )
}

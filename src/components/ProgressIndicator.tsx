import type { ReactNode } from 'react'

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
  /** Makes every step a button that jumps straight to it. */
  onSelect?: (index: number) => void
  /** Steps are not tappable while a page turn is in flight. */
  locked?: boolean
}

/**
 * Wordless progress: a chain of the night's steps, each showing its own
 * picture, filling in gold as they are finished.
 *
 * Showing the pictures rather than identical dots means the chain answers
 * "what's coming next?" as well as "how far along are we?" — a pre-reader can
 * look ahead and see the books before the books arrive. Deliberately never
 * says "3 of 8".
 *
 * With `onSelect`, each step is a tap target that jumps to it. The whole cell
 * is the target, not just the circle, so the chain is one continuous strip of
 * buttons with no dead gaps between them.
 */
export function ProgressIndicator({
  tasks,
  completed,
  currentIndex,
  celebratingIndex = null,
  tone = 'day',
  onSelect,
  locked = false,
}: Props) {
  const label = `${completed} of ${tasks.length} bedtime steps done`

  return (
    <div
      className={`${styles.track} ${tone === 'night' ? styles.onNight : ''}`}
      {...(onSelect
        ? { role: 'group', 'aria-label': label }
        : {
            role: 'progressbar',
            'aria-valuemin': 0,
            'aria-valuemax': tasks.length,
            'aria-valuenow': completed,
            'aria-label': label,
          })}
    >
      {tasks.map((task, index) => {
        const done = index < completed
        const isCurrent = !done && index === currentIndex

        const content: ReactNode = (
          <>
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
            >
              <span className={styles.glyph}>{getIllustration(task.illustration).glyph}</span>
            </span>
          </>
        )

        if (!onSelect) {
          return (
            <span key={task.id} className={styles.step} aria-hidden="true" title={task.title}>
              {content}
            </span>
          )
        }

        return (
          <button
            key={task.id}
            type="button"
            className={`${styles.step} ${styles.tappable}`}
            onClick={() => onSelect(index)}
            disabled={locked}
            aria-current={isCurrent ? 'step' : undefined}
            aria-label={`${task.title}${done ? ', done' : ''}`}
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}

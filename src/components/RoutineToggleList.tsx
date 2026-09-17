import type { RoutineItem } from '../models/types'
import { TaskIllustration } from './TaskIllustration'
import styles from '../features/setup/setup.module.css'

type Props = {
  routine: RoutineItem[]
  onToggle: (id: string) => void
  /** Move a task up (-1) or down (+1) the routine. */
  onMove: (id: string, delta: number) => void
}

const Chevron = ({ up }: { up: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d={up ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * The parent's routine editor, shared by first-run setup and settings.
 *
 * The row itself is the on/off target so it can be hit one-handed; reordering
 * is separate arrow buttons rather than drag, which needs a precise press-hold
 * on a small handle and is unreliable on a phone.
 */
export function RoutineToggleList({ routine, onToggle, onMove }: Props) {
  const ordered = [...routine].sort((a, b) => a.order - b.order)

  return (
    <ul className={styles.list}>
      {ordered.map((item, index) => (
        <li key={item.id} className={`${styles.row} ${item.enabled ? '' : styles.rowOff}`}>
          <div className={styles.reorder}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => onMove(item.id, -1)}
              disabled={index === 0}
              aria-label={`Move ${item.title} earlier`}
            >
              <Chevron up />
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => onMove(item.id, 1)}
              disabled={index === ordered.length - 1}
              aria-label={`Move ${item.title} later`}
            >
              <Chevron up={false} />
            </button>
          </div>

          <TaskIllustration id={item.illustration} size="chip" className={styles.chip} />

          <button
            type="button"
            role="switch"
            aria-checked={item.enabled}
            className={styles.rowMain}
            onClick={() => onToggle(item.id)}
          >
            <span className={styles.rowTitle}>{item.title}</span>
            <span
              className={`${styles.switch} ${item.enabled ? styles.switchOn : ''}`}
              aria-hidden="true"
            >
              <span className={styles.knob} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

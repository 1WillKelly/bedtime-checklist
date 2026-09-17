import type { RoutineItem } from '../models/types'
import { TaskIllustration } from './TaskIllustration'
import styles from '../features/setup/setup.module.css'

type Props = {
  routine: RoutineItem[]
  onToggle: (id: string) => void
}

/**
 * The enable/disable list, shared by first-run setup and parent settings.
 * Rows are whole-row tap targets so a parent can hit them one-handed.
 */
export function RoutineToggleList({ routine, onToggle }: Props) {
  return (
    <div className={styles.list}>
      {routine.map((item) => (
        <button
          key={item.id}
          type="button"
          role="switch"
          aria-checked={item.enabled}
          className={`${styles.row} ${item.enabled ? '' : styles.rowOff}`}
          onClick={() => onToggle(item.id)}
        >
          <TaskIllustration id={item.illustration} size="chip" className={styles.chip} />
          <span className={styles.rowTitle}>{item.title}</span>
          <span
            className={`${styles.switch} ${item.enabled ? styles.switchOn : ''}`}
            aria-hidden="true"
          >
            <span className={styles.knob} />
          </span>
        </button>
      ))}
    </div>
  )
}

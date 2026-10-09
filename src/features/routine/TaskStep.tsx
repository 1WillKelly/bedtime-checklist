import { TaskIllustration } from '../../components/TaskIllustration'
import type { RoutineItem } from '../../models/types'
import styles from './routine.module.css'

type Props = {
  task: RoutineItem
  /** `out` is the page turning away, `in` is the one arriving. */
  motion?: 'in' | 'out' | 'none'
  /** Going back turns the page the other way, so the motion matches the jump. */
  direction?: 'forward' | 'back'
}

/**
 * One bedtime task: picture first, short label second. This is the only part
 * of the routine screen that animates — progress and the button stay put, so
 * the child's target never moves.
 */
export function TaskStep({ task, motion = 'none', direction = 'forward' }: Props) {
  const back = direction === 'back'
  return (
    <div
      className={[
        styles.card,
        motion === 'out' ? (back ? styles.slideOutBack : styles.slideOut) : '',
        motion === 'in' ? (back ? styles.slideInBack : styles.slideIn) : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={motion === 'out'}
    >
      <div className={styles.cardArt}>
        <TaskIllustration id={task.illustration} />
      </div>
      <h1 className={styles.taskTitle}>{task.title}</h1>
    </div>
  )
}

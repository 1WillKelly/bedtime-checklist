import type { CSSProperties } from 'react'

import { useDragReorder } from '../hooks/useDragReorder'
import type { RoutineItem } from '../models/types'
import { TaskIllustration } from './TaskIllustration'
import styles from '../features/setup/setup.module.css'

type Props = {
  routine: RoutineItem[]
  onToggle: (id: string) => void
  /** Move a task by `delta` places in the routine. */
  onMove: (id: string, delta: number) => void
}

const GripIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="9" cy="6" r="1.7" fill="currentColor" />
    <circle cx="15" cy="6" r="1.7" fill="currentColor" />
    <circle cx="9" cy="12" r="1.7" fill="currentColor" />
    <circle cx="15" cy="12" r="1.7" fill="currentColor" />
    <circle cx="9" cy="18" r="1.7" fill="currentColor" />
    <circle cx="15" cy="18" r="1.7" fill="currentColor" />
  </svg>
)

/**
 * The parent's routine editor, shared by first-run setup and settings.
 *
 * The row is the on/off target so it can be hit one-handed. Reordering is a
 * drag from the grip on the left; the grip is a real button that also takes
 * arrow keys, because a drag alone is unreachable by keyboard.
 */
export function RoutineToggleList({ routine, onToggle, onMove }: Props) {
  const ordered = [...routine].sort((a, b) => a.order - b.order)
  const { listRef, drag, pitch, handlers } = useDragReorder({
    onReorder: onMove,
    itemCount: ordered.length,
  })

  /**
   * Rows between the lifted row and its landing slot slide one place to open
   * the gap, so the list previews the result while the finger is still down.
   */
  const shiftFor = (index: number): number => {
    if (!drag) return 0
    if (index === drag.fromIndex) return drag.offset
    const to = drag.fromIndex + drag.delta
    if (drag.delta > 0 && index > drag.fromIndex && index <= to) return -pitch
    if (drag.delta < 0 && index < drag.fromIndex && index >= to) return pitch
    return 0
  }

  return (
    <ul className={styles.list} ref={listRef}>
      {ordered.map((item, index) => {
        const lifted = drag?.fromIndex === index
        return (
          <li
            key={item.id}
            className={[
              styles.row,
              item.enabled ? '' : styles.rowOff,
              lifted ? styles.lifted : '',
              drag && !lifted ? styles.settling : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ '--shift': `${shiftFor(index)}px` } as CSSProperties}
          >
            <button
              type="button"
              className={styles.grip}
              aria-label={`Reorder ${item.title}. Drag, or use the up and down arrow keys.`}
              onPointerDown={(event) => handlers.onPointerDown(event, item.id, index)}
              onPointerMove={handlers.onPointerMove}
              onPointerUp={handlers.onPointerUp}
              onPointerCancel={handlers.onPointerCancel}
              onKeyDown={(event) => {
                if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  onMove(item.id, -1)
                } else if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  onMove(item.id, 1)
                }
              }}
            >
              <GripIcon />
            </button>

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
        )
      })}
    </ul>
  )
}

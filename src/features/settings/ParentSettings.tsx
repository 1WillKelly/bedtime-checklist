import { useId, useState } from 'react'

import { CompletionButton } from '../../components/CompletionButton'
import { RoutineToggleList } from '../../components/RoutineToggleList'
import { Screen } from '../../components/Screen'
import type { AppSettings, RoutineItem } from '../../models/types'
import { moveTask } from '../../app/routineMachine'
import { cleanName } from '../../utils/copy'
import styles from './settings.module.css'

type Props = {
  settings: AppSettings
  onSave: (name: string, routine: RoutineItem[]) => void
  onResetRoutine: (name: string, routine: RoutineItem[]) => void
  /** Wipe the name and routine and return to first-run setup. */
  onResetEverything: () => void
  onClose: () => void
}

const BackIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M15 5l-7 7 7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Parent-only. Edits are held locally and committed on Save, so a parent can
 * back out of a change. No PIN, no account — the long-press is the gate.
 */
export function ParentSettings({
  settings,
  onSave,
  onResetRoutine,
  onResetEverything,
  onClose,
}: Props) {
  const [name, setName] = useState(settings.child.name)
  const [routine, setRoutine] = useState<RoutineItem[]>(() =>
    settings.routine.map((item) => ({ ...item })),
  )
  const nameId = useId()

  const enabledCount = routine.filter((item) => item.enabled).length

  const toggle = (id: string) =>
    setRoutine((current) =>
      current.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    )

  const move = (id: string, delta: number) =>
    setRoutine((current) => moveTask(current, id, delta))

  return (
    <Screen>
      <div className={styles.sheet}>
        <div className={styles.top}>
          <button type="button" className={styles.back} onClick={onClose}>
            <BackIcon />
            Back
          </button>
        </div>

        <div className={styles.scroll}>
          <h1 className={styles.heading}>
            <span className={styles.headingIcon} aria-hidden="true">
              🌙
            </span>
            Settings
          </h1>

          <div className={styles.group}>
            <label className={styles.groupLabel} htmlFor={nameId}>
              Child&rsquo;s name
            </label>
            <input
              id={nameId}
              className={styles.input}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Optional"
              autoComplete="off"
              autoCapitalize="words"
              autoCorrect="off"
              spellCheck={false}
              maxLength={24}
            />
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Bedtime steps</span>
            <RoutineToggleList routine={routine} onToggle={toggle} onMove={move} />
          </div>
        </div>

        <div className={styles.actions}>
          {enabledCount === 0 && (
            <p className={styles.warning}>Keep at least one step turned on.</p>
          )}
          <CompletionButton
            label="Save"
            variant="nav"
            locked={enabledCount === 0}
            onPress={() => onSave(cleanName(name), routine)}
          />
          <CompletionButton
            label="Start tonight over"
            variant="danger"
            locked={enabledCount === 0}
            onPress={() => onResetRoutine(cleanName(name), routine)}
          />
          <p className={styles.note}>Saves your changes and goes back to the first step.</p>
          <button type="button" className={styles.reset} onClick={onResetEverything}>
            Erase everything and set up again
          </button>
        </div>
      </div>
    </Screen>
  )
}

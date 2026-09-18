import { useId, useState } from 'react'

import { moveTask } from '../../app/routineMachine'
import { CompletionButton } from '../../components/CompletionButton'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { RoutineToggleList } from '../../components/RoutineToggleList'
import { Screen } from '../../components/Screen'
import type { AppSettings, ArtStyle, RoutineItem } from '../../models/types'
import { cleanName } from '../../utils/copy'
import styles from './settings.module.css'

type Props = {
  settings: AppSettings
  onSave: (name: string, routine: RoutineItem[]) => void
  onResetRoutine: (name: string, routine: RoutineItem[]) => void
  /** Applied immediately — the list below doubles as a live preview. */
  onArtStyleChange: (style: ArtStyle) => void
  /** Wipe the name and routine and return to first-run setup. */
  onResetEverything: () => void
  onClose: () => void
}

const ART_CHOICES: Array<{ value: ArtStyle; label: string }> = [
  { value: 'drawn', label: 'Drawn' },
  { value: 'emoji', label: 'Emoji' },
]

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
 * The parent screen, reached by the header's settings button.
 *
 * The step list is the main event and gets every row the chrome does not
 * need — the order of the routine is the thing a parent comes here to change,
 * so it should not be a strip squeezed between a big field and big buttons.
 *
 * Edits are held locally and committed on Save, so a parent can back out of a
 * change. There is no PIN or account; the protection against a child wandering
 * in is that arriving here changes nothing, and both destructive actions ask
 * before they act.
 */
export function ParentSettings({
  settings,
  onSave,
  onResetRoutine,
  onArtStyleChange,
  onResetEverything,
  onClose,
}: Props) {
  const [name, setName] = useState(settings.child.name)
  const [routine, setRoutine] = useState<RoutineItem[]>(() =>
    settings.routine.map((item) => ({ ...item })),
  )
  const nameId = useId()
  const artLabelId = useId()
  const [confirming, setConfirming] = useState<'restart' | 'erase' | null>(null)

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
        <div className={styles.topBar}>
          <button type="button" className={styles.back} onClick={onClose}>
            <BackIcon />
            Back
          </button>
          <h1 className={styles.heading}>🌙 Settings</h1>
        </div>

        <div className={styles.fields}>
          <div className={styles.nameRow}>
            <label className={styles.nameLabel} htmlFor={nameId}>
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

          <div className={styles.nameRow}>
            <span className={styles.nameLabel} id={artLabelId}>
              Step artwork
            </span>
            <div className={styles.segmented} role="radiogroup" aria-labelledby={artLabelId}>
              {ART_CHOICES.map((choice) => (
                <button
                  key={choice.value}
                  type="button"
                  role="radio"
                  aria-checked={settings.artStyle === choice.value}
                  className={`${styles.segment} ${
                    settings.artStyle === choice.value ? styles.segmentOn : ''
                  }`}
                  onClick={() => onArtStyleChange(choice.value)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.steps}>
          <div className={styles.stepsHead}>
            <span className={styles.stepsLabel}>Bedtime steps, in order</span>
            <span className={styles.stepsHint}>Drag ⠿ to reorder</span>
          </div>
          <div className={styles.stepsScroll}>
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
            size="compact"
            locked={enabledCount === 0}
            onPress={() => onSave(cleanName(name), routine)}
          />
          <div className={styles.minorActions}>
            <button
              type="button"
              className={`${styles.minorButton} ${styles.minorDanger}`}
              onClick={() => setConfirming('restart')}
              disabled={enabledCount === 0}
            >
              Start tonight over
            </button>
            <button
              type="button"
              className={`${styles.minorButton} ${styles.minorQuiet}`}
              onClick={() => setConfirming('erase')}
            >
              Erase everything
            </button>
          </div>
        </div>
      </div>

      {confirming === 'restart' && (
        <ConfirmDialog
          title="Start tonight over?"
          body="Saves your changes, clears tonight's stars, and goes back to the first step."
          confirmLabel="Start over"
          cancelLabel="Cancel"
          onConfirm={() => {
            setConfirming(null)
            onResetRoutine(cleanName(name), routine)
          }}
          onCancel={() => setConfirming(null)}
        />
      )}

      {confirming === 'erase' && (
        <ConfirmDialog
          title="Erase everything?"
          body="The name and your chosen steps are deleted, and setup starts again."
          confirmLabel="Erase everything"
          cancelLabel="Cancel"
          onConfirm={() => {
            setConfirming(null)
            onResetEverything()
          }}
          onCancel={() => setConfirming(null)}
        />
      )}
    </Screen>
  )
}

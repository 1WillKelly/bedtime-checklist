import { CompletionButton } from '../../components/CompletionButton'
import { RoutineToggleList } from '../../components/RoutineToggleList'
import { Screen } from '../../components/Screen'
import type { RoutineItem } from '../../models/types'
import styles from './setup.module.css'

type Props = {
  routine: RoutineItem[]
  onToggle: (id: string) => void
  onMove: (id: string, delta: number) => void
  onStart: () => void
}

/** Parent-facing: turn steps on or off, and put them in the right order. */
export function RoutineSetupScreen({ routine, onToggle, onMove, onStart }: Props) {
  const enabledCount = routine.filter((item) => item.enabled).length

  return (
    <Screen>
      <div className={styles.form}>
        <div className={styles.head}>
          <h1 className={styles.question}>Choose bedtime steps</h1>
          <p className={styles.hint}>
            Use the arrows to put them in your order. You can change all of this later.
          </p>
        </div>

        <div className={styles.middle}>
          <RoutineToggleList routine={routine} onToggle={onToggle} onMove={onMove} />
        </div>

        <div className={styles.foot}>
          {enabledCount === 0 && (
            <p className={styles.warning}>Turn on at least one step to start bedtime.</p>
          )}
          <CompletionButton
            label="Start bedtime"
            variant="nav"
            onPress={onStart}
            locked={enabledCount === 0}
          />
          <p className={styles.note}>
            During bedtime, tap ↺ in the top corner to start over, or hold the dot beside it
            for settings.
          </p>
        </div>
      </div>
    </Screen>
  )
}

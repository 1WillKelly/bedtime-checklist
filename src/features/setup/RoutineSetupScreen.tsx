import { CompletionButton } from '../../components/CompletionButton'
import { RoutineToggleList } from '../../components/RoutineToggleList'
import { Screen } from '../../components/Screen'
import type { RoutineItem } from '../../models/types'
import styles from './setup.module.css'

type Props = {
  routine: RoutineItem[]
  onToggle: (id: string) => void
  onStart: () => void
}

/** Parent-facing. Order is fixed in this version; enable/disable is the knob. */
export function RoutineSetupScreen({ routine, onToggle, onStart }: Props) {
  const enabledCount = routine.filter((item) => item.enabled).length

  return (
    <Screen>
      <div className={styles.form}>
        <div className={styles.head}>
          <h1 className={styles.question}>Choose bedtime steps</h1>
          <p className={styles.hint}>You can always change these later.</p>
        </div>

        <div className={styles.middle}>
          <RoutineToggleList routine={routine} onToggle={onToggle} />
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
        </div>
      </div>
    </Screen>
  )
}

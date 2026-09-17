import { CompletionButton } from '../../components/CompletionButton'
import { Mascot } from '../../components/Mascot'
import { Screen } from '../../components/Screen'
import { ScreenHeader } from '../../components/ScreenHeader'
import { bedtimeTitle } from '../../utils/copy'
import styles from './routine.module.css'

type Props = {
  childName: string
  onStart: () => void
  onOpenParentSettings: () => void
}

/** A single calm beat before the first task. Deliberately not an onboarding flow. */
export function BedtimeStartScreen({ childName, onStart, onOpenParentSettings }: Props) {
  return (
    <Screen tone="night" skySeed={11}>
      <ScreenHeader tone="night" onOpenSettings={onOpenParentSettings} />
      <div className={styles.start}>
        <div className={styles.startHead}>
          <h1 className={styles.startTitle}>{bedtimeTitle(childName)}</h1>
          <p className={styles.startSub}>Let&rsquo;s get ready for a good night&rsquo;s sleep.</p>
        </div>

        <div className={styles.startArt}>
          <Mascot className={styles.startMascot} />
        </div>

        <CompletionButton label="Let's go" variant="nav" onPress={onStart} />
      </div>
    </Screen>
  )
}

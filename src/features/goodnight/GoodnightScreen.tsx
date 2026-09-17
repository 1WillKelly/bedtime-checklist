import { Mascot } from '../../components/Mascot'
import { Screen } from '../../components/Screen'
import { ScreenHeader } from '../../components/ScreenHeader'
import { goodnightTitle } from '../../utils/copy'
import styles from './goodnight.module.css'

type Props = {
  childName: string
  onOpenParentSettings: () => void
  onRestart: () => void
}

/**
 * The end. No score, no streak, no "play again" — the only message is that
 * we are finished and it is time to sleep. The header's two controls are
 * parent-sized and parent-shaped: a restart that asks first, and a long-press
 * for settings. Neither reads as an invitation to keep playing.
 */
export function GoodnightScreen({ childName, onOpenParentSettings, onRestart }: Props) {
  return (
    <Screen tone="night" skySeed={23} skyMood="calm">
      <ScreenHeader
        tone="night"
        onRestart={onRestart}
        onOpenParentSettings={onOpenParentSettings}
      />
      <div className={styles.goodnight}>
        <div className={styles.body}>
          <h1 className={styles.title}>{goodnightTitle(childName)}</h1>
          <Mascot className={styles.art} mood="asleep" />
          <p className={styles.sub}>
            You did everything.
            <br />
            Time to close your eyes.
          </p>
        </div>
        <div className={styles.tail} />
      </div>
    </Screen>
  )
}

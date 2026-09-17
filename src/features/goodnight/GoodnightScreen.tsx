import { Mascot } from '../../components/Mascot'
import { ParentAccessTrigger } from '../../components/ParentAccessTrigger'
import { Screen } from '../../components/Screen'
import { goodnightTitle } from '../../utils/copy'
import styles from './goodnight.module.css'

type Props = {
  childName: string
  onOpenParentSettings: () => void
}

/**
 * The end. No score, no streak, no "play again" — the only message is that
 * we are finished and it is time to sleep. The single control on screen is
 * the parent's hidden long-press, which a child will not find by tapping.
 */
export function GoodnightScreen({ childName, onOpenParentSettings }: Props) {
  return (
    <Screen tone="night" skySeed={23} skyMood="calm">
      <ParentAccessTrigger tone="night" onOpen={onOpenParentSettings} />
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

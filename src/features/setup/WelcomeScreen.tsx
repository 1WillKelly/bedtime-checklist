import { CompletionButton } from '../../components/CompletionButton'
import { Mascot } from '../../components/Mascot'
import { Screen } from '../../components/Screen'
import styles from './setup.module.css'

type Props = {
  onContinue: () => void
}

/** First run only. Sets the tone before any parent data entry. */
export function WelcomeScreen({ onContinue }: Props) {
  return (
    <Screen tone="night" skySeed={3}>
      <div className={styles.welcome}>
        <div className={styles.welcomeBody}>
          <Mascot className={styles.mascot} />
          <h1 className={styles.brand}>Goodnight Checklist</h1>
          <p className={styles.tagline}>A happier bedtime, one step at a time.</p>
        </div>
        <CompletionButton label="Get started" variant="nav" onPress={onContinue} />
      </div>
    </Screen>
  )
}

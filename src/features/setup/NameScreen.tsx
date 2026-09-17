import { useId, useState } from 'react'

import { CompletionButton } from '../../components/CompletionButton'
import { Screen } from '../../components/Screen'
import { cleanName } from '../../utils/copy'
import styles from './setup.module.css'

type Props = {
  initialName: string
  onContinue: (name: string) => void
}

/** Parent-facing. The name is optional — blank is a fully supported path. */
export function NameScreen({ initialName, onContinue }: Props) {
  const [value, setValue] = useState(initialName)
  const inputId = useId()

  return (
    <Screen>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault()
          onContinue(cleanName(value))
        }}
      >
        <div className={styles.head}>
          <h1 className={styles.question}>What&rsquo;s your child&rsquo;s name?</h1>
          <p className={styles.hint}>
            We&rsquo;ll use it to make bedtime feel extra special. You can leave this blank.
          </p>
        </div>

        <div className={styles.middle}>
          <div className={styles.field}>
            <label className="visually-hidden" htmlFor={inputId}>
              Child&rsquo;s name (optional)
            </label>
            <input
              id={inputId}
              className={styles.input}
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Name"
              autoComplete="off"
              autoCapitalize="words"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="next"
              maxLength={24}
            />
          </div>
        </div>

        <div className={styles.foot}>
          <CompletionButton
            label="Continue"
            variant="nav"
            onPress={() => onContinue(cleanName(value))}
          />
        </div>
      </form>
    </Screen>
  )
}

import { useEffect, useId, useRef } from 'react'

import { CompletionButton } from './CompletionButton'
import styles from './ConfirmDialog.module.css'

type Props = {
  title: string
  body?: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * A deliberate second step in front of anything destructive.
 *
 * This is also the child guard: the restart control sits in plain sight in the
 * header, and a toddler poking it lands here rather than wiping the routine.
 * Two specific taps is a bar a parent clears instantly and a toddler does not.
 */
export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  const titleId = useId()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    cardRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className={styles.scrim} onClick={onCancel}>
      <div
        ref={cardRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        // Taps inside the card must not fall through to the scrim's dismiss.
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className={styles.title} id={titleId}>
          {title}
        </h2>
        {body && <p className={styles.body}>{body}</p>}
        <div className={styles.actions}>
          <CompletionButton
            label={confirmLabel}
            variant="danger"
            size="compact"
            onPress={onConfirm}
          />
          <CompletionButton label={cancelLabel} variant="nav" size="compact" onPress={onCancel} />
        </div>
      </div>
    </div>
  )
}

import type { CSSProperties } from 'react'

import styles from './TaskIllustration.module.css'
import { getIllustration } from './illustrations'

type Props = {
  /** Illustration registry key, e.g. the RoutineItem's `illustration` field. */
  id: string
  /** `hero` fills the task screen; `chip` is the small setup-list version. */
  size?: 'hero' | 'chip'
  className?: string
}

/**
 * Renders a task's artwork. Consumers never touch the registry directly, so
 * swapping emoji placeholders for real SVG/PNG art is a registry-only change.
 */
export function TaskIllustration({ id, size = 'hero', className }: Props) {
  const spec = getIllustration(id)
  const Art = spec.Art

  return (
    <div
      className={[styles.scene, size === 'chip' ? styles.small : '', className]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--tint': spec.tint,
          '--accent': spec.accent,
        } as CSSProperties
      }
      role="img"
      aria-label={spec.alt}
    >
      <span className={`${styles.blob} ${styles.blobA}`} aria-hidden="true" />
      <span className={`${styles.blob} ${styles.blobB}`} aria-hidden="true" />
      {Art ? (
        <Art className={styles.art} />
      ) : (
        <span className={styles.glyph} aria-hidden="true">
          {spec.glyph}
        </span>
      )}
    </div>
  )
}

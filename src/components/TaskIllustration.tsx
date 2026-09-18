import type { CSSProperties } from 'react'

import { useArtStyle } from './ArtStyleContext'
import styles from './TaskIllustration.module.css'
import { getIllustration } from './illustrations'

type Props = {
  /** Illustration registry key, e.g. the RoutineItem's `illustration` field. */
  id: string
  /**
   * `hero` fills the task screen, `celebrate` is the slightly smaller version
   * that shares the reward screen with the star, `chip` is the setup-list size.
   */
  size?: 'hero' | 'celebrate' | 'chip'
  className?: string
}

/**
 * Renders a task's artwork. Consumers never touch the registry directly, so
 * swapping artwork is a registry-only change, and the drawn/emoji preference
 * is read here rather than passed down through every screen.
 */
export function TaskIllustration({ id, size = 'hero', className }: Props) {
  const artStyle = useArtStyle()
  const spec = getIllustration(id)
  // Emoji is always the fallback, so a task with no drawn art still renders.
  const Art = artStyle === 'drawn' ? spec.Art : undefined

  return (
    <div
      className={[
        styles.scene,
        size === 'chip' ? styles.small : '',
        size === 'celebrate' ? styles.celebrate : '',
        className,
      ]
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

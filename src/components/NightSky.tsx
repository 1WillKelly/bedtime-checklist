import { useMemo } from 'react'
import type { CSSProperties } from 'react'

import styles from './NightSky.module.css'

type Props = {
  /** `calm` slows and dims everything for the final goodnight screen. */
  mood?: 'awake' | 'calm'
  seed?: number
}

const StarShape = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 2.4l2.8 6 6.6.8-4.9 4.5 1.3 6.6L12 17l-5.8 3.3 1.3-6.6L2.6 9.2l6.6-.8L12 2.4Z"
      fill="currentColor"
    />
  </svg>
)

/** Deterministic pseudo-random so the sky doesn't reshuffle on every render. */
function rand(seed: number, index: number, salt: number): number {
  const x = Math.sin(seed * 97.13 + index * 31.7 + salt * 12.9) * 43758.5453
  return x - Math.floor(x)
}

/**
 * The ambient night background shared by every dark screen. Purely decorative:
 * marked data-ambient so reduced-motion users get a still sky.
 */
export function NightSky({ mood = 'awake', seed = 7 }: Props) {
  const specks = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        left: rand(seed, index, 1) * 100,
        top: rand(seed, index, 2) * 74,
        size: 1.5 + rand(seed, index, 3) * 2.4,
        delay: rand(seed, index, 4) * 4,
      })),
    [seed],
  )

  /*
   * Big stars are pushed into the upper corners rather than scattered. Screen
   * copy is centred both ways, and a gold star sitting behind a headline reads
   * as clutter rather than atmosphere. The small specks still go anywhere.
   */
  const bigStars = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => {
        const onLeft = index % 2 === 0
        return {
          left: (onLeft ? 4 : 72) + rand(seed, index, 5) * 22,
          top: 5 + rand(seed, index, 6) * 20,
          size: 14 + rand(seed, index, 7) * 16,
          delay: rand(seed, index, 8) * 5,
        }
      }),
    [seed],
  )

  return (
    <div className={styles.sky} aria-hidden="true">
      {specks.map((speck, index) => (
        <span
          key={`s${index}`}
          className={styles.star}
          data-ambient=""
          style={
            {
              left: `${speck.left}%`,
              top: `${speck.top}%`,
              width: `${speck.size}px`,
              height: `${speck.size}px`,
              animationDelay: `${speck.delay}s`,
              animationDuration: mood === 'calm' ? '7s' : '4s',
            } as CSSProperties
          }
        />
      ))}

      {bigStars.map((star, index) => (
        <span
          key={`b${index}`}
          className={styles.bigStar}
          data-ambient=""
          style={
            {
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: mood === 'calm' ? '11s' : '7s',
              opacity: mood === 'calm' ? 0.75 : 1,
            } as CSSProperties
          }
        >
          <StarShape />
        </span>
      ))}

      <span className={styles.cloud} style={{ left: '-18%', width: '70%', height: '22%' }} />
      <span className={styles.cloud} style={{ right: '-22%', width: '78%', height: '18%' }} />
    </div>
  )
}

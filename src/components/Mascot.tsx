import type { FC } from 'react'

type Props = {
  className?: string
  /** `awake` waves; `asleep` closes its eyes for the goodnight screen. */
  mood?: 'awake' | 'asleep'
}

/**
 * The app's friendly face. A placeholder in the same slot-and-swap spirit as
 * the task illustrations: replace the SVG body here with commissioned art and
 * every screen that uses it updates at once.
 */
export const Mascot: FC<Props> = ({ className, mood = 'awake' }) => (
  <span className={className}>
    <svg viewBox="0 0 200 200" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="100%" stopColor="#ffcf5f" />
        </radialGradient>
      </defs>

      {/* Crescent moon body */}
      <path
        d="M132 18a84 84 0 1 0 44 148 68 68 0 0 1-44-148Z"
        fill="url(#moonGlow)"
        stroke="#e8a92c"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Craters */}
      <circle cx="112" cy="58" r="9" fill="#f0c163" opacity="0.55" />
      <circle cx="96" cy="128" r="6" fill="#f0c163" opacity="0.45" />

      {/* Sleepy face */}
      <path
        d={
          mood === 'asleep'
            ? 'M84 92c5 7 13 7 18 0'
            : 'M84 90c5 7 13 7 18 0'
        }
        fill="none"
        stroke="#7a5200"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M118 92c5 7 13 7 18 0"
        fill="none"
        stroke="#7a5200"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M96 116c6 6 18 6 26 0"
        fill="none"
        stroke="#7a5200"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="108" rx="10" ry="7" fill="#ff9c8f" opacity="0.5" />
      <ellipse cx="140" cy="108" rx="10" ry="7" fill="#ff9c8f" opacity="0.5" />
    </svg>
  </span>
)

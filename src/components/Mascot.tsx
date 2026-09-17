import type { FC } from 'react'

type Props = {
  className?: string
  /** `awake` looks out at the child; `asleep` closes its eyes for goodnight. */
  mood?: 'awake' | 'asleep'
}

/**
 * The app's friendly face — a crescent moon.
 *
 * The crescent is an 80r outer arc with a 140r inner arc curving back into it
 * (sweep-flag 1 — flag 0 picks the mirrored circle and yields a lens), which
 * leaves a belly wide enough (x roughly 46-100 at mid height) to sit a face in.
 * Keep any new features inside that band or they float off the shape.
 *
 * Placeholder art in the same slot-and-swap spirit as the task illustrations:
 * replace the SVG body here and every screen using it updates at once.
 */
export const Mascot: FC<Props> = ({ className, mood = 'awake' }) => (
  <span className={className}>
    <svg viewBox="0 0 200 200" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="moonFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="100%" stopColor="#ffc94a" />
        </linearGradient>
      </defs>

      <g transform="translate(8, 0)">
        <path
          d="M125 20 A80 80 0 1 0 125 180 A140 140 0 0 1 125 20 Z"
          fill="url(#moonFill)"
          stroke="#e8a92c"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Craters, kept clear of the face. */}
        <circle cx="82" cy="52" r="7" fill="#efbe57" opacity="0.55" />
        <circle cx="72" cy="148" r="5.5" fill="#efbe57" opacity="0.45" />

        {/* Cheeks */}
        <ellipse cx="54" cy="104" rx="8" ry="5.5" fill="#ff9c8f" opacity="0.5" />
        <ellipse cx="92" cy="104" rx="8" ry="5.5" fill="#ff9c8f" opacity="0.5" />

        {mood === 'asleep' ? (
          <>
            <path
              d="M56 92q7 8 14 0"
              fill="none"
              stroke="#8a5f00"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M78 92q7 8 14 0"
              fill="none"
              stroke="#8a5f00"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx="63" cy="91" r="5.5" fill="#8a5f00" />
            <circle cx="85" cy="91" r="5.5" fill="#8a5f00" />
          </>
        )}

        <path
          d="M64 110q10 10 20 0"
          fill="none"
          stroke="#8a5f00"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  </span>
)

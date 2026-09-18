import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * A white clawfoot bathtub full of blue water and heaped with suds, with a yellow rubber
 * duck riding the foam. Only the four soap bubbles move — they drift up and fade on
 * staggered delays, so the tub itself stays as still and solid as a wooden toy.
 */
export function BathArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="bath-porcelain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbedfb" />
        </linearGradient>
        <linearGradient id="bath-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9d8f4" />
          <stop offset="1" stopColor="#79bce8" />
        </linearGradient>
        <clipPath id="bath-tub-clip">
          <path d="M 17 62 L 21 83 Q 22.5 91 31 91 L 89 91 Q 97.5 91 99 83 L 103 62 Z" />
        </clipPath>
      </defs>

      {/* Clawfoot legs: one splayed capsule per side, each with an oval pad painted
          over its foot. The pad carries the same stroke weight as the leg, so it closes
          the union outline itself and its top arc reads as the ankle. The capsule tops
          are hidden under the tub body, which is drawn next. */}
      <g fill="#ffffff" stroke="#3f8ec9" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <rect x="27" y="80" width="11" height="24" rx="5" transform="rotate(14 32.5 90)" />
        <rect x="82" y="80" width="11" height="24" rx="5" transform="rotate(-14 87.5 90)" />
        <ellipse cx="30" cy="103.5" rx="8.5" ry="3.8" />
        <ellipse cx="90" cy="103.5" rx="8.5" ry="3.8" />
      </g>

      {/* Tub body, the water standing in it, then the rolled rim capping the top edge.
          The rim sits low enough that a clear band of it still reads below the heaped suds. */}
      <path
        d="M 17 62 L 21 83 Q 22.5 91 31 91 L 89 91 Q 97.5 91 99 83 L 103 62 Z"
        fill="url(#bath-porcelain)"
        stroke="#3f8ec9"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Water, clipped to the inside of the body so the tub carries real tonal mass rather
          than reading as an empty outline. Its surface starts a few units above the rim's
          lower edge, so the rim covers the waterline and no seam shows across the tub. */}
      <g clipPath="url(#bath-tub-clip)">
        <rect x="14" y="68" width="92" height="24" fill="url(#bath-water)" />
      </g>

      {/* Outline redrawn over the water: the clip follows the body path, so the fill would
          otherwise cover the inner half of the tub's stroke everywhere the water reaches. */}
      <path
        d="M 17 62 L 21 83 Q 22.5 91 31 91 L 89 91 Q 97.5 91 99 83 L 103 62 Z"
        fill="none"
        stroke="#3f8ec9"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <rect
        x="12"
        y="60"
        width="96"
        height="11"
        rx="5.5"
        fill="#ffffff"
        stroke="#3f8ec9"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Suds behind the duck. */}
      <g fill="#e3f2fe" stroke="#6fb9ea" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="22" cy="57" r="8.5" />
        <circle cx="36" cy="53" r="9.5" />
        <circle cx="51" cy="56" r="9.5" />
        <circle cx="69" cy="56" r="9.5" />
        <circle cx="84" cy="53" r="9.5" />
        <circle cx="98" cy="57" r="8.5" />
      </g>

      {/* Rubber duck. Tail first, body painted straight over it, so the tail reads as
          poking out from behind the body and both keep a full-weight outline. */}
      <g fill="#ffd257" stroke="#d9922a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="45.95,47.6 41,37 51.6,42" />
        <ellipse cx="58" cy="46.5" rx="13.5" ry="9.5" />
      </g>
      <polygon
        points="73.5,33.6 84,37 73.5,40.4"
        fill="#ff9d3d"
        stroke="#d1661a"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="68.5" cy="36.5" r="8" fill="#ffd257" stroke="#d9922a" strokeWidth="2.5" />
      <circle cx="70.8" cy="34.4" r="2" fill="#5b3a12" />

      {/* Suds in front, nesting the duck down into the foam. */}
      <g fill="#e3f2fe" stroke="#6fb9ea" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="45" cy="59" r="7" />
        <circle cx="58" cy="59.5" r="7.5" />
        <circle cx="71" cy="59" r="6.5" />
      </g>

      {/* Floating soap bubbles — the one ambient motion. */}
      <g fill="#f2faff" stroke="#57a8dd" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <circle
          className={`${styles.anim} ${styles.rise}`}
          data-ambient=""
          style={{ animationDelay: '0s' }}
          cx="28"
          cy="28"
          r="4.5"
        />
        <circle
          className={`${styles.anim} ${styles.rise}`}
          data-ambient=""
          style={{ animationDelay: '1.2s' }}
          cx="40"
          cy="22"
          r="3"
        />
        <circle
          className={`${styles.anim} ${styles.rise}`}
          data-ambient=""
          style={{ animationDelay: '0.6s' }}
          cx="90"
          cy="26"
          r="4"
        />
        <circle
          className={`${styles.anim} ${styles.rise}`}
          data-ambient=""
          style={{ animationDelay: '1.9s' }}
          cx="79"
          cy="23"
          r="2.8"
        />
      </g>
    </svg>
  )
}

import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * A sleeping crescent moon with rosy cheeks, nestled into a soft pale cloud.
 * Three little stars twinkle on a stagger — the sky keeps breathing while the moon stays still.
 *
 * The crescent is two arcs: a 30r outer arc taken the long way round the left
 * (large-arc 1, sweep 0 — that pair picks the circle centred at x 48), closed by
 * a 32r inner arc centred off to the right at x 81 (large-arc 0, sweep 1). The
 * sweep flags choose *which* circle each arc belongs to; flipping either one
 * swaps in the mirrored circle and the moon collapses into a leaf. The inner
 * arc's apex sits at x 49 while its endpoints sit at x 62.6, so the right side
 * is genuinely concave and the belly stays ~31 wide for the face.
 */
export function GoodnightArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="goodnight-moon-fill" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#ffeeb6" />
          <stop offset="100%" stopColor="#ffc63f" />
        </linearGradient>
      </defs>

      {/* Stars — four-point sparkles, each arm pinched by a control point at the centre.
          Radii step 9 / 7 / 5 so the three read as a deliberate size ramp rather than
          three near-identical marks. All sit clear of the moon: the moon never reaches
          past x 62.6, and the r=7 star's left tip stops at x 67. */}
      <g fill="#ffe3a0" stroke="#e0a129" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0s' }}
          d="M93 14 Q93 23 102 23 Q93 23 93 32 Q93 23 84 23 Q93 23 93 14 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0.9s' }}
          d="M17 12 Q17 17 22 17 Q17 17 17 22 Q17 17 12 17 Q17 17 17 12 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '1.6s' }}
          d="M74 39 Q74 46 81 46 Q74 46 74 53 Q74 46 67 46 Q74 46 74 39 Z"
        />
      </g>

      {/* Crescent. Spans x 18–62.6, y 17–77; its lower flank sinks into the cloud. */}
      <path
        d="M62.6 20.8 A30 30 0 1 0 62.6 73.2 A32 32 0 0 1 62.6 20.8 Z"
        fill="url(#goodnight-moon-fill)"
        stroke="#c98a1e"
        strokeWidth="3.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Craters, kept well clear of the face and of the cut-out edge. */}
      <circle cx="36" cy="27" r="3.5" fill="#f0bf58" opacity="0.5" />
      <circle cx="30" cy="63" r="2.8" fill="#f0bf58" opacity="0.45" />

      {/* Cheeks — centred on the belly (x 18–49 at mid height), not the moon's own centre. */}
      <ellipse cx="25.5" cy="47" rx="4" ry="2.8" fill="#ff9c8f" opacity="0.6" />
      <ellipse cx="41.5" cy="47" rx="4" ry="2.8" fill="#ff9c8f" opacity="0.6" />

      {/* Closed eyes and a contented smile, inside the crescent's thick belly. */}
      <g fill="none" stroke="#8a5f00" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23.5 38q4 4.5 8 0" />
        <path d="M35.5 38q4 4.5 8 0" />
        <path d="M28.5 51q5 5 10 0" />
      </g>

      {/* Cloud: a flat-based capsule plus three bumps. Drawn twice — once stroked to
          lay down the silhouette, then re-filled without stroke so the seams between
          the bumps disappear. The re-fill covers the inner half of every stroke, so
          strokeWidth 6 is what leaves a ~3 wide line against the periwinkle. */}
      <g fill="#fbf9ff" stroke="#8a7cd4" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <rect x="24" y="86" width="68" height="20" rx="10" />
        <circle cx="40" cy="80" r="16" />
        <circle cx="60" cy="82" r="13" />
        <circle cx="78" cy="86" r="14" />
      </g>
      <g fill="#fbf9ff">
        <rect x="24" y="86" width="68" height="20" rx="10" />
        <circle cx="40" cy="80" r="16" />
        <circle cx="60" cy="82" r="13" />
        <circle cx="78" cy="86" r="14" />
      </g>
    </svg>
  )
}

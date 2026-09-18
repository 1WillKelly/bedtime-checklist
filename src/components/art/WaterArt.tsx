import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * A squat, wide-mouthed tumbler — a toddler's beaker rather than a dinner glass —
 * most of the way full of aqua water, with an open rim, a soft white highlight down
 * one side and a single droplet above it. Only the droplet moves — it falls towards
 * the rim and fades, so the glass itself stays still and legible.
 *
 * The cup is drawn short and wide on purpose. The card crops to a circle and the art
 * is laid in at 66% of it, so a tall thin glass ends up covering about a third of the
 * card while the tub, the book stack and the notes each cover about half. Width here
 * (18 to 102, 87.5 across once the 3.5 stroke is counted) is what puts this card back
 * in the set; height came down to pay for it. Widen or narrow the body and the rim
 * ellipse's rx has to follow, or the mouth stops meeting the top corners.
 */
export function WaterArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="water-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fddcd" />
          <stop offset="1" stopColor="#47b6a1" />
        </linearGradient>
        <clipPath id="water-glass-clip">
          <path d="M18 40 L23 93 Q23 102 32 102 L88 102 Q97 102 97 93 L102 40 Z" />
        </clipPath>
      </defs>

      {/* Tapered tumbler: two leaning walls, rounded lower corners, flat base. */}
      <path
        d="M18 40 L23 93 Q23 102 32 102 L88 102 Q97 102 97 93 L102 40 Z"
        fill="#f4fdfb"
        stroke="#2f9280"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Water, clipped to the inside of the glass so it can overhang safely. The surface
          sits low enough that the near lip of the rim and the far edge of the water do not
          pinch together in the middle — that gap has to read as air across the whole width,
          and a mouth this wide eats the gap faster than a narrow one does. */}
      <g clipPath="url(#water-glass-clip)">
        <rect x="16" y="64" width="88" height="44" fill="url(#water-fill)" />
        <ellipse
          cx="60"
          cy="64"
          rx="40"
          ry="6.5"
          fill="#bdeee4"
          stroke="#359a87"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>

      {/* Outline redrawn over the water: the clip follows the outer path, so the fill
          would otherwise cover the inner half of the wall stroke everywhere the glass
          is full and leave the lower 60% outlined at half weight. */}
      <path
        d="M18 40 L23 93 Q23 102 32 102 L88 102 Q97 102 97 93 L102 40"
        fill="none"
        stroke="#2f9280"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Open rim, drawn over the flat top of the body so the glass reads hollow. Its rx
          matches the body's top corners and ry keeps the same 1:6.2 tilt the old rim had,
          so the mouth is seen from the same height as before. */}
      <ellipse
        cx="60"
        cy="40"
        rx="42"
        ry="6.8"
        fill="#f4fdfb"
        stroke="#2f9280"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Soft highlight stripe, leaning with the taper of the left wall. */}
      <rect
        x="30"
        y="62"
        width="7.5"
        height="34"
        rx="3.75"
        fill="#ffffff"
        fillOpacity="0.72"
        transform="rotate(-5 33.75 79)"
      />

      {/* The one moving part: a droplet on its way in. At the end of its fall it sinks
          into the mouth of the glass, by which point it has faded out. */}
      <path
        className={`${styles.anim} ${styles.drip}`}
        data-ambient=""
        style={{ animationDelay: '0.4s' }}
        d="M67 7 Q72.5 15.5 72.5 18.5 A5.5 5.5 0 0 1 61.5 18.5 Q61.5 15.5 67 7 Z"
        fill="#86dccc"
        stroke="#359a87"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

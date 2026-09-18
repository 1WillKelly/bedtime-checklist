import type { ArtProps } from '../types'
import styles from '../art.module.css'

/** A toddler's potty chair: a marigold seat and backrest with a cut-out carry grip, over a squat sky-blue pot on a flared foot. */
export function PottyC({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        {/* Punches the carry grip clean through the backrest so the page shows
            through it. A filled slot reads as a sticker; a hole reads as a handle. */}
        <mask id="pottyc-grip" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
          <rect x="0" y="0" width="120" height="120" fill="#ffffff" />
          <rect x="48" y="21" width="24" height="9" rx="4.5" fill="#000000" />
        </mask>
      </defs>

      {/* The whole moulding breathes as one piece — the single ambient motion.
          A potty sits on the floor, so it must not bob or sway. */}
      <g className={`${styles.anim} ${styles.pulse}`} data-ambient="">
        {/* Backrest, drawn first so the seat caps its lower half. It widens
            towards the seat like a chair back: a straight-sided panel reads as a
            handle or a hat crown instead. Same marigold as the seat, because
            backrest and seat are one moulded part. */}
        <path
          d="M 34 20 Q 34 11 43 11 L 77 11 Q 86 11 86 20 L 90 54 L 30 54 Z"
          fill="#ffc85c"
          stroke="#cf8a1e"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          mask="url(#pottyc-grip)"
        />
        <rect
          x="48"
          y="21"
          width="24"
          height="9"
          rx="4.5"
          fill="none"
          stroke="#cf8a1e"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Pot — a shallow tapering tub. Nearly as wide as the seat above it, so
            the seat reads as a lip on the pot rather than a brim on a bucket. */}
        <path
          d="M 20 62 L 100 62 L 92 100 L 28 100 Z"
          fill="#7cc4e8"
          stroke="#2f7ea9"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Gloss stripe. No outline — it is light on the plastic, not an edge. */}
        <rect x="31" y="74" width="7" height="18" rx="3.5" fill="#b3e0f5" />

        {/* Flared foot: the wide, floor-planted stance. Painted over the pot's
            bottom corners, so it closes that outline itself. */}
        <rect
          x="24"
          y="96"
          width="72"
          height="13"
          rx="6.5"
          fill="#7cc4e8"
          stroke="#2f7ea9"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Seat. A different hue from the shell so the two mouldings separate at
            a glance, and deep enough front-to-back that the opening inside it
            still reads as an ellipse rather than a slot. */}
        <ellipse
          cx="60"
          cy="56"
          rx="44"
          ry="17"
          fill="#ffc85c"
          stroke="#cf8a1e"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* The opening. Its top edge is the true ellipse; its front edge lifts in
            the middle, which is the splash guard standing in front of the hole.
            The seat band is thick at the back and thin at the front, so the seat
            plane reads as tipped towards the viewer. */}
        <path
          d="M 30 59 A 30 8 0 0 1 90 59 Q 89 66 78 65.4 Q 60 61.5 42 65.4 Q 31 66 30 59 Z"
          fill="#2a6f97"
          stroke="#1b4b68"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

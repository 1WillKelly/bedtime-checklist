import type { ArtProps } from '../types'
import styles from '../art.module.css'

/** A child's potty seen three-quarters from above: open seat, backrest and squat flat-based shell. */
export function PottyA({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="pottya-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6e0f8" />
        </linearGradient>
      </defs>

      {/* The whole object breathes very slightly as one piece, so it stays a single solid
          nameable shape while still feeling alive. styles.anim sets transform-box: fill-box,
          which keeps the scale about the drawing's own centre. */}
      <g className={`${styles.anim} ${styles.pulse}`} data-ambient="">
        {/* Backrest. Taller than it is wide and clearly narrower than the seat, so it reads
            as the back of a little chair. A low wide dome here reads as a lid handle and a
            flared one as a lampshade — both tested worse. Its bottom runs to y=70 purely so
            the rounded lower corners stay hidden behind the seat. */}
        <rect
          x="34"
          y="12"
          width="52"
          height="58"
          rx="21"
          fill="#b7a7ef"
          stroke="#6753bb"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Shell. 72 units across at the top, 52 at the base, 45 tall, with a flat bottom —
            squat and standing on the floor rather than tall and carryable. Deliberately
            narrower than the seat so the seat overhangs it; drawn flush, the pair reads as a
            lidded casserole instead. The straight top edge hides behind the seat. */}
        <path
          d="M24 62 Q22 94 34 107 L86 107 Q98 94 96 62 Z"
          fill="url(#pottya-shell)"
          stroke="#7263c2"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Seat — the widest thing in the drawing, brimming ~10 units past the shell. */}
        <ellipse
          cx="60"
          cy="62"
          rx="46"
          ry="17.5"
          fill="#b7a7ef"
          stroke="#6753bb"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* The opening: the one cue a bucket, pot or tub can never show, so it is large and
            dark. Nudged a unit toward the back, which leaves a thicker front rim and sells
            the viewpoint as looking down into it. */}
        <ellipse
          cx="60"
          cy="61"
          rx="34"
          ry="11.5"
          fill="#4b3d94"
          stroke="#392c73"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Splash guard, rising off the front rim and intruding into the opening. Drawn last
            so it occludes the rim and reads as raised, and kept inside the seat's outline so
            it never breaks the silhouette. */}
        <ellipse
          cx="60"
          cy="73.5"
          rx="16"
          ry="5.5"
          fill="#b7a7ef"
          stroke="#6753bb"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

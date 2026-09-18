import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * A two-piece pyjama set laid out ready for bed: a chunky star-print top above
 * a pair of bottoms.
 * The printed stars twinkle out of step with each other, so the cloth shimmers
 * while the garment itself stays completely still.
 */
export function PajamasArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        {/* Barely-there warmth from shoulder to hem; the coral stays flat enough to read as one garment. */}
        <linearGradient id="pajamas-cloth" x1="0" y1="19" x2="0" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffae91" />
          <stop offset="1" stopColor="#ff9b80" />
        </linearGradient>
      </defs>

      {/* Bottoms: two legs and a waistband. Wide stroke pass first, then a fill-only
          pass over the top, so the three pieces read as one silhouette instead of a
          pill stuck onto two legs. The waistband's bottom corners are square and land
          on the legs' straight outer edges, so the hip flows into the leg with no pinch. */}
      <g fill="#f086ad" stroke="#cc5c85" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <rect x="40" y="73" width="16" height="31" rx="8" />
        <rect x="64" y="73" width="16" height="31" rx="8" />
        <path d="M 40 84 L 40 76 A 6 6 0 0 1 46 70 L 74 70 A 6 6 0 0 1 80 76 L 80 84 Z" />
      </g>
      <g fill="#f086ad">
        <rect x="40" y="73" width="16" height="31" rx="8" />
        <rect x="64" y="73" width="16" height="31" rx="8" />
        <path d="M 40 84 L 40 76 A 6 6 0 0 1 46 70 L 74 70 A 6 6 0 0 1 80 76 L 80 84 Z" />
      </g>

      {/* Waistband: a deeper band of the same pink spanning hip seam to hip seam. Its
          top and sides trace the hip path exactly, so its only free edge is the seam
          at y 79 — it can never read as a bar floating inside the pants. The seam is
          butt-capped at x 40 and x 80 so it dies into the outline rather than past it. */}
      <path d="M 40 79 L 40 76 A 6 6 0 0 1 46 70 L 74 70 A 6 6 0 0 1 80 76 L 80 79 Z" fill="#e2679a" />
      <line x1="40" y1="79" x2="80" y2="79" stroke="#cc5c85" strokeWidth="2.2" strokeLinecap="butt" />

      {/* Sleeves sit under the body, so the shoulder seam reads but the silhouette stays clean.
          Each one gets a cuff at the far end — the sleeve's own rounded cap plus three units of
          straight, so the arm stops in a wrist instead of fading out as a tube. The cuff shares
          the sleeve's stroke width, so the two outlines land on top of each other exactly. */}
      <g transform="rotate(-24 42 32)">
        <rect
          x="10"
          y="26"
          width="36"
          height="16"
          rx="8"
          fill="url(#pajamas-cloth)"
          stroke="#d9603f"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 21 26 L 18 26 A 8 8 0 0 0 18 42 L 21 42 Z"
          fill="#f4805c"
          stroke="#d9603f"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      <g transform="rotate(24 78 32)">
        <rect
          x="74"
          y="26"
          width="36"
          height="16"
          rx="8"
          fill="url(#pajamas-cloth)"
          stroke="#d9603f"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 99 26 L 102 26 A 8 8 0 0 1 102 42 L 99 42 Z"
          fill="#f4805c"
          stroke="#d9603f"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>

      {/* Body of the top. */}
      <rect
        x="37"
        y="19"
        width="46"
        height="44"
        rx="11"
        fill="url(#pajamas-cloth)"
        stroke="#d9603f"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Rounded collar: a half-ellipse scooped out of the shoulder line. Its chord sits
          on the body's top edge, so it carries the same 3.5 stroke and the outline there
          stays one constant weight. */}
      <path
        d="M 51 19 A 9 6 0 0 0 69 19 Z"
        fill="#fff3e8"
        stroke="#d9603f"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Star print — three four-point sparkles, each arm pinched by a control point at the
          centre, the same mark the rest of the set uses.

          Cream fill over deep coral stroke: 97.5 L* against 48.9, so the two tones separate
          by ~49 and each mark reads as outline-plus-centre instead of a smudge at phone size.
          Radii take the set's ramp from the top — 9 / 7 / 7. The ramp's r=5 step is skipped
          here because the cloth is only ~36 units wide behind the collar, and a 10-unit star
          on a garment this small mushes shut; three large marks read better than four mixed.

          Placement keeps every tip clear of the body outline (inner edge x 38.75-81.25,
          y 20.75-61.25) and of the collar, which occupies x 49-71 above y 27. Each one
          twinkles on its own beat. */}
      <g fill="#fff7e8" stroke="#c2503a" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0s' }}
          d="M52 28 Q52 37 61 37 Q52 37 52 46 Q52 37 43 37 Q52 37 52 28 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0.85s' }}
          d="M71 24 Q71 31 78 31 Q71 31 71 38 Q71 31 64 31 Q71 31 71 24 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '1.7s' }}
          d="M63 44 Q63 51 70 51 Q63 51 63 58 Q63 51 56 51 Q63 51 63 44 Z"
        />
      </g>
    </svg>
  )
}

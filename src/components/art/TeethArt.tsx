import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * A chunky violet toothbrush on a diagonal, white bristles under a mint swirl of paste.
 * Three sparkles by the head twinkle on staggered delays — the "just-brushed clean" cue.
 */
export function TeethArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="teeth-handle" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="0" y2="70">
          <stop offset="0" stopColor="#cdbcf7" />
          <stop offset="1" stopColor="#ab94e8" />
        </linearGradient>
      </defs>

      {/* Drawn flat, then tipped 30 degrees: handle low-left, head high-right. */}
      <g transform="translate(0 14) rotate(-30 60 60)">
        {/* Bristle block sits behind the head, which caps its lower edge. Its right
            edge is the tip of the whole brush: 107 + half of the 3.2 stroke = 108.6.
            Matching the *head's* right edge to that same number is the trap, and was
            the bug: the head is 23.8 deep once its 6.8 stroke is on, so its round cap
            swung out past the block's lower-right corner and the bristles read as
            bolted to the side of a violet paddle. The head stops short instead. */}
        <rect
          x="79"
          y="30"
          width="28"
          height="25"
          rx="4"
          fill="#ffffff"
          stroke="#7b63cc"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g fill="none" stroke="#d3c4f4" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
          <line x1="85" y1="52" x2="85" y2="34" />
          <line x1="93" y1="52" x2="93" y2="34" />
          <line x1="101" y1="52" x2="101" y2="34" />
        </g>

        {/* Body: wide stroke pass underneath, flat fill on top erases the inner seam.
            Head runs 76 -> 98, so 101.4 with the stroke: a little over 7 short of the
            bristle tip at 108.6. That is what keeps its round cap tucked under the
            block rather than bulging past it, and it leaves the bristles as the point
            of the tool. Lengthening it back toward 108.6 puts the violet nub back. */}
        <g
          fill="url(#teeth-handle)"
          stroke="#7b63cc"
          strokeWidth="6.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <rect x="10" y="54" width="72" height="12" rx="6" />
          <rect x="76" y="51.5" width="22" height="17" rx="5.5" />
        </g>
        <g fill="url(#teeth-handle)">
          <rect x="10" y="54" width="72" height="12" rx="6" />
          <rect x="76" y="51.5" width="22" height="17" rx="5.5" />
        </g>

        {/* Thumb grip. */}
        <rect x="19" y="57" width="17" height="6" rx="3" fill="#ddd1fa" />

        {/* Toothpaste. The bead straddles y=30 — the line of the bristle tips — so
            half of it sinks into the bristles instead of balancing on the edge, and
            it runs the width of the block, with a curl rising at the tip end.
            Stroke pass then fill pass, so the two lobes read as one dollop. */}
        <g fill="#b6f0d9" stroke="#34a888" strokeWidth="4.8" strokeLinejoin="round" strokeLinecap="round">
          <ellipse cx="93" cy="30.5" rx="12.5" ry="4.8" />
          <ellipse cx="101.5" cy="25" rx="5.5" ry="5" />
        </g>
        <g fill="#b6f0d9">
          <ellipse cx="93" cy="30.5" rx="12.5" ry="4.8" />
          <ellipse cx="101.5" cy="25" rx="5.5" ry="5" />
        </g>
        {/* Highlight, kept well inside the bead, to read as mint-white paste. */}
        <ellipse cx="88.5" cy="29" rx="4" ry="1.4" fill="#e2faf0" />
      </g>

      {/* Sparkles, in page space so they stay upright beside the head. Same mark as
          the rest of the set: four arms, each pinched by a control point sitting on
          the centre, which keeps them concave stars rather than fat diamonds. Sizes
          step 9 / 7 / 5 instead of drifting, and the pair is the palest tint of the
          drawing's own violet on its own outline violet — 46 L* apart, so the two
          tones still separate when twinkle drops them to 30%. */}
      <g fill="#f3effd" stroke="#7b63cc" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0s' }}
          d="M92 5 Q92 12 99 12 Q92 12 92 19 Q92 12 85 12 Q92 12 92 5 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0.55s' }}
          d="M107 21 Q107 30 116 30 Q107 30 107 39 Q107 30 98 30 Q107 30 107 21 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '1.1s' }}
          d="M112 47 Q112 52 117 52 Q112 52 112 57 Q112 52 107 52 Q112 52 112 47 Z"
        />
      </g>
    </svg>
  )
}

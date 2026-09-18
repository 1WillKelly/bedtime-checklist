import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * Two chunky musical notes — a big lilac one and a smaller butter-yellow one — leaning at
 * opposite angles. Each note drifts on its own offset so they never bob in lockstep, and the
 * three sparkles twinkle in turn. The tilt lives on an inner group: a motion class sets the CSS
 * `transform` property, which would otherwise replace a `transform` attribute on the same element.
 *
 * Each note is drawn twice, the same trick the Goodnight cloud uses: once with a fat stroke to
 * lay down the outer silhouette, then re-filled with no stroke so the seams between flag, stem
 * and head disappear. Without it the head's own outline cuts a dark bar straight across the
 * stem and the stem's outline cuts across the flag, so the note reads as three stacked parts
 * instead of one glyph. The re-fill covers the inner half of every stroke, so strokeWidth 6 is
 * what leaves a ~3 wide line — halve it and you get back the thin outline, double it again and
 * the flag's tip goes blobby.
 *
 * The big stem's right edge (x 45.35 + 6.5 = 51.85) is set just past the head's widest point
 * (51.58, where the tilted ellipse's tangent is vertical), so the two outlines continue each
 * other down the right side. Pull the stem back towards the head's centre and the head bulges
 * out from under it in a step; push it further out and the stem hangs off the head.
 *
 * Both notes carry the same kind of gradient, lit from the same upper-left corner: one of two
 * near-identical objects in one drawing with a highlight on only one of them is the most
 * conspicuous thing in the picture. That has to hold by measurement, not just by both having a
 * gradient — the butter runs L*≈92→78 (a 14 L* range) and the lilac used to run only 73→64, so
 * the gold read as lit and the lilac read flat. The lilac's light stop is now L*≈78 to give it
 * the same 14. It is lifted rather than deepened: the lilac stays at the pastel end
 * (fill L*≈64-78, outline L*≈48) so this card sits with Books and Potty rather than reading as
 * a bolder icon from another family, and it still sits ~11 L* under the #e6dbff card tint.
 */
export function SongArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        {/* Both gradients run at the same 1:2 angle, so both notes are lit from the same side.
            userSpaceOnUse: the head's own rotate() turns the gradient with it, but the light/dark
            stops are close enough in value that the step at the head's edge stays under 2/255. */}
        <linearGradient id="song-lilac" gradientUnits="userSpaceOnUse" x1="28" y1="40" x2="58" y2="100">
          <stop offset="0" stopColor="#cbb8fa" />
          <stop offset="1" stopColor="#a98ceb" />
        </linearGradient>
        <linearGradient id="song-butter" gradientUnits="userSpaceOnUse" x1="76" y1="18" x2="95" y2="56">
          <stop offset="0" stopColor="#ffe6a3" />
          <stop offset="1" stopColor="#f0b83c" />
        </linearGradient>
      </defs>

      {/* Whole arrangement nudged up to fill the box; scale keeps strokes in the 3-3.5 band. */}
      <g transform="translate(-5.65 -4.85) scale(1.1)">
        {/* Big note — flag, stem, head; silhouette pass then fill pass. */}
        <g className={`${styles.anim} ${styles.bob}`} data-ambient="" style={{ animationDelay: '0s' }}>
          <g transform="rotate(-8 43 70)">
            <g
              fill="url(#song-lilac)"
              stroke="#7e5fd0"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M50 40 Q71 44 63 66 Q59 54 50 54 Z" />
              <rect x="45.35" y="39" width="6.5" height="50" rx="3.25" />
              <ellipse cx="36" cy="89" rx="16" ry="12" transform="rotate(-20 36 89)" />
            </g>
            <g fill="url(#song-lilac)">
              <path d="M50 40 Q71 44 63 66 Q59 54 50 54 Z" />
              <rect x="45.35" y="39" width="6.5" height="50" rx="3.25" />
              <ellipse cx="36" cy="89" rx="16" ry="12" transform="rotate(-20 36 89)" />
            </g>
          </g>
        </g>

        {/* Small note, leaning the other way. Same two passes at 4.4 for a ~2.2 line. */}
        <g className={`${styles.anim} ${styles.bob}`} data-ambient="" style={{ animationDelay: '1.6s' }}>
          <g transform="rotate(9 88 37)">
            <g
              fill="url(#song-butter)"
              stroke="#c98a1e"
              strokeWidth="4.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M93 17 Q108 20 102 37 Q99 29 93 28 Z" />
              <rect x="91.5" y="16" width="5.5" height="33" rx="2.75" />
              <ellipse cx="85" cy="49" rx="12.5" ry="9.5" transform="rotate(-20 85 49)" />
            </g>
            <g fill="url(#song-butter)">
              <path d="M93 17 Q108 20 102 37 Q99 29 93 28 Z" />
              <rect x="91.5" y="16" width="5.5" height="33" rx="2.75" />
              <ellipse cx="85" cy="49" rx="12.5" ry="9.5" transform="rotate(-20 85 49)" />
            </g>
          </g>
        </g>

        {/* Three sparkles, all the same mark: four arms, each pinched by a control point sitting
            on the centre, so they stay concave and star-like instead of reading as diamonds.
            Radii 7.3 / 5.5 / 4.1 are 16 / 12 / 9 across once the group's 1.1 scale is counted,
            and strokeWidth 2 lands on 2.2 — the same tint-on-mid-gold pair and the same weight
            the Goodnight stars use. Fill is saturated rather than cream: twinkle drops each one
            to 30% opacity, and at that point a pale fill washes out into the lilac card.
            #ffe3a0 on #e0a129 is only ~21 L* apart rather than the ~46 a white-on-purple pair
            like Teeth's manages, but deepening the stroke far enough to close that gap turns the
            marks brown and pulls them away from the butter note's own #c98a1e outline a few
            units away, so the pair stays as it is and matched to Goodnight. */}
        <g fill="#ffe3a0" stroke="#e0a129" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path
            className={`${styles.anim} ${styles.twinkle}`}
            data-ambient=""
            style={{ animationDelay: '0s' }}
            d="M22 46.7 Q22 54 29.3 54 Q22 54 22 61.3 Q22 54 14.7 54 Q22 54 22 46.7 Z"
          />
          <path
            className={`${styles.anim} ${styles.twinkle}`}
            data-ambient=""
            style={{ animationDelay: '0.9s' }}
            d="M66 16.5 Q66 22 71.5 22 Q66 22 66 27.5 Q66 22 60.5 22 Q66 22 66 16.5 Z"
          />
          <path
            className={`${styles.anim} ${styles.twinkle}`}
            data-ambient=""
            style={{ animationDelay: '1.7s' }}
            d="M74 77.9 Q74 82 78.1 82 Q74 82 74 86.1 Q74 82 69.9 82 Q74 82 74 77.9 Z"
          />
        </g>
      </g>
    </svg>
  )
}

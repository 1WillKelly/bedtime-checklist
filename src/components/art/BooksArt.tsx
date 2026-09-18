import type { ArtProps } from './types'
import styles from './art.module.css'

/**
 * A stack of three chunky picture books lying flat and slightly askew, each showing
 * its page block below the cover and a darker spine band at one end.
 *
 * Two things the colours have to do at once: the page blocks are a greyed paper
 * rather than white, because a white page block leaves the cream cover between two
 * near-identical bands and the middle book stops reading as a book; and every cover
 * carries a same-hue stroke two shades down, because cream on the pale amber tint
 * has almost no edge of its own.
 *
 * The tilts stay under two degrees. Each book's page block only clears the cover
 * below it by a unit or two, so a larger angle opens a wedge of background at the
 * end where the two tilts disagree.
 *
 * Three little stars twinkle above the pile — the "story time" cue, while the books
 * themselves stay perfectly still so the stack never looks like it might topple.
 */
export function BooksArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        {/* Each clip repeats its cover's rect exactly so the spine band picks up the
            cover's rounded end. Change a cover's size or rx and its clip has to follow,
            or the band squares off at the corner. The coordinates are read in the
            referencing group's space, which is why they are book-local, not viewBox. */}
        <linearGradient id="books-page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfbf4" />
          <stop offset="1" stopColor="#efe4d3" />
        </linearGradient>
        <clipPath id="books-cover-a">
          <rect x="-48" y="-10.5" width="96" height="13" rx="4.5" />
        </clipPath>
        <clipPath id="books-cover-b">
          <rect x="-43" y="-10" width="86" height="12.5" rx="4.5" />
        </clipPath>
        <clipPath id="books-cover-c">
          <rect x="-38" y="-9.75" width="76" height="12" rx="4.5" />
        </clipPath>
      </defs>

      {/* bottom book — coral */}
      <g transform="translate(60 91) rotate(-2)">
        <rect
          x="-44.5"
          y="1.5"
          width="89"
          height="9"
          rx="3"
          fill="url(#books-page)"
          stroke="#d9a463"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <rect x="-48" y="-10.5" width="96" height="13" rx="4.5" fill="#f4836b" />
        <rect
          x="-48"
          y="-10.5"
          width="14"
          height="13"
          fill="#c2503a"
          fillOpacity="0.45"
          clipPath="url(#books-cover-a)"
        />
        <rect
          x="-48"
          y="-10.5"
          width="96"
          height="13"
          rx="4.5"
          fill="none"
          stroke="#c2503a"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line x1="-34" y1="-9.6" x2="-34" y2="1.6" stroke="#c2503a" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* middle book — cream. Sits far enough down into the coral cover that the
          left tip of its page block still lands on it once both tilts are counted. */}
      <g transform="translate(61.5 71.6) rotate(1)">
        <rect
          x="-40"
          y="1.5"
          width="80"
          height="8.5"
          rx="3"
          fill="url(#books-page)"
          stroke="#d9a463"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <rect x="-43" y="-10" width="86" height="12.5" rx="4.5" fill="#fff7e8" />
        <rect
          x="30"
          y="-10"
          width="13"
          height="12.5"
          fill="#c9832f"
          fillOpacity="0.52"
          clipPath="url(#books-cover-b)"
        />
        <rect
          x="-43"
          y="-10"
          width="86"
          height="12.5"
          rx="4.5"
          fill="none"
          stroke="#c9832f"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line x1="30" y1="-9.1" x2="30" y2="1.6" stroke="#c9832f" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* top book — butter yellow, with a little star on the cover face */}
      <g transform="translate(61 52.6) rotate(-1.8)">
        <rect
          x="-34.5"
          y="1.25"
          width="69"
          height="8.5"
          rx="3"
          fill="url(#books-page)"
          stroke="#d9a463"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <rect x="-38" y="-9.75" width="76" height="12" rx="4.5" fill="#f8cf6b" />
        <rect
          x="-38"
          y="-9.75"
          width="12.5"
          height="12"
          fill="#c98a1e"
          fillOpacity="0.45"
          clipPath="url(#books-cover-c)"
        />
        <rect
          x="-38"
          y="-9.75"
          width="76"
          height="12"
          rx="4.5"
          fill="none"
          stroke="#c98a1e"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line x1="-25.5" y1="-8.85" x2="-25.5" y2="1.35" stroke="#c98a1e" strokeWidth="2.2" strokeLinecap="round" />
        {/* Same pinched mark as the sparkles above, at cover scale. Its cream-on-amber
            pair is the cover's own, so only the arm shape changed. */}
        <path
          d="M4 -7.25 Q4 -3.75 7.5 -3.75 Q4 -3.75 4 -0.25 Q4 -3.75 0.5 -3.75 Q4 -3.75 4 -7.25 Z"
          fill="#fff7e8"
          stroke="#c98a1e"
          strokeWidth="1.3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>

      {/* Twinkling sparkles above the stack — the same mark the rest of the set uses:
          four arms, each pinched by a quadratic control point sitting exactly on the
          centre, so the arms stay concave and read as a star. Offset those control
          points and the shape swells into a fat diamond, which is what these were.

          Cream fill over the bottom book's own mid coral: 97.5 L* against 48.9, so the
          two tones separate by ~49 and the mark reads as outline-plus-centre rather
          than a solid blob. Radii run 9 / 7 / 5 — the same three-step ramp as the set. */}
      <g fill="#fff7e8" stroke="#c2503a" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0s' }}
          d="M57 15 Q57 24 66 24 Q57 24 57 33 Q57 24 48 24 Q57 24 57 15 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '0.9s' }}
          d="M84 21 Q84 28 91 28 Q84 28 84 35 Q84 28 77 28 Q84 28 84 21 Z"
        />
        <path
          className={`${styles.anim} ${styles.twinkle}`}
          data-ambient=""
          style={{ animationDelay: '1.7s' }}
          d="M33 25 Q33 30 38 30 Q33 30 33 35 Q33 30 28 30 Q33 30 33 25 Z"
        />
      </g>
    </svg>
  )
}

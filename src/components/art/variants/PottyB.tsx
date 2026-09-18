import type { ArtProps } from '../types'
import styles from '../art.module.css'

/** A toddler's potty seen straight from the side: splash-guard lip at the front, the seat dipping away behind it, a broad backrest with a carry grip, all on a wide flanged foot. */
export function PottyB({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="presentation" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="pottyb-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf6" />
          <stop offset="1" stopColor="#ffe7d9" />
        </linearGradient>

        {/* Keeps the seat-rim band inside the shell. The band is painted as a fat
            stroke laid along the top contour, so without this it would spill
            outside the silhouette instead of hugging the inside of the edge. */}
        <clipPath id="pottyb-clip">
          <path d="M 20 94 Q 13 75 13 57 Q 9 45 21 41 Q 30 39 30 53 Q 41 67 53 65 Q 64 63 66 49 Q 67 15 79 15 L 95 15 Q 105 15 105 38 L 105 94 Z" />
        </clipPath>

        {/* Punches the carry grip clean through the backrest. A filled slot reads
            as a sticker; a hole reads as something a parent picks the potty up by. */}
        <mask id="pottyb-grip" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
          <rect x="0" y="0" width="120" height="120" fill="#ffffff" />
          <rect x="77" y="23" width="22" height="9" rx="4.5" fill="#000000" />
        </mask>
      </defs>

      {/* One moulded shell, so the whole thing breathes as a single piece. A potty
          stands on the floor, so it must not bob, sway or drift. */}
      <g className={`${styles.anim} ${styles.pulse}`} data-ambient="">
        <g mask="url(#pottyb-grip)">
          {/* The silhouette, and the only thing doing the real work. Read from the
              bottom-left: front wall, splash-guard lip turning up and over, the seat
              falling away into a dip, then rising into a broad flat-topped backrest
              and straight back down the back wall. That guard-dip-backrest run is
              what a bucket, a pot and a tub all lack. */}
          <path
            d="M 20 94 Q 13 75 13 57 Q 9 45 21 41 Q 30 39 30 53 Q 41 67 53 65 Q 64 63 66 49 Q 67 15 79 15 L 95 15 Q 105 15 105 38 L 105 94 Z"
            fill="url(#pottyb-shell)"
            stroke="#d2634a"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Seat rim. The moulded rim is thicker than the shell, so edge-on it shows
              as a coloured band following the seat edge — the one piece of seat
              structure a true side view can honestly show. Painted as two stacked
              strokes on the same contour: the wider dark one becomes the band's inner
              outline, the narrower light one its fill. */}
          <g clipPath="url(#pottyb-clip)">
            <path
              d="M 21 41 Q 30 39 30 53 Q 41 67 53 65 Q 64 63 66 49 Q 66.5 43 67 39"
              fill="none"
              stroke="#d2634a"
              strokeWidth="17"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M 21 41 Q 30 39 30 53 Q 41 67 53 65 Q 64 63 66 49 Q 66.5 43 67 39"
              fill="none"
              stroke="#ffb59f"
              strokeWidth="13"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          {/* Outline redrawn over the band, which otherwise covers the inner half of
              the shell's stroke everywhere it reaches the edge. */}
          <path
            d="M 20 94 Q 13 75 13 57 Q 9 45 21 41 Q 30 39 30 53 Q 41 67 53 65 Q 64 63 66 49 Q 67 15 79 15 L 95 15 Q 105 15 105 38 L 105 94 Z"
            fill="none"
            stroke="#d2634a"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* Edge of the punched grip. */}
        <rect
          x="77"
          y="23"
          width="22"
          height="9"
          rx="4.5"
          fill="none"
          stroke="#d2634a"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Flanged foot, wider than the shell on both sides and painted over its
            bottom corners. The low, planted stance is half of why this reads as a
            potty and not a jug. */}
        <rect
          x="13"
          y="89"
          width="95"
          height="16"
          rx="8"
          fill="url(#pottyb-shell)"
          stroke="#d2634a"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

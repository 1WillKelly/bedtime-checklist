import type { FC } from 'react'

/**
 * The art registry.
 *
 * Placeholder artwork is an emoji glyph on a hand-shaped colour scene. To
 * replace a placeholder with real art, set `Art` on that entry to a component
 * that renders an <svg> (or an <img> pointing at src/assets/...). Nothing else
 * in the app needs to change — every screen goes through <TaskIllustration />.
 */

export type ArtProps = { className?: string }

export type IllustrationSpec = {
  /** Placeholder glyph, used when no `Art` component is supplied. */
  glyph: string
  /** Scene background tint. */
  tint: string
  /** Accent used for the scene's decorative shapes. */
  accent: string
  /** Described to screen readers in place of the picture. */
  alt: string
  /** Optional real artwork. Takes priority over `glyph`. */
  Art?: FC<ArtProps>
}

/** Example of a custom SVG replacing a placeholder glyph. */
const MoonArt: FC<ArtProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 120 120"
    role="presentation"
    focusable="false"
    aria-hidden="true"
  >
    <path
      d="M78 12a48 48 0 1 0 30 84 40 40 0 0 1-30-84Z"
      fill="#ffdf8a"
      stroke="#e9b93f"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <circle cx="66" cy="44" r="6" fill="#efc86a" opacity="0.7" />
    <circle cx="82" cy="72" r="4" fill="#efc86a" opacity="0.6" />
    <circle cx="58" cy="76" r="3" fill="#efc86a" opacity="0.5" />
  </svg>
)

export const ILLUSTRATIONS: Record<string, IllustrationSpec> = {
  bath: { glyph: '🛁', tint: '#cbe9ff', accent: '#6fb9ea', alt: 'A bathtub full of bubbles' },
  potty: { glyph: '🚽', tint: '#d6ecc9', accent: '#7cb96c', alt: 'A potty' },
  teeth: { glyph: '🪥', tint: '#d7e2ff', accent: '#7f97e8', alt: 'A toothbrush' },
  pajamas: { glyph: '👕', tint: '#ffd9e7', accent: '#f086ad', alt: 'Cosy pyjamas' },
  books: { glyph: '📚', tint: '#ffe3ba', accent: '#f0a34d', alt: 'A stack of books' },
  water: { glyph: '💧', tint: '#cbf1ea', accent: '#4ebaa6', alt: 'A drink of water' },
  song: { glyph: '🎵', tint: '#e6dbff', accent: '#9b80e8', alt: 'A music note' },
  goodnight: { glyph: '🌙', tint: '#d3cff3', accent: '#7a6bcd', alt: 'A sleepy moon', Art: MoonArt },
  moon: { glyph: '🌙', tint: '#d3cff3', accent: '#7a6bcd', alt: 'A sleepy moon', Art: MoonArt },
  generic: { glyph: '⭐️', tint: '#ffe8c2', accent: '#efb44d', alt: 'A star' },
}

export function getIllustration(id: string): IllustrationSpec {
  return ILLUSTRATIONS[id] ?? ILLUSTRATIONS.generic
}

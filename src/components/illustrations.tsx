import type { FC } from 'react'

import {
  BathArt,
  PottyArt,
  TeethArt,
  PajamasArt,
  BooksArt,
  WaterArt,
  SongArt,
  GoodnightArt,
} from './art'
import type { ArtProps } from './art/types'

/**
 * The art registry: one entry per routine step.
 *
 * Each entry carries both an emoji glyph and a hand-drawn SVG component. The
 * parent chooses between them in settings (see ArtStyleContext); the glyph is
 * always the fallback, so a step with no drawn art still renders, and it is
 * what the small progress-chain nodes use at any setting — at 24-36px a glyph
 * reads better than a shrunken drawing.
 */

export type { ArtProps }

export type IllustrationSpec = {
  /** Shown in emoji mode, in the progress chain, and as the fallback. */
  glyph: string
  /** Scene background tint. The drawn art is composed against this. */
  tint: string
  /** Accent used for the scene's decorative shapes. */
  accent: string
  /** Described to screen readers in place of the picture. */
  alt: string
  /** Hand-drawn artwork, used in "drawn" mode. */
  Art?: FC<ArtProps>
}

export const ILLUSTRATIONS: Record<string, IllustrationSpec> = {
  bath: { glyph: '🛁', tint: '#cbe9ff', accent: '#6fb9ea', alt: 'A bathtub full of bubbles', Art: BathArt },
  potty: { glyph: '🚽', tint: '#d6ecc9', accent: '#7cb96c', alt: 'A potty', Art: PottyArt },
  teeth: { glyph: '🪥', tint: '#e6dcff', accent: '#8b6fd8', alt: 'A violet toothbrush', Art: TeethArt },
  pajamas: { glyph: '👕', tint: '#ffd9e7', accent: '#f086ad', alt: 'Cosy pyjamas', Art: PajamasArt },
  books: { glyph: '📚', tint: '#ffe3ba', accent: '#f0a34d', alt: 'A stack of books', Art: BooksArt },
  water: { glyph: '💧', tint: '#cbf1ea', accent: '#4ebaa6', alt: 'A drink of water', Art: WaterArt },
  song: { glyph: '🎵', tint: '#e6dbff', accent: '#9b80e8', alt: 'A music note', Art: SongArt },
  goodnight: { glyph: '🌙', tint: '#d3cff3', accent: '#7a6bcd', alt: 'A sleepy moon', Art: GoodnightArt },
  moon: { glyph: '🌙', tint: '#d3cff3', accent: '#7a6bcd', alt: 'A sleepy moon', Art: GoodnightArt },
  generic: { glyph: '⭐️', tint: '#ffe8c2', accent: '#efb44d', alt: 'A star' },
}

export function getIllustration(id: string): IllustrationSpec {
  return ILLUSTRATIONS[id] ?? ILLUSTRATIONS.generic
}

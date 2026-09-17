# Illustration prompts

The task pictures are placeholders (emoji on a coloured scene). This file is
the recipe for replacing them, kept in the repo so step nine still matches step
one in six months.

## Why generated, not hand-written SVG

The target style is soft-shaded and three-dimensional, which in SVG means
hand-placing dozens of gradient stops per object. Eight of those is a poor use
of time and tops out at "adequate". Two things stay hand-drawn:

- **The mascot** (`src/components/Mascot.tsx`) — one crescent moon, already
  done, and it scales for free.
- **The progress chain glyphs** — at 24–36px, emoji read better than shrunken
  detailed art.

## Shared style prefix

Put this in front of every subject line, unchanged. Consistency across the set
is what makes it feel designed, and it is exactly what varying the wording
loses.

> Soft 3D rendered children's app illustration, kawaii style. Rounded chunky
> forms, smooth matte surfaces, gentle pastel palette, soft diffused studio
> lighting from the upper left, subtle soft shadow beneath. Simple and bold
> with no fine detail. Warm, friendly, calm bedtime mood. Single object
> centred in frame, filling about 80% of the canvas. Plain transparent
> background. No text, no words, no letters, no numbers, no border, no frame.

## Subjects

| Key | Subject line to append |
| --- | --- |
| `bath` | A white clawfoot bathtub filled with fluffy white and pale-blue bubbles, a small yellow rubber duck floating on top, a few round soap bubbles drifting above. |
| `potty` | A small white potty chair with a pale mint-green seat, with a simple friendly face on the bowl: two round black dot eyes and a small smile. |
| `teeth` | A **violet-purple** toothbrush lying at a gentle diagonal, with a soft violet handle, white bristles, and a small swirl of white toothpaste on top. Purple is the dominant colour. |
| `pajamas` | A neatly folded pair of children's pyjamas in soft pink and cream, printed with small pale stars, stacked as a tidy little pile. |
| `books` | A stack of three chunky picture books in soft coral, cream and butter yellow, slightly askew, with a small sleepy teddy bear face on the top cover. |
| `water` | A short rounded glass of clear water with a pale aqua tint, a soft highlight on the rim, one small droplet beside it. |
| `song` | Two rounded musical notes in soft lilac and butter yellow, floating at a jaunty angle, with three tiny sparkles around them. |
| `goodnight` | A golden crescent moon with closed sleeping eyes, rosy cheeks and a small contented smile, resting on a small pale cloud. |

## Output

- **512×512 PNG, transparent background.** Displayed at 215–340px, so 512
  covers 2× on every target phone. Eight of these stay well under 1MB; the
  whole bundle is currently ~80KB gzipped.
- Save to `src/assets/tasks/<key>.png` so Vite fingerprints them and the
  GitHub Pages base path is applied automatically.

## Checks before accepting a render

- **View it on the cream background** (`#fdf7ee`), not on white. Models
  routinely bake a faint white halo into a "transparent" cutout, and it only
  shows against a tint.
- Confirm the subject is centred and not clipped — the scene blob crops to a
  circle.
- The toothbrush must read as violet at chip size (46px), not as generic blue.

## Wiring one in

Per task it is one line in `src/components/illustrations.tsx`. `glyph` stays as
the progress-chain mark and the fallback, so the set can be migrated **one at a
time** — a half-finished swap still ships.

```tsx
import bathArt from '../assets/tasks/bath.png'

bath: {
  glyph: '🛁',
  tint: '#cbe9ff',
  accent: '#6fb9ea',
  alt: 'A bathtub full of bubbles',
  Art: ({ className }) => <img className={className} src={bathArt} alt="" />,
},
```

Also pin the exact model and prompt used, as a comment beside the entry.

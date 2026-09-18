# Goodnight Checklist

A gentle, picture-first bedtime routine for young children. Parents set up the
routine once; the child taps through one big illustrated step at a time and ends
on a goodnight screen.

Everything runs in the browser — no accounts, no backend, no network calls. The
routine and the child's name are stored in `localStorage` on the device.

## Live site

https://1willkelly.github.io/bedtime-checklist/

## Running locally

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc -b` with no emit |
| `npm test` | Vitest suite (routine state machine, copy, motion) |

## Deploying

Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which typechecks, tests, builds and publishes `dist/` to GitHub Pages.

GitHub Pages serves project sites from `https://<user>.github.io/<repo>/`, so the
production build needs a matching base path. The workflow passes the repo name
through as `BASE_PATH`, so a rename needs no code change. Building by hand for a
custom domain or a user site:

```bash
BASE_PATH=/ npm run build
```

## Project layout

```
src/
  app/         App shell, routine state machine, persisted app state
  components/  Shared UI (night sky, mascot, progress, big tap button)
    art/       Hand-drawn SVG illustration per routine step
  features/    Screens grouped by flow: setup, routine, goodnight, settings
  hooks/       useLongPress (the parent-settings gesture)
  models/      Types and the default routine
  utils/       Storage, copy, haptics, motion preferences
public/        Manifest and icons, copied verbatim into the build
```

## Using it

**Setting up** (parents): enter a name — optional, the app uses neutral copy
without one — then turn steps on or off and use the arrows to put them in your
order by dragging the ⠿ handle. Everything is saved on the device and can be
changed later.

**During bedtime** (the child): one step fills the screen, with one enormous
green button. Above it, the progress chain shows every step of the night as its
own picture — finished ones filled gold, the current one ringed, the rest
waiting — so a pre-reader can see what is coming next. Finishing a step plays a
five-second celebration featuring the step they just did, then the next step
slides in.

| Control | What it does |
| --- | --- |
| ⚙ (top left) | Opens parent settings. A single tap only navigates — it changes nothing. |
| "Already did it" | Marks the current step done without the celebration — for a step that happened before the app was opened. |

**Step artwork** is a toggle in settings, `Drawn` or `Emoji`. Drawn is the
default: hand-authored inline SVG, one component per step, each with a small
ambient animation. Emoji is the fallback and needs no assets. The choice
applies immediately, so the step list underneath the toggle previews it.

Parent settings holds the name, the step list and its order, "Start tonight
over", and a full erase that returns to first-run setup. Both destructive
actions ask before they act, which is what makes the settings button safe to
leave in plain sight during the routine.

## Notes

- **Add to Home Screen** works on iOS and Android via `public/manifest.webmanifest`.
  There is no service worker, so the app needs a connection on first load.
- **Nothing can skip a step.** Progression is locked for the whole celebration
  and the page turn behind it, guarded in three places (see
  `features/routine/RoutineScreen.tsx`). Verified against ~12,000 taps in three
  seconds advancing exactly one step.
- **Timing lives in the CSS tokens.** `--d-celebrate` is the length of the
  reward and the length of the interaction lock; `src/utils/motion.ts` reads it
  back, parsing the unit (browsers normalise `5000ms` to `5s`).
- **Reduced motion** removes the movement, not the reward or its length — the
  child still needs to see what they finished.
- **Artwork.** Every step carries both a drawn SVG component
  (`src/components/art/`) and an emoji glyph, selected by the settings toggle.
  The glyph is always the fallback and is what the small progress-chain nodes
  use at either setting — at 24-36px a glyph beats a shrunken drawing.
  `src/components/illustrations.tsx` is the single registry both modes read.
  See [`docs/ILLUSTRATIONS.md`](docs/ILLUSTRATIONS.md) for the drawing
  contract and the generated-image route. Icons in `public/icons/` are
  generated placeholders.
- **SVG animation** lives in `src/components/art/art.module.css`, not inside
  the SVG fragments — an inline fragment has to stay self-contained. Two rules
  when adding to it: pair every motion class with `.anim` (which sets
  `transform-box: fill-box`, without which a transform is relative to the
  viewBox origin and the shape flies off-canvas), and mark the element
  `data-ambient` so reduced motion strips it.

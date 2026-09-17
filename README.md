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
  features/    Screens grouped by flow: setup, routine, goodnight, settings
  hooks/       useLongPress (the parent-settings gesture)
  models/      Types and the default routine
  utils/       Storage, copy, haptics, motion preferences
public/        Manifest and icons, copied verbatim into the build
```

## Using it

**Setting up** (parents): enter a name — optional, the app uses neutral copy
without one — then turn steps on or off and use the arrows to put them in your
order. Everything is saved on the device and can be changed later.

**During bedtime** (the child): one step fills the screen, with one enormous
green button. Finishing a step plays a five-second celebration featuring the
step they just did, then the next step slides in.

The header carries the two parent controls, both deliberately small, muted and
at the top of the screen — away from the thumb path the big button owns:

| Control | What it does |
| --- | --- |
| ↺ (top left) | Start tonight over. Always asks first, so a stray tap is harmless. |
| ● (top right) | Hold for ~1.5s to open parent settings. |
| "Already did it" | Marks the current step done without the celebration — for a step that happened before the app was opened. |

Parent settings holds the name, the step list and its order, "Start tonight
over", and a full erase that returns to first-run setup.

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
- **Placeholder art.** Task pictures are emoji on a coloured scene, and the
  mascot is a hand-drawn SVG. Both are swapped in one place:
  `src/components/illustrations.tsx` (set `Art` on an entry) and
  `src/components/Mascot.tsx`. Icons in `public/icons/` are generated
  placeholders.

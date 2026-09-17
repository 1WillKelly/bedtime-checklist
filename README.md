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

## Notes

- **Add to Home Screen** works on iOS and Android via `public/manifest.webmanifest`.
  There is no service worker, so the app needs a connection on first load.
- **Parent settings** are behind a long-press so a child can't wander into them.
- **Reduced motion** is respected throughout (see `src/utils/motion.ts`).

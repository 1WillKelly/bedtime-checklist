import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
 * so the production build needs a matching base path. Override with
 * BASE_PATH=/ when deploying to a user/org site or a custom domain.
 */
const basePath = process.env.BASE_PATH ?? '/bedtime-checklist/'

export default defineConfig(({ mode }) => ({
  // Keyed on mode, not command, so `vite preview` mirrors the deployed paths.
  base: mode === 'production' ? basePath : '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}))

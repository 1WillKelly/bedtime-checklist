import { describe, expect, it } from 'vitest'

import { parseCssDuration } from './motion'

describe('parseCssDuration', () => {
  it('reads millisecond values', () => {
    expect(parseCssDuration('800ms', 1)).toBe(800)
    expect(parseCssDuration('  340ms  ', 1)).toBe(340)
  })

  it('reads second values, including the normalised form browsers return', () => {
    // getComputedStyle rewrites `800ms` as `.8s` — the bug this guards.
    expect(parseCssDuration('.8s', 1)).toBe(800)
    expect(parseCssDuration('0.8s', 1)).toBe(800)
    expect(parseCssDuration('1s', 1)).toBe(1000)
  })

  it('never returns a collapsed lock window for junk input', () => {
    for (const junk of ['', '   ', 'auto', 'NaN', '0ms', '-5s', 'fast']) {
      expect(parseCssDuration(junk, 800)).toBe(800)
    }
  })

  it('rejects unitless numbers rather than guessing', () => {
    expect(parseCssDuration('800', 42)).toBe(42)
  })
})

import { describe, expect, it } from 'vitest'

import { bedtimeTitle, cleanName, goodnightTitle, possessive, praise } from './copy'

describe('blank child name falls back to generic copy', () => {
  it.each(['', '   ', undefined, null])('handles %p', (value) => {
    const name = cleanName(value as string)
    expect(name).toBe('')
    expect(bedtimeTitle(name)).toBe('Bedtime is ready')
    expect(goodnightTitle(name)).toBe('Goodnight')
    expect(praise(name, 0)).toBe('Nice job!')
  })

  it('never leaks a stray apostrophe or comma when the name is blank', () => {
    for (let step = 0; step < 12; step++) {
      expect(praise('', step)).not.toContain(',')
    }
    expect(bedtimeTitle('')).not.toContain("'")
  })
})

describe('named copy', () => {
  it('personalises the bedtime and goodnight screens', () => {
    expect(bedtimeTitle('Leo')).toBe("Leo's bedtime")
    expect(goodnightTitle('Leo')).toBe('Goodnight, Leo')
  })

  it('handles names ending in s', () => {
    expect(possessive('Jonas')).toBe("Jonas'")
    expect(bedtimeTitle('Jonas')).toBe("Jonas' bedtime")
  })

  it('uses the name only occasionally in praise', () => {
    const withName = Array.from({ length: 9 }, (_, step) => praise('Leo', step)).filter((line) =>
      line.includes('Leo'),
    )
    expect(withName.length).toBeGreaterThan(0)
    expect(withName.length).toBeLessThan(9)
  })

  it('trims and caps pasted input', () => {
    expect(cleanName('  Leo   Ann  ')).toBe('Leo Ann')
    expect(cleanName('x'.repeat(60))).toHaveLength(24)
  })
})

/**
 * All child-name personalisation lives here so the name never gets baked
 * into a component, and so the blank-name path is a single code path.
 */

export function cleanName(raw: string | undefined | null): string {
  return (raw ?? '').trim().replace(/\s+/g, ' ').slice(0, 24)
}

export function possessive(name: string): string {
  return /s$/i.test(name) ? `${name}'` : `${name}'s`
}

export function bedtimeTitle(rawName: string): string {
  const name = cleanName(rawName)
  return name ? `${possessive(name)} bedtime` : 'Bedtime is ready'
}

export function goodnightTitle(rawName: string): string {
  const name = cleanName(rawName)
  return name ? `Goodnight, ${name}` : 'Goodnight'
}

const PRAISE = ['Nice job!', 'Yes!', 'So good!', 'Well done!', 'Woohoo!', 'Great!']

/**
 * Encouragement after a completed step. The name shows up now and then
 * rather than every time, so it stays special.
 */
export function praise(rawName: string, step: number): string {
  const name = cleanName(rawName)
  const base = PRAISE[step % PRAISE.length]
  const useName = name.length > 0 && step % 3 === 0
  if (!useName) return base
  return base.endsWith('!') ? `${base.slice(0, -1)}, ${name}!` : `${base}, ${name}!`
}

export function greetingName(rawName: string): string {
  return cleanName(rawName)
}

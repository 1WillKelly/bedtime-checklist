import type { AppSettings, RoutineItem } from './types'

/**
 * The starter routine. Parents can disable any of these in setup; later
 * versions can add custom items without any other code changing.
 */
export const DEFAULT_ROUTINE: RoutineItem[] = [
  { id: 'bath', title: 'Bath', illustration: 'bath', enabled: true, order: 0 },
  { id: 'potty', title: 'Potty', illustration: 'potty', enabled: true, order: 1 },
  { id: 'brush-teeth', title: 'Brush teeth', illustration: 'teeth', enabled: true, order: 2 },
  { id: 'pajamas', title: 'Pajamas', illustration: 'pajamas', enabled: true, order: 3 },
  { id: 'read-books', title: 'Read books', illustration: 'books', enabled: true, order: 4 },
  { id: 'drink-water', title: 'Drink water', illustration: 'water', enabled: true, order: 5 },
  { id: 'sing-a-song', title: 'Sing a song', illustration: 'song', enabled: true, order: 6 },
  { id: 'goodnight', title: 'Goodnight', illustration: 'goodnight', enabled: true, order: 7 },
]

export function createDefaultSettings(): AppSettings {
  return {
    child: { name: '' },
    routine: DEFAULT_ROUTINE.map((item) => ({ ...item })),
    setupComplete: false,
  }
}

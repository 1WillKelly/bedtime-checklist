import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { ArtStyle } from '../models/types'

/**
 * Which artwork the task pictures use.
 *
 * This is a context rather than a prop because it is a display preference read
 * at the leaves — TaskIllustration appears inside the routine, the celebration
 * overlay and the settings list — and threading it through five intermediate
 * components that do not care about it would be noise. It is deliberately the
 * only context in the app.
 */
const ArtStyleContext = createContext<ArtStyle>('drawn')

export function ArtStyleProvider({
  value,
  children,
}: {
  value: ArtStyle
  children: ReactNode
}) {
  return <ArtStyleContext.Provider value={value}>{children}</ArtStyleContext.Provider>
}

export function useArtStyle(): ArtStyle {
  return useContext(ArtStyleContext)
}

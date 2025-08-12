// src/providers/AppWidthProvider.tsx
import React from 'react'
import { AppWidthContext } from './app-width-context'
import { getInitialAppWidth, setAppWidth } from '../utils/appWidth'
import type { AppWidthKey } from '../utils/appWidth'

export function AppWidthProvider({ children }: { children: React.ReactNode }) {
  // ✅ initialize from localStorage ONCE (no effect that can fight user changes)
  const [width, setWidthState] = React.useState<AppWidthKey>(() => getInitialAppWidth())

  // whenever width changes, update :root var + persist
  React.useEffect(() => {
    setAppWidth(width)
  }, [width])

  const setWidth = React.useCallback((w: AppWidthKey) => setWidthState(w), [])

  return (
    <AppWidthContext.Provider value={{ width, setWidth }}>
      {children}
    </AppWidthContext.Provider>
  )
}

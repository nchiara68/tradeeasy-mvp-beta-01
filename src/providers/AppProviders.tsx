// src/providers/AppProviders.tsx
import React from 'react'
import { ThemeProvider, defaultDarkModeOverride, type ColorMode } from '@aws-amplify/ui-react'
import { ColorModeContext } from './color-mode-context'
import { AppWidthProvider } from './AppWidthProvider'

const KEY = 'color-mode'
const getInitial = (): ColorMode => (localStorage.getItem(KEY) as ColorMode) || 'light'

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ColorMode>(getInitial)

  React.useEffect(() => {
    const root = document.documentElement
    // remove both possibilities (cleanup any old code paths)
    root.removeAttribute('data-theme')
    root.classList.remove('dark')

    if (mode === 'dark') {
      root.classList.add('dark')
    }
    // persist choice
    localStorage.setItem(KEY, mode)
  }, [mode])

  const theme = React.useMemo(
    () => ({ name: 'crypto-brand', overrides: [defaultDarkModeOverride] }),
    []
  )

  const ctx = React.useMemo(() => ({ mode, setMode }), [mode])

  return (
    <AppWidthProvider>
        <ColorModeContext.Provider value={ctx}>
        <ThemeProvider theme={theme} colorMode={mode}>
            {children}
        </ThemeProvider>
        </ColorModeContext.Provider>
    </AppWidthProvider>
  )
}

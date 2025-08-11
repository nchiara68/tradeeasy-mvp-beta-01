// src/providers/AppProviders.tsx
import React from 'react'
import {
  ThemeProvider,
  defaultDarkModeOverride,
  type ColorMode,
} from '@aws-amplify/ui-react'
import { ColorModeContext } from './color-mode-context'
import { getInitialColorMode, storeColorMode, resolveSystemMode } from '../utils/colorMode'

type Props = { children: React.ReactNode }

export function AppProviders({ children }: Props) {
  const [mode, setMode] = React.useState<ColorMode>(getInitialColorMode)

  // keep Tailwind's dark variant in sync via <html data-theme="">
  React.useEffect(() => {
    const root = document.documentElement
    const effective = mode === 'system' ? resolveSystemMode() : mode
    root.setAttribute('data-theme', effective)
    storeColorMode(mode)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (mode === 'system') root.setAttribute('data-theme', resolveSystemMode())
    }
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [mode])

  const theme = React.useMemo(
    () => ({ name: 'crypto-brand', overrides: [defaultDarkModeOverride] }),
    []
  )

  const value = React.useMemo(
    () => ({ mode, setMode }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme} colorMode={mode}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

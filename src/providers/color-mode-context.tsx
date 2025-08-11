// src/providers/color-mode-context.tsx
import React from 'react'
import type { ColorMode } from '@aws-amplify/ui-react'

export const ColorModeContext = React.createContext<{
  mode: ColorMode
  setMode: (m: ColorMode) => void
}>({
  mode: 'system',
  setMode: () => {},
})

export function useColorMode() {
  return React.useContext(ColorModeContext)
}

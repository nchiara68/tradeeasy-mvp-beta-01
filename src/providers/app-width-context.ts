// src/providers/app-width-context.ts
import React from 'react'
import type { AppWidthKey } from '../utils/appWidth'

export const AppWidthContext = React.createContext<{
  width: AppWidthKey
  setWidth: (w: AppWidthKey) => void
}>({
  width: '4xl',
  setWidth: () => {},
})

export function useAppWidth() {
  return React.useContext(AppWidthContext)
}

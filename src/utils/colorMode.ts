// src/utils/colorMode.ts
import type { ColorMode } from '@aws-amplify/ui-react'

const KEY = 'color-mode'

export function getInitialColorMode(): ColorMode {
  const saved = localStorage.getItem(KEY) as ColorMode | null
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
  return 'system'
}

export function storeColorMode(mode: ColorMode) {
  localStorage.setItem(KEY, mode)
}

export function resolveSystemMode(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// src/utils/appWidth.ts
export type AppWidthKey = '3xl' | '4xl' | '5xl' | '6xl' | 'full'

const KEY = 'app-width'

const MAP: Record<AppWidthKey, string> = {
  '3xl':  '48rem',  // 768px
  '4xl':  '56rem',  // 896px (default)
  '5xl':  '64rem',  // 1024px
  '6xl':  '72rem',  // 1152px
  'full': '100vw',
}

export function getInitialAppWidth(): AppWidthKey {
  const saved = localStorage.getItem(KEY) as AppWidthKey | null
  return saved && MAP[saved] ? saved : '4xl'
}

export function setAppWidth(key: AppWidthKey) {
  const value = MAP[key]
  document.documentElement.style.setProperty('--app-max-w', value)
  localStorage.setItem('app-width', key)
}

export function getWidthOptions() {
  return [
    { key: '3xl', label: 'Narrow (3xl)' },
    { key: '4xl', label: 'Default (4xl)' },
    { key: '5xl', label: 'Wide (5xl)' },
    { key: '6xl', label: 'Extra Wide (6xl)' },
    { key: 'full', label: 'Full Screen' },
  ] as const
}

/** Type guard to validate a string is an AppWidthKey */
export function isAppWidthKey(value: string): value is AppWidthKey {
  return Object.prototype.hasOwnProperty.call(MAP, value)
}

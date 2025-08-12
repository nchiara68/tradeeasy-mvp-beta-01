// src/ui/GlobalWidthSelect.tsx
import { useAppWidth } from '../providers/app-width-context'
import { getWidthOptions, isAppWidthKey } from '../utils/appWidth'
import type { ChangeEvent } from 'react'

export function GlobalWidthSelect() {
  const { width, setWidth } = useAppWidth()
  const options = getWidthOptions()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (isAppWidthKey(v)) {
      setWidth(v) // fully typed, no `any`
    }
  }

  return (
    <select
      value={width}
      onChange={handleChange}
      className="rounded-md border border-crypto-600/30 dark:border-crypto-300/30 bg-(--color-surface) text-(--color-text) px-2 py-1 text-sm"
      aria-label="Set page width"
    >
      {options.map(o => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

// src/ui/NavTabs.tsx
import { NavLink } from 'react-router-dom'

export function NavTabs() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-3 py-1 rounded-md border',
      isActive
        ? 'bg-crypto-600 text-white border-crypto-700'
        : 'bg-(--color-surface) text-(--color-text) border-crypto-600/30 dark:border-crypto-300/30'
    ].join(' ')

  return (
    <nav className="app-container mt-4 flex gap-2">
      <NavLink to="/" className={linkClass} end>
        Home
      </NavLink>
      <NavLink to="/playground" className={linkClass}>
        Playground
      </NavLink>
    </nav>
  )
}

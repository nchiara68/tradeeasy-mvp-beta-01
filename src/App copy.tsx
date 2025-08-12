// src/App.tsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Header } from './ui/Header'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* Simple secondary nav to switch pages (optional) */}
      <nav className="app-container mt-4 flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            [
              'px-3 py-1 rounded-md border',
              isActive
                ? 'bg-crypto-600 text-white border-crypto-700'
                : 'bg-(--color-surface) text-(--color-text) border-crypto-600/30 dark:border-crypto-300/30'
            ].join(' ')
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/playground"
          className={({ isActive }) =>
            [
              'px-3 py-1 rounded-md border',
              isActive
                ? 'bg-crypto-600 text-white border-crypto-700'
                : 'bg-(--color-surface) text-(--color-text) border-crypto-600/30 dark:border-crypto-300/30'
            ].join(' ')
          }
        >
          Playground
        </NavLink>
      </nav>

      <main className="app-container mt-6 grid gap-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

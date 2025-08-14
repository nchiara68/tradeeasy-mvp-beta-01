// src/App.tsx
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Header } from './ui/Header'

export default function App() {
  return (
    // App shell with theme-aware background/text
    <div className="min-h-screen flex flex-col bg-(--color-surface) text-(--color-text)">
      {/* Full-width header (it already contains an inner .app-container) */}
      <Header />

      {/* Body: width-capped by app-container, then a 2-col grid */}
      <main className="flex-1 py-6" role="main">
        <div className="app-container">
          <div className="grid grid-cols-[220px_1fr] gap-6">
            {/* Sidebar (role-aware) */}
            <aside
              className="p-4 border-r border-crypto-600/20 dark:border-crypto-300/20"
              aria-label="Sidebar navigation"
            >
              <Sidebar />
            </aside>

            {/* Routed page */}
            <section className="min-w-0">
              <Outlet />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

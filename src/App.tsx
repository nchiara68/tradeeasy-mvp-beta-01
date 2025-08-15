// src/App.tsx

// Import the <Outlet /> component from React Router DOM.
// This is used to render the matching child route inside this layout.
import { Outlet } from 'react-router-dom'

// Sidebar navigation component — often includes links for navigation.
import Sidebar from './components/Sidebar'

// Top header of the app (e.g., logo, user info, theme switcher).
import { Header } from './ui/Header'

/* --------------------------------------------------
 ✅ Main Layout Component
 This is the overall UI shell for your protected app area.
 All authenticated, role-based pages are displayed within this structure.
--------------------------------------------------- */
export default function App() {
  return (
    // Outer wrapper: full height of screen, flex layout in column direction
    // `bg-(--color-surface)` and `text-(--color-text)` are CSS variables
    // These are likely defined in your Tailwind config for theming
    <div className="min-h-screen flex flex-col bg-(--color-surface) text-(--color-text)">
      
      {/* Top navigation bar */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 py-6" role="main">
        {/* app-container likely defines padding & max-width to center the content */}
        <div className="app-container">
          {/* Two-column layout using CSS Grid:
              - First column: Sidebar (fixed 220px)
              - Second column: Main content (takes the rest of the width) */}
          <div className="grid grid-cols-[220px_1fr] gap-6">
            
            {/* Sidebar: used for navigation (can be role-aware) */}
            <aside
              className="p-4 border-r border-crypto-600/20 dark:border-crypto-300/20"
              aria-label="Sidebar navigation"
            >
              {/* Sidebar component (contains nav links) */}
              <Sidebar />
            </aside>

            {/* Routed content goes here.
                React Router will render the active route inside <Outlet /> */}
            <section className="min-w-0">
              <Outlet />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

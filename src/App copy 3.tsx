// src/App.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

/**
 * APP SHELL (Layout-only, no business logic)
 * ------------------------------------------
 * What this component is:
 *   • The persistent frame of your app: left navigation + right content area.
 *   • A *presentational* container — it does not fetch data, does not guard routes,
 *     and does not manage authentication. It just lays things out.
 *
 * How it fits in the overall flow (tying the pieces together):
 *   • main.tsx mounts <App/> *inside* Amplify’s <Authenticator>. So by the time
 *     <App/> is rendered, the Authenticator is already managing sign-in UI and state.
 *
 *   • For each role subtree (e.g., "/seller/*"), main.tsx wraps routes with:
 *       <Protected groups={[ ... ]}>
 *         <RoleChunk fallback={<div>Loading ...</div>} />
 *       </Protected>
 *
 *     - <Protected> composes <RequireAuth> + <RequireGroup>, so unauthorized users
 *       are redirected *before* any page content renders in <Outlet/> below.
 *     - <RoleChunk> is a Suspense boundary *per role subtree*; lazy pages are
 *       code-split and only fetched when user enters that role’s routes.
 *
 *   • Option B (auto-discovery): routes/config.ts auto-discovers page files via
 *     import.meta.glob. That file exports:
 *       - roleSections: used by the router builder and by Sidebar for nav
 *       - lazyPages: components for each discovered page
 *
 *   • <Sidebar/> is role-aware (using groups from the ID token) and renders links for
 *     the sections the user can see. It reads the same 'roleSections' shape, so
 *     navigation and routing are in sync (single source of truth).
 *
 * Why <Outlet/> lives here:
 *   • React Router renders child routes into the nearest <Outlet/>. Because the
 *     router declares <App/> as the element for "/", <Outlet/> is where the chosen
 *     child (e.g., /seller/page1) finally renders after guards and suspense apply.
 *
 * Design choices:
 *   • Keep <App/> dumb: no Suspense here (it’s applied per-role by <RoleChunk/>),
 *     no auth checks (handled by <Protected/>), no data fetching (pages handle it).
 *   • Use semantic regions: <aside> for navigation and <main> for content.
 *     This helps screen readers and makes landmarks clear.
 *
 * Extensibility:
 *   • Want a top bar? Add a <header> above the grid.
 *   • Want responsive behavior? Replace the inline styles with CSS (e.g., collapse
 *     sidebar on small screens, add a menu button).
 *   • Want a global toaster or modal root? Mount providers here, above <Outlet/>.
 */

export default function App() {
  return (
    // Simple two-column grid: fixed-width sidebar + fluid content.
    // You can swap this for a CSS module, Tailwind, or CSS-in-JS later.
    <div
      className="grid min-h-screen bg-(--color-surface) text-(--color-text)"
      style={{ gridTemplateColumns: '220px 1fr' }}
    >
      {/* Left rail (navigation). The Sidebar component is role-aware and
          hides/shows sections depending on the user's Cognito groups.
          It reads the same roleSections the router used, so links match routes. */}
      <aside
        className="border-r border-crypto-600/20 dark:border-crypto-300/20"
        style={{ padding: 16 }}
        aria-label="Sidebar navigation"
      >
        <Sidebar />
      </aside>

      {/* Main content area. React Router will render the matched child
          route element here via <Outlet/>. The actual page component is
          lazy-loaded and wrapped by per-role <Suspense> in <RoleChunk/>,
          so while the chunk is loading users see the role-specific fallback. */}
      <main className="py-6" role="main">
        {/* <-- this makes the global width cap apply */}
        <div className="app-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

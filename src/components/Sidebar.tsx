// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { useGroups } from '../auth/useGroups';
import { roleSections } from '../routes/config';

/**
 * SIDEBAR (Role-aware navigation)
 * -------------------------------
 * Purpose:
 *   - Render navigation that adapts to the *signed-in user's* Cognito groups.
 *   - Use the same `roleSections` the router uses, so nav and routes stay in sync.
 *
 * Where the data comes from:
 *   - `roleSections` (from Option B config): auto-generated from files in `src/pages/<role>/*.tsx`
 *     via `import.meta.glob`. Each section has:
 *       • label: "Seller" | "Debtor" | "Funder" | "Admin"
 *       • basePath: 'seller' | 'debtor' | 'funder' | 'admin'
 *       • allowedGroups: which Cognito groups can see that section (e.g., ['Seller', 'Admin'])
 *       • pages: [{ path, label, componentKey }]
 *   - `useGroups()`: reads `cognito:groups` from the ID token using Amplify Auth (`fetchAuthSession()`).
 *     This is your *authoritative* source for the user's groups on the client.
 *
 * Security model:
 *   - This Sidebar only *hides* links based on groups for UX.
 *   - Real protection is enforced by route guards (<Protected>/<RequireGroup>) and backend auth rules.
 *   - Hiding links is not security; it just avoids confusing the user with links they can't open.
 *
 * Rendering logic:
 *   1) While groups are loading, show a lightweight "Loading navigation…" placeholder.
 *   2) Once groups are available, filter `roleSections` by `allowedGroups`.
 *   3) Render each visible section and its pages as <NavLink>s.
 *
 * Performance:
 *   - `useAuthenticator((ctx) => [ctx.user])` selects only `user` from context, reducing re-renders.
 *   - `useGroups()` internally memoizes state; we render once it's done.
 *
 * Accessibility:
 *   - Use `<aside aria-label="Sidebar navigation">` in the parent (App.tsx) to identify the nav landmark.
 *   - `NavLink` sets `aria-current="page"` automatically on active links.
 *
 * Extensibility:
 *   - Replace inline styles with your design system (Tailwind/CSS Modules/Chakra/etc.).
 *   - Add collapsible sections, breadcrumbs, or badges based on data.
 *   - If you add tenanting, you can filter sections dynamically per tenant, too.
 */

// Helper: Does the user have any group in `allowed`?
// Admins typically see everything because each non-admin section includes 'Admin' in allowedGroups.
// The Admin section itself usually has allowedGroups: ['Admin'] only.
const canSee = (userGroups: string[] | null | undefined, allowed: readonly string[]) =>
  (userGroups ?? []).some((g) => allowed.includes(g));

export default function Sidebar() {
  // Amplify UI Authenticator gives us the signed-in user object.
  // The selector function ensures we re-render only when `user` changes.
  const { user } = useAuthenticator((ctx) => [ctx.user]);

  // Read Cognito groups from the user's ID token.
  // loading = true while we fetch session/tokens; groups can be [] (no groups) or string[].
  const { groups, loading } = useGroups();

  // Friendly display of who is signed in (loginId is often email/username).
  // Fallbacks are defensive; shape can differ depending on sign-in method/provider.
  type UserWithUserId = typeof user & { userId?: string };

  const loginId =
    user?.signInDetails?.loginId ||
    user?.username ||
    (user as UserWithUserId)?.userId ||
    'Signed in';

  return (
    <div>
      {/* Signed-in summary + Sign out action */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, wordBreak: 'break-all' }}>{loginId}</div>

        {/* Note: signOut() returns a Promise; errors are rare but you can catch/log if needed.
           e.g., onClick={async () => { try { await signOut(); } catch(e) { /* toast error *\/ } }} */}
        <button
          type="button"
          onClick={() => signOut()}
          style={{
            marginTop: 8,
            padding: '8px 10px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>

      {/* While we don’t yet know the user's groups, avoid flashing the wrong nav. */}
      {loading && <div style={{ color: '#777' }}>Loading navigation…</div>}

      {/* Once groups are known, render only the sections/pages the user is allowed to see. */}
      {!loading &&
        roleSections.map((section) =>
          canSee(groups, section.allowedGroups) ? (
            <div key={section.basePath} style={{ marginBottom: 16 }}>
              {/* Section header: e.g., "Seller", "Debtor" */}
              <h4 style={{ margin: '8px 0' }}>{section.label}</h4>

              {/* Section pages */}
              <nav aria-label={`${section.label} links`}>
                {section.pages.map((p) => {
                  // Build the path from basePath + page path, e.g., /seller/page1
                  const to = `/${section.basePath}/${p.path}`;

                  return (
                    <div key={to}>
                      <NavLink
                        to={to}
                        // `NavLink` applies `aria-current="page"` when active.
                        // Inline styles here; swap for your design system as needed.
                        style={({ isActive }) => ({
                          display: 'inline-block',
                          padding: '6px 0',
                          textDecoration: 'none',
                          color: isActive ? '#0a58ff' : '#333',
                          fontWeight: isActive ? 600 : 400,
                        })}
                      >
                        {p.label}
                      </NavLink>
                    </div>
                  );
                })}
              </nav>
            </div>
          ) : null
        )}
    </div>
  );
}

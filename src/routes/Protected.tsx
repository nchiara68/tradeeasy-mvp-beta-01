// src/routes/Protected.tsx
/**
 * PROTECTED ROUTE WRAPPER
 * -----------------------
 * This component composes your two guards:
 *   1) <RequireAuth/>   → ensures the user is authenticated.
 *   2) <RequireGroup/>  → ensures the user has at least one allowed Cognito group.
 *
 * Usage patterns:
 *   A) As a bare wrapper for a route branch that only needs guards:
 *        {
 *          path: 'seller',
 *          element: <Protected groups={['Seller','Admin']} />,
 *          children: [...]
 *        }
 *
 *   B) As a wrapper + custom layout/element (e.g., Suspense boundary, layout div, etc.):
 *        {
 *          path: 'seller',
 *          element: (
 *            <Protected groups={['Seller','Admin']}>
 *              <RoleChunk fallback={<div>Loading seller…</div>} />
 *            </Protected>
 *          ),
 *          children: [...]
 *        }
 *
 * Notes:
 * - If you pass children, they render *inside* the guards (after both checks pass).
 * - If you don’t pass children, <Protected/> falls back to <Outlet/>, which renders the
 *   matched child route element defined in your router config.
 * - Keep the order: <RequireAuth> outside <RequireGroup>. That way you only check group
 *   membership after you know the user is signed in (and you can read their ID token groups).
 */

import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import RequireGroup from './RequireGroup';

/**
 * Props:
 * - groups: a list of allowed Cognito groups for this protected branch.
 *   Example: ['Seller', 'Admin'] means Sellers and Admins can access.
 * - children (optional): an optional element to render (e.g., a Suspense boundary
 *   or layout wrapper). If omitted, we render <Outlet/> to display nested routes.
 */
type Props = PropsWithChildren & { groups: string[] };

export default function Protected({ groups, children }: Props) {
  return (
    // First gate: must be authenticated. If not, <RequireAuth/> typically redirects
    // to your sign-in route (Amplify Authenticator handles the UI).
    <RequireAuth>
      {/* Second gate: must belong to at least one of the allowed groups.
          <RequireGroup groups={groups}/> reads 'cognito:groups' from the ID token (via fetchAuthSession()),
          and if none match, it should redirect to a "Not Authorized" page. */}
      <RequireGroup groups={groups}>
        {/* Render order:
            - If a parent passed a custom child (e.g., <RoleChunk/> with Suspense), render that.
            - Otherwise, render the <Outlet/>, which is the placeholder for the matched child route
              defined under this protected branch. This lets nested routes render their elements. */}
        {children ?? <Outlet />}
      </RequireGroup>
    </RequireAuth>
  );
}

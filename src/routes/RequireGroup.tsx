// src/routes/RequireGroup.tsx
// This route guard makes sure the logged-in user belongs to at least
// one of the required Cognito groups before letting them see a page.
//Think of this like a bouncer at a club:
//1. They check your ID (the useGroups hook).
//2. They look at the guest list (allowed groups array).
//3. If your name is on the list → you get in (<Outlet /> renders the protected page).
//4. If not → you’re sent to the “Not Authorized” page.

import type { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Import our custom hook that fetches the current user's Cognito groups
import { useGroups } from '../auth/useGroups';

// Props:
// - children: anything wrapped inside <RequireGroup> ... </RequireGroup>
// - groups: an array of allowed group names (e.g., ["Admin", "Manager"])
export default function RequireGroup({ groups: allowed }: PropsWithChildren & { groups: string[] }) {
  // Get the user's groups and loading state from the useGroups hook
  const { groups, loading } = useGroups();

  // If we're still loading the user's groups, show nothing for now.
  // In a real app, you might display a spinner instead of null.
  if (loading) return null;

  // Check if the user belongs to at least one allowed group:
  // 1. `(groups ?? [])` ensures we don't try to run `.some()` on null.
  // 2. `.some(g => allowed.includes(g))` returns true if any user group matches an allowed group.
  const isAllowed = (groups ?? []).some(g => allowed.includes(g));

  // If the user is NOT in an allowed group, redirect them to a "Not Authorized" page.
  // `replace` ensures this redirect replaces the current history entry.
  if (!isAllowed) return <Navigate to="/not-authorized" replace />;

  // If the user *is* in an allowed group:
  // - We render the nested route's content via <Outlet />.
  // - We don't directly use children here — this component is meant for protecting route groups in React Router.
  return <Outlet />;
}

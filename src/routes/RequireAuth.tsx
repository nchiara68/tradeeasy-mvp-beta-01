// src/routes/RequireAuth.tsx
// This component makes sure that a user is logged in before showing certain pages.
// This is a route guard.
// When a user tries to visit a page wrapped in <RequireAuth>:
// 1. It checks if Amplify Auth has finished loading.
// 2. If not ready yet → show nothing (or a spinner).
// 3. If ready but user is not logged in → redirect to /.
// 4. If ready and user is logged in → show the protected content.
// React type helper: PropsWithChildren lets our component accept `children`
// (things placed inside <RequireAuth> ... </RequireAuth>)
import type { PropsWithChildren } from 'react';

// Amplify UI hook to get authentication state
import { useAuthenticator } from '@aws-amplify/ui-react';

// From React Router: 
// - Navigate is used to redirect to another route.
// - Outlet is a placeholder for nested routes to render.
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth({ children }: PropsWithChildren) {
  // Get only the `authStatus` value from the Amplify authenticator context.
  // This tells us if the user is authenticated, not authenticated, or still loading config.
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  // If Amplify is still setting things up ("configuring"),
  // don't show anything yet — could show a spinner here instead of `null`.
  if (authStatus === 'configuring') return null;

  // If the user is NOT authenticated, send them back to the home page ("/").
  // `replace` makes sure this redirect replaces the current history entry
  // so the user can’t hit "back" and see the protected page.
  if (authStatus !== 'authenticated') return <Navigate to="/" replace />;

  // If the user *is* authenticated:
  // - If `children` were passed (wrapped content), render them.
  // - If no children but there are nested routes, render the <Outlet /> instead.
  //   This makes it flexible for both wrapping components and protecting route groups.
  return children ? <>{children}</> : <Outlet />;
}

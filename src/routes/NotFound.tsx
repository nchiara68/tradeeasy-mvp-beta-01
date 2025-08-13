// src/routes/NotFound.tsx
// src/routes/NotFound.tsx
import { Link, useLocation, useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';

/**
 * NotFound / Error Boundary for the router.
 *
 * - When used as `errorElement` in createBrowserRouter, this component renders for:
 *   • Unmatched routes (404)
 *   • Thrown responses (e.g., `throw new Response('', { status: 403 })`)
 *   • Unexpected runtime errors during route rendering/loader/actions
 *
 * - It displays a friendly message and offers:
 *   • "Go back" (history -1)
 *   • "Home" (link to '/')
 *
 * - In dev mode, it prints a debug block to help diagnose issues.
 */
export default function NotFound() {
  const error = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();

  // Vite sets import.meta.env.MODE; treat anything not 'production' as dev
  const isDev = import.meta.env.MODE !== 'production';

  let title = 'Page not found';
  let message = `We couldn't find the page “${location.pathname}”.`;
  let debug: string | undefined;

  if (isRouteErrorResponse(error)) {
    // This is a Response-like error thrown by React Router (e.g., 404/403/etc.)
    const { status, statusText, data } = error;
    if (status === 404) {
      title = 'Page not found';
      message = `We couldn't find the page “${location.pathname}”.`;
    } else {
      title = `${status} ${statusText || ''}`.trim();
      // If loader/action attached a message to data, prefer it
      const dataMsg =
        typeof data === 'string'
          ? data
          : typeof data === 'object' && data !== null && 'message' in data && typeof (data as { message?: unknown }).message === 'string'
          ? (data as { message: string }).message
          : null;
      message = dataMsg || 'Something went wrong while loading this page.';
    }
    if (isDev) {
      debug = JSON.stringify(
        { status: error.status, statusText: error.statusText, data: error.data },
        null,
        2
      );
    }
  } else if (error instanceof Error) {
    // Unexpected runtime error
    title = 'Something went wrong';
    message = error.message || 'An unexpected error occurred.';
    if (isDev) {
      debug = error.stack || String(error);
    }
  } else if (error) {
    // Unknown shape
    title = 'Something went wrong';
    message = 'An unexpected error occurred.';
    if (isDev) {
      try {
        debug = JSON.stringify(error, null, 2);
      } catch {
        debug = String(error);
      }
    }
  }

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: 720,
        padding: '56px 24px',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{title}</h1>
      <p style={{ fontSize: 16, color: '#555', marginBottom: 24 }}>{message}</p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32 }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          ← Go back
        </button>

        <Link
          to="/"
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #0066ff',
            background: '#0066ff',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Go home
        </Link>
      </div>

      {isDev && debug && (
        <details open style={{ background: '#fafafa', border: '1px solid #eee', borderRadius: 8 }}>
          <summary style={{ padding: '10px 12px', cursor: 'pointer', userSelect: 'none' }}>
            Debug details (dev only)
          </summary>
          <pre
            style={{
              margin: 0,
              padding: 12,
              overflow: 'auto',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            {debug}
          </pre>
        </details>
      )}
    </div>
  );
}

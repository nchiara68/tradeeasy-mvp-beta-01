// src/routes/RoleChunk.tsx
/**
 * ROLE-LEVEL CODE-SPLITTING BOUNDARY
 * ----------------------------------
 * What this does:
 *   - Wraps a <Suspense> boundary *around an entire branch* of your route tree.
 *   - Anything rendered under this boundary (i.e., the matched child route via <Outlet/>)
 *     can be lazily loaded (via React.lazy / dynamic import). While the JS chunk is loading,
 *     React shows the provided `fallback`.
 *
 * Why per-role:
 *   - In main.tsx you put <RoleChunk/> inside your <Protected> wrapper for each role:
 *       <Protected groups={...}>
 *         <RoleChunk fallback={<div>Loading seller…</div>} />
 *       </Protected>
 *   - That means the whole Seller subtree (/seller/*) has its own code-splitting boundary,
 *     and those chunks are only fetched when the user navigates into Seller routes. Same for Debtor/Funder/Admin.
 *
 * File type note:
 *   - This file uses JSX (<Suspense> / <Outlet/>), so it must be a .tsx file.
 *     If you accidentally name it .ts, TypeScript will parse JSX as generics and throw errors.
 *
 * Accessibility tip:
 *   - Choose an accessible `fallback` (e.g., a skeleton, spinner with aria-live, or a minimal "Loading…" text).
 *   - Keep fallbacks lightweight; they appear during network/IO waits, so avoid heavy layouts here.
 *
 * SSR note (if you add SSR later):
 *   - Suspense + code-splitting also works with React 18 streaming SSR, but ensure your router framework supports it.
 *   - For CSR (what we have here), this pattern is standard and safe.
 */

import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Accept a customizable fallback so callers (main.tsx) can show role-specific loaders.
// Default is `null` = render nothing while loading.
export default function RoleChunk({ fallback = null }: { fallback?: ReactNode }) {
  return (
    /**
     * Suspense boundary:
     * - When a descendant *throws a promise* (e.g., a React.lazy component while its chunk is fetched),
     *   React pauses rendering this subtree and shows `fallback` instead.
     * - Once the promise resolves (chunk loaded), React resumes and renders the child content.
     */
    <Suspense fallback={fallback}>
      {/**
       * <Outlet/> is the placeholder where the currently matched child route renders.
       * In our setup, those route elements come from lazy-loaded components (via React.lazy),
       * so when a user navigates to /seller/page1, the SellerPage1 chunk is fetched;
       * until it arrives, Suspense shows the `fallback`.
       */}
      <Outlet />
    </Suspense>
  );
}


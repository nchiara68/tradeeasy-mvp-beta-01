// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import App from './App';
import Protected from './routes/Protected';
import RoleChunk from './routes/RoleChunk';
import NotAuthorized from './routes/NotAuthorized';
import NotFound from './routes/NotFound';

// Option B auto-discovery results
// - roleSections: [{ basePath, allowedGroups, pages: [{ path, componentKey }...] }, ...]
// - lazyPages: Record<componentKey, React.LazyExoticComponent<Component>>
import { roleSections, lazyPages } from './routes/config';

// Configure Amplify with your generated outputs
Amplify.configure(outputs);

// Build protected sub-routes per role.
// Each role section gets its own Suspense boundary via <RoleChunk/>.
// IMPORTANT: since lazyPages holds *components*, not elements, we use React.createElement(...)
const roleRoutes = roleSections.map(({ basePath, allowedGroups, pages }) => ({
  path: basePath,
  element: (
    <Protected groups={allowedGroups}>
      <RoleChunk fallback={<div>Loading {basePath}…</div>} />
    </Protected>
  ),
  children: pages.map(({ path, componentKey }) => ({
    path,
    element: React.createElement(lazyPages[componentKey]),
  })),
}));

// Top-level router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Authenticator hideSignUp>
        <App />
      </Authenticator>
    ),
    errorElement: <NotFound />,
    children: [
      ...roleRoutes,
      { path: 'not-authorized', element: <NotAuthorized /> },
    ],
  },
]);

// Mount the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

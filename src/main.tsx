// src/main.tsx
/*
This is multi role-based AWS Amplify (React+typescript+vite+Tailwind 4) app where users log in via AWS Amplify.

Based on their user group (Admin, Seller, Debtor, Funder), they see different routes.

All styling is managed by Tailwind CSS.

It is using lazy loading to load pages only when needed (faster load time).

Authenticator handles all login/logout flows.

*/


// Core React libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// AWS Amplify setup
import { Amplify } from 'aws-amplify'

// This file contains the backend output/configuration for Amplify Gen 2
import outputs from '../amplify_outputs.json'

// React Router (used for navigation between pages)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// AWS Amplify's authentication component (provides sign-in, sign-out, etc.)
import { Authenticator } from '@aws-amplify/ui-react'

// Styling for the Authenticator UI
import '@aws-amplify/ui-react/styles.css'

// Global styles (includes Tailwind 4)
import './index.css' // ← important to keep Tailwind & custom CSS working

// Main layout of the app
import App from './App'

// Custom route components (pages)
import Protected from './routes/Protected'
import RoleChunk from './routes/RoleChunk'
import NotAuthorized from './routes/NotAuthorized'
import NotFound from './routes/NotFound'
import SignIn from './routes/SignIn'

// Route config: defines pages and which user roles can access them
import { roleSections, lazyPages } from './routes/config'

// App-wide context providers (theme, layout, etc.)
import { AppProviders } from './providers/AppProviders'

/* --------------------------------------------------
 ✅ 1. Configure AWS Amplify using the generated output
 This connects your app to your Amplify backend (Auth, API, etc.)
--------------------------------------------------- */
Amplify.configure(outputs)

/* --------------------------------------------------
 ✅ 2. Create protected routes based on user roles
 Each route is wrapped with:
  - <Protected />: checks user group (e.g., Admin, Seller, etc)
  - <RoleChunk />: dynamically loads the content
--------------------------------------------------- */
const roleRoutes = roleSections.map(({ basePath, allowedGroups, pages }) => ({
  path: basePath, // base URL path for this group
  element: (
    <Protected groups={allowedGroups}>
      <RoleChunk fallback={<div>Loading {basePath}…</div>} />
    </Protected>
  ),
  children: pages.map(({ path, componentKey }) => ({
    path,
    element: React.createElement(lazyPages[componentKey]), // lazy-load the correct page
  })),
}))

/* --------------------------------------------------
 ✅ 3. Define your routes using React Router
 Includes:
   - Public: Sign-in page
   - Protected: App layout with authentication
   - Fallback: Not found & not authorized
--------------------------------------------------- */
const router = createBrowserRouter([
  {
    path: '/', // root route
    errorElement: <NotFound />, // fallback for unmatched routes
    children: [
      { index: true, element: <SignIn /> }, // Home page → Sign-in

      {
        // App shell (only shown if user is authenticated)
        element: (
          <AppProviders>
            <Authenticator.Provider>
              <App />
            </Authenticator.Provider>
          </AppProviders>
        ),
        children: [
          ...roleRoutes, // load all role-based pages
          { path: 'not-authorized', element: <NotAuthorized /> }, // shown when access is denied
        ],
      },
    ],
  },
])

/* --------------------------------------------------
 ✅ 4. Render the React app
 This mounts everything to the <div id="root"></div> in your index.html
--------------------------------------------------- */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import './index.css' // ← add/keep this line
import App from './App'
import Protected from './routes/Protected'
import RoleChunk from './routes/RoleChunk'
import NotAuthorized from './routes/NotAuthorized'
import NotFound from './routes/NotFound'
import SignIn from './routes/SignIn'
import { roleSections, lazyPages } from './routes/config'
import { AppProviders } from './providers/AppProviders'

// Configure Amplify
Amplify.configure(outputs)

// Build protected role routes dynamically
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
}))

// Router definition
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      // Public welcome/sign-in page
      { index: true, element: <SignIn /> },

      // Protected app shell (with theme + width providers)
      {
        element: (
          <AppProviders>
            <Authenticator.Provider>
              <App />
            </Authenticator.Provider>
          </AppProviders>
        ),
        children: [
          ...roleRoutes,
          { path: 'not-authorized', element: <NotAuthorized /> },
        ],
      },
    ],
  },
])

// Mount the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

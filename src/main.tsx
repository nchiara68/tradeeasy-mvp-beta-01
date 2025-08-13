// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Authenticator } from '@aws-amplify/ui-react' // ✅ add this import
import '@aws-amplify/ui-react/styles.css'             // load Amplify base first
import './index.css'                                  // then your Tailwind + overrides
import './amplify'                                    // side-effect: Amplify.configure(...)
import { AppProviders } from './providers/AppProviders'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* hideSignUp removes the "Create account" UI; sign-in only */}
    <Authenticator hideSignUp>
      <AppProviders>
        <App />
      </AppProviders>
    </Authenticator>
  </StrictMode>
)

// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@aws-amplify/ui-react/styles.css' // load Amplify base first
import './index.css'                       // then your Tailwind + overrides
import './amplify'                         // side-effect: Amplify.configure(...)
import { AppProviders } from './providers/AppProviders'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)

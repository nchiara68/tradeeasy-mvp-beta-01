// src/pages/public/WelcomePage.tsx (essentials)
import { Authenticator } from '@aws-amplify/ui-react'

export default function WelcomePage() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-sm">
        <Authenticator hideSignUp>{/* … */}</Authenticator>
      </div>
    </div>
  )
}

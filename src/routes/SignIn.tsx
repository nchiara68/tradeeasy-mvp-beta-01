// src/routes/SignIn.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Authenticator,
  ThemeProvider,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react'
import { fetchUserAttributes } from 'aws-amplify/auth'
import WhiteLogo from '../assets/TradeEasyLogoWHITE.png'

// Map groups to a landing page (adjust paths to your real ones)
function pickLandingPath(groups: string[] = []) {
  const set = new Set(groups.map(g => g.toLowerCase()))
  if (set.has('admin'))  return '/admin/admin-test-page'
  if (set.has('seller')) return '/seller/seller-test-page'
  if (set.has('funder')) return '/funder/funder-test-page'
  if (set.has('debtor')) return '/debtor/debtor-test-page'
  return '/not-authorized'
}

// Redirect after successful sign-in (reads groups from user attributes; adapt if you use idToken groups)
function AuthRedirector({ user }: { user: unknown }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        // If you store groups in id token instead, use fetchAuthSession() and read idToken.payload['cognito:groups']
        const attrs = await fetchUserAttributes()
        const groups = (attrs['custom:groups'] as string | undefined)?.split(',') ?? []
        navigate(pickLandingPath(groups), { replace: true })
      } catch {
        navigate('/not-authorized', { replace: true })
      }
    })()
  }, [user, navigate])

  return null
}

export default function SignIn() {
  return (
    // Full-page dark background (crypto navy), independent of global "dark" class
    <div className="min-h-screen bg-[#0B2342] text-white">
      {/* Top bar with centered logo */}
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex items-center">
          <img src={WhiteLogo} alt="TradeEasy" className="h-10 w-auto" />
        </div>
      </div>

      {/* Content: left intro cards / right auth form (stacks on mobile) */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 pb-16 md:grid-cols-2">
        {/* Intro cards — edit freely */}
        <section className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <h2 className="text-xl font-semibold">Welcome to TradeEasy</h2>
            <p className="mt-2 text-white/80">
              Streamline invoice financing for Sellers, Funders and Debtors in one workspace.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <h3 className="font-semibold">Why you’ll like it</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/80">
              <li>Fast onboarding for counterparties</li>
              <li>Clear audit trail &amp; controls</li>
              <li>Real-time visibility across deals</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <h3 className="font-semibold">Need access?</h3>
            <p className="mt-2 text-white/80">
              Accounts are invite‑only. Contact your administrator to be added to a group.
            </p>
          </div>
        </section>

        {/* Auth form — forced dark via Amplify ThemeProvider */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <ThemeProvider
            theme={{ name: 'tradeeasy-public-dark', overrides: [defaultDarkModeOverride] }}
            colorMode="dark"
          >
            <Authenticator initialState="signIn" hideSignUp>
              {({ user }) => (
                <div className="text-center">
                  <p className="mt-4 text-white/80">
                    {user ? 'Redirecting…' : 'Sign in to continue'}
                  </p>
                  <AuthRedirector user={user} />
                </div>
              )}
            </Authenticator>
          </ThemeProvider>
        </section>
      </div>
    </div>
  )
}

// src/routes/SignIn.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Authenticator,
  ThemeProvider,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react'
import { fetchAuthSession } from 'aws-amplify/auth'
import WhiteLogo from '../assets/TradeEasyLogoWHITE.png'

/* Map groups to a landing path (adjust as needed) */
function pickLanding(groups: string[] = []) {
  const g = new Set(groups.map(s => s.toLowerCase()))
  if (g.has('admin'))  return '/admin/admin-test-page'
  if (g.has('seller')) return '/seller/seller-test-page'
  if (g.has('funder')) return '/funder/funder-test-page'
  if (g.has('debtor')) return '/debtor/debtor-test-page'
  return '/not-authorized'
}

/* Redirect to the first allowed route after sign-in */
function AuthRedirector({ user }: { user: unknown }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const session = await fetchAuthSession()
        const groups =
          (session.tokens?.idToken?.payload?.['cognito:groups'] as string[] | undefined) ?? []
        navigate(pickLanding(groups), { replace: true })
      } catch {
        navigate('/not-authorized', { replace: true })
      }
    })()
  }, [user, navigate])
  return null
}

export default function SignIn() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🔵 paint a guaranteed dark canvas (not relying on .dark) */}
      <div className="fixed inset-0 -z-10"
           style={{
             background:
               'radial-gradient(1200px 600px at 20% -10%, #22c3ee33 0%, transparent 60%),' +
               'radial-gradient(900px 500px at 85% -20%, #2563eb33 0%, transparent 55%),' +
               'linear-gradient(180deg, #07162b 0%, #091a33 55%, #071427 100%)'
           }}
      />

      {/* top: centered white logo */}
      <div className="mx-auto w-full max-w-6xl px-6 py-8 flex justify-center">
        <img src={WhiteLogo} alt="TradeEasy" className="h-10 w-auto" />
      </div>

      {/* content: intro cards (left) + auth (right) */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* intro cards */}
        <section className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome to TradeEasy</h2>
            <p className="mt-2 text-white/85">
              Streamline invoice financing for Sellers, Funders and Debtors in one workspace.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold">Why you’ll like it</h3>
            <ul className="mt-2 space-y-1 text-white/85">
              <li>• Fast onboarding for counterparties</li>
              <li>• Clear audit trail &amp; controls</li>
              <li>• Real‑time visibility across deals</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold">Need access?</h3>
            <p className="mt-2 text-white/80">
              Accounts are invite‑only. Contact your administrator to be added to a group.
            </p>
          </div>
        </section>

        {/* Amplify Auth in dark mode with brand tint */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div
            style={
              {
                '--amplify-components-button-primary-background-color': '#22c3ee',
                '--amplify-components-button-primary-hover-background-color': '#1bb2da',
                '--amplify-components-button-primary-focus-box-shadow':
                  '0 0 0 3px rgba(34,195,238,0.45)',
                '--amplify-components-link-color': '#22c3ee',
                '--amplify-colors-background-primary': '#0f1b2e',
                '--amplify-colors-background-secondary': '#0f1b2e',
              } as React.CSSProperties
            }
          >
            <ThemeProvider
              theme={{ name: 'tradeeasy-public-dark', overrides: [defaultDarkModeOverride] }}
              colorMode="dark"
            >
              <Authenticator initialState="signIn" hideSignUp>
                {({ user }) => (
                  <div className="text-center">
                    <h1 className="text-xl font-semibold">Sign in</h1>
                    <p className="mt-1 text-white/75">
                      {user ? 'Redirecting…' : 'Use your invite‑only credentials'}
                    </p>
                    <AuthRedirector user={user} />
                  </div>
                )}
              </Authenticator>
            </ThemeProvider>
          </div>
        </section>
      </div>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-8 text-xs text-white/60">
        © {new Date().getFullYear()} TradeEasy — All rights reserved.
      </footer>
    </div>
  )
}

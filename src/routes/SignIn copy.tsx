// src/routes/SignIn.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import { fetchUserAttributes } from 'aws-amplify/auth'

function pickLandingPath(groups: string[] = []) {
  const set = new Set(groups.map(g => g.toLowerCase()))
  if (set.has('admin'))  return '/admin/admin-test-page'
  if (set.has('seller')) return '/seller/seller-test-page'
  if (set.has('funder')) return '/funder/funder-test-page'
  if (set.has('debtor')) return '/debtor/debtor-test-page'
  return '/not-authorized'
}

function AuthRedirector({ user }: { user: unknown }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    
    const getGroupsAndNavigate = async () => {
      try {
        const attributes = await fetchUserAttributes()
        const groups = (attributes['custom:groups'] as string)?.split(',') ?? []
        navigate(pickLandingPath(groups), { replace: true })
      } catch {
        navigate('/not-authorized', { replace: true })
      }
    }
    
    getGroupsAndNavigate()
  }, [user, navigate])

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold mb-2">Welcome to TradeEasy</h1>
      <p className="opacity-75">{user ? 'Redirecting…' : 'Sign in to continue'}</p>
    </div>
  )
}

export default function SignIn() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-sm">
        {/* Full auth UI on the public page; hide sign-up if invite-only */}
        <Authenticator initialState="signIn" hideSignUp>
          {({ user }) => <AuthRedirector user={user} />}
        </Authenticator>
      </div>
    </div>
  )
}

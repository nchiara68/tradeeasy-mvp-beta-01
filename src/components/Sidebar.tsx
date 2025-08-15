// src/components/Sidebar.tsx
import { Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { signOut } from 'aws-amplify/auth'
import { useGroups } from '../auth/useGroups'
import { roleSections } from '../routes/config'

const canSee = (userGroups: string[] | null | undefined, allowed: readonly string[]) =>
  (userGroups ?? []).some(g => allowed.includes(g))

export default function Sidebar() {
  const { user } = useAuthenticator()
  const { groups } = useGroups()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded px-2 py-1 text-sm transition-colors',
      isActive
        ? 'bg-crypto-600 text-white'
        : 'text-(--color-text) hover:bg-crypto-600/10 dark:hover:bg-crypto-300/10'
    ].join(' ')

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* user */}
      <div className="mb-1">
        <strong className="block text-(--color-text)">{user?.signInDetails?.loginId}</strong>
      </div>

      {/* sections */}
      {roleSections.map(section =>
        canSee(groups, section.allowedGroups) ? (
          <div key={section.basePath}>
            <h4 className="mb-2 font-semibold text-crypto-700 dark:text-crypto-200">{section.label}</h4>
            <nav className="flex flex-col gap-0.5">
              {section.pages.map(p => (
                <NavLink key={p.path} to={`/${section.basePath}/${p.path}`} className={linkClass}>
                  {p.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null
      )}

      {/* actions */}
      <div className="pt-2">
        <button
          onClick={() => signOut()}
          className="rounded-md border border-crypto-600/30 dark:border-crypto-300/30 px-3 py-1 text-sm hover:bg-crypto-600/10 dark:hover:bg-crypto-300/10"
        >
          Sign out
        </button>
      </div>

      <Suspense fallback={null} />
    </div>
  )
}

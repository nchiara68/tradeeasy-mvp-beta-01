// src/components/Sidebar.tsx
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { signOut } from 'aws-amplify/auth'
import { useGroups } from '../auth/useGroups'
import { roleSections } from '../routes/config'

const canSee = (userGroups: string[] | null | undefined, allowed: readonly string[]) =>
  (userGroups ?? []).some(g => allowed.includes(g))

export default function Sidebar() {
  const { user } = useAuthenticator()
  const { groups } = useGroups()

  return (
    <div className="flex flex-col gap-4 text-sm">
      {/* User */}
      <div className="mb-2">
        <strong className="block text-(--color-text)">{user?.signInDetails?.loginId}</strong>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-5">
        {roleSections.map(section =>
          canSee(groups, section.allowedGroups) ? (
            <div key={section.basePath}>
              {/* 🔹 Bold captions as requested */}
              <h4 className="mb-2 font-semibold text-crypto-700 dark:text-crypto-200">
                {section.label}
              </h4>

              <nav className="flex flex-col gap-1">
                {section.pages.map(p => (
                  <Link
                    key={p.path}
                    to={`/${section.basePath}/${p.path}`}
                    className="rounded px-1 py-0.5 hover:bg-crypto-600/10 dark:hover:bg-crypto-300/10"
                  >
                    {p.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : null
        )}
      </div>

      {/* Actions */}
      <div className="pt-2">
        <button
          onClick={() => signOut()}
          className="rounded-md border border-crypto-600/30 dark:border-crypto-300/30 px-3 py-1 text-sm hover:bg-crypto-600/10 dark:hover:bg-crypto-300/10"
        >
          Sign out
        </button>
      </div>

      {/* Lazy placeholders, if you add any */}
      <Suspense fallback={null} />
    </div>
  )
}

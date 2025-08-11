// src/App.tsx
import { useColorMode } from './providers/color-mode-context'
import type { ColorMode } from '@aws-amplify/ui-react'
import { Button } from '@aws-amplify/ui-react'

export default function App() {
  const { mode, setMode } = useColorMode()
  const modes: ColorMode[] = ['light', 'dark', 'system']

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-crypto-700 dark:text-crypto-300">
          Minimal Vite + Tailwind v4 + Amplify
        </h1>
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={[
                'rounded-md px-3 py-1 text-sm border',
                m === mode
                  ? 'bg-crypto-600 text-white border-crypto-700'
                  : 'bg-(--color-surface) text-(--color-text) border-crypto-600/30 dark:border-crypto-300/30'
              ].join(' ')}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 flex gap-3">
        <Button>Amplify Primary</Button>
        <Button variation="link">Link</Button>
        <Button variation="destructive">Destructive</Button>
      </div>
    </div>
  )
}

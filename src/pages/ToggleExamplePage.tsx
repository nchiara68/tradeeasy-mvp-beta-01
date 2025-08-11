// src/ToggleExamplePage.tsx
import React from 'react'
import type { ColorMode } from '@aws-amplify/ui-react'
import { Button, Card, Heading, Text } from '@aws-amplify/ui-react'
import { useColorMode } from '../providers/color-mode-context'
import NavyLogo from '../assets/TradeEasyLogoNAVY.png'
import WhiteLogo from '../assets/TradeEasyLogoWHITE.png'

const modes: ColorMode[] = ['light', 'dark']
const widths = [
  { label: 'Narrow (max-w-3xl)', value: 'max-w-3xl' },
  { label: 'Default (max-w-4xl)', value: 'max-w-4xl' },
  { label: 'Wide (max-w-5xl)', value: 'max-w-5xl' },
  { label: 'Extra Wide (max-w-6xl)', value: 'max-w-6xl' },
  { label: 'Full Screen', value: 'max-w-full' }
]

export function ToggleExamplePage() {
  const { mode, setMode } = useColorMode()
  const [maxWidth, setMaxWidth] = React.useState('max-w-4xl')

  return (
    <div className="min-h-screen px-6 py-8">
      {/* HEADER */}
      <header className={`${maxWidth} mx-auto flex items-center justify-between`}>
        {/* Logo */}
        <img
          src={mode === 'dark' ? WhiteLogo : NavyLogo}
          alt="TradeEasy Logo"
          className="h-10 w-auto"
        />

        {/* Theme toggle buttons */}
        <div className="flex items-center gap-2">
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
              aria-pressed={m === mode}
            >
              {m}
            </button>
          ))}

          {/* Width selector */}
          <select
            value={maxWidth}
            onChange={(e) => setMaxWidth(e.target.value)}
            className="ml-4 rounded-md border border-crypto-600/30 dark:border-crypto-300/30 bg-(--color-surface) text-(--color-text) px-2 py-1 text-sm"
          >
            {widths.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* MAIN */}
      <main className={`${maxWidth} mx-auto mt-8 grid gap-6`}>
        {/* Amplify example */}
        <Card variation="elevated" className="p-6 bg-(--color-surface)">
          <Heading level={4} className="mb-2">
            Amplify + Tailwind v4
          </Heading>
          <Text>
            This card is styled by Amplify UI, but colors come from our theme via CSS variables.
          </Text>
          <div className="mt-4 flex gap-3">
            <Button>Primary</Button>
            <Button variation="link">Link</Button>
            <Button variation="destructive">Destructive</Button>
          </div>
        </Card>

        {/* Tailwind example */}
        <section className="rounded-xl border border-crypto-600/20 dark:border-crypto-300/20 p-6
                            bg-white dark:bg-crypto-950">
          <h2 className="text-xl font-medium text-crypto-700 dark:text-crypto-200 mb-2">
            Tailwind Section
          </h2>
          <p className="text-sm opacity-80">
            Use the width dropdown above to see the layout adjust in real-time.
          </p>
        </section>
      </main>
    </div>
  )
}

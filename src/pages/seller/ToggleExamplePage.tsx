// src/ToggleExamplePage.tsx
//import React from 'react'
import type { ColorMode } from '@aws-amplify/ui-react'
import { Button, Card, Heading, Text } from '@aws-amplify/ui-react'
import { useColorMode } from '../../providers/color-mode-context'
import { GlobalWidthSelect } from '../../ui/GlobalWidthSelect'
import NavyLogo from '../assets/TradeEasyLogoNAVY.png'
import WhiteLogo from '../assets/TradeEasyLogoWHITE.png'

const modes: ColorMode[] = ['light', 'dark']

export function ToggleExamplePage() {
  const { mode, setMode } = useColorMode()

  return (
    <div className="min-h-screen py-8">
      {/* HEADER */}
      <header className="app-container flex items-center justify-between">
        <img
          src={mode === 'dark' ? WhiteLogo : NavyLogo}
          alt="TradeEasy Logo"
          className="h-10 w-auto"
        />

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

          {/* Global width selector (affects all pages + persists) */}
          <GlobalWidthSelect />
        </div>
      </header>

      {/* MAIN */}
      <main className="app-container mt-8 grid gap-6">
        <Card variation="elevated" className="p-6 bg-(--color-surface)">
          <Heading level={4} className="mb-2">
            Amplify + Tailwind v4 SELLER
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

        <section className="rounded-xl border border-crypto-600/20 dark:border-crypto-300/20 p-6 bg-white dark:bg-crypto-950">
          <h2 className="text-xl font-medium text-crypto-700 dark:text-crypto-200 mb-2">
            Tailwind Section
          </h2>
          <p className="text-sm opacity-80">
            This page width is controlled globally and is persisted.
          </p>
        </section>
      </main>
    </div>
  )
}

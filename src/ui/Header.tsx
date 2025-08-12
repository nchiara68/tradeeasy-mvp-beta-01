// src/ui/Header.tsx
import type { ColorMode } from '@aws-amplify/ui-react'
import { useColorMode } from '../providers/color-mode-context'
import { GlobalWidthSelect } from './GlobalWidthSelect'
import NavyLogo from '../assets/TradeEasyLogoNAVY.png'
import WhiteLogo from '../assets/TradeEasyLogoWHITE.png'

const modes: ColorMode[] = ['light', 'dark']

export function Header() {
  const { mode, setMode } = useColorMode()

  return (
    <header className="app-container flex items-center justify-between py-4">
      {/* Logo - switches with Tailwind dark: */}
      <div className="flex items-center gap-3">
        <img src={NavyLogo} alt="TradeEasy" className="h-8 w-auto block dark:hidden" />
        <img src={WhiteLogo} alt="TradeEasy (dark)" className="h-8 w-auto hidden dark:block" />
      </div>

      {/* Controls */}
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
        <GlobalWidthSelect />
      </div>
    </header>
  )
}

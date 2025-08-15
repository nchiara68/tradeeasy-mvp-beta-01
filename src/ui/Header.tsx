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
    // full-width bar (subtle border); sticky optional
    <div className="w-full border-b border-crypto-600/20 dark:border-crypto-300/20 bg-(--color-surface) sticky top-0 z-40">
      <div className="app-container flex items-center justify-between py-4">
        {/* brand */}
        <a href="/" className="inline-flex items-center gap-3" aria-label="TradeEasy home">
          <img src={NavyLogo} alt="TradeEasy" className="h-9 w-auto block dark:hidden" />
          <img src={WhiteLogo} alt="TradeEasy (dark)" className="h-9 w-auto hidden dark:block" />
        </a>

        {/* controls */}
        <div className="flex items-center gap-2">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={m === mode}
              className={[
                'rounded-md px-3 py-1 text-sm border transition-colors',
                m === mode
                  ? 'bg-crypto-600 text-white border-crypto-700'
                  : 'bg-(--color-surface) text-(--color-text) border-crypto-600/30 dark:border-crypto-300/30 hover:bg-crypto-600/10 dark:hover:bg-crypto-300/10'
              ].join(' ')}
            >
              {m}
            </button>
          ))}
          <GlobalWidthSelect />
        </div>
      </div>
    </div>
  )
}

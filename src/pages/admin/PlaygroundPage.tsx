// src/pages/PlaygroundPage.tsx
export default function PlaygroundPage() {
  return (
    <>
      <header className="rounded-xl bg-card-gradient p-6 shadow-sm">
        <h1 className="text-display text-white">Playground</h1>
        <p className="text-body text-white/80">
          Try things here and verify dark mode + width behave consistently.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl p-5 border border-crypto-600/20 dark:border-crypto-300/20 bg-(--color-surface)">
          <h3 className="text-h3 text-crypto-700 dark:text-crypto-200 mb-2">Panel A</h3>
          <p className="text-body opacity-80">
            This surface follows global theme tokens (light or dark).
          </p>
        </div>

        <div className="rounded-xl p-5 border border-crypto-600/20 dark:border-crypto-300/20 bg-(--color-surface)">
          <h3 className="text-h3 text-crypto-700 dark:text-crypto-200 mb-2">Panel B</h3>
          <p className="text-body opacity-80">
            Borders & text swap via <code>dark:</code> and CSS variables.
          </p>
        </div>
      </div>
    </>
  )
}

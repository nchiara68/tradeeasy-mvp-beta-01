// src/pages/PlaygroundPage.tsx
export default function PlaygroundPage() {
  return (
    <>
      <header className="rounded-xl bg-card-gradient p-6">
        <h1 className="text-display text-white">Playground</h1>
        <p className="text-body text-white/80">
          Try things here and verify dark mode + width behave consistently.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg p-4 border border-crypto-600/20 dark:border-crypto-300/20 bg-white dark:bg-brand-deepnavy">
          <h3 className="text-h3 text-crypto-700 dark:text-crypto-200 mb-2">Panel A</h3>
          <p className="text-body opacity-80">Dark background should appear in dark mode.</p>
        </div>
        <div className="rounded-lg p-4 border border-crypto-600/20 dark:border-crypto-300/20 bg-white dark:bg-brand-deepnavy">
          <h3 className="text-h3 text-crypto-700 dark:text-crypto-200 mb-2">Panel B</h3>
          <p className="text-body opacity-80">
            Borders/text swap via <code>dark:</code> classes.
          </p>
        </div>
      </div>
    </>
  )
}

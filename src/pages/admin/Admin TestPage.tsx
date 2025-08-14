// src/pages/HomePage.tsx
import { Button, Card, Heading, Text } from '@aws-amplify/ui-react'

export default function TestPage() {
  return (
    <>
      <Card variation="elevated" className="p-6 bg-(--color-surface)">
        <Heading level={4} className="mb-2">
          Amplify + Tailwind v4 + ADMIN
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
          Global width + dark mode should apply here.
        </p>
      </section>
    </>
  )
}

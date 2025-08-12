// src/routes/RootRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '../ui/Header'
import { NavTabs } from '../ui/NavTabs'
import { HomePage } from '../pages/HomePage'
import { PlaygroundPage } from '../pages/PlaygroundPage'

export function RootRouter() {
  return (
    <BrowserRouter>
      <Header />
      <NavTabs />

      <main className="app-container mt-6 grid gap-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

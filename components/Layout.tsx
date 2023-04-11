import Header from './header/Header'
import Footer from './footer/Footer'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center">
        {children}
      </main>

      <Footer />
    </>
  )
}

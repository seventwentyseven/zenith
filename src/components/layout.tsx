import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout

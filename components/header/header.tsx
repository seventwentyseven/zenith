import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import HeaderNavigation from './header-navigation'
import HeaderRightBlock from './header-right-block'
import Logo from './logo'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 w-full min-h-16 mx-auto flex flex-row items-center justify-between px-72 py-1 border-b border-white/40 bg-hsl-20 bg-opacity-40 backdrop-blur-xl z-10">
      <Link href="/" className="flex flex-col items-center justify-center">
        <Logo />
      </Link>
      <HeaderNavigation />
      <HeaderRightBlock session={session} />
    </header>
  )
}

export default Header

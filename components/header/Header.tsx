import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import HeaderNavigation from './header-navigation'
import HeaderRightBlock from './header-right-block'
import Logo from './logo'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 w-full border-b border-hsl-20/40  bg-hsl-20 bg-opacity-40 backdrop-blur-xl z-10">
      <nav className="w-full max-w-screen-xl min-h-16 mx-auto grid grid-cols-3 grid-rows-1 my-auto py-1">
        <Link
          href="/"
          className="flex flex-row items-center justify-start w-full"
        >
          <Logo />
        </Link>
        <HeaderNavigation session={session} />
        <HeaderRightBlock session={session} />
      </nav>
    </header>
  )
}

export default Header

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import HeaderNavigation from './HeaderNavigation'
import HeaderRightBlock from './HeaderRightBlock'
import HeaderSearchModal from './HeaderSearchModal'
import HeaderLogo from './HeaderLogo'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 w-full border-b border-hsl-20/40  bg-hsl-20 bg-opacity-40 backdrop-blur-xl z-10">
      <nav className="w-full max-w-screen-xl min-h-16 mx-auto grid grid-cols-3 grid-rows-1 my-auto py-1">
        <Link
          href="/"
          className="flex flex-row items-center justify-start w-full"
        >
          <HeaderLogo />
        </Link>
        <HeaderNavigation session={session} />
        <div>
          <HeaderSearchModal />
          <HeaderRightBlock session={session} />
        </div>
      </nav>
    </header>
  )
}

export default Header

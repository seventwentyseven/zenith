import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import UserDropdown from './animated-stagger'

//TODO: Make header
/**
 * The header component
 */
const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 z-10 w-full border-b border-hsl-20/40 bg-hsl-35-15 bg-opacity-40 backdrop-blur-xl">
      <div className="min-h-16 mx-auto my-auto grid w-full max-w-screen-xl grid-cols-2 grid-rows-1 py-1">
        <div className="flex w-full flex-row gap-2">
          <Link href="/">
            <Image
              src="https://seventwentyseven.xyz/static/favicon/apple-touch-icon.png"
              alt="727.xyz logo"
              width={64}
              height={64}
              className="duration-150 hover:opacity-60"
            />
          </Link>

          <nav className="flex flex-row items-center justify-center">
            <Link href="/leaderboard">
              <Button size="lg" variant="ghost">
                Leaderboard
              </Button>
            </Link>
            <Link href="/beatmaps" className="btn btn-lg btn-ghost">
              <Button size="lg" variant="ghost">
                Beatmaps
              </Button>
            </Link>
            <Link href="/docs" className="btn btn-lg btn-ghost mr-0">
              <Button size="lg" variant="ghost">
                Docs
              </Button>
            </Link>
            {/* {hasStaff && (
              <Link href="/admin" className="btn btn-lg btn-ghost">
                Admin Panel
              </Link>
            )} */}
          </nav>
        </div>

        {session && (
          <div className="ml-auto">
            <UserDropdown />
          </div>
        )}

        {!session && (
          <div className="flex w-full flex-row items-center justify-end">
            <Link href="/auth/signin">
              <Button variant="ghost" size="lg">
                Sign in
              </Button>
            </Link>
          </div>
        )}
        {/* <HeaderRightBlock /> */}
      </div>
    </header>
  )
}

export default Header

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'
import { Dropdown, DropdownContent, DropdownTrigger } from './ui/dropdown'
import { motion } from 'framer-motion'

//TODO: Make header
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
          <div className="flex flex-row items-center justify-center justify-self-end overflow-y-hidden">
            <Dropdown>
              <DropdownTrigger>
                <Link
                  href={`/user/${session.user.id}`}
                  className={cn(
                    'flex flex-row items-center justify-between rounded-lg bg-transparent px-4 py-2',
                    'w-48 transition duration-150 group-hover:bg-hsl-35-15 group-hover:bg-opacity-80'
                  )}
                >
                  <Image
                    src={`https://a.seventwentyseven.xyz/${session?.user.id}`}
                    alt="User image"
                    width={64}
                    height={64}
                    className="h-12 w-12 rounded-full duration-150 group-hover:opacity-60"
                  />
                  <div className="flex flex-row gap-2">
                    <span>{session.user.name}</span>
                    <FaChevronDown className="transition duration-150 group-hover:rotate-180" />
                  </div>
                </Link>
              </DropdownTrigger>
              <DropdownContent
                className={cn(
                  'absolute transition duration-150',
                  'w-48 select-none pt-4'
                )}
              >
                <div
                  className={cn(
                    'flex w-48 flex-col items-center justify-center',
                    'gap-2 bg-hsl-35-15 bg-opacity-80 transition duration-200',
                    'rounded-lg p-4 pt-2'
                  )}
                >
                  <span>{session.user.name}</span>
                  <Link href={`/user/${session.user.id}`} className="w-full">
                    <Button size="lg" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Link href="/auth/signout" className="w-full">
                    <Button size="lg" variant="danger" className="w-full">
                      Sign out
                    </Button>
                  </Link>
                </div>
              </DropdownContent>
            </Dropdown>
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

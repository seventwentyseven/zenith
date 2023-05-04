//? NextJS imports
import Image from 'next/image'
import Link from 'next/link'

//? NextAuth session
import { useSession } from 'next-auth/react'

//? Our components
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger
} from '../ui/HoverCard'
import HeaderSearchModal from './HeaderSearchModal'

//? Icons
import { FaHeart } from 'react-icons/fa'

const HeaderRightBlock = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="dark flex flex-row w-full items-center justify-end gap-2">
        <a
          className="h-10 w-10 rounded-full flex items-center justify-center bg-transparent border-transparent hover:bg-pink-500 hover:border-3 hover:border-white hover:text-pink-100 transition-all duration-200"
          href={'/donate'}
        >
          <FaHeart className="text-xl" />
        </a>

        <HeaderSearchModal token={session.user.token} />

        <HoverCard>
          <HoverCardTrigger href={`/user/${session.user.id}`}>
            <Image
              src={`https://a.seventwentyseven.xyz/${session.user.id}`}
              alt="User image"
              width={64}
              height={64}
              className="rounded-full w-12 h-12 duration-150 hover:opacity-60"
            />
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent
              side="bottom"
              className="z-50 inline-block w-48 bg-hsl-15 bg-opacity-80 shadow-sm shadow-hsl-5 rounded-lg font-light"
            >
              <h3 className="px-3 py-2 font-semibold text-gray-200 text-center">
                {session.user.name}
              </h3>
              <div className="px-3 pb-2 flex flex-col items-center justify-between gap-2">
                <Link
                  href={`/user/${session.user.id}`}
                  className="btn btn-md btn-primary w-full"
                >
                  Profile
                </Link>

                <Link
                  href="/settings"
                  className="btn btn-md btn-primary w-full z-50"
                >
                  Settings
                </Link>

                <Link
                  href="/auth/signout"
                  className="btn btn-md btn-primary w-full z-50"
                >
                  Sign out
                </Link>
              </div>
              <HoverCardArrow className="fill-hsl-15 opacity-80" />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCard>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-2 w-full items-center justify-end">
      <Link href="/auth/signin" className="btn btn-lg btn-primary">
        Sign in
      </Link>
      <Link href="/auth/signup" className="btn btn-lg btn-ghost">
        Sign up
      </Link>
    </div>
  )
}

export default HeaderRightBlock

import { initPopovers } from 'flowbite'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useEffect } from 'react'

type IProps = {
  session: Session | null
}
const HeaderRightBlock = ({ session }: IProps) => {
  useEffect(() => {
    initPopovers()
  })
  if (session) {
    return (
      <div className="dark flex flex-row w-full items-center justify-end">
        <Link
          data-popover-target="user-menu"
          data-popover-placement="bottom"
          href={`/user/${session.user.id}`}
        >
          <img
            src={`https://a.seventwentyseven.xyz/${session.user.id}`}
            alt="User image"
            className="rounded-full w-12 h-12 duration-150 hover:opacity-60"
          />
        </Link>

        <div
          data-popover
          id="user-menu"
          role="tooltip"
          className="absolute z-50 invisible inline-block w-48 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700 z-50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-center">
              {session.user.name}
            </h3>
          </div>
          <div className="px-3 py-2 flex flex-col items-center justify-between gap-2 z-50">
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
          <div data-popper-arrow></div>
        </div>
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

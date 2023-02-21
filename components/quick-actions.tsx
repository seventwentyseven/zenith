import { useSession } from 'next-auth/react'
import Link from 'next/link'

const QuickActions = () => {
  const { data: session } = useSession()

  return (
    <div className="hidden xl:block w-[35%] rounded-lg p-4 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white shadow ml-2 select-none border-white/20 border-px">
      <div className="flex flex-col w-full">
        <span className="text-center text-base-content mb-2">
          Quick actions
        </span>

        <div className="flex flex-row w-full justify-between h-full">
          <Link
            href={`/user/${session?.user.id}`}
            className="btn btn-lg btn-primary w-[35%]"
          >
            Profile
          </Link>
          <Link href="/beatmaps" className="btn btn-lg btn-secondary w-[30%]">
            Beatmaps
          </Link>
          <Link
            href="/api/auth/signout"
            className="btn btn-danger btn-lg w-[30%]"
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickActions

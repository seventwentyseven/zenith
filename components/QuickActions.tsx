import { useSession } from 'next-auth/react'
import Link from 'next/link'

const QuickActions = () => {
  const { data: session } = useSession()

  return (
    <section className="hidden xl:block w-[35%] rounded-lg p-4 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white shadow ml-2 select-none border-white/20 border-px">
      <div className="flex flex-col w-full">
        <span className="text-center text-base-content mb-2">
          Quick actions
        </span>

        <div className="grid grid-cols-3 grid-rows-1 h-full gap-2.5">
          <Link
            href={`/user/${session?.user.id}`}
            className="btn btn-lg btn-primary w-full"
          >
            Profile
          </Link>
          <Link href="/beatmaps" className="btn btn-lg btn-secondary w-full">
            Beatmaps
          </Link>
          <Link
            href="/api/auth/signout"
            className="btn btn-danger btn-lg w-full"
          >
            Sign out
          </Link>
        </div>
      </div>
    </section>
  )
}

export default QuickActions

import { useSession } from 'next-auth/react'
import Link from 'next/link'

const QuickActions = () => {
  const { data: session } = useSession()

  return (
    <div className="hidden xl:block w-[35%] rounded-lg p-4 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white shadow ml-2 select-none border-white/20 border-px">
      <div className="flex flex-col w-full">
        <span className="text-center text-base-content mb-2 ">
          Quick actions
        </span>

        <div className="flex flex-row w-full justify-between h-full">
          <Link
            href={`/user/${session?.user.id}`}
            className="bg-hsl-45 bg-opacity-50 backdrop-blur-xl rounded-lg p-2.5 text-center w-[35%] h-full duration-100 hover:bg-opacity-100"
          >
            Profile
          </Link>
          <Link href="/beatmaps" className="bg-green-500 bg-opacity-50 backdrop-blur-xl rounded-lg p-2.5 text-center w-[30%] h-full duration-100 hover:bg-opacity-100">
            Beatmaps
          </Link>
          <Link
            href="/api/auth/signout"
            className="bg-red-600 bg-opacity-50 backdrop-blur-xl rounded-lg p-2.5 text-center w-[30%] h-full duration-100 hover:bg-opacity-100"
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickActions

import { Session } from 'next-auth'
import Link from 'next/link'

type IProps = {
  session: Session | null
}
const HeaderRightBlock = ({ session }: IProps) => {
  if (session) {
    return (
      <Link href={`/user/${session.user.id}`}>
        <img
          src={`https://a.seventwentyseven.xyz/${session.user.id}`}
          alt="User image"
          className="rounded-full w-12 h-12 duration-150 hover:opacity-60"
        />
      </Link>
    )
  }

  return (
    <div>
      <Link
        href="/api/auth/signin"
        className="inline-block px-6 py-4 mr-2 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
      >
        Sign in
      </Link>

      <Link
        href="/api/auth/signup"
        className="inline-block px-6 py-4 -mr-4 bg-transparent text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
      >
        Sign up
      </Link>
    </div>
  )
}

export default HeaderRightBlock

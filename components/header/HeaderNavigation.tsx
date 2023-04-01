import { Session } from 'next-auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isStaff } from '../../controllers/UserPrivileges'

interface IProps {
  session: Session | null
}

const HeaderNavigation = ({ session }: IProps) => {
  const [hasStaff, setHasStaff] = useState<boolean>(false)

  useEffect(() => {
    if (session) {
      setHasStaff(isStaff(session.user.priv))
    }

    console.log(session)
    console.log(hasStaff)
  }, [session])

  return (
    <nav className="flex flex-row items-center justify-center">
      <Link href="/leaderboard" className="btn btn-lg btn-ghost">
        Leaderboard
      </Link>
      <Link href="/beatmaps" className="btn btn-lg btn-ghost">
        Beatmaps
      </Link>
      <Link href="/docs" className="btn btn-lg btn-ghost mr-0">
        Docs
      </Link>
      {hasStaff && (
        <Link href="/admin" className="btn btn-lg btn-ghost">
          Admin Panel
        </Link>
      )}
    </nav>
  )
}

export default HeaderNavigation

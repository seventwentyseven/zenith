import { useContext } from 'react'
import { UserContext } from '~/pages/user/[user]'

const UserName = () => {
  const { userData } = useContext(UserContext)

  return <span className="text-3xl font-bold">{userData.name}</span>
}

export default UserName

import { useContext } from 'react'
import { UserContext } from '~/pages/user/[user]'

const UserPP = () => {
  const { userStats: ctx } = useContext(UserContext)
  return (
    <div className="ml-1 flex flex-col items-start justify-center">
      <span className="select-none font-bold text-hsl-90">pp</span>
      <span className="text-xl font-light">TODO</span>
    </div>
  )
}

export default UserPP

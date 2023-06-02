import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '~/pages/user/[useridOrName]'

const UserName = () => {
  const { userData } = useContext(UserContext)

  return (
    <div className="flex items-center gap-2">
      <Image
        src={`https://seventwentyseven.xyz/static/images/flags/${userData.country.toUpperCase()}.png`}
        alt={`${userData.country.toUpperCase()} flag`}
        width={70}
        height={47}
        className="h-7 w-auto"
      />
      <span className="text-3xl font-bold">{userData.name}</span>
    </div>
  )
}

export default UserName

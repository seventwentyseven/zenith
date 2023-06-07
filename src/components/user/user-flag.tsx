import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '~/pages/user/[user]'

const UserFlag = () => {
  const { userData } = useContext(UserContext)
  return (
    <Image
      src={`https://seventwentyseven.xyz/static/images/flags/${userData.country.toUpperCase()}.png`}
      alt={`${userData.country.toUpperCase()} flag`}
      width={70}
      height={47}
      className="h-7 w-auto"
    />
  )
}

export default UserFlag

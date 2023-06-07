import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '~/pages/user/[user]'

const UserAvatar = () => {
  const { userData } = useContext(UserContext)
  return (
    <Image
      src={`https://a.seventwentyseven.xyz/${userData.id}`}
      alt={`user ${userData.id} avatar`}
      width={256}
      height={256}
      className="absolute -bottom-28 left-4 rounded-xl"
    />
  )
}

export default UserAvatar

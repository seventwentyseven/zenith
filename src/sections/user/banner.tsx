import { useContext } from 'react'
import GamemodeSwitcher from '~/components/user/gamemode-switcher'
import UserAvatar from '~/components/user/user-avatar'
import UserBadges from '~/components/user/user-badges'
import UserName from '~/components/user/user-name'
import UserStatus from '~/components/user/user-status'
import { UserContext } from '~/pages/user/[useridOrName]'

const Banner = () => {
  const { userData } = useContext(UserContext)
  return (
    <div
      className="flex h-72 w-full flex-col items-center rounded-t-3xl border-b-px border-hsl-70/50 bg-hsl-40 bg-cover bg-center backdrop-blur-xl"
      style={{
        backgroundImage: `linear-gradient(180deg, hsla(230, 35%, 15%, 0.5), hsla(230, 35%, 15%, 0.5)), url("https://seventwentyseven.xyz/banners/${userData.id}")`
      }}
    >
      <UserStatus />
      <GamemodeSwitcher />
      <UserAvatar />
      <div className="absolute bottom-2 left-64 -mt-24 flex flex-col gap-4 pl-8">
        <UserName />
        <UserBadges />
      </div>
    </div>
  )
}

export default Banner

import { useContext } from 'react'
import { Badges } from '~/constants/user-badges'
import { cn } from '~/lib/utils'
import { UserContext } from '~/pages/user/[user]'

const UserBadges = () => {
  const { userData } = useContext(UserContext)
  const userPriv = userData.priv

  // Badges come in from lowest to highest privileges but we want to have them from highest to lowest
  const userBadges = Badges.filter(
    ({ privilege }) => (userPriv & privilege) === privilege
  )

  return (
    <div className="flex max-w-3xl flex-row flex-wrap gap-2">
      {userBadges.map(badge => {
        return (
          <div
            key={`badge-${badge.privilegeName}`}
            className={cn(
              'group inline-flex select-none items-center rounded-full bg-gradient-to-br px-2.5 py-2 transition-all duration-300',
              badge.className
            )}
          >
            {badge.icon}
            <span className="scale-80 inline-block max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-screen-2xl group-hover:scale-100 group-hover:px-2">
              {badge.privilegeName}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default UserBadges

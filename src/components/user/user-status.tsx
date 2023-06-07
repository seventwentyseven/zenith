import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useContext } from 'react'
import { cn } from '~/lib/utils'
import { UserContext } from '~/pages/user/[user]'
import { UserStatusOffline } from '~/types/user'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

dayjs.extend(relativeTime)

const MILLISECONDS_IN_SECOND = 1000

const UserStatus = () => {
  const { userStatus } = useContext(UserContext)

  let indicatorColor: string
  let descriptionBoxContent: string
  let tooltipContent: string | undefined

  if (userStatus.online) {
    indicatorColor = 'text-green-500'
    descriptionBoxContent = 'TODO: Implement ingame actions'
  } else {
    let status = userStatus as UserStatusOffline

    const lastSeenDate = new Date(status.last_seen * MILLISECONDS_IN_SECOND)
    const lastSeen = dayjs(lastSeenDate).fromNow()

    indicatorColor = 'text-gray-200'
    descriptionBoxContent = `Last seen: ${lastSeen}`
    tooltipContent = lastSeenDate.toLocaleString()
  }

  return (
    <Tooltip>
      <TooltipTrigger className={cn(indicatorColor)}>●</TooltipTrigger>
      {tooltipContent && (
        <TooltipContent className="mb-4 rounded-lg bg-hsl-35-15 bg-opacity-80 p-3">
          {descriptionBoxContent} ({tooltipContent})
        </TooltipContent>
      )}
    </Tooltip>
  )
}

export default UserStatus

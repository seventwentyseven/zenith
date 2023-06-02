import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useContext } from 'react'
import { UserContext } from '~/pages/user/[useridOrName]'
import { UserStatusOffline } from '~/types/user'

dayjs.extend(relativeTime)

const MILLISECONDS_IN_SECOND = 1000

const UserStatus = () => {
  const { userStatus } = useContext(UserContext)

  let statusBoxContent: string
  let descriptionBoxContent: string

  if (userStatus.online) {
    statusBoxContent = 'Online'
    descriptionBoxContent = 'TODO: Implement ingame actions'
  } else {
    let status = userStatus as UserStatusOffline

    const lastSeenDate = new Date(status.last_seen * MILLISECONDS_IN_SECOND)
    const lastSeen = dayjs(lastSeenDate).fromNow()

    statusBoxContent = 'Offline'
    descriptionBoxContent = `Last seen: ${lastSeen} (${lastSeenDate}) - move to tooltip`
  }

  return (
    <div className="absolute left-0 top-0 m-4 flex flex-col gap-2">
      <span className="w-fit rounded-lg bg-hsl-35-15 bg-opacity-80 p-3">
        {statusBoxContent}
      </span>
      <span className="rounded-lg bg-hsl-35-15 bg-opacity-80 p-3">
        {descriptionBoxContent}
      </span>
    </div>
  )
}

export default UserStatus

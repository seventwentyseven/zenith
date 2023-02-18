import TimeAgo from 'timeago-react'
import { recentUser } from '../../constants/recent-user'

const NewUser: React.FC = () => {
  return (
    <div className="flex flex-col justify-center mt-2">
      <span className="mb-2 ml-2">Recent User</span>
      <div className="flex flex-col w-full bg-base-300 shadow rounded-lg p-4 border-white/10 border-px">
        <span>{recentUser[0].name}</span>
        <span className="text-sm">
          Joined <TimeAgo datetime={recentUser[0].joinDate} />
        </span>
      </div>
    </div>
  )
}

export default NewUser

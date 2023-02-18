import TimeAgo from 'timeago-react'
import { recentRanked } from '../../constants/recent-ranked'

const RecentRanked: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <span className="mb-2 ml-2 text-white">Recent Ranked Maps</span>
      <div className="flex flex-col w-full bg-base-300 shadow rounded-lg p-4 border-white/10 border-px">
        <span>
          {recentRanked[0].bmapArtist} - {recentRanked[0].bmapTitle}
        </span>
        <span className="text-sm">
          {recentRanked[0].bmapRankedStatus} by {recentRanked[0].nominatorName}{' '}
          <TimeAgo datetime={recentRanked[0].nominationDate} />
        </span>
      </div>
    </div>
  )
}

export default RecentRanked

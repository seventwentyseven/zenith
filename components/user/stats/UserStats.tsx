import { IPlayerStatsModeData } from '../../../types/UserData'

const UserStats = ({ data }: { data: IPlayerStatsModeData }) => {
  return (
    <div className="w-4/12 grid grid-cols-2 gap-y-3px gap-x-4 h-min">
      <span className="col-span-1 font-bold">Accuracy</span>
      <span className="col-span-1">{data.acc.toFixed(2)}%</span>
      <span className="col-span-1 font-bold">Ranked Score</span>
      <span className="col-span-1">{data.rscore.toLocaleString('en-US')}</span>
      <span className="col-span-1 font-bold">Total Score</span>
      <span className="col-span-1">{data.tscore.toLocaleString('en-US')}</span>
      <span className="col-span-1 font-bold">Playcount</span>
      <span className="col-span-1">{data.plays.toLocaleString('en-US')}</span>
      <span className="col-span-1 font-bold">Total Hits</span>
      <span className="col-span-1">
        {data.total_hits.toLocaleString('en-US')}
      </span>
      <span className="col-span-1 font-bold">Max Combo</span>
      <span className="col-span-1">
        {data.max_combo.toLocaleString('en-US')}
      </span>
      <span className="col-span-1 font-bold">Replays Views</span>
      <span className="col-span-1">
        {data.replay_views.toLocaleString('en-US')}
      </span>
    </div>
  )
}

export default UserStats

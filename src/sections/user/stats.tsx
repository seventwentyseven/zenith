import UserGrades from '~/components/user/user-grades'
import UserLevel from '~/components/user/user-level'
import UserPlaytime from '~/components/user/user-playtime'
import UserPP from '~/components/user/user-pp'
import UserPPGraph from '~/components/user/user-pp-graph'
import UserRanks from '~/components/user/user-ranks'
import UserStats from '~/components/user/user-stats'

const Stats = () => {
  return (
    <div className="flex w-full flex-col justify-center rounded-b-3xl bg-hsl-35-10 bg-opacity-80 p-4">
      <div className="ml-64 flex justify-between pl-4">
        <div className="flex gap-4">
          <UserLevel />
          <UserPP />
          <UserPlaytime />
        </div>
        <UserRanks />
      </div>
      <div className="ml-64 flex justify-between pl-4">
        <UserPPGraph />
        <UserStats />
      </div>
      <UserGrades />
    </div>
  )
}

export default Stats

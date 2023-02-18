import Stat from './stat'

const Stats = () => {
  return (
    <div className="stats rounded-lg stats-vertical min-[850px]:stats-horizontal shadow bg-base-200 w-[calc(100vw-2rem)] xl:w-[calc(70%+2rem)] mx-4 xl:ml-4 h-auto select-none transition duration-200 -z-50 border-white/20 border-px">
      <Stat
        title="Total users"
        figure={<i className="fas fa-users fa-xl"></i>}
        value={2137}
        description="delta this month"
      />

      <Stat
        title="Online users"
        figure={<i className="fas fa-user fa-xl"></i>}
        value={123123}
        description="this month's record"
      />

      <Stat
        title="Submitted scores"
        figure={<i className="fas fa-users fa-xl"></i>}
        value={123231}
        description="delta this month"
      />

      <Stat
        title="Beatmaps"
        figure={<i className="fas fa-users fa-xl"></i>}
        value={5}
        description="delta this month"
      />
    </div>
  )
}

export default Stats

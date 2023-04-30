import BestScores from '../../components/user/scores/BestScores'
import FirstPlaceScores from '../../components/user/scores/FirstPlaceScores'
import RecentScores from '../../components/user/scores/RecentScores'

const ScoresSection = ({
  gamemode,
  userid
}: {
  gamemode: number
  userid: number
}) => {
  return (
    <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
      <div className="text-xl font-bold border-b-2 border-hsl-50 w-[calc(100%-1rem)] flex flex-row items-center whitespace-nowrap mx-2">
        Scores
        <div className="-mb-1 ml-5">
          <ul
            className="flex flex-row text-sm font-medium text-center"
            id="tabs-scores-switcher"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            <li role="presentation">
              <button
                className="inline-block px-5 py-3 border-b-4 border-transparent text-white hover:text-hsl-80 hover:border-hsl-60 aria-selected:border-hsl-50 aria-selected:text-hsl-90 tansition-all duration-200"
                id="best-scores-tab"
                data-tabs-target="#best-scores"
                type="button"
                role="tab"
                aria-controls="best-scores"
                aria-selected="false"
              >
                <span className="-mb-[5px]">Best</span>
              </button>
            </li>
            <li role="presentation">
              <button
                className="inline-block px-5 py-3 border-b-4 border-transparent text-white hover:text-hsl-80 hover:border-hsl-60 aria-selected:border-hsl-50 aria-selected:text-hsl-90 tansition-all duration-200"
                id="recent-scores-tab"
                data-tabs-target="#recent-scores"
                type="button"
                role="tab"
                aria-controls="recent-scores"
                aria-selected="false"
              >
                <span className="-mb-[5px]">Recent</span>
              </button>
            </li>
            <li role="presentation">
              <button
                className="inline-block px-5 py-3 border-b-4 border-transparent text-white hover:text-hsl-80 hover:border-hsl-60 aria-selected:border-hsl-50 aria-selected:text-hsl-90 transition-all duration-200"
                id="first-places-tab"
                data-tabs-target="#first-places"
                type="button"
                role="tab"
                aria-controls="first-places"
                aria-selected="false"
              >
                <div className="-mb-[5px]">
                  <span>First</span>
                  <span className="-mb-1 ml-2 h-min px-2.5 py-1 text-xs text-slate-300 leading-3 font-bold bg-hsl-5 bg-opacity-50 rounded-full shadow">
                    100
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div id="myTabContent">
        <div
          className="hidden py-4 px-2 rounded-lg aria-selected:flex flex-col"
          id="best-scores"
          role="tabpanel"
          aria-labelledby="best-scores-tab"
        >
          <BestScores userid={userid} gamemode={gamemode} />
        </div>
        <div
          className="hidden py-4 px-2 rounded-lg"
          id="recent-scores"
          role="tabpanel"
          aria-labelledby="recent-scores-tab"
        >
          <RecentScores userid={userid} gamemode={gamemode} />
        </div>
        <div
          className="hidden py-4 px-2 rounded-lg"
          id="first-places"
          role="tabpanel"
          aria-labelledby="first-places-tab"
        >
          <FirstPlaceScores userid={userid} gamemode={gamemode} />
        </div>
      </div>
    </section>
  )
}

export default ScoresSection

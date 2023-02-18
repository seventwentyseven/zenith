import ArticleList from '../../components/articles/article-list'
import QuickActions from '../../components/quick-actions'
import MostPlayed from '../../components/sidebar/most-played'
import NewUser from '../../components/sidebar/new-user'
import RecentRanked from '../../components/sidebar/recent-ranked'
// import Stats from '../../components/stats/stats'

const HomeDashboard = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center mt-24 px-72">
      <div className="w-full flex flex-col justify-between lg:flex-row h-auto">
        {/* <Stats /> */}
        <QuickActions />
      </div>
      <div className="w-full flex flex-col xl:flex-row justify-between h-auto">
        <ArticleList />
        <div className="w-[35%] h-fit flex flex-col justify-between rounded-lg p-4 bg-hsl-15 bg-opacity-20 backdrop-blur-xl shadow ml-2 mt-6 select-none border-white/20 border-px">
          <RecentRanked />
          <NewUser />
          <NewUser />
          <MostPlayed />
        </div>
      </div>
    </section>
  )
}

export default HomeDashboard

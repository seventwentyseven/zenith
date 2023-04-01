import ArticleList from '../../components/articles/ArticleList'
import QuickActions from '../../components/QuickActions'
import MostPlayed from '../../components/sidebar/MostPlayed'
import NewUser from '../../components/sidebar/NewUser'
import RecentRanked from '../../components/sidebar/RecentRanked'
// import Stats from '../../components/stats/stats'

const HomeDashboard = () => {
  return (
    <section className="min-h-screen max-w-screen-xl w-full flex flex-col items-center mt-24 mx-auto">
      <div className="w-full flex flex-col justify-between lg:flex-row h-auto">
        {/* <Stats /> */}
        <QuickActions />
      </div>
      <div className="w-full flex flex-col xl:flex-row justify-between h-auto">
        <ArticleList />
        <div className="w-[35%] h-fit flex flex-col justify-between rounded-lg p-4 bg-hsl-15 bg-opacity-20 backdrop-blur-xl shadow ml-2 mt-6 select-none border-white/20 border-px">
          <RecentRanked />
          <NewUser />
          <MostPlayed />
        </div>
      </div>
    </section>
  )
}

export default HomeDashboard

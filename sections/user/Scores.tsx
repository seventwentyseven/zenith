import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../components/ui/Tabs'
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
    <Tabs
      defaultValue="best-scores"
      className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3"
    >
      <div className="text-xl font-bold border-b-2 border-hsl-50 w-[calc(100%-1rem)] flex flex-row items-center whitespace-nowrap mx-2">
        Scores
        <TabsList className="flex flex-row text-sm font-medium text-center bg-transparent ml-5">
          <TabsTrigger
            value="best-scores"
            className="inline-block px-5 py-3 border-b-4 border-transparent text-white hover:text-hsl-80 hover:border-hsl-60 aria-selected:border-hsl-50 aria-selected:text-hsl-90 transition-all duration-200"
          >
            Best
          </TabsTrigger>
          <TabsTrigger
            value="recent-scores"
            className="inline-block px-5 py-3 border-b-4 border-transparent text-white hover:text-hsl-80 hover:border-hsl-60 aria-selected:border-hsl-50 aria-selected:text-hsl-90 transition-all duration-200"
          >
            Recent
          </TabsTrigger>
          <TabsTrigger
            value="first-place-scores"
            className="inline-block px-5 py-3 border-b-4 border-transparent text-white hover:text-hsl-80 hover:border-hsl-60 aria-selected:border-hsl-50 aria-selected:text-hsl-90 transition-all duration-200"
          >
            First
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="best-scores" className="py-4 px-2 rounded-lg">
        <BestScores userid={userid} gamemode={gamemode} />
      </TabsContent>
      <TabsContent value="recent-scores" className="py-4 px-2 rounded-lg">
        <RecentScores userid={userid} gamemode={gamemode} />
      </TabsContent>
      <TabsContent value="first-place-scores" className="py-4 px-2 rounded-lg">
        <FirstPlaceScores userid={userid} gamemode={gamemode} />
      </TabsContent>
    </Tabs>
  )
}

export default ScoresSection

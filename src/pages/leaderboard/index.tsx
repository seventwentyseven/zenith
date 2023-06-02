import { createContext, useState } from 'react'
import BackgroundImage from '~/components/background-image'
import Layout from '~/components/layout'
import LeaderboardPlayer from '~/components/leaderboard/leaderboard-entry'
import { Button } from '~/components/ui/button'
import { LeaderboardEntry, useLeaderboard } from '~/hooks/use-leaderboard'

export const LeaderboardEntryContext = createContext<{
  entry: LeaderboardEntry
  index: number
  page: number
}>({
  entry: {} as LeaderboardEntry,
  index: 0,
  page: 0
})

const LeaderboardPage = () => {
  const [page, setPage] = useState<number>(0)
  const [mode, setMode] = useState<number>(0)

  const {
    data: leaderboardEntries,
    isLoading,
    error,
    isFetching
  } = useLeaderboard(mode, page)

  if (isLoading || isFetching)
    return (
      <Layout>
        <BackgroundImage />
        <span className="text-4xl font-bold">Loading...</span>
      </Layout>
    )

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Layout>
      <BackgroundImage blur />
      <table className="mt-24 max-w-screen-xl rounded-lg bg-hsl-35-15 bg-opacity-80">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
            <th scope="col" className="w-full px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Accuracy
            </th>
            <th scope="col" className="px-6 py-3">
              Playcount
            </th>
            <th scope="col" className="whitespace-nowrap px-6 py-4">
              Max Combo
            </th>
            <th scope="col" className="px-6 py-3">
              PP
            </th>
          </tr>
        </thead>
        <tbody className="mt-2">
          {leaderboardEntries.map((entry, index) => {
            return (
              <LeaderboardEntryContext.Provider
                key={`lb-entry-${page * 50 + index}-ctx-provider`}
                value={{ entry, index, page }}
              >
                <LeaderboardPlayer />
              </LeaderboardEntryContext.Provider>
            )
          })}
        </tbody>
      </table>
      <div className="flex">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            if (page > 0) setPage(page - 1)
            else alert('cant previous')
          }}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            if (leaderboardEntries.length === 50) setPage(page + 1)
            else alert('cant next')
          }}
        >
          Next
        </Button>
      </div>
    </Layout>
  )
}

export default LeaderboardPage

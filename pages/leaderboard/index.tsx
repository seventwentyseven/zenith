import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import BackgroundImage from '../../components/background-image'
import Layout from '../../components/layout'

interface IData {
  leaderboards: ILeaderboard
}

interface ILeaderboard {
  status: boolean
  leaderboard: ILeaderboardEntry[]
}

interface ILeaderboardEntry {
  player_id: number
  name: string
  country: string
  tscore: number
  rscore: number
  pp: number
  plays: number
  playtime: number
  acc: number
  max_combo: number
  xh_count: number
  x_count: number
  sh_count: number
  s_count: number
  a_count: number
  clan_id: number
  clan_name: string | null
  clan_tag: string | null
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Getting leaderboards from api
  const leaderboardsRes = await fetch(
    'https://api.seventwentyseven.xyz/v1/get_leaderboard'
  )
  const leaderboards = await leaderboardsRes.json()

  return {
    props: {
      leaderboards
    }
  }
}

const Leaderboard = ({ leaderboards }: IData) => {
  console.log(leaderboards)
  return (
    <Layout>
      <Head>
        <title>727 Leaderboard</title>
      </Head>
      <BackgroundImage blur />
      <div className="top-0 mt-28 w-full px-72 dark">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-white/60">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-hsl-15 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 w-full">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Accuracy
                </th>
                <th scope="col" className="px-6 py-3">
                  Playcount
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Max Combo
                </th>
                <th scope="col" className="px-6 py-3">
                  PP
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboards.leaderboard.map((entry, index) => {
                return (
                  <tr
                    key={`lb-entry-${index + 1}`}
                    className="bg-white border-b dark:bg-hsl-20 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-hsl-25"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #{index + 1}
                    </th>
                    <td className="px-6 py-4">
                      <Link href={`/user/${entry.player_id}`}>
                        {entry.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {entry.acc.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-center">{entry.plays}</td>
                    <td className="px-6 py-4 text-center">{entry.max_combo}</td>
                    <td className="px-6 py-4 text-center">{entry.pp}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Leaderboard

import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BackgroundImage from '../../components/BackgroundImages'
import GamemodeSwitcher from '../../components/GamemodeSwitcher'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import config from '../../config.json'
import { ILeaderboard } from '../../types/Leaderboard'

export const getServerSideProps = async () => {
  // Getting leaderboards from api
  const leaderboardsRes = await fetch(`${config.apiUrl}/v1/get_leaderboard`)
  const leaderboards = await leaderboardsRes.json()

  return {
    props: {
      leaderboards
    }
  }
}

const Leaderboard = ({ leaderboards }: { leaderboards: ILeaderboard }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [leaderboard, setLeaderboard] = useState<ILeaderboard>(leaderboards)
  const [gameMode, setGameMode] = useState<number>(0)
  const [oldGameMode, setOldGameMode] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const leaderboardsReq = await fetch(
        `${config.apiUrl}/v1/get_leaderboard?offset=${offset}&mode=${gameMode}`
      )
      const leaderboardToSet = await leaderboardsReq.json()

      setLeaderboard(leaderboardToSet)
      setLoading(false)
    }
    if (oldGameMode !== gameMode) {
      setOffset(0)
      fetchData()
      setOldGameMode(gameMode)
    } else {
      fetchData()
    }
  }, [offset, gameMode])

  const handleNextPage = () => {
    if (leaderboard.leaderboard.length < 50) {
      console.log('Leaderboard hit the upper ceiling')
      return
    }
    setOffset(offset + 50)
    return 0
  }

  const handlePreviousPage = () => {
    if (offset === 0) {
      console.log('Leaderboard hit the bottom ceiling')
      return
    }
    setOffset(offset - 50)
    return 0
  }

  console.log(leaderboard)

  if (loading)
    return (
      <Layout>
        <Head>
          <title>727 Leaderboard - Loading</title>
        </Head>
        <BackgroundImage blur />
        <div className="top-0 mt-28 w-full min-h-screen dark flex flex-col items-center justify-center">
          Loading
        </div>
      </Layout>
    )

  return (
    <Layout>
      <Head>
        <title>727 Leaderboard</title>
      </Head>
      <BackgroundImage blur />
      <div className="top-0 mt-28 w-full dark mb-6">
        <div className="relative max-w-screen-xl mx-auto overflow-x-auto sm:rounded-lg">
          <div className="flex flex-row items-center justify-between mb-4 px-4">
            <span className="text-xl">Leaderboard</span>
            <GamemodeSwitcher gameMode={gameMode} setGameMode={setGameMode} />
          </div>
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
              {leaderboard.leaderboard.map((entry, index) => {
                return (
                  <tr
                    key={`lb-entry-${index + 1}`}
                    className="bg-white border-b dark:bg-hsl-20 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-hsl-25"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #{index + offset + 1}
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
          <Pagination
            offset={offset}
            length={leaderboard.leaderboard.length}
            previousPageFunction={handlePreviousPage}
            nextPageFunction={handleNextPage}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Leaderboard

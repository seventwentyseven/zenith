import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BackgroundImage from '../../components/BackgroundImage'
import GamemodeSwitcher from '../../components/GamemodeSwitcher'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '../../components/ui/HoverCard'
import config from '../../config.json'
import { RankColor } from '../../constants/Gradients'
import { ILeaderboard } from '../../types/Leaderboard'
import Image from 'next/image'

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
            <GamemodeSwitcher gamemode={gameMode} setGamemode={setGameMode} />
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
                let rankColor = RankColor(index + offset + 1)
                return (
                  <tr
                    key={`lb-entry-${index + 1}`}
                    className="bg-white border-b dark:bg-hsl-20 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-hsl-25"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <span
                        className={`font-extrabold font-nunito text-transparent text-xl bg-clip-text -mt-1.5`}
                        style={{
                          backgroundImage: `linear-gradient(to bottom, ${rankColor[0]}, ${rankColor[1]})`
                        }}
                      >
                        #{index + offset + 1}
                      </span>
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={`https://seventwentyseven.xyz/static/images/flags/${entry.country.toUpperCase()}.png`}
                          alt={`${entry.country} flag`}
                          className="h-5 w-auto"
                        />
                        <HoverCard>
                          <HoverCardTrigger>
                            <Link
                              href={`/user/${entry.player_id}`}
                              className="text-lg mt-[2px]"
                            >
                              {entry.name}
                            </Link>
                          </HoverCardTrigger>
                          <HoverCardContent side="right">
                            <div className="flex flex-row gap-2">
                              <Image
                                src={`https://a.seventwentyseven.xyz/${entry.player_id}`}
                                alt="User image"
                                width={64}
                                height={64}
                                className="rounded-xl"
                              />
                              <div className="flex flex-col justify-between">
                                <span className="text-2xl font-semibold">
                                  {entry.name}
                                </span>
                                <span>Last online {entry.playtime}</span>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
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
            pageLength={50}
            previousPageFunction={handlePreviousPage}
            nextPageFunction={handleNextPage}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Leaderboard

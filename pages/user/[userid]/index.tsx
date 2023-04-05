//? NextJS and React imports
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//? Flowbite imports
import { initTabs } from 'flowbite'

//? Our components
import BackgroundImage from '../../../components/BackgroundImages'
import GamemodeSwitcher from '../../../components/GamemodeSwitcher'
import GradeBlock from '../../../components/GradeBlock'
import Layout from '../../../components/Layout'
import PPChart from '../../../components/PPChart'
import ProfileRank from '../../../components/ProfileRank'
import ProfileStatsRight from '../../../components/ProfileStatsRight'
import UserLevel from '../../../components/UserLevel'
import BadgeList from '../../../components/badges/BadgeList'

//? Functions and types
import { getActionStringFromInt } from '../../../constants/IngameActions'
import {
  getLevelFromScore,
  getLevelScoreRequirement
} from '../../../controllers/UserLevelCalculation'
import { IPlayerData, IPlayerStatus } from '../../../types/UserData'

import { FaBars } from 'react-icons/fa'

interface IData {
  data: {
    playerStatus: IPlayerStatus
    playerData: IPlayerData
  }
}

const convertTimestamp = (timestampInSeconds: number) => {
  const days = Math.floor(timestampInSeconds / 86400)
  const hours = Math.floor((timestampInSeconds % 86400) / 3600)
  const minutes = Math.floor((timestampInSeconds % 3600) / 60)

  let formattedTimestamp = ''

  if (days > 0) {
    formattedTimestamp += `${days}d `
  }

  if (hours > 0 || (days === 0 && hours === 0 && minutes === 0)) {
    formattedTimestamp += `${hours}h `
  }

  if (minutes > 0 || (days === 0 && hours === 0 && minutes === 0)) {
    formattedTimestamp += `${minutes}m`
  }

  return `${formattedTimestamp.trim()}`
}

//! This is for fetching data from api, I'm still a noob at this
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Getting player's status
  const playerStatusRes = await fetch(
    `${process.env.API_URL}/v1/get_player_status?id=${context.query.userid}`
  )
  const playerStatus: IPlayerStatus = await playerStatusRes.json()

  // Getting player's stats
  const playerDataRes = await fetch(
    `${process.env.API_URL}/v1/get_player_info?id=${context.query.userid}&scope=all`
  )
  let playerData: IPlayerData = await playerDataRes.json()

  for (const [, value] of Object.entries(playerData.player.stats)) {
    value.level = getLevelFromScore(value.tscore)
    let scoreForNextLevel = getLevelScoreRequirement(value.level)
    value.level_progress = Math.round((value.tscore * 100) / scoreForNextLevel)
  }

  return {
    props: {
      data: {
        playerStatus,
        playerData
      }
    }
  }
}

const UserPage: NextPage<IData> = ({ data }: IData) => {
  const router = useRouter()
  const { userid } = router.query

  const [gameMode, setGameMode] = useState<number>(
    data.playerData.player.info.preferred_mode
  )

  useEffect(() => initTabs(), [])

  return (
    <Layout>
      <Head>
        <title>{`${data.playerData.player.info.name}'s Profile on 727`}</title>
      </Head>

      <BackgroundImage userid={userid} />
      <div className="w-full max-w-screen-xl mt-32">
        <section className="flex flex-col">
          <div
            className="w-full flex flex-col items-center bg-hsl-15 backdrop-blur-xl pt-44 pb-6 rounded-t-3xl bg-cover bg-center border-b-px border-hsl-70/50"
            style={{
              backgroundImage: `linear-gradient(180deg, hsla(230, 10%, 10%, 0.5), hsla(230, 10%, 10%, 0.5)), url("https://seventwentyseven.xyz/banners/${data.playerData.player.info.id}")`
            }}
          >
            <div className="absolute top-0 left-0 m-4 mt-5 p-2.5 bg-hsl-10 bg-opacity-40 rounded-lg">
              {data.playerStatus.player_status.online ? 'Online' : 'Offline'}
            </div>
            {data.playerStatus.player_status.online && (
              <div className="absolute top-0 left-0 mx-4 p-2.5 mt-[4.5rem] bg-hsl-10 bg-opacity-40 rounded-lg">
                {getActionStringFromInt(
                  data.playerStatus.player_status.status.action,
                  data.playerStatus.player_status.status.info_text
                )}
              </div>
            )}
            <div className="absolute top-0 right-0 m-5 mb-9">
              <GamemodeSwitcher gameMode={gameMode} setGameMode={setGameMode} />
            </div>
            <div className="flex flex-col justify-center self-start items-start pt-2 ml-72">
              <div className="flex flex-row justify-center items-center mb-4">
                <img
                  src={`https://seventwentyseven.xyz/static/images/flags/${data.playerData.player.info.country.toUpperCase()}.png`}
                  alt={`${data.playerData.player.info.country} flag`}
                  className="h-7 w-auto"
                />
                <span className="text-3xl font-bold mx-2">
                  {data.playerData.player.info.name}
                </span>
              </div>

              <BadgeList priv={data.playerData.player.info.priv} />
            </div>
          </div>
        </section>
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl border-base-content px-8 rounded-b-3xl -z-10">
          <div className="flex flex-col absolute left-0 -top-[9.5rem] ">
            <Image
              src={`https://a.seventwentyseven.xyz/${userid}`}
              alt="User avatar"
              width={256}
              height={256}
              className="rounded-xl shadow-xl ml-4 z-50"
            />
            <GradeBlock
              xh_count={data.playerData.player.stats[gameMode].xh_count}
              x_count={data.playerData.player.stats[gameMode].x_count}
              sh_count={data.playerData.player.stats[gameMode].sh_count}
              s_count={data.playerData.player.stats[gameMode].s_count}
              a_count={data.playerData.player.stats[gameMode].a_count}
            />
          </div>
          <div className="flex flex-row ml-[15.75rem] justify-between -mt-1 mb-2">
            <div className="flex flex-row gap-4">
              <UserLevel
                level={data.playerData.player.stats[gameMode].level}
                levelProgress={
                  data.playerData.player.stats[gameMode].level_progress
                }
              />
              <div className="flex flex-col items-start justify-center ml-1">
                <span className="font-bold text-hsl-90 select-none">pp</span>
                <span className="text-xl font-light">
                  {data.playerData.player.stats[gameMode].pp.toLocaleString(
                    'en-US'
                  )}
                </span>
              </div>
              <div className="flex flex-col ml-3 items-start justify-center">
                <span className="font-bold text-hsl-90 select-none">
                  Play Time
                </span>
                <span className="text-xl font-light">
                  {convertTimestamp(
                    data.playerData.player.stats[gameMode].playtime
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-14 mr-8">
              <ProfileRank
                countryRank={
                  data.playerData.player.stats[gameMode].country_rank
                }
                // country={data.playerData.player.info.country}
                globalRank={data.playerData.player.stats[gameMode].rank}
                // peakGlobal={[{ date: new Date(), rank: 2137 }]}
              />
            </div>
          </div>
          <div className="flex flex-row gap-x-3">
            <div className="ml-[16rem] w-8/12 flex flex-col items-center justify-center border-r-px">
              <PPChart
                userid={data.playerData.player.info.id}
                gamemode={gameMode}
              />
            </div>
            <ProfileStatsRight data={data.playerData.player.stats[gameMode]} />
          </div>
        </section>
        {/* 2nd Block (Scores) */}
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
            About Me
          </div>
        </section>
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 w-full flex flex-row items-center whitespace-nowrap ml-2">
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
                    <span className="-mb-[5px]">First</span>
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
              <div className="flex flex-row font-bold mt-1 mb-4 ">
                <div className="h-[0.9em] w-1 my-auto bg-hsl-50 rounded-full"></div>
                <span className="-mb-0.5 ml-1.5">Best Scores</span>
                <span className="-mb-1 ml-2 h-min px-2.5 py-1 text-sm text-slate-300 leading-3 font-bold bg-hsl-5 bg-opacity-50 rounded-full shadow">
                  100
                </span>
              </div>
              {/* Actual scores (1) */}
              <div className="flex flex-col overflow-x-hidden">
                <div className="w-full h-24 rounded-xl flex group">
                  <div
                    className="bg-hsl-10 rounded-xl min-w-full h-full transition duration-300 bg-center bg-cover group-hover:-translate-x-[4%]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, hsla(230, 10%, 10%, 0.5), hsla(230, 10%, 10%, 0.5)), url("https://seventwentyseven.xyz/banners/${data.playerData.player.info.id}")`
                    }}
                  ></div>
                  <div className="w-[4%] h-full hidden group-hover:flex transition duration-300 items-center justify-center">
                    <FaBars />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden py-4 px-2 rounded-lg"
              id="recent-scores"
              role="tabpanel"
              aria-labelledby="recent-scores-tab"
            >
              <div className="flex flex-row font-bold ">
                <div className="h-[0.9em] w-1 my-auto bg-hsl-50 rounded-full"></div>
                <span className="-mb-0.5 ml-1.5">Recent Scores</span>
                <span className="-mb-1 ml-2 h-min px-2.5 py-1 text-sm text-slate-300 leading-3 font-bold bg-hsl-5 bg-opacity-50 rounded-full shadow">
                  100
                </span>
              </div>
            </div>
            <div
              className="hidden py-4 px-2 rounded-lg"
              id="first-places"
              role="tabpanel"
              aria-labelledby="first-places-tab"
            >
              <div className="flex flex-row font-bold ">
                <div className="h-[0.9em] w-1 my-auto bg-hsl-50 rounded-full"></div>
                <span className="-mb-0.5 ml-1.5">First Places</span>
                <span className="-mb-1 ml-2 h-min px-2.5 py-1 text-sm text-slate-300 leading-3 font-bold bg-hsl-5 bg-opacity-50 rounded-full shadow">
                  100
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
            Graphs
          </div>
        </section>
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
            Beatmaps
          </div>
        </section>
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
            Achievements
          </div>
        </section>
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
            Account Standing
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default UserPage

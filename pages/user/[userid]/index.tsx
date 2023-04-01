//? NextJS and React imports
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

//? Our components
import BackgroundImage from '../../../components/BackgroundImages'
import BadgeList from '../../../components/badges/BadgeList'
import GamemodeSwitcher from '../../../components/GamemodeSwitcher'
import Layout from '../../../components/Layout'
import ProfileRank from '../../../components/ProfileRank'

//? Functions and types
import { getActionStringFromInt } from '../../../constants/IngameActions'
import {
  getLevelFromScore,
  getLevelScoreRequirement
} from '../../../controllers/UserLevelCalculation'
import { IPlayerData, IPlayerStatus } from '../../../types/user-data'

import GradeBlock from '../../../components/GradeBlock'
import UserLevel from '../../../components/UserLevel'
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
export const getServerSideProps = async (
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
            <div className="flex flex-row gap-4">
              <ProfileRank
                countryRank={
                  data.playerData.player.stats[gameMode].country_rank
                }
                country={data.playerData.player.info.country}
                globalRank={data.playerData.player.stats[gameMode].rank}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-24 w-9/12 flex flex-col items-center justify-center border-r-px"></div>
            <div className="pl-4">Some stats</div>
          </div>
        </section>
        {/* 2nd Block (Scores) */}
        <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 mt-6 mb-3">
          <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap">
            Scores
          </div>
          {/* Best Scores */}
          <div className="flex flex-col mt-4">
            <div className="flex flex-row">
              <div className="h-full"></div>
              <span>Best Scores</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default UserPage

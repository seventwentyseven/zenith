//? NextJS and React imports
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//? Flowbite imports
import { initTabs } from 'flowbite'

//? Our components
import BackgroundImage from '../../../components/BackgroundImage'
import GamemodeSwitcher from '../../../components/GamemodeSwitcher'
import GradeBlock from '../../../components/user/stats/GradeBlock'
import Layout from '../../../components/Layout'
import PPChart from '../../../components/user/charts/PPChart'
import UserRank from '../../../components/user/stats/UserRank'
import UserStats from '../../../components/user/stats/UserStats'
import UserLevel from '../../../components/user/stats/UserLevel'
import BadgeList from '../../../components/badges/BadgeList'

//? Functions and types
import { getActionStringFromInt } from '../../../constants/IngameActions'
import {
  getLevelFromScore,
  getLevelScoreRequirement
} from '../../../controllers/UserLevelCalculation'
import { IPlayerData, IPlayerStatus } from '../../../types/UserData'

//? Server configuration
import config from '../../../config.json'
import ScoresSection from '../../../sections/user/Scores'
import AboutMeSection from '../../../sections/user/AboutMe'
import GraphsSection from '../../../sections/user/Graphs'
import BeatmapsSection from '../../../sections/user/Beatmaps'
import AchievementsSection from '../../../sections/user/Achievements'
import AccountStandingSection from '../../../sections/user/AccountStanding'

interface IData {
  data: {
    playerStatus: IPlayerStatus
    playerData: IPlayerData
  }
}

const convertTimestamp = (timestampInSeconds: number) => {
  const days = Math.round(timestampInSeconds / 86400)
  const hours = Math.round((timestampInSeconds % 86400) / 3600)
  const minutes = Math.round((timestampInSeconds % 3600) / 60)

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
    `${config.apiUrl}/v1/get_player_status?id=${context.query.userid}`
  )
  const playerStatus: IPlayerStatus = await playerStatusRes.json()

  // Getting player's stats
  const playerDataRes = await fetch(
    `${config.apiUrl}/v1/get_player_info?id=${context.query.userid}&scope=all`
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

  useEffect(
    () => setGameMode(data.playerData.player.info.preferred_mode),
    [data]
  )

  let playerStatistics = data.playerData.player.stats[gameMode]

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
              <GamemodeSwitcher gamemode={gameMode} setGamemode={setGameMode} />
            </div>
            <div className="flex flex-col justify-center self-start items-start pt-2 ml-72">
              <div className="flex flex-row justify-center items-center mb-4">
                <Image
                  src={`https://seventwentyseven.xyz/static/images/flags/${data.playerData.player.info.country.toUpperCase()}.png`}
                  alt={`${data.playerData.player.info.country} flag`}
                  width={70}
                  height={47}
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
              className="rounded-xl shadow-xl ml-4 z-50 pointer-events-none"
            />
            <GradeBlock
              xh_count={playerStatistics.xh_count}
              x_count={playerStatistics.x_count}
              sh_count={playerStatistics.sh_count}
              s_count={playerStatistics.s_count}
              a_count={playerStatistics.a_count}
            />
          </div>
          <div className="flex flex-row ml-[15.75rem] justify-between -mt-1 mb-2">
            <div className="flex flex-row gap-4">
              <UserLevel
                level={playerStatistics.level}
                levelProgress={playerStatistics.level_progress}
              />
              <div className="flex flex-col items-start justify-center ml-1">
                <span className="font-bold text-hsl-90 select-none">pp</span>
                <span className="text-xl font-light">
                  {playerStatistics.pp.toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex flex-col ml-3 items-start justify-center">
                <span className="font-bold text-hsl-90 select-none">
                  Play Time
                </span>
                <span className="text-xl font-light">
                  {convertTimestamp(playerStatistics.playtime)}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-14 mr-8">
              <UserRank
                countryRank={playerStatistics.country_rank}
                // country={data.playerData.player.info.country}
                globalRank={playerStatistics.rank}
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
            <UserStats data={playerStatistics} />
          </div>
        </section>

        <AboutMeSection
          aboutMe={data.playerData.player.info.userpage_content}
        />

        <ScoresSection
          gamemode={gameMode}
          userid={data.playerData.player.info.id}
        />

        <AchievementsSection />

        <BeatmapsSection />

        <GraphsSection />

        <AccountStandingSection />
      </div>
    </Layout>
  )
}

export default UserPage

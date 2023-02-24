//? NextJS and React imports
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//? Our components
import BackgroundImage from '../../components/background-image'
import BadgeList from '../../components/badges/badge-list'
import CircularProgress from '../../components/circular-progress'
import Layout from '../../components/layout'

//? Functions and types
import { getActionStringFromInt } from '../../constants/ingame-actions'
import {
  getLevelFromScore,
  getLevelScoreRequirement
} from '../../controllers/user-level-calculation'
import {
  IPlayerInfo,
  IPlayerStatistics,
  IPlayerStatus
} from '../../types/user-data'

interface IData {
  data: {
    playerInfo: IPlayerInfo
    playerStatus: IPlayerStatus
    playerStats: IPlayerStatistics
  }
}

// This is for fetching data from api, I'm still a noob at this
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Getting player's info
  const playerInfoRes = await fetch(
    `https://api.seventwentyseven.xyz/v2/players/${context.query.userid}/`
  )
  const playerInfo = await playerInfoRes.json()

  // Getting player's status
  const playerStatusRes = await fetch(
    `https://api.seventwentyseven.xyz/v1/get_player_status?id=${context.query.userid}`
  )
  const playerStatus = await playerStatusRes.json()

  // Getting player's stats
  const playerStatsRes = await fetch(
    `https://api.seventwentyseven.xyz/v2/players/${context.query.userid}/stats/0`
  )
  let playerStats = await playerStatsRes.json()

  playerStats.data.level = getLevelFromScore(playerStats.data.tscore)
  playerStats.data.scoreForNextLevel = getLevelScoreRequirement(
    playerStats.data.level
  )
  playerStats.data.levelProgress = Math.round(
    (playerStats.data.tscore * 100) / playerStats.data.scoreForNextLevel
  )

  return {
    props: {
      data: {
        playerInfo,
        playerStatus,
        playerStats
      }
    }
  }
}

const UserPage = ({ data }: IData) => {
  const router = useRouter()
  const { userid } = router.query

  const [bannerLink, setBannerLink] = useState<string>(
    'https://seventwentyseven.xyz/banners/4'
  )

  useEffect(() => {
    if (!data) return setBannerLink('https://seventwentyseven.xyz/banners/4')

    return () => {
      setBannerLink(
        `https://seventwentyseven.xyz/banners/${data.playerInfo.data.id}`
      )
    }
  }, [data])

  return (
    <Layout>
      <Head>
        <title>{`${data.playerInfo.data.name}'s Profile on 727`}</title>
      </Head>

      <BackgroundImage userid={userid} />

      <section className="min-h-screen w-full flex flex-col mt-32 px-72">
        <div className="w-full flex flex-col items-center bg-hsl-15 backdrop-blur-xl pt-44 pb-6 rounded-t-3xl bg-cover bg-center">
          <Image
            src={`https://a.seventwentyseven.xyz/${userid}`}
            alt="User avatar"
            width={256}
            height={256}
            className="absolute left-0 top-[8.25rem] rounded-xl shadow-xl z-10 ml-4"
          />
          <Image
            src={bannerLink}
            fill
            placeholder="blur"
            blurDataURL={bannerLink}
            alt="User banner"
            className="w-full h-full rounded-t-3xl opacity-40 bg-center bg-cover bg-no-repeat -z-10"
            onError={() =>
              setBannerLink('https://seventwentyseven.xyz/banners/4')
            }
          />
          <div className="absolute top-0 left-0 m-4 mt-5 p-2.5 bg-hsl-10 bg-opacity-40 rounded-lg text-white">
            {data.playerStatus.player_status.online ? 'Online' : 'Offline'}
          </div>
          {data.playerStatus.player_status.online && (
            <div className="absolute top-0 left-0 mx-4 p-2.5 mt-[4.5rem] bg-hsl-10 bg-opacity-40 rounded-lg text-white">
              {getActionStringFromInt(
                data.playerStatus.player_status.status.action,
                data.playerStatus.player_status.status.info_text
              )}
            </div>
          )}
          <div className="absolute bottom-0 right-0 m-5 mb-9">
            <CircularProgress
              percent={data.playerStats.data.levelProgress}
              statDescription={`Level ${data.playerStats.data.level}`}
            />
          </div>
          <div className="flex flex-col justify-center self-start items-start pt-2 ml-72">
            <div className="flex flex-row justify-center items-center mb-4">
              <img
                src={`https://seventwentyseven.xyz/static/images/flags/${data.playerInfo.data.country.toUpperCase()}.png`}
                alt={`${data.playerInfo.data.country} flag`}
                className="h-7 w-auto"
              />
              <span className="text-3xl font-bold mx-2 text-white">
                {data.playerInfo.data.name}
              </span>
            </div>

            <BadgeList priv={data.playerInfo.data.priv} />
          </div>
        </div>
        <div className="flex flex-col w-full py-4 bg-hsl-15 bg-opacity-50 backdrop-blur-xl border-base-content border-t-px px-8 rounded-b-3xl -z-10">
          <div className="flex flex-row ml-64 text-white">
            <div className="flex flex-col items-center justify-center mr-4">
              <span>Global rank</span>
              <span className="text-3xl font-bold">#1</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span>Country rank</span>
              <span className="text-3xl font-bold">#1</span>
            </div>
          </div>
          <div className="flex flex-row text-white">
            <div className="p-24 w-8/12 flex flex-col items-center justify-center border-r-px border-base-content">
              Imagine that the graph is there for a moment
            </div>
            <div className="pl-4">Some statistics</div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default UserPage

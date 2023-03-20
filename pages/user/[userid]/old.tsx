//? NextJS and React imports
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//? Our components
import BackgroundImage from '../../../components/background-image'
import BadgeList from '../../../components/badges/badge-list'
import CircularProgress from '../../../components/circular-progress'
import Layout from '../../../components/layout'
import GamemodeSwitcher from '../../../components/gamemode-switcher'

//? Functions and types
import { getActionStringFromInt } from '../../../constants/ingame-actions'
import {
  getLevelFromScore,
  getLevelScoreRequirement
} from '../../../controllers/user-level-calculation'
import { IPlayerData, IPlayerStatus } from '../../../types/user-data'

interface IData {
  data: {
    playerStatus: IPlayerStatus
    playerData: IPlayerData
  }
}

//! This is for fetching data from api, I'm still a noob at this
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Getting player's status
  const playerStatusRes = await fetch(
    `https://api.seventwentyseven.xyz/v1/get_player_status?id=${context.query.userid}`
  )
  const playerStatus: IPlayerStatus = await playerStatusRes.json()

  // Getting player's stats
  const playerDataRes = await fetch(
    `https://api.seventwentyseven.xyz/v1/get_player_info?id=${context.query.userid}&scope=all`
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

  const [bannerLink, setBannerLink] = useState<string>(
    'https://seventwentyseven.xyz/banners/4'
  )
  const [gameMode, setGameMode] = useState<number>(
    data.playerData.player.info.preferred_mode
  )

  // Kind of cursed way to manage the user's banner in case the user doesnt have one
  useEffect(() => {
    if (!data) return setBannerLink('https://seventwentyseven.xyz/banners/4')

    return () => {
      console.log(data.playerData.player.stats[gameMode].level_progress)
      setBannerLink(
        `https://seventwentyseven.xyz/banners/${data.playerData.player.info.id}`
      )
    }
  }, [data])

  return (
    <Layout>
      <Head>
        <title>{`${data.playerData.player.info.name}'s Profile on 727`}</title>
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
              percent={data.playerData.player.stats[gameMode].level_progress}
              statDescription={`Level ${data.playerData.player.stats[gameMode].level}`}
            />
          </div>
          <div className="absolute top-0 right-0 m-5 mb-9">
            <GamemodeSwitcher setGameMode={setGameMode} />
          </div>
          <div className="flex flex-col justify-center self-start items-start pt-2 ml-72">
            <div className="flex flex-row justify-center items-center mb-4">
              <img
                src={`https://seventwentyseven.xyz/static/images/flags/${data.playerData.player.info.country.toUpperCase()}.png`}
                alt={`${data.playerData.player.info.country} flag`}
                className="h-7 w-auto"
              />
              <span className="text-3xl font-bold mx-2 text-white">
                {data.playerData.player.info.name}
              </span>
            </div>

            <BadgeList priv={data.playerData.player.info.priv} />
          </div>
        </div>
        <div className="flex flex-col w-full py-4 bg-hsl-15 bg-opacity-50 backdrop-blur-xl border-base-content border-t-px px-8 rounded-b-3xl -z-10">
          <div className="flex flex-row ml-[16.75rem] text-white">
            <div className="flex flex-col items-center justify-center mr-4">
              <span>Global rank</span>
              <span className="text-3xl font-bold">
                <span>#{data.playerData.player.stats[gameMode].rank}</span>
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span>Country rank</span>
              <span className="text-3xl font-bold">
                <span>
                  #{data.playerData.player.stats[gameMode].country_rank}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-row text-white">
            <div className="p-24 w-8/12 flex flex-col items-center justify-center border-r-px border-base-content">
              The graph will be here any minute now...
            </div>
            <div className="pl-4">Some stats</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full py-4 bg-hsl-10 bg-opacity-30 backdrop-blur-xl px-8 rounded-3xl mt-4"></div>
      </section>
    </Layout>
  )
}

export default UserPage

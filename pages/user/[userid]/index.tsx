//? NextJS and React imports
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaAddressCard, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

//? Our components
import BackgroundImage from '../../../components/background-image'
import BadgeList from '../../../components/badges/badge-list'
import CircularProgress from '../../../components/circular-progress'
import Layout from '../../../components/layout'

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

// This is for fetching data from api, I'm still a noob at this
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Getting player's status
  const playerStatusRes = await fetch(
    `https://api.seventwentyseven.xyz/v1/get_player_status?id=${context.query.userid}`
  )
  const playerStatus = await playerStatusRes.json()

  // Getting player's stats
  const playerDataRes = await fetch(
    `https://api.seventwentyseven.xyz/v1/get_player_info?id=${context.query.userid}&scope=all`
  )
  let playerData = await playerDataRes.json()

  playerData.player.stats[0].level = getLevelFromScore(
    playerData.player.stats[0].tscore
  )
  playerData.player.stats[0].scoreForNextLevel = getLevelScoreRequirement(
    playerData.player.stats[0].level
  )
  playerData.player.stats[0].levelProgress = Math.round(
    (playerData.player.stats[0].tscore * 100) /
      playerData.player.stats[0].scoreForNextLevel
  )

  return {
    props: {
      data: {
        playerStatus,
        playerData
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

      <section className="flex items-center w-full flex-col mt-32 max-w-screen-xl px-2">
        <div className="w-[97%] h-72 flex flex-col items-center bg-hsl-15 backdrop-blur-xl pt-44 pb-6 rounded-t-[2rem] rounded-b-xl bg-cover bg-center">
          <Image
            src={bannerLink}
            fill
            placeholder="blur"
            blurDataURL={bannerLink}
            alt="User banner"
            className="w-full h-full rounded-t-[2rem] rounded-b-xl opacity-40 bg-center bg-cover bg-no-repeat -z-10"
            onError={() =>
              setBannerLink('https://seventwentyseven.xyz/banners/4')
            }
          />
          <div className="absolute top-0 left-0 m-4 mt-5 p-2.5 bg-hsl-10 bg-opacity-40 rounded-lg text-white">
            {data.playerStatus.player_status.online ? 'Online' : 'Offline'}
          </div>
          {data.playerStatus.player_status.online && (
            <div className="absolute top-0 left-0 mx-4 p-2.5 mt-[4.5rem] bg-hsl-15 bg-opacity-40 rounded-lg text-white">
              {getActionStringFromInt(
                data.playerStatus.player_status.status.action,
                data.playerStatus.player_status.status.info_text
              )}
            </div>
          )}
        </div>
        <figure className="grid grid-cols-6 xl:grid-cols-7 grid-rows-1 -mt-14 h-28 w-full bg-hsl-20 bg-opacity-70 backdrop-blur rounded-[2.25rem] border-t-[6px] border-hsl-25">
          <div className="flex flex-col items-center justify-center col-span-1 row-span-1">
            <span className="text-sm uppercase font-medium text-hsl-80">
              joined
            </span>
            <span className="text-xl text-gray-100">3 Years Ago</span>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 row-span-1">
            <span className="text-sm uppercase font-medium text-hsl-80">
              last seen
            </span>
            <span className="text-center text-xl text-gray-100">
              3 Minutes Ago
            </span>
          </div>
          {/* Avatar + Username etc. */}
          <div className="flex flex-col items-center justify-center col-span-2 xl:col-span-3 row-span-1">
            <div
              className="absolute h-[170px] w-[170px] -top-[135%] rounded-3xl shadow-lg shadow-hsl-5"
              style={{
                backgroundImage: `url(https://a.seventwentyseven.xyz/${userid})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="w-full h-full backdrop-blur-xl rounded-3xl flex items-center justify-center bg-hsl-10 bg-opacity-40">
                <Image
                  src={`https://a.seventwentyseven.xyz/${userid}`}
                  alt="User avatar"
                  width={162}
                  height={162}
                  className="rounded-[20px] z-10 backdrop-blur-lg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-row items-center text-hsl-90 mt-6">
                <img
                  src={`https://seventwentyseven.xyz/static/images/flags/${data.playerData.player.info.country.toUpperCase()}.png`}
                  alt={`${data.playerData.player.info.country} flag`}
                  className="h-[26px] w-auto"
                />
                <span className="text-2xl font-semibold mx-2">def750</span>
                <FaAddressCard className="text-lg mb-auto" />
              </div>
              <span className="text-fuchsia-500">Head Developer</span>
            </div>
          </div>
          {/* Other stat */}
          <div className="flex flex-col items-center justify-center col-span-1 row-span-1">
            <span className="text-sm uppercase font-medium text-hsl-80">
              global rank
            </span>
            <span className="text-2xl text-gray-100">#10</span>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 row-span-1">
            <span className="text-sm uppercase font-medium text-hsl-80">
              country rank
            </span>
            <span className="text-2xl text-gray-100">#2</span>
          </div>
        </figure>
      </section>
      {/* Stats and info */}
      <section className="w-full h-screen max-w-screen-xl mt-4 px-2">
        {/* Top 2 cards */}
        <div className="w-full h-96 grid grid-cols-12 grid-rows-1 gap-4">
          <div className="col-span-4 h-full bg-hsl-20 backdrop-blur-lg bg-opacity-50 rounded-2xl flex flex-col">
            <div className="h-12 w-full flex flex-row items-center mt-1">
              <div className="h-3/6 w-1 rounded-full bg-gradient-to-b from-purple-600 to-blue-600 ml-4"></div>
              <span className="text-hsl-90 ml-3 font-bold">User Info</span>
            </div>
          </div>
          <div className="col-span-8 h-full bg-hsl-20 backdrop-blur-lg bg-opacity-50 rounded-2xl flex flex-col">
            <div className="p-3">
              {/* Grades */}
              <div className="flex flex-row bg-hsl-10 backdrop-blur-lg bg-opacity-50">
                <div className="flex flex-col items-center justify-center mr-2.5">
                  <div className="bg-gradient-to-b from-fuchsia-500 to-fuchsia-600 w-14 h-8 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold -mb-3px text-slate-300">
                      SS
                    </span>
                  </div>
                  <span className="text-hsl-90 mt-1">2,137</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-2.5">
                  <div className="bg-gradient-to-b from-fuchsia-500 to-fuchsia-600 w-14 h-8 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold -mb-3px text-yellow-300">
                      SS
                    </span>
                  </div>
                  <span className="text-hsl-90 mt-1">2,137</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-2.5">
                  <div className="bg-gradient-to-b from-teal-400 to-teal-500 w-14 h-8 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold -mb-3px text-slate-300">
                      S
                    </span>
                  </div>
                  <span className="text-hsl-90 mt-1">2,137</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-2.5">
                  <div className="bg-gradient-to-b from-teal-400 to-teal-500 w-14 h-8 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold -mb-3px text-yellow-300">
                      S
                    </span>
                  </div>
                  <span className="text-hsl-90 mt-1">2,137</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-2.5">
                  <div className="bg-gradient-to-b from-emerald-400 to-emerald-500 w-14 h-8 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold -mb-3px text-green-900">
                      A
                    </span>
                  </div>
                  <span className="text-hsl-90 mt-1">2,137</span>
                </div>
              </div>
              <div className="ml-auto"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default UserPage

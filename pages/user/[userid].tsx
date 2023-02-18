import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BackgroundImage from '../../components/background-image'
import BadgeList from '../../components/badges/badge-list'
import CircularProgress from '../../components/circular-progress'
import Layout from '../../components/layout'

interface IBeatmap {
  md5: string
  id: number
  server: string
  set_id: number
  artist: string
  title: string
  version: string
  creator: string
  last_update: string
  total_length: number
  max_combo: number
  status: number
  plays: number
  passes: number
  mode: number
  bpm: number
  cs: number
  od: number
  ar: number
  hp: number
  diff: number
}

interface IPlayerInfo {
  status: boolean
  data: {
    id: number
    name: string
    safe_name: string
    priv: number
    country: string
    silence_end: number
    donor_end: number
    creation_time: number
    latest_activity: number
    clan_id: number
    clan_priv: number
    preferred_mode: number
    play_style: number
    custom_badge_name: string | null
    custom_badge_icon: string | null
    userpage_content: string | null
  }
  meta: {}
}

interface IPlayerStatus {
  success: boolean
  player_status: {
    online: boolean
    login_time: number
    status: {
      action: number
      info_text: string
      mode: number
      mods: number
      beatmap: IBeatmap | null
    }
  }
  meta: {}
}

interface IData {
  data: {
    playerInfo: IPlayerInfo
    playerStatus: IPlayerStatus
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
  const playerStatisticsRes = await fetch(
    `https://api.seventwentyseven.xyz/v2/players/${context.query.userid}/stats`
  )
  const playerStatistics = await playerStatisticsRes.json()

  return {
    props: {
      data: {
        playerInfo,
        playerStatus,
        playerStatistics
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

      <section className="min-h-screen w-full flex flex-col items-center mt-32 px-72">
        <Image
          src={`https://a.seventwentyseven.xyz/${userid}`}
          alt="User avatar"
          width={256}
          height={256}
          className="rounded-3xl shadow-xl shadow-white/20 z-10"
        />
        <div className="w-full flex flex-col items-center bg-hsl-15 backdrop-blur-xl -mt-40 pt-44 pb-6 rounded-t-3xl bg-cover bg-center">
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
          <div className="absolute top-0 left-0 m-5 p-2.5 bg-hsl-10 bg-opacity-40 rounded-lg text-white">
            {data.playerStatus.player_status.online ? 'Online' : 'Offline'}
          </div>
          {data.playerStatus.player_status.online && (
            <div className="absolute top-0 left-0 ml-5 p-2.5 max-w-lg mt-[4.5rem] bg-hsl-10 bg-opacity-40 rounded-lg text-white">
              {data.playerStatus.player_status.status.action}:{' '}
              {data.playerStatus.player_status.status.info_text}
            </div>
          )}
          <div className="absolute top-0 right-0 m-5">
            <CircularProgress percent={2} statDescription="Level 99" />
          </div>
          <div className="flex flex-col justify-center items-center mb-2">
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
        <div className="flex flex-col w-full py-4 bg-base-300 bg-opacity-50 backdrop-blur-xl border-base-content border-t-px px-8 rounded-b-3xl">
          <div className="flex flex-row">
            <div className="flex flex-col items-center justify-center mr-4">
              <span>Global rank</span>
              <span className="text-3xl font-bold">#1</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span>Country rank</span>
              <span className="text-3xl font-bold">#1</span>
            </div>
          </div>
          <div className="flex flex-row">
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

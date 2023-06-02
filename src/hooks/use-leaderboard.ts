import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export type LeaderboardEntry = {
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
  clan_id: number | null
  clan_name: number | null
  clan_tag: number | null
}

const leaderboardQuery = async (mode: number, page: number) => {
  const limit = 50
  const offset = page * limit
  const url = new URL('/v1/get_leaderboard', process.env.NEXT_PUBLIC_API_DOMAIN)
  url.searchParams.append('limit', limit.toString())
  url.searchParams.append('mode', mode.toString())
  url.searchParams.append('offset', offset.toString())
  const { data } = await axios.get(url.toString())
  return data.leaderboard
}

const useLeaderboard = (mode: number, page: number) => {
  const query = useQuery<LeaderboardEntry[], AxiosError>({
    queryKey: ['leaderboard', mode, page],
    queryFn: () => leaderboardQuery(mode, page),
    staleTime: 60 * 60 * 5,
    keepPreviousData: true
  })

  return query
}

export { useLeaderboard }

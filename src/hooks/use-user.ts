import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { UserData, UserStats, UserStatus } from '~/types/user'

type SuccessResponse = {
  userData: UserData
  userStats: UserStats
  userStatus: UserStatus
}

const userQuery = async (userid: number) => {
  //HACK: This is to prevent requesting at api/v2/players/NaN because
  //      useRouter() returns undefined at first render
  if (isNaN(userid)) throw new Error('nan')
  const { data: userDataRes } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/v2/players/${userid}`
  )
  const { data: userStatsRes } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/v2/players/${userid}/stats`
  )
  const { data: userStatusRes } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/v2/players/${userid}/status`
  )

  const userData = userDataRes.data
  const userStats = userStatsRes.data
  const userStatus = userStatusRes.data

  return { userData, userStats, userStatus }
}

const useUser = (userid: number) => {
  return useQuery<SuccessResponse, AxiosError>({
    queryKey: [`user-${userid}`],
    queryFn: () => userQuery(userid),
    staleTime: 60 * 60 * 5
  })
}

export { useUser }

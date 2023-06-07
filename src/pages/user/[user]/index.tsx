import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { createContext } from 'react'
import BackgroundImage from '~/components/background-image'
import Layout from '~/components/layout'
import { useUser } from '~/hooks/use-user'
import AboutMe from '~/sections/user/about-me'
import Banner from '~/sections/user/banner'
import Stats from '~/sections/user/stats'
import Scores from '~/sections/user/scores'
import { UserContextType } from '~/types/user'

export const UserContext = createContext<UserContextType>({} as UserContextType)

const UserPage = () => {
  const router = useRouter()
  const { user } = router.query

  const userid = Number(user)
  console.log('userid:', userid)

  if (user !== undefined && isNaN(userid))
    axios
      .get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/v2/players/${user}/get_id`)
      .then(response => router.push(`/user/${response.data.data.id}`))

  const { data, isLoading, error } = useUser(userid)

  if (isLoading)
    return (
      <Layout>
        <Head>
          <title>727 - Loading</title>
        </Head>
        <BackgroundImage />
        <div>Loading</div>
      </Layout>
    )

  if (error)
    return (
      <Layout>
        <Head>
          <title>727 - Error</title>
        </Head>
        <BackgroundImage />
        <div>There was an error - maybe the profile doesn&apos;t exist</div>
        <div>
          Error code: {error.status} {error.code}
        </div>
      </Layout>
    )

  const { userData } = data

  return (
    <Layout>
      <Head>
        <title>727 - {userData.name}&apos;s profile</title>
      </Head>
      <BackgroundImage userid={userData.id} />
      <UserContext.Provider value={data}>
        <div className="mx-auto mt-32 flex min-h-screen w-full max-w-screen-xl flex-col items-center">
          <Banner />
          <Stats />
          <AboutMe />
          <Scores />
        </div>
      </UserContext.Provider>
    </Layout>
  )
}

export default UserPage

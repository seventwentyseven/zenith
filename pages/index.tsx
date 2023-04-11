import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import BackgroundImage from '../components/BackgroundImage'
import Layout from '../components/Layout'
import QuickActions from '../components/QuickActions'
import ArticleList from '../components/articles/ArticleList'
import MostPlayed from '../components/sidebar/MostPlayed'
import NewUser from '../components/sidebar/NewUser'
import RecentRanked from '../components/sidebar/RecentRanked'
import AboutUs from '../sections/home/AboutUs'
import Hero from '../sections/home/Hero'
import LoadingSection from '../sections/home/Loading'

const Home: NextPage = () => {
  const { status } = useSession()

  if (status === 'authenticated')
    return (
      <Layout>
        <Head>
          <title>727</title>
        </Head>

        <BackgroundImage opacity={0.6} blur />

        <div className="min-h-screen max-w-screen-xl w-full flex flex-col items-center mt-24 mx-auto">
          <div className="w-full flex flex-col justify-between lg:flex-row h-auto">
            {/* <Stats /> */}
            <QuickActions />
          </div>
          <div className="w-full flex flex-col xl:flex-row justify-between h-auto">
            <ArticleList />
            <div className="w-[35%] h-fit flex flex-col justify-between rounded-lg p-4 bg-hsl-15 bg-opacity-20 backdrop-blur-xl shadow ml-2 mt-6 select-none border-white/20 border-px">
              <RecentRanked />
              <NewUser />
              <MostPlayed />
            </div>
          </div>
        </div>
      </Layout>
    )

  if (status === 'unauthenticated')
    return (
      <Layout>
        <Head>
          <title>727</title>
        </Head>

        <BackgroundImage />
        <Hero />
        <AboutUs />
      </Layout>
    )

  return (
    <Layout>
      <Head>
        <title>727</title>
      </Head>

      <LoadingSection />
    </Layout>
  )
}

export default Home

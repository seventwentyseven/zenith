import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import BackgroundImage from '../components/BackgroundImages'
import Layout from '../components/Layout'
import AboutUs from '../sections/home/AboutUs'
import HomeDashboard from '../sections/home/Dashboard'
import Hero from '../sections/home/Hero'

const Home: NextPage = () => {
  const { status } = useSession()

  let pageContent: ReactNode

  pageContent = <div>Loading...</div>

  if (status === 'authenticated')
    pageContent = (
      <>
        <BackgroundImage opacity={0.6} blur />
        <HomeDashboard />
      </>
    )

  if (status === 'unauthenticated')
    pageContent = (
      <>
        <BackgroundImage />
        <Hero />
        <AboutUs />
      </>
    )

  return (
    <Layout>
      <Head>
        <title>727</title>
      </Head>

      {pageContent}
    </Layout>
  )
}

export default Home

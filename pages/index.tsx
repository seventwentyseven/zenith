import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import BackgroundImage from '../components/background-image'
import Layout from '../components/layout'
import AboutUs from '../sections/home/about-us'
import HomeDashboard from '../sections/home/dashboard'
import Hero from '../sections/home/hero'

const Home: NextPage = () => {
  const { status } = useSession()

  let pageContent: ReactNode

  pageContent = <div>Loading...</div>

  if (status === 'authenticated')
    pageContent = (
      <>
        <BackgroundImage opacity={60} blur />
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

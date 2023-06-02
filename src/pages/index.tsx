import { useSession } from 'next-auth/react'
import BackgroundImage from '~/components/background-image'
import Layout from '~/components/layout'
import HeroSection from '~/sections/home/hero'

const Home = () => {
  const { data: session } = useSession()
  if (!session)
    return (
      <Layout>
        <BackgroundImage />
        <HeroSection />
      </Layout>
    )

  return (
    <Layout>
      <BackgroundImage />
      User is logged in
    </Layout>
  )
}

export default Home

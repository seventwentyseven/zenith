import { useSession } from 'next-auth/react'
import Example from '~/components/animated-stagger'
import BackgroundImage from '~/components/background-image'
import Layout from '~/components/layout'

const Home = () => {
  const { data: session } = useSession()
  return (
    <Layout>
      <BackgroundImage opacity={60} userid={'3'} />   
      <Example />
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </Layout>
  )
}

export default Home

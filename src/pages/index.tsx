import { useSession } from 'next-auth/react'
import Layout from '~/components/layout'

const Home = () => {
  const { data: session } = useSession()
  return (
    <Layout>
      <span>Main page</span>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </Layout>
  )
}

export default Home

import { useRouter } from 'next/router'
import BackgroundImage from '../../components/background-image'
import Layout from '../../components/layout'

const AuthError = () => {
  const router = useRouter()
  const error = router.query.error
  return (
    <Layout>
      <BackgroundImage blur />
      <section className="max-w-screen-sm w-full">
        <div className="rounded-lg py-4 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl flex flex-row items-center justify-between mb-8">
          <span className="font-semibold text-3xl text-white">Ye nah mate</span>
        </div>
        <div className="rounded-lg py-6 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white flex flex-col items-center justify-center">
          <span className="mb-7">{error}</span>
          <button
            onClick={() => router.back()}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Fuck go back
          </button>
        </div>
      </section>
    </Layout>
  )
}

export default AuthError

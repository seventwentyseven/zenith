import Link from 'next/link'
import { useRouter } from 'next/router'
import BackgroundImage from '../components/background-image'
import Layout from '../components/layout'

const NotFound = () => {
  const router = useRouter()
  return (
    <Layout>
      <BackgroundImage blur />
      <section className="max-w-screen-sm w-full">
        <div className="rounded-lg py-4 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl flex flex-row items-center justify-between mb-8">
          <span className="w-full text-center font-semibold text-3xl text-white">
            Something went wrong
          </span>
          {/* <Link href="/api/auth/signup" className="text-blue-300">
            Already have an account?
          </Link> */}
        </div>
        <div className="rounded-lg py-6 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white flex flex-col items-center justify-center">
          <span>The page you're looking for could not be found</span>
          <span className="mb-4">This may be because:</span>
          <span className="text-gray-500">- The page does not exist</span>
          <span className="text-gray-500">
            - The page is under construction
          </span>
          <span className="text-gray-500">- The server is dead</span>
          <span className="mt-2">
            If you know the page exists, please contact dzifors
          </span>
          <button
            className="btn btn-primary btn-lg mt-6"
            onClick={() => router.back()}
          >
            Go back
          </button>
        </div>
      </section>
    </Layout>
  )
}

export default NotFound

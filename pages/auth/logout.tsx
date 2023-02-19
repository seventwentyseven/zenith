import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BackgroundImage from '../../components/background-image'
import Layout from '../../components/layout'

const handleSignout = () => {
  signOut({ callbackUrl: '/', redirect: true })
}

const LogoutPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <BackgroundImage blur />
      <section className="max-w-screen-sm w-full">
        <div className="rounded-lg py-4 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl flex flex-row items-center justify-between mb-8">
          <span className="font-semibold text-3xl text-white">Sign out</span>
        </div>
        <div className="rounded-lg py-6 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white flex flex-col items-center justify-center">
          <span className="mb-7">Are you sure you want to sign out?</span>
          <div className="flex flex-row">
            <button
              onClick={handleSignout}
              className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Yeah
            </button>
            <button
              onClick={() => router.back()}
              className="inline-block px-6 py-2.5 bg-transparent text-white font-medium text-xs leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
            >
              Nah
            </button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LogoutPage

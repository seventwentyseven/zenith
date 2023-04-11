import { useRouter } from 'next/router'
import BackgroundImage from '../components/BackgroundImage'
import Layout from '../components/Layout'

const NotFound = () => {
  const router = useRouter()
  return (
    <Layout>
      <BackgroundImage disableGradient opacity={0.65} blur />

      <section className="w-2/5 rounded py-6 px-6 bg-hsl-20 bg-opacity-70 backdrop-blur-lg flex flex-col text-white">
        <div className="flex items-center font-nunito text-transparent font-bold">
          <span className="text-6xl bg-clip-text bg-gradient-to-br from-hsl-50 to-hsl-60">
            404
          </span>
          <span className="text-5xl bg-clip-text bg-gradient-to-br from-hsl-50 to-hsl-60 ml-3">
            (╯°□°)╯︵ ┻━┻
          </span>
        </div>
        <span className="text-xl font-medium mt-3">
          There might be few reasons for this:
        </span>
        <ul className="list-disc ml-10 text-xl font-medium mt-1">
          <li>This page does not exist.</li>
          <li>You don't have access to this page.</li>
          <li>This page is in closed beta.</li>
        </ul>
        <button
          className="btn btn-primary btn-lg mt-6"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </section>
    </Layout>
  )
}

export default NotFound

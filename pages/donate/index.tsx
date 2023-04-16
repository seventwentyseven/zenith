//? NextJS and React imports
import Head from 'next/head'
import Image from 'next/image'

//? Flowbite imports
import Layout from '../../components/Layout'
import BackgroundImage from '../../components/BackgroundImage'

//? Our components

const DonatePage = () => {
  return (
    <Layout>
      <Head>
        <title>{`Support Us!`}</title>
      </Head>
      <div
        className="min-h-screen w-full top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50 fixed"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/3")`,
          backgroundSize: 'cover'
        }}
      ></div>

      <div className="w-full">
        <div className="w-full h-80 bg-hsl-10 rounded-t-xl bg-opacity-30 flex items-center">
          <div className="w-full px-12 flex flex-col mt-16">
            <h1 className="text-4xl font-bold text-white font-nunito">
              Donate and help us grow!
            </h1>
            <span className="text-xl text-white mt-2 font-comfortaa max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa
              cumque et eaque labore
            </span>
            <button className="bg-hsl-50 rounded-full w-min px-12 py-2 whitespace-nowrap mt-8 hover:bg-hsl-60 hover:scale-105 transition duration-200">
              Support Us!
            </button>
          </div>
        </div>
        <div className="w-full h-screen bg-hsl-10 backdrop-blur-xl bg-opacity-60">
          <div className="px-12 flex flex-col justify-center">
            <h2 className="text-3xl mx-auto my-7">What will I get?</h2>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DonatePage

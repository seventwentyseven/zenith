//? NextJS and React imports
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//? Flowbite imports
import { initTabs } from 'flowbite'
import Layout from '../../components/Layout'
import BackgroundImage from '../../components/BackgroundImage'

//? Our components

const DonatePage = () => {
  const router = useRouter()

  useEffect(() => initTabs(), [])

  return (
    <Layout>
      <Head>
        <title>{`Support Us!`}</title>
      </Head>

      <BackgroundImage userid={'3'} />
      <div className="w-full max-w-screen-xl mt-32">
        <div className="w-full min-h-screen bg-hsl-10 rounded-xl backdrop-blur-2xl bg-opacity-50"></div>
      </div>
    </Layout>
  )
}

export default DonatePage

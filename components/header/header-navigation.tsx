import Link from 'next/link'
import React from 'react'

const HeaderNavigation = () => {
  return (
    <nav>
      <Link
        href="/leaderboard"
        className="inline-block px-6 py-4 bg-transparent text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
      >
        Leaderboard
      </Link>
      <Link
        href="/beatmaps"
        className="inline-block px-6 py-4 bg-transparent text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
      >
        Beatmaps
      </Link>
      <Link
        href="/docs"
        className="inline-block px-6 py-4 bg-transparent text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
      >
        Docs
      </Link>
    </nav>
  )
}

export default HeaderNavigation

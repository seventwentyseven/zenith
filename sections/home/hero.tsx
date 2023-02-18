import Link from 'next/link'
import { FaArrowDown } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className="top-0 min-h-screen flex flex-col items-center justify-center text-white select-none">
      <h1 className="font-extrabold text-7xl mb-4 drop-shadow-2xl shadow-black">
        Seven Twenty Seven
      </h1>
      <h2 className="font-bold text-3xl">
        The place where you reach your zenith
      </h2>

      <div className="flex flex-row mt-14">
        <Link
          href="/leaderboard"
          className="inline-block px-6 py-4 mr-2 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
        >
          Leaderboard
        </Link>

        <Link
          href="/auth/login"
          className="inline-block px-6 py-4 bg-transparent text-white font-medium text-sm leading-tight uppercase rounded hover:text-white hover:bg-hsl-15 hover:bg-opacity-40 focus:bg-gray-800 focus:outline-none focus:ring-0 active:bg-opacity-100 transition duration-150 ease-in-out"
        >
          Login
        </Link>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center justify-center animate-bounce select-none">
        <span className="text-lg tracking-wide font-semibold">Learn more</span>
        <FaArrowDown />
      </div>
    </div>
  )
}

export default Hero

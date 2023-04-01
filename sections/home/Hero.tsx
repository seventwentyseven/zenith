import Link from 'next/link'
import { FaArrowDown } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className="top-0 min-h-screen flex flex-col items-center justify-center select-none">
      <h1 className="font-extrabold text-7xl mb-4 drop-shadow-2xl shadow-black">
        Seven Twenty Seven
      </h1>
      <h2 className="font-bold text-3xl">
        The place where you reach your zenith
      </h2>

      <div className="flex flex-row mt-14 gap-2">
        <Link href="/leaderboard" className="btn btn-lg btn-primary">
          Leaderboard
        </Link>

        <Link href="/auth/signin" className="btn btn-lg btn-ghost">
          Sign in
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

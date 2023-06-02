import Link from 'next/link'
import { FaArrowDown } from 'react-icons/fa'
import { Button } from '~/components/ui/button'

const HeroSection = () => {
  return (
    <>
      <span className="mb-4 text-7xl font-extrabold shadow-black drop-shadow-2xl">
        Seven Twenty Seven
      </span>
      <span className="text-3xl font-bold">
        The place where you reach your zenith
      </span>

      <div className="mt-14 flex gap-2">
        <Link href="/leaderboard">
          <Button size="lg">Leaderboard</Button>
        </Link>
        <Link href="/auth/signin">
          <Button size="lg" variant="ghost">
            Sign in
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-12 flex animate-bounce select-none flex-col items-center justify-center gap-2">
        <span className="text-lg font-semibold tracking-wide">Learn more</span>
        <FaArrowDown />
      </div>
    </>
  )
}

export default HeroSection

import { Nunito } from 'next/font/google'
import { cn } from '~/lib/utils'
const nunito = Nunito({ subsets: ['latin'] })

const UserGlobalRank = () => {
  return (
    <div className="ml-1 flex flex-col items-start justify-center">
      <span className="select-none font-bold text-hsl-90">Global rank</span>
      <span
        className={cn(
          nunito.className,
          '-mt-1.5 bg-clip-text text-3xl font-extrabold'
          // TODO: Add text-transparent and text gradients when we add text gradients
        )}
      >
        TODO
      </span>
    </div>
  )
}

export default UserGlobalRank

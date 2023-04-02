import { RankColor } from '../constants/Gradients'
import { initPopovers } from 'flowbite'
import { useEffect } from 'react'
interface IProps {
  countryRank: number
  globalRank: number
  // peakGlobalRank: Record<Date, number>[]
}
// TODO: Add country name tooltip on country rank
const ProfileRank = ({ countryRank, globalRank }: IProps) => {
  const rankColor = RankColor(globalRank)
  console.log(globalRank)
  useEffect(() => initPopovers(), [])
  return (
    <>
      <div
        className="flex flex-col items-start justify-center ml-1"
        data-popover-target="popover-peak-rank"
        data-popover-placement="top"
      >
        <span className="font-bold text-hsl-90 select-none">Global Rank</span>
        <span
          className={`font-extrabold font-nunito text-transparent text-3xl bg-clip-text -mt-1.5`}
          style={{
            backgroundImage: `linear-gradient(to bottom, ${rankColor[0]}, ${rankColor[1]})`
          }}
        >
          #{globalRank.toLocaleString('en-US')}
        </span>
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="font-bold text-hsl-90 select-none">Country Rank</span>
        <span className="text-3xl font-extrabold text-hsl-90 font-nunito -mt-1.5">
          #{countryRank.toLocaleString('en-US')}
        </span>
      </div>

      <div
        data-popover
        id="popover-peak-rank"
        role="tooltip"
        className="absolute z-10 invisible inline-block w-auto text-sm font-light transition-opacity duration-300 rounded-lg shadow-sm shadow-hsl-5 bg-hsl-15 bg-opacity-75 opacity-0"
      >
        <div className="flex flex-col px-3 py-2 font-semibold text-gray-200 text-xs text-center">
          <span>Peak Rank: #2137</span>
          <span>Achieved On: 24.05.2021</span>
        </div>
        {/* <div data-popper-arrow></div> */}
      </div>
    </>
  )
}

export default ProfileRank

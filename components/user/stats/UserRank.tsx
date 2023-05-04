import { RankColor } from '../../../constants/Gradients'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from '../../ui/Tooltip'
interface IProps {
  countryRank: number
  globalRank: number
  // peakGlobalRank: Record<Date, number>[]
}
// TODO: Add country name tooltip on country rank
const UserRank = ({ countryRank, globalRank }: IProps) => {
  const rankColor = RankColor(globalRank)
  console.log(
    `[components/user/stats/UserRank.tsx]: globalRank = ${globalRank}`
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex flex-col items-start justify-center ml-1">
          <span className="font-bold text-hsl-90 select-none">Global Rank</span>
          <span
            className={`font-extrabold font-nunito text-transparent text-3xl bg-clip-text -mt-1.5`}
            style={{
              backgroundImage: `linear-gradient(to bottom, ${rankColor[0]}, ${rankColor[1]})`
            }}
          >
            #{globalRank.toLocaleString('en-US')}
          </span>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            sideOffset={2}
            className="flex flex-col px-3 py-2 font-semibold bg-hsl-15 bg-opacity-80 rounded-lg text-gray-200 text-xs text-center"
          >
            <span>Peak Rank: #2137</span>
            <span>Achieved On: 24.05.2021</span>
            <TooltipArrow className="fill-hsl-15 opacity-80" />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
      <div className="flex flex-col items-start justify-center">
        <span className="font-bold text-hsl-90 select-none">Country Rank</span>
        <span className="text-3xl font-extrabold text-hsl-90 font-nunito -mt-1.5">
          #{countryRank.toLocaleString('en-US')}
        </span>
      </div>
    </TooltipProvider>
  )
}

export default UserRank

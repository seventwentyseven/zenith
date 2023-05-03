import Image from 'next/image'
import { ModImages, Mods } from '../constants/Mods'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from './ui/Tooltip'

interface IProps {
  mods: number
}

const ModsImageList = ({ mods }: IProps) => {
  let modBadges = ModImages.filter(({ mod }) => (mods & mod) === mod)

  // Remove DoubleTime if Nightcore is applied
  if ((mods & Mods.Nightcore) === Mods.Nightcore) {
    modBadges = modBadges.filter(({ mod }) => mod !== Mods.DoubleTime)
  }

  return (
    <div className="flex flex-row gap-2 max-w-3xl flex-wrap">
      {modBadges.map(({ mod, source }) => (
        <div key={mod}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image src={source} alt="modImage" height={35} />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent className="z-50 bg-hsl-25 bg-opacity-50 backdrop-blur-md rounded-lg py-2 px-4">
                  {Mods[mod]}
                  <TooltipArrow className="fill-hsl-25 opacity-50 backdrop-blur-md" />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  )
}

export default ModsImageList

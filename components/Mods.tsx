import Image from 'next/image'
import { ModImages, Mods } from '../constants/Mods'
import * as Tooltip from '@radix-ui/react-tooltip'

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
        <Tooltip.Provider key={`mod-${Mods[mod]}`} delayDuration={50}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div key={mod}>
                <Image src={source} alt="modImage" height={35} />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content sideOffset={5}>{Mods[mod]}</Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ))}
    </div>
  )
}

export default ModsImageList

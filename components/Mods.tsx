import Image from 'next/image'
import { ModImages, Mods } from '../constants/Mods'

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
          <Image src={source} alt="modImage" height={35} />
        </div>
      ))}
    </div>
  )
}

export default ModsImageList

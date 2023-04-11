import Image from 'next/image'
import { ModImages } from '../constants/Mods'

interface IProps {
  mods: number
}

const ModsImageList = ({ mods }: IProps) => {
  const modBadges = ModImages.filter(({ mod }) => (mods & mod) === mod)
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

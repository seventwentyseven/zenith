import { RankColor } from '../constants/gradients'

interface IProps {
  countryRank: number
  country: string
  globalRank: number
}

const ProfileRank = ({ countryRank, country, globalRank }: IProps) => {
  const rankColor = RankColor(globalRank)
  console.log(globalRank)
  return (
    <>
      <div className="flex flex-col items-start justify-center ml-1">
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
    </>
  )
}

export default ProfileRank

import { mostPlayed } from '../../constants/most-played'

const MostPlayed: React.FC = () => {
  return (
    <div className="flex flex-col justify-center mt-2">
      <span className="mb-2 ml-2">Most played beatmap</span>
      <div className="flex flex-col w-full bg-base-300 shadow rounded-lg p-4 border-white/10 border-px">
        <span>
          {mostPlayed[0].bmapArtist} - {mostPlayed[0].bmapTitle} [
          {mostPlayed[0].bmapVersion}]
        </span>
        <span className="text-sm">Played {mostPlayed[0].playCount} times</span>
      </div>
    </div>
  )
}

export default MostPlayed

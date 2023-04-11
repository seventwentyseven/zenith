import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import TimeAgo from 'timeago-react'
import { IScore } from '../../../types/Score'
import Grade from '../../Grade'
import ModsImageList from '../../Mods'

const Score = ({ score }: { score: IScore }) => {
  return (
    <div className="w-full h-24 flex group">
      <div
        className="bg-hsl-10 flex flex-row items-center justify-between px-4 rounded-xl min-w-full h-full transition duration-300 bg-center bg-cover group-hover:-translate-x-[4%]"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 10%, 10%, 0.7), hsla(230, 10%, 10%, 0.7)), url("https://assets.ppy.sh/beatmaps/${score.beatmap.set_id}/covers/cover.jpg")`
        }}
      >
        <div className="flex flex-col gap-2 text-hsl-90 group-hover:translate-x-12 transition duration-300">
          <Link href={`/beatmaps/${score.beatmap.id}`} className="text-xl">
            {score.beatmap.artist} - {score.beatmap.title}
          </Link>
          <div className="flex flex-row items-center gap-4">
            {/* <span>Score: {score.score.toLocaleString('en-US')}</span>
            <span>Max Combo: {score.max_combo.toLocaleString('en-US')}</span> */}
            <span className="text-hsl-80">[{score.beatmap.version}]</span>
            <span className="text-white/70">
              <TimeAgo datetime={score.play_time} />
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 text-hsl-90">
          <ModsImageList mods={score.mods} />
          <div className="flex flex-col text-hsl-80">
            <span className="text-2xl font-bold">{Math.round(score.pp)}pp</span>
            <span className="text-white/70">{score.acc.toFixed(2)}%</span>
          </div>
          <span className="text-5xl w-[68px] h-full">
            <Grade name={score.grade} />
          </span>
        </div>
      </div>
      <Link
        href={`/scores/${score.id}`}
        className="w-[4%] h-full opacity-0 scale-0 flex translate-x-0 group-hover:scale-100 transition group-hover:opacity-100 group-hover:-translate-x-7 duration-300 items-center justify-center"
      >
        <FaBars />
      </Link>
    </div>
  )
}

export default Score

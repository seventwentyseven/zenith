import { ISODateString } from 'next-auth'
import Link from 'next/link'
import { FaAccusoft, FaBars } from 'react-icons/fa'
import TimeAgo from 'timeago-react'
import GradeImage from '../../Grade'

const Score = ({
  scoreId,
  pp,
  acc,
  score,
  grade,
  maxCombo,
  bmapId,
  bmapSetId,
  bmapArtist,
  bmapTitle,
  bmapVersion,
  playTime
}: {
  scoreId: number
  score: number
  maxCombo: number
  pp: number
  acc: Number
  grade: string
  bmapId: number
  bmapSetId: number
  bmapArtist: string
  bmapTitle: string
  bmapVersion: string
  playTime: ISODateString
}) => {
  return (
    <div className="w-full h-24 flex group">
      <div
        className="bg-hsl-10 flex flex-row items-center justify-between px-4 rounded-xl min-w-full h-full transition duration-300 bg-center bg-cover group-hover:-translate-x-[4%]"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 10%, 10%, 0.7), hsla(230, 10%, 10%, 0.7)), url("https://assets.ppy.sh/beatmaps/${bmapSetId}/covers/cover.jpg")`
        }}
      >
        <div className="flex flex-col gap-2 text-hsl-90 group-hover:translate-x-12 transition duration-300">
          <Link href={`/beatmaps/${bmapId}`} className="text-xl">
            {bmapArtist} - {bmapTitle} [{bmapVersion}]
          </Link>
          <div className="flex flex-row gap-2">
            <span>Score: {score.toLocaleString('en-US')}</span>
            <span>Max Combo: {maxCombo.toLocaleString('en-US')}</span>
            <span>
              Played: <TimeAgo datetime={playTime} />
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 text-hsl-90">
          <div className="flex flex-col text-hsl-80">
            <span className="text-2xl font-bold">{Math.round(pp)}pp</span>
            <span>{acc.toFixed(2)}%</span>
          </div>
          <span className="text-5xl w-[68px] h-full">
            <GradeImage name={grade} />
          </span>
        </div>
      </div>
      <div className="w-[4%] h-full opacity-0 scale-0 flex translate-x-0 group-hover:scale-100 transition group-hover:opacity-100 group-hover:-translate-x-7 duration-300 items-center justify-center">
        <Link href={`/scores/${scoreId}`}>
          <FaBars />
        </Link>
      </div>
    </div>
  )
}

export default Score

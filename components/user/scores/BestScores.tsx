import { ISODateString } from 'next-auth'
import { useEffect, useState } from 'react'
import { fetchScores } from '../../../controllers/UserScoresFetching'
import { IBeatmap } from '../../../types/Map'
import LoadingSpinner from '../../LoadingSpinner'
import Score from './Score'

// def's old thing
/* <div className="w-full h-24 rounded-xl flex group"><div
        className="bg-hsl-10 rounded-xl min-w-full h-full transition duration-300 bg-center bg-cover group-hover:-translate-x-[4%]"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 10%, 10%, 0.5), hsla(230, 10%, 10%, 0.5)), url("https://seventwentyseven.xyz/banners/3")`
        }}
      />
      <div className="w-[4%] h-full hidden group-hover:flex transition duration-300 items-center justify-center">
        <FaBars />
      </div></div> */

interface IScore {
  id: number
  score: number
  pp: number
  acc: number
  max_combo: number
  mods: number
  n300: number
  n100: number
  n50: number
  nmiss: number
  ngeki: number
  nkatu: number
  grade: 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SH' | 'X' | 'XH'
  status: number
  mode: number
  play_time: ISODateString
  time_elapsed: number
  perfect: number
  beatmap: IBeatmap
}

const BestScores = ({
  userid,
  gamemode
}: {
  userid: number
  gamemode: number
}) => {
  const [scores, setScores] = useState<IScore[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [oldGamemode, setOldGamemode] = useState<number>(gamemode)
  const [offset, setOffset] = useState<number>(0)

  const increaseOffset = () => {
    if (offset < 95) setOffset(offset + 5)
  }

  const fetchBestScores = async (fetchingOffset: number) => {
    if (gamemode !== oldGamemode) {
      setLoading(true)
      setOldGamemode(gamemode)
      setScores([])
      await setOffset(0)
      const newScores = await fetchScores(
        'best',
        userid,
        gamemode,
        fetchingOffset
      )
      setScores(current => [...current, ...newScores])
      setLoading(false)
    } else {
      setLoading(true)
      const newScores = await fetchScores(
        'best',
        userid,
        gamemode,
        fetchingOffset
      )
      setScores(current => [...current, ...newScores])
      setLoading(false)
    }
  }

  const fetchBestScoresFirstTime = async () => {
    setLoading(true)
    const newScores = await fetchScores('best', userid, gamemode, 0)
    setScores(newScores)
    setLoading(false)
  }

  useEffect(() => {
    setScores([])
    setOffset(0)
    setOldGamemode(gamemode)
    fetchBestScoresFirstTime()
  }, [gamemode, userid])

  console.log(`scores.length: ${scores.length}`)
  console.log(scores)
  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      {scores &&
        scores.length > 0 &&
        scores.map((score, index) => {
          return (
            <Score
              key={`score-${index}`}
              scoreId={score.id}
              score={score.score}
              pp={score.pp}
              maxCombo={score.max_combo}
              grade={score.grade}
              bmapId={score.beatmap.id}
              bmapSetId={score.beatmap.set_id}
              bmapArtist={score.beatmap.artist}
              bmapTitle={score.beatmap.title}
              bmapVersion={score.beatmap.version}
            />
          )
        })}

      {scores.length === 0 ? (loading ? '' : 'No scores') : ''}

      <div className="flex flex-row p-2 w-full items-center justify-center">
        {loading ? (
          <button
            disabled
            className="btn btn-md btn-primary cursor-not-allowed"
          >
            <LoadingSpinner />
            <span>Loading</span>
          </button>
        ) : (
          scores.length !== 0 &&
          scores.length >= 5 &&
          scores.length < 100 && (
            <button
              className="btn btn-md btn-primary"
              onClick={() => {
                fetchBestScores(offset + 5)
                increaseOffset()
              }}
            >
              More score
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default BestScores

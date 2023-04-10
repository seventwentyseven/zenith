import { useEffect, useState } from 'react'
import { fetchScores } from '../../../controllers/UserScoresFetching'
import { IScore } from '../../../types/Score'
import LoadingSpinner from '../../LoadingSpinner'
import Score from './Score'

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
              acc={score.acc}
              maxCombo={score.max_combo}
              grade={score.grade}
              bmapId={score.beatmap.id}
              bmapSetId={score.beatmap.set_id}
              bmapArtist={score.beatmap.artist}
              bmapTitle={score.beatmap.title}
              bmapVersion={score.beatmap.version}
              playTime={score.play_time}
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
              More scores
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default BestScores

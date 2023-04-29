import { useEffect, useState } from 'react'
import { fetchScores } from '../../../controllers/UserScoresFetching'
import { IScore } from '../../../types/Score'
import LoadingSpinner from '../../LoadingSpinner'
import Score from './Score'

const FirstPlaceScores = ({
  userid,
  gamemode
}: {
  userid: number
  gamemode: number
}) => {
  const [scores, setScores] = useState<IScore[]>([
    {
      acc: 100,
      beatmap: {
        ar: 10,
        artist: 'dzifors',
        bpm: 300,
        creator: 'dzifors',
        cs: 3,
        diff: 3,
        hp: 3,
        id: 3123,
        last_update: 'asdas',
        max_combo: 123,
        md5: '123123',
        mode: 3,
        od: 123,
        passes: 123,
        plays: 2,
        server: 'osu!',
        set_id: 123123,
        status: 2,
        title: 'dzifors',
        total_length: 3123,
        version: 'jajco kurwa'
      },
      grade: 'A',
      id: 3,
      max_combo: 3123,
      mode: 3,
      mods: 123,
      n100: 2,
      n300: 3,
      n50: 123,
      ngeki: 300,
      nkatu: 123,
      nmiss: 12,
      perfect: 1,
      play_time: 'asda',
      pp: 123,
      score: 3123123,
      status: 2,
      time_elapsed: 12398176
    }
  ])
  const [loading, setLoading] = useState<boolean>(true)
  const [oldGamemode, setOldGamemode] = useState<number>(gamemode)
  const [offset, setOffset] = useState<number>(0)

  const increaseOffset = () => {
    if (offset < 95) setOffset(offset + 5)
  }

  // const fetchFirstPlaceScores = async (fetchingOffset: number) => {
  //   if (gamemode !== oldGamemode) {
  //     setLoading(true)
  //     setOldGamemode(gamemode)
  //     setScores([])
  //     await setOffset(0)
  //     const newScores = await fetchScores(
  //       'first',
  //       userid,
  //       gamemode,
  //       fetchingOffset
  //     )
  //     setScores(current => [...current, ...newScores])
  //     setLoading(false)
  //   } else {
  //     setLoading(true)
  //     const newScores = await fetchScores(
  //       'first',
  //       userid,
  //       gamemode,
  //       fetchingOffset
  //     )
  //     setScores(current => [...current, ...newScores])
  //     setLoading(false)
  //   }
  // }

  // const fetchFirstPlaceScoresFirstTime = async () => {
  //   setLoading(true)
  //   const newScores = await fetchScores('first', userid, gamemode, 0)
  //   setScores(newScores)
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   setScores([])
  //   setOffset(0)
  //   setOldGamemode(gamemode)
  //   fetchFirstPlaceScoresFirstTime()
  // }, [gamemode, userid])

  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      {scores &&
        scores.length > 0 &&
        scores.map((score, index) => {
          return <Score key={`score-${index}`} score={score} />
        })}

      {scores.length === 0 ? (loading ? '' : 'No scores') : ''}

      <div className="flex flex-row p-2 w-full items-center justify-center">
        {loading ? (
          <button
            disabled
            className="btn btn-md btn-primary cursor-not-allowed"
          >
            <LoadingSpinner color="white" />
            <span>Loading</span>
          </button>
        ) : (
          scores.length !== 0 &&
          scores.length >= 5 &&
          scores.length < 100 && (
            <button
              className="btn btn-md btn-primary"
              onClick={() => {
                fetchFirstPlaceScores(offset + 5)
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

export default FirstPlaceScores

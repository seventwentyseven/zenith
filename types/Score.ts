import { ISODateString } from 'next-auth'
import { IBeatmap } from './Map'

// export interface IScore {
//   accuracy: number
//   score: number
//   maxCombo: number
//   pp: number
//   mods: number
//   grade: string
//   n300: number
//   n100: number
//   n50: number
//   nmiss: number
//   ngeki: number
//   nkatu: number
//   perfect: boolean
//   status: number
//   mode: number
//   playtime: Date
//   userid: number
//   pauses: number
//   beatmap: IBeatmap
// }

export interface IScore {
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
import { IBeatmap } from './Map'

export interface IScore {
  accuracy: number
  score: number
  maxCombo: number
  pp: number
  mods: number
  grade: string
  n300: number
  n100: number
  n50: number
  nmiss: number
  ngeki: number
  nkatu: number
  perfect: boolean
  status: number
  mode: number
  playtime: Date
  userid: number
  pauses: number
  beatmap: IBeatmap
}

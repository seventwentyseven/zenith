export interface IBeatmap {
  md5: string
  id: number
  server: string
  set_id: number
  artist: string
  title: string
  version: string
  creator: string
  last_update: string
  total_length: number
  max_combo: number
  status: number
  plays: number
  passes: number
  mode: number
  bpm: number
  cs: number
  od: number
  ar: number
  hp: number
  diff: number
}

export interface IBeatmapSet {
  id: number
  server: string
  maps: IBeatmap[]
}

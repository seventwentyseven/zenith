export interface ILeaderboard {
  status: boolean
  leaderboard: ILeaderboardEntry[]
}

export interface ILeaderboardEntry {
  player_id: number
  name: string
  country: string
  tscore: number
  rscore: number
  pp: number
  plays: number
  playtime: number
  acc: number
  max_combo: number
  xh_count: number
  x_count: number
  sh_count: number
  s_count: number
  a_count: number
  clan_id: number
  clan_name: string | null
  clan_tag: string | null
}
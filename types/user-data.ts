export interface IPlayerData {
  status: boolean
  player: IPlayer
}

interface IPlayer {
  info: IPlayerInfo
  stats: IPlayerStats
}

interface IPlayerStats {
  [key: number]: IPlayerStatsModeData
}

interface IPlayerInfo {
  id: number
  name: string
  safe_name: string
  priv: number
  country: string
  silence_end: number
  donor_end: number
  creation_time: number
  latest_activity: number
  clan_id: number
  clan_priv: number
  preferred_mode: number
  // play_style: number
  custom_badge_name: string | null
  custom_badge_icon: string | null
  userpage_content: string | null
}

interface IPlayerStatsModeData {
  id: number
  tscore: number
  rscore: number
  pp: number
  plays: number
  playtime: number
  acc: number
  max_combo: number
  total_hits: number
  replay_views: number
  xh_count: number
  x_count: number
  sh_count: number
  s_count: number
  a_count: number
  rank: number
  country_rank: number
  level: number
  level_progress: number
}

interface IBeatmap {
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

export interface IPlayerStatus {
  success: boolean
  player_status: {
    online: boolean
    login_time: number
    status: {
      action: number
      info_text: string
      mode: number
      mods: number
      beatmap: IBeatmap | null
    }
  }
  meta: {}
}

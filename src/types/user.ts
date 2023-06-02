interface UserModeStats {
  id: number
  mode: number
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
}

export interface UserStatusOffline {
  online: boolean
  last_seen: number
}

export interface UserStatusOnline {
  online: boolean
  login_time: number
  action: number
  info_text: string
  mode: number
  mods: number
  beatmap_id: number
}
export type UserData = {
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
  play_style: number
  custom_badge_name: null
  custom_badge_icon: null
  userpage_content: string
}
export type UserStats = UserModeStats[]
export type UserStatus = UserStatusOnline | UserStatusOffline
export type UserContextType = {
  userData: UserData
  userStats: UserStats
  userStatus: UserStatus
}

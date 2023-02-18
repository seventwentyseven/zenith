export interface IUserDataResponse {
  status: string
  data: IUserData
}

interface IUserData {
  id: number
  name: string
  safe_name: string
  priv: number
  country: string
  silence_end: number
  donor_end: number
  latest_activity: number
  clan_id: number
  clan_priv: number
  preferred_mode: number
  play_style: number
  custom_badge_name: null
  custom_badge_icon: null
  userpage_content: string
  meta: IMeta
}

interface IMeta { }

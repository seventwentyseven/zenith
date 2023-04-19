import { IBeatmap } from "./Map"

export interface ISearchResponse {
  status: boolean
  data: ISearchData
}

interface ISearchData {
  players: ISearchPlayerData[]
  beatmaps: ISearchBeatmapsData[]
}

interface ISearchPlayerData {
  id: number,
  name: string
  priv: number
  country: string
  email: string
  creation_time: number
  latest_activity: number
}

interface ISearchBeatmapsData {
  set_id: number
  server: string
  artist: string
  title: string
  creator: string
  favourites: number
  maps: IBeatmap[]
}

import config from '../config.json'

export const fetchScores = async (
  scope: 'best' | 'recent',
  userid: number,
  gamemode: number,
  offset: number
) => {
  const response = await fetch(
    `${config.apiUrl}/v1/get_player_scores?scope=${scope}&id=${userid}&mode=${gamemode}&offset=${offset}&limit=5`
  )
  const responseJson = await response.json()
  return responseJson.scores
}

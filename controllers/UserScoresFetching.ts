import config from '../config.json'

export const fetchScores = async (
  scope: 'best' | 'recent' | 'first',
  userid: number,
  gamemode: number,
  offset: number
) => {
  const response =
    scope === 'first'
      ? await fetch(
          `${
            config.apiUrl
          }/v2/scores/${userid}/no1s?mode=${gamemode}&pageSize=5&page=${
            offset / 5 + 1
          }&order=play_time_desc`
        )
      : await fetch(
          `${config.apiUrl}/v1/get_player_scores?scope=${scope}&id=${userid}&mode=${gamemode}&offset=${offset}&limit=5`
        )
  const responseJson = await response.json()
  if (scope === 'first') return responseJson.data
  return responseJson.scores
}

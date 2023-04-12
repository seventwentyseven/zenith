import config from '../config.json'

const search = async (query: string, scope: string) => {
  const searchResponse = await fetch(
    `${config.apiUrl}/v2/search?query=${query}&scope=${scope}`
  )
  const response = await searchResponse.json()
  console.log(response)
}

export { search }

import { User } from 'next-auth'
import config from '../config.json'

const search = async (query: string, scope: string, token: User['token'], offset: number) => {
  const searchResponse = await fetch(
    `${config.apiUrl}/v2/search?query=${query}&scope=${scope}&offset=${offset}&limit=5`, {
    headers: {
      token: token
    }
  }
  )
  const response = await searchResponse.json()
  console.log(response)
  return response
}

export { search }

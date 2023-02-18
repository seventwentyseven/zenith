const getUserData = async (userId: string | string[] | undefined) => {
  const res = await fetch(process.env.API_URL + `/v2/players/${userId}`)

  return res.json()
}

export default getUserData

export type UserLoginResponse = {
  token: string
  expires: number
}

export type UserDataResponse = {
  success: boolean
  data: {
    id: number
    name: string
    safe_name: string
    priv: number
    preferred_mode: number
  }
  meta: object
}

export type Credentials = {
  username: string
  password: string
}

import axios, { AxiosError, isAxiosError } from 'axios'
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as crypto from 'crypto'
import { Md5 } from 'ts-md5'
import { requestToBodyStream } from 'next/dist/server/body-streams'

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     throw new Error(error)
//   }
// )

// const loginQuery = async () => {
//   const response = await axios.post(
//     'https://api.dzifors.tk/v2/auth/login',
//     JSON.stringify({
//       username: 'dzifors',
//       pw_md5: 'dat za'
//     }),
//     {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       }
//     }
//   )
//   return response.data
// }

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: 'Username', placeholder: 'Username', type: 'text' },
        password: {
          label: 'Password',
          placeholder: 'Password',
          type: 'text'
        }
      },
      async authorize(credentials, req) {
        const payload: { username: string; pw_md5: string } = {
          username: credentials?.username || '',
          pw_md5: credentials?.password || ''
        }

        console.log(credentials)

        const res = await fetch('https://api.dzifors.tk/v2/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        let tokenJson
        let userJson

        if (res.headers.get('Content-Type') === 'application/json') {
          tokenJson = await res.json()
        } else if (
          res.headers.get('Content-Type') === 'text/html; charset=UTF-8'
        ) {
          tokenJson = 'Api ded'
        } else {
          tokenJson = await res.text()
        }

        if (!res.ok) {
          console.log(tokenJson)
          console.log(res.headers)
          throw new Error(tokenJson.error || tokenJson)
        }

        if (res.ok && tokenJson) {
          tokenJson = JSON.parse(tokenJson)

          console.log(tokenJson)

          const userRes = await fetch('https://api.dzifors.tk/v2/auth/@me', {
            headers: { token: tokenJson.token }
          })

          console.log(userRes)

          if (userRes.headers.get('Content-Type') === 'application/json') {
            userJson = await userRes.json()
            console.log(userJson)
          } else if (
            res.headers.get('Content-Type') === 'text/html; charset=UTF-8'
          ) {
            userJson = 'Api ded'
          } else {
            userJson = await userRes.text()
            console.log(userJson)
          }

          let userData = {
            id: userJson.data.id,
            name: userJson.data.name,
            priv: userJson.data.priv,
            preferredMode: userJson.data.preferred_mode,
            token: tokenJson.token
          }

          console.log(userData)

          if (!userRes.ok) throw new Error(tokenJson.error || tokenJson)

          return userData
        }
        return null

        // return { id: 3, name: 'dzifors', priv: 3, token: 'asdf' }
      }
    })
  ],
  // HACK: I AM BURNING IN HELL FOR WRITING THIS BELOW CODE:
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.userName = user.name
        token.userToken = user.token
        token.userPriv = user.priv
        token.preferredMode = user.preferredMode
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user.id = token.userId
      session.user.name = token.userName
      session.user.token = token.userToken
      session.user.priv = token.userPriv
      session.user.preferredMode = token.preferredMode

      return Promise.resolve(session)
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  }
}

export default NextAuth(authOptions)

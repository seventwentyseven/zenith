import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { Credentials, UserDataResponse, UserLoginResponse } from '~/types/auth'

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
      async authorize(credentials) {
        const { username, password: pw_md5 } = credentials as Credentials

        const { data: userLoginResponse } = await axios
          .post<UserLoginResponse>('https://api.dzifors.tk/v2/auth/login', {
            username,
            pw_md5
          })
          .catch(e => {
            if (e.response.status !== 422) {
              throw new Error(
                `Failed to fetch user data with error ${e.response.status}`
              )
            }

            throw new Error(e.response.data.error)
          })

        const token = userLoginResponse.token

        const { data: userDataResponse } = await axios
          .get<UserDataResponse>(`https://api.dzifors.tk/v2/auth/@me`, {
            headers: { token: token }
          })
          .catch(e => {
            throw new Error(e.response.data.error)
          })

        const userData = {
          token,
          ...userDataResponse.data
        } as User

        return userData
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user

      return Promise.resolve(session)
    }
  },
  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout'
    // error: '/auth/error'
  }
}

export default NextAuth(authOptions)

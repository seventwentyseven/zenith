import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
          type: 'password'
        }
      },
      authorize(credentials) {
        console.log(credentials)
        return {
          id: 3,
          token: 'asdf',
          name: 'dzifors',
          priv: 3,
          image: 'https://a.seventwentyseven.xyz/3'
        }
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
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user.id = token.userId
      session.user.name = token.userName
      session.user.token = token.userToken
      session.user.priv = token.userPriv

      return Promise.resolve(session)
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error'
  }
}

export default NextAuth(authOptions)

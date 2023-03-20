import 'next-auth'
import 'next-auth/jwt'

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth' {
  interface User {
    id: string | number
    name: string
    token: string
    priv: number
    preferredMode: number
  }
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string | number
    userName: string
    userToken: string
    userPriv: number
    preferredMode: number
  }
}

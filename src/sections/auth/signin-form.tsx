import { createHash } from 'crypto'
import { signIn } from 'next-auth/react'
import { FormEvent, useEffect, useReducer } from 'react'
import { Button } from '~/components/ui/button'

export type SigninState = {
  username: string
  password: string
}

type SigninAction = { username: string } | { password: string }

export default function SigninForm() {
  const [state, dispatch] = useReducer(
    (oldState: SigninState, action: SigninAction) => ({
      ...oldState,
      ...action
    }),
    { username: '', password: '' }
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    signIn('credentials', { ...state, callbackUrl: '/' })
  }

  useEffect(() => console.log(state), [state])

  function hashPassword(password: string) {
    const hash = createHash('md5')
    hash.update(password)
    return hash.digest('hex')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center rounded-lg bg-hsl-35-15 bg-opacity-50 px-6 py-6 text-white backdrop-blur-xl"
    >
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        // className="rounded-lg bg-hsl-35-15 bg-opacity-40 px-3 py-2 focus:border-px focus:border-white/40 focus:bg-hsl-10 focus:outline-none focus:ring-0"
        className="rounded-lg bg-hsl-35-15 bg-opacity-40 px-3 py-2 focus:border-px focus:border-white/40 focus:bg-hsl-35-15 focus:outline-none focus:ring-0"
        onChange={e => dispatch({ username: e.target.value })}
      />

      <label htmlFor="password" className="mt-2">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        // className="rounded-lg border-px border-white bg-hsl-35-15 bg-opacity-40 px-3 py-2 outline-white focus:border-px focus:border-white/40 focus:bg-hsl-10 focus:outline-none focus:ring-0"
        className="rounded-lg bg-hsl-35-15 bg-opacity-40 px-3 py-2 focus:border-px focus:border-white/40 focus:bg-hsl-35-15 focus:outline-none focus:ring-0"
        onChange={e => dispatch({ password: hashPassword(e.target.value) })}
      />
      <Button size="lg" type="submit" className="mt-7">
        Sign in
      </Button>
    </form>
  )
}

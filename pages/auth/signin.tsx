import { signIn, SignInResponse } from 'next-auth/react'
import Link from 'next/link'
import BackgroundImage from '../../components/background-image'
import Layout from '../../components/layout'
import * as crypto from 'crypto'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'

const LoginPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
      username: username,
      password: password
    })
  }

  return (
    <Layout>
      <BackgroundImage blur />
      <section className="max-w-screen-sm w-full">
        <div className="rounded-lg py-4 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl flex flex-row items-center justify-between mb-8">
          <span className="font-semibold text-3xl text-white">Login</span>
          <Link
            href="/api/auth/signup"
            className="text-blue-300 duration-150 hover:text-blue-400 focus:text-blue-400 active:text-blue-500"
          >
            Don't have an account yet?
          </Link>
        </div>
        <div
          // onSubmit={e => {
          //   e.preventDefault
          //   handleLogin()
          // }}
          className="rounded-lg py-6 px-6 bg-hsl-15 bg-opacity-50 backdrop-blur-xl text-white flex flex-col items-center justify-center"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="rounded-lg bg-hsl-15 bg-opacity-40 focus:bg-hsl-10 focus:outline-none focus:ring-0 focus:border-px focus:border-white/40"
            onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-lg bg-hsl-15 bg-opacity-40 focus:bg-hsl-10 focus:outline-none focus:ring-0 focus:border-px focus:border-white/40"
            onChange={e => {
              setPassword(
                crypto
                  .createHash('md5')
                  .update(e.target.value)
                  .digest('hex')
                  .toString()
              )
              console.log(
                crypto
                  .createHash('md5')
                  .update(e.target.value)
                  .digest('hex')
                  .toString()
              )
            }}
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="btn btn-lg btn-primary mt-7"
          >
            Login
          </button>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage

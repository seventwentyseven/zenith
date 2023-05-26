import Link from 'next/link'
import SigninForm from '~/sections/auth/signin-form'

const SigninPage = () => {
  return (
    <section className="w-full max-w-screen-sm transition duration-200">
      <div className="mb-8 flex flex-row items-center justify-between rounded-lg bg-hsl-35-15 bg-opacity-50 px-6 py-4 backdrop-blur-xl">
        <span className="text-3xl font-semibold text-white">Sign in</span>
        <Link
          href="/auth/signup"
          className="text-blue-300 duration-150 hover:text-blue-400 focus:text-blue-400 active:text-blue-500"
        >
          Don&apos;t have an account?
        </Link>
      </div>
      <SigninForm />
    </section>
  )
}

export default SigninPage

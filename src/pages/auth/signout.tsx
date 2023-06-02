import { signOut } from 'next-auth/react'
import { Button } from '~/components/ui/button'

const SignoutPage = () => {
  return <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
}

export default SignoutPage

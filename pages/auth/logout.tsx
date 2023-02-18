import { signOut } from 'next-auth/react'

const LogoutPage = () => {
  const handleLogout = () => {
    signOut({callbackUrl: '/', redirect: true})
  }
  return (
    <div className='flex flex-col'>
      <span>do you want to log out?</span>
      <button className='btn btn-primary btn-outline' onClick={handleLogout}>yeah</button>
    </div>
  )
}

export default LogoutPage

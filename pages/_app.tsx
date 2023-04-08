import '../styles/globals.css'
import 'flowbite'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
// import CookieConsentModal from '../components/CookieConsent'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      {/* <CookieConsentModal /> */}
    </SessionProvider>
  )
}

export default MyApp

import CookieConsent from 'react-cookie-consent'

const CookieConsentModal = () => {
  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      overlay
      overlayClasses="backdrop-blur-lg"
      debug
    >
      We use cookies, hope ya cool wit dat
    </CookieConsent>
  )
}

export default CookieConsentModal

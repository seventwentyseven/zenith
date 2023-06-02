import { useSession } from 'next-auth/react'

interface IProps {
  opacity?: number
  blur?: boolean
  userid?: number
  disableGradient?: boolean
}

/**
 * The Background Image
 * @param opacity - Controls the opacity of the color that overlays the image itself
 * @param blur - Controls whether or not to blur the background
 * @param userid - Sets the userid of the background (TODO: change that to implement every image)
 * @param disableGradient - Turns off the color that overlays the image itself
 */
const BackgroundImage = ({
  opacity,
  blur,
  userid,
  disableGradient
}: IProps) => {
  const { data: session, status } = useSession()

  userid = status === 'authenticated' ? session.user.id : 3

  if (!opacity) opacity = 0.5
  if (!disableGradient) disableGradient = false

  if (disableGradient) {
    return (
      <div
        className="absolute top-0 -z-50 min-h-screen w-full bg-hsl-15 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 35%, 15%, ${opacity}), hsla(230, 35%, 15%, ${opacity})), url("https://seventwentyseven.xyz/backgrounds/${userid}")`,
          backgroundSize: 'cover'
        }}
      >
        {blur && (
          <div className="absolute top-0 h-full w-full backdrop-blur"></div>
        )}
      </div>
    )
  }

  return (
    <div
      className="absolute top-0 -z-50 min-h-screen w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, hsla(230, 35%, 15%, ${opacity}), hsla(230, 35%, 15%, 1)), url("https://seventwentyseven.xyz/backgrounds/${userid}")`,
        backgroundSize: 'cover'
      }}
    >
      {blur && (
        <div className="absolute top-0 h-full w-full backdrop-blur"></div>
      )}
    </div>
  )
}

export default BackgroundImage

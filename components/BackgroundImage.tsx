import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

interface IProps {
  opacity?: number
  blur?: boolean
  userid?: string | string[]
  disableGradient?: boolean
}

const BackgroundImage = ({
  opacity,
  blur,
  userid,
  disableGradient
}: IProps) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated') userid = '3'
    if (!userid) userid = session?.user.id.toString()
  })

  if (!opacity) opacity = 0.5
  if (!disableGradient) disableGradient = false

  if (disableGradient) {
    return (
      <div
        className="min-h-screen w-full absolute top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, ${opacity}), hsla(230, 15%, 15%, ${opacity})), url("https://seventwentyseven.xyz/backgrounds/${userid}")`,
          backgroundSize: 'cover'
        }}
      >
        {blur && (
          <div className="h-full w-full absolute top-0 backdrop-blur"></div>
        )}
      </div>
    )
  }

  return (
    <div
      className="min-h-screen w-full absolute top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50"
      style={{
        backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, ${opacity}), hsla(230, 15%, 15%, 1)), url("https://seventwentyseven.xyz/backgrounds/${userid}")`,
        backgroundSize: 'cover'
      }}
    >
      {blur && (
        <div className="h-full w-full absolute top-0 backdrop-blur"></div>
      )}
    </div>
  )
}

export default BackgroundImage

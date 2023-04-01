import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface IProps {
  opacity?: number
  blur?: boolean
  userid?: string | string[]
  nogradient?: boolean
}

const BackgroundImage = ({ opacity, blur, userid, nogradient }: IProps) => {
  const { data: session, status } = useSession()

  const [userId, setUserId] = useState<string>()
  useEffect(() => {
    if (status !== 'authenticated') userid = '3'
    if (!userid) userid = session?.user.id.toString()
    setUserId(String(userid))
  })
  if (!opacity) opacity = 0.5
  if (!nogradient) nogradient = false

  if (nogradient) {
    return (
      <div
        className="min-h-screen w-full absolute top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, ${opacity}), hsla(230, 15%, 15%, ${opacity})), url("https://seventwentyseven.xyz/backgrounds/${userId}")`,
          backgroundSize: 'cover'
        }}
      >
        {blur && (
          <div className="h-full w-full absolute top-0 backdrop-blur"></div>
        )}
      </div>
    )
  } else {
    return (
      <div
        className="min-h-screen w-full absolute top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, ${opacity}), hsla(230, 15%, 15%, 1)), url("https://seventwentyseven.xyz/backgrounds/${userId}")`,
          backgroundSize: 'cover'
        }}
      >
        {blur && (
          <div className="h-full w-full absolute top-0 backdrop-blur"></div>
        )}
      </div>
    )
  }
}

export default BackgroundImage

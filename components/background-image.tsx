import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IProps {
  opacity?: number
  blur?: boolean
  userid?: string | string[]
}

const BackgroundImage = ({ opacity, blur, userid }: IProps) => {
  const { data: session, status } = useSession()

  const [userId, setUserId] = useState<string>()
  useEffect(() => {
    if (status !== 'authenticated') userid = '3'
    if (!userid) userid = session?.user.id.toString()
    setUserId(String(userid))
  })

  return (
    <div
      className="min-h-screen w-full absolute top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50"
      style={{
        backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.6), hsla(230, 15%, 15%, 1)), url("https://seventwentyseven.xyz/backgrounds/${userId}")`,
        backgroundSize: 'cover'
      }}
    >
      <Image
        src={`https://seventwentyseven.xyz/backgrounds/${userId}`}
        alt="User background"
        onError={e => {
          setUserId('3')
        }}
        fill
        className={`hidden brightness-50 bg-gradient-to-b from-hsl-15 to-hsl-20 ${
          blur ? '' : 'blur'
        }`}
      />
      {blur && (
        <div className="h-full w-full absolute top-0 backdrop-blur"></div>
      )}
    </div>
  )
}

export default BackgroundImage

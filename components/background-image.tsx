interface IProps {
  opacity?: number
  blur?: boolean
  userid?: string | string[]
}

const BackgroundImage = ({ opacity, blur, userid }: IProps) => {
  if (!userid) userid = '3'
  return (
    <div
      className="min-h-screen w-full absolute top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50"
      style={{
        background: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.6), hsla(230, 15%, 15%, 1)), url("https://seventwentyseven.xyz/backgrounds/${userid}") no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <div
        className={
          'h-screen w-full absolute top-0' + opacity && `bg-opacity-${opacity}`
        }
      ></div>
      {blur && (
        <div className="h-full w-full absolute top-0 backdrop-blur"></div>
      )}
    </div>
  )
}

export default BackgroundImage

import React from 'react'

type IProps = {
  size?: number
}

const Logo = ({ size }: IProps) => {
  if (!size) size = 64
  return (
    <img
      src="https://seventwentyseven.xyz/static/favicon/apple-touch-icon.png"
      alt="727.xyz logo"
      width={size}
      height={size}
      className="duration-150 hover:opacity-60"
    />
  )
}

export default Logo

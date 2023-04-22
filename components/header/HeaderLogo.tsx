import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type IProps = {
  size?: number
}

const HeaderLogo = ({ size }: IProps) => {
  if (!size) size = 64
  return (
    <div className="flex flex-row items-center justify-start w-full">
      <Link href="/">
        <Image
          src="https://seventwentyseven.xyz/static/favicon/apple-touch-icon.png"
          alt="727.xyz logo"
          width={size}
          height={size}
          className="duration-150 hover:opacity-60"
        />
      </Link>
    </div>
  )
}

export default HeaderLogo

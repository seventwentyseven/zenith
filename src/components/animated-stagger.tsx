import { motion, stagger, useAnimate } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 })

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // animate('.arrow', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 })

    animate(
      'ul',
      {
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)'
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5
      }
    )

    animate(
      'li',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0
      }
    )
  }, [isOpen])

  return scope
}

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const scope = useMenuAnimation(isOpen)

  const { data: session } = useSession()

  return (
    <motion.nav
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="group transition duration-150"
      ref={scope}
    >
      <Link
        href={`/user/${session?.user.id}`}
        className={cn(
          'flex w-48 flex-row items-center justify-between rounded-lg bg-transparent px-4 py-2 transition duration-150 group-hover:bg-hsl-35-15 group-hover:bg-opacity-80'
        )}
      >
        <Image
          src={`https://a.seventwentyseven.xyz/${session?.user.id}`}
          alt="User image"
          width={64}
          height={64}
          className="h-12 w-12 rounded-full duration-150 group-hover:opacity-60"
        />
        <div className="flex flex-row gap-2">
          <span>{session?.user.name}</span>
          <FaChevronDown className="transition duration-150 group-hover:rotate-180" />
        </div>
      </Link>
      <div className="absolute w-48 select-none pt-4 transition duration-150">
        <ul
          className={cn(
            'absolute transition',
            'w-48 select-none pt-4',
            'flex flex-col items-center justify-center',
            'gap-2 bg-hsl-35-15 bg-opacity-80 transition duration-200',
            'rounded-lg p-4 pt-2'
          )}
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
            clipPath: 'inset(10% 50% 90% 50% round 10px)'
          }}
        >
          <li>{session?.user.name}</li>
          <li className="w-full">
            <Link href={`/user/${session?.user.id}`} className="w-full">
              <Button size="lg" className="w-full">
                Profile
              </Button>
            </Link>
          </li>
          <li className="w-full">
            <Link href="/auth/signout" className="w-full">
              <Button size="lg" variant="danger" className="w-full">
                Sign out
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  )
}

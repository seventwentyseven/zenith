import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, createContext, useContext, useState } from 'react'
import { cn } from '~/lib/utils'

type DropdownProps = {
  children: ReactNode
  className?: string
}

const DropdownContext = createContext<boolean>(false)

export function Dropdown({ children, className }: DropdownProps) {
  const [hovered, setHovered] = useState<boolean>(false)
  return (
    <DropdownContext.Provider value={hovered}>
      <div
        className={cn('group transition duration-150', className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownTrigger({ children }: DropdownProps) {
  return <div className="group z-50">{children}</div>
}

export function DropdownContent({ children, className }: DropdownProps) {
  const hovered = useContext(DropdownContext)

  return (
    <AnimatePresence>
      {hovered ? (
        <motion.div
          key="dropdown-content"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 100, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          className={cn('group', className)}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

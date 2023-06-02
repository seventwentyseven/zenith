import { AnimatePresence, motion } from 'framer-motion'
import {
  HtmlHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react'
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

interface DropdownTriggerProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export function DropdownTrigger({ children, ...props }: DropdownTriggerProps) {
  return (
    <div className="group z-50" {...props}>
      {children}
    </div>
  )
}

export function DropdownContent({ children, className }: DropdownProps) {
  const hovered = useContext(DropdownContext)

  return (
    <AnimatePresence>
      {hovered ? (
        <motion.div
          key="dropdown-content"
          // initial={{ opacity: 0, scale: 0.75 }}
          // animate={{ opacity: 100, scale: 1 }}
          // exit={{ opacity: 0, scale: 0.75 }}
          initial={{ x: 0 }}
          animate={{
            clipPath: hovered
              ? 'inset(0% 0% 0% 0% round 10px)'
              : 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              staggerChildren: 0.5
            }
          }}
          exit={{ clipPath: 'inset(10% 50% 90% 50% round 10px)' }}
          className={cn('group', className)}
          style={{
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            pointerEvents: hovered ? 'auto' : 'none'
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

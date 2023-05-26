import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'flex flex-row items-center justify-center text-white font-medium uppercase rounded transition duration-150 ease-in-out',
  {
    variants: {
      variant: {
        default:
          'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700',
        danger:
          'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800',
        secondary:
          'bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800',
        ghost:
          'bg-transparent hover:bg-hsl-15 hover:bg-opacity-40 active:bg-gray-800'
      },
      size: {
        default: 'px-6 py-2.5 text-xs',
        sm: 'py-1.5 px-4 text-xs',
        lg: 'text-sm leading-snug px-7 py-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

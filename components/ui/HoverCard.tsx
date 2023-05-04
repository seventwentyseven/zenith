import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import * as React from 'react'

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardPortal = HoverCardPrimitive.Portal

const HoverCardArrow = HoverCardPrimitive.Arrow
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={className}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
  HoverCardPortal
}

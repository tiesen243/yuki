import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@yuki/ui/utils'

import type { CardVariants } from './variants'
import {
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from './variants'

const Card: React.FC<
  React.ComponentProps<'div'> & CardVariants & { asChild?: boolean }
> = ({ variant, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'div'
  return <Comp className={cn(cardVariants({ variant, className }))} {...props} />
}
Card.displayName = 'Card'

const CardHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn(cardHeaderVariants({ className }))} {...props} />
)
CardHeader.displayName = 'CardHeader'

const CardTitle: React.FC<React.ComponentProps<'h3'>> = ({ className, ...props }) => (
  <h3 className={cn(cardTitleVariants({ className }))} {...props} />
)
CardTitle.displayName = 'CardTitle'

const CardDescription: React.FC<React.ComponentProps<'p'>> = ({
  className,
  ...props
}) => <p className={cn(cardDescriptionVariants({ className }))} {...props} />
CardDescription.displayName = 'CardDescription'

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn(cardContentVariants({ className }))} {...props} />
CardContent.displayName = 'CardContent'

const CardFooter: React.FC<React.ComponentProps<'div'> & { asChild?: boolean }> = ({
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div'
  return <Comp className={cn(cardFooterVariants({ className }))} {...props} />
}
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

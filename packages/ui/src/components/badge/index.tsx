import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import type { BadgeVariants } from './variants'
import { badgeVariants } from './variants'

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BadgeVariants
>(({ variant, className, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
))
Badge.displayName = 'Badge'

export { Badge }

import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import type { BadgeVariants } from './variants'
import { badgeVariants } from './variants'

const Badge: React.FC<React.ComponentProps<'span'> & BadgeVariants> = ({
  variant,
  className,
  ...props
}) => <span className={cn(badgeVariants({ variant, className }))} {...props} />
Badge.displayName = 'Badge'

export { Badge }

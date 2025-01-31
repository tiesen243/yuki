import * as React from 'react'

import type { TypographyVariants } from '@yuki/ui/components/typography/variants'
import { typographyVariants } from '@yuki/ui/components/typography/variants'
import { cn } from '@yuki/ui/utils'

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    TypographyVariants {}

const Typography = React.forwardRef<HTMLButtonElement, TypographyProps>(
  ({ className, level = 'p', color, ...props }, ref) => {
    const Comp = level as React.ElementType

    return (
      <Comp
        className={cn(typographyVariants({ level, color, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }

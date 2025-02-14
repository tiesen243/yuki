import * as React from 'react'

import type { TypographyVariants } from '@yuki/ui/components/typography/variants'
import { typographyVariants } from '@yuki/ui/components/typography/variants'
import { cn } from '@yuki/ui/utils'

interface TypographyProps
  extends Omit<React.ComponentProps<'p'>, 'color'>,
    TypographyVariants {}

const Typography: React.FC<TypographyProps> = ({
  className,
  level = 'p',
  color,
  ...props
}) => {
  const Comp = level as React.ElementType

  return (
    <Comp className={cn(typographyVariants({ level, color, className }))} {...props} />
  )
}

Typography.displayName = 'Typography'

export { Typography, typographyVariants }

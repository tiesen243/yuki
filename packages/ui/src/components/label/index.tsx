import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@yuki/ui/utils'

import type { LabelVariants } from './variants'
import { labelVariants } from './variants'

const Label: React.FC<
  React.ComponentProps<typeof LabelPrimitive.Root> & LabelVariants
> = ({ className, ...props }) => (
  <LabelPrimitive.Root className={cn(labelVariants({ className }))} {...props} />
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

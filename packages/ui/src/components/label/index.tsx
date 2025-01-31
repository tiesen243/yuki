import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@yuki/ui/utils'

import type { LabelVariants } from './variants'
import { labelVariants } from './variants'

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & LabelVariants
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ className }))}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

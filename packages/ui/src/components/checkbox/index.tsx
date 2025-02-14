'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@yuki/ui/utils'

import { indicatorVariants, rootVariants } from './variants'

const Checkbox: React.FC<React.ComponentProps<typeof CheckboxPrimitive.Root>> = ({
  className,
  ...props
}) => (
  <CheckboxPrimitive.Root className={cn(rootVariants({ className }))} {...props}>
    <CheckboxPrimitive.Indicator className={cn(indicatorVariants())}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

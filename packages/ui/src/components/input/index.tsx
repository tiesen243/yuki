import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import type { InputVariants } from './variants'
import { inputVariants } from './variants'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & InputVariants
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ className }))}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }

import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import type { InputVariants } from './variants'
import { inputVariants } from './variants'

const Input: React.FC<React.ComponentProps<'input'> & InputVariants> = ({
  className,
  ...props
}) => <input className={cn(inputVariants({ className }))} {...props} />
Input.displayName = 'Input'

export { Input }

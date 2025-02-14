import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import type { TextareaVariants } from './variants'
import { textareaVariants } from './variants'

const Textarea: React.FC<React.ComponentProps<'textarea'> & TextareaVariants> = ({
  className,
  ...props
}) => <textarea className={cn(textareaVariants({ className }))} {...props} />
Textarea.displayName = 'Textarea'

export { Textarea }

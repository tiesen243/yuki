import * as React from 'react'

import { cn } from '@yuki/ui/utils'

import type { TextareaVariants } from './variants'
import { textareaVariants } from './variants'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & TextareaVariants
>(({ className, ...props }, ref) => {
  return <textarea className={cn(textareaVariants({ className }))} ref={ref} {...props} />
})
Textarea.displayName = 'Textarea'

export { Textarea }

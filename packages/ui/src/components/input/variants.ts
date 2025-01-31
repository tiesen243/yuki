import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const inputVariants = cva(
  'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
)
type InputVariants = VariantProps<typeof inputVariants>

export type { InputVariants }
export { inputVariants }

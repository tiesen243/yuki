import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const labelVariants = cva(
  'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)
type LabelVariants = VariantProps<typeof labelVariants>

export type { LabelVariants }
export { labelVariants }

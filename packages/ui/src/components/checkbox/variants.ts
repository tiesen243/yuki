import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const rootVariants = cva(
  'peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border shadow-sm focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
)
type RootVariants = VariantProps<typeof rootVariants>

const indicatorVariants = cva('flex items-center justify-center text-current')
type IndicatorVariants = VariantProps<typeof indicatorVariants>

export { rootVariants, indicatorVariants }
export type { RootVariants, IndicatorVariants }

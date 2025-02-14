import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const cardVariants = cva('bg-card text-card-foreground rounded-xl border shadow-sm', {
  variants: {
    variant: {
      default: '',
      pressable: 'hover:bg-secondary transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
type CardVariants = VariantProps<typeof cardVariants>

const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6')
type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>

const cardTitleVariants = cva('text-lg leading-none font-semibold tracking-tight')
type CardTitleVariants = VariantProps<typeof cardTitleVariants>

const cardDescriptionVariants = cva('text-muted-foreground text-sm')
type CardDescriptionVariants = VariantProps<typeof cardDescriptionVariants>

const cardContentVariants = cva('p-6 pt-0')
type CardContentVariants = VariantProps<typeof cardContentVariants>

const cardFooterVariants = cva('flex items-center p-6 pt-0')
type CardFooterVariants = VariantProps<typeof cardFooterVariants>

export type {
  CardVariants,
  CardHeaderVariants,
  CardTitleVariants,
  CardDescriptionVariants,
  CardContentVariants,
  CardFooterVariants,
}
export {
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
}

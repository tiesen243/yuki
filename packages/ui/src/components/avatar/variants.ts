import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const avatarVariants = cva('relative flex h-10 w-10 shrink-0 overflow-hidden', {
  variants: {
    shape: {
      square: 'aspect-square',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    shape: 'circle',
  },
})
type AvatarVariants = VariantProps<typeof avatarVariants>

const avatarImageVariants = cva('aspect-square h-full w-full object-cover')
type AvatarImageVariants = VariantProps<typeof avatarImageVariants>

const avatarFallbackVariants = cva(
  'bg-muted flex h-full w-full items-center justify-center',
  {
    variants: {
      shape: {
        square: 'aspect-square',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      shape: 'circle',
    },
  },
)
type AvatarFallbackVariants = VariantProps<typeof avatarFallbackVariants>

export type { AvatarVariants, AvatarImageVariants, AvatarFallbackVariants }
export { avatarVariants, avatarImageVariants, avatarFallbackVariants }

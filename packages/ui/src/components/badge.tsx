import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@yuki/ui/utils'

const badgeVariants = cva(
  'ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex w-fit shrink-0 items-center justify-center gap-1 border px-2 py-0.5 text-xs font-semibold whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
        success:
          'text-success-foreground [a&]:hover:bg-destructive/90 bg-success border-transparent shadow-sm',
        info: 'text-info-foreground [a&]:hover:bg-destructive/90 bg-info border-transparent shadow-sm',
        warning:
          'text-warning-foreground [a&]:hover:bg-destructive/90 bg-warning border-transparent shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 border-transparent shadow-sm',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  rounded,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, rounded, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

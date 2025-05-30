import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@yuki/ui/utils'

const badgeVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
        success:
          'bg-success/10 [a&]:hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 text-success border-transparent [&>svg]:text-current',
        info: 'bg-info/10 [a&]:hover:bg-info/90 focus-visible:ring-info/20 dark:focus-visible:ring-info/40 text-info border-transparent [&>svg]:text-current',
        warning:
          'bg-warning/10 [a&]:hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 text-warning border-transparent [&>svg]:text-current',
        destructive:
          'bg-destructive/10 [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive border-transparent [&>svg]:text-current',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      size: {
        default: 'px-2 py-0.5 text-xs [&>svg]:size-3',
        sm: 'px-1.5 py-0.25 text-xs [&>svg]:size-2.5',
        lg: 'px-3 py-1 text-sm [&>svg]:size-4',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  size,
  rounded,

  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

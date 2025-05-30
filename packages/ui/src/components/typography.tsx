import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@yuki/ui/utils'

const typographyVariants = cva(
  'mb-1 font-sans text-base leading-7 font-normal',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-7xl font-extrabold tracking-tight text-balance lg:text-8xl',
        h2: 'scroll-m-20 text-5xl font-bold tracking-tight text-balance first:mt-0 lg:text-6xl',
        h3: 'scroll-m-20 text-4xl font-semibold tracking-tight text-balance lg:text-5xl',
        h4: 'scroll-m-20 text-3xl font-semibold tracking-tight text-balance lg:text-4xl',
        h5: 'scroll-m-20 text-xl font-semibold tracking-tight text-balance lg:text-2xl',
        h6: 'scroll-m-20 text-lg font-semibold tracking-tight text-balance lg:text-xl',
        p: 'text-base text-pretty lg:text-lg',
        ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
        ol: '"my-6 [&>li]:mt-2" ml-6 list-decimal',
        blockquote:
          'mt-6 border-l-2 pl-6 italic before:content-["“"] after:content-["”"]',
        code: 'bg-muted relative w-fit rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium',
        caption: 'block text-sm tracking-wide',
      },
      color: {
        default: 'text-foreground',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
        destructive: 'text-destructive',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'p',
      color: 'default',
    },
  },
)

interface TypographyProps
  extends Omit<React.ComponentProps<'p'>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

function Typography({
  className,
  variant = 'p',
  color,
  as,
  ...props
}: TypographyProps) {
  const Comp = as ?? (variant as React.ElementType)

  return (
    <Comp
      data-slot="typography"
      className={cn(typographyVariants({ variant, color, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }

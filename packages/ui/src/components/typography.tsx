import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@yuki/ui/utils'

const typographyVariants = cva('font-sans text-base leading-7 font-normal', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0 lg:text-4xl',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight lg:text-lg',
      p: '[&:not(:first-child)]:mt-6',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: '"my-6 [&>li]:mt-2" ml-6 list-decimal',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'bg-muted relative w-fit rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    color: {
      default: 'text-foreground',
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
    color: 'default',
  },
})

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

export { Typography }

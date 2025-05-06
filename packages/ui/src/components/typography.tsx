import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@yuki/ui/utils'

const typographyVariants = cva('font-sans text-base leading-7 font-normal', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: '"my-6 [&>li]:mt-2" ml-6 list-decimal',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'bg-muted relative w-fit rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    size: {
      default: '',
      sm: 'text-sm leading-none font-medium',
      lg: 'text-lg font-semibold',
    },
    color: {
      default: 'text-foreground',
      desctructive: 'text-destructive-foreground',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
    size: 'default',
    color: 'default',
  },
})

function Typography({
  className,
  variant = 'p',
  size,
  color,
  ...props
}: React.ComponentProps<'p'> & VariantProps<typeof typographyVariants>) {
  const Comp = variant as React.ElementType

  return (
    <Comp
      data-slot="button"
      className={cn(typographyVariants({ variant, size, color, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }

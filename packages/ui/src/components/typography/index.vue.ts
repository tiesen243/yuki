import type { VariantProps } from 'class-variance-authority'
import type { PropType } from 'vue'
import { cva } from 'class-variance-authority'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const typographyVariants = cva('text-foreground font-sans text-base font-normal', {
  variants: {
    level: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-4',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
      blockquote: 'my-4 border-l-2 pl-6 italic',
      code: 'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    level: 'p',
    color: 'primary',
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof typographyVariants> {}

const Typography = defineComponent({
  name: 'Typography',
  props: {
    level: { type: String as PropType<TypographyProps['level']>, default: 'p' },
    color: { type: String as PropType<TypographyProps['color']>, default: 'primary' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.level as string,
        { class: cn(typographyVariants(props)) },
        { default: () => slots.default?.() },
      )
  },
})

export { Typography }

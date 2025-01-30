import type { VariantProps } from 'class-variance-authority'
import type { PropType } from 'vue'
import { cva } from 'class-variance-authority'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const buttonVariants = cva(
  'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs',
        outline:
          'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: string
}

const Button = defineComponent({
  name: 'Button',
  props: {
    variant: String as PropType<ButtonProps['variant']>,
    size: String as PropType<ButtonProps['size']>,
    as: String as PropType<ButtonProps['as']>,
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as ?? 'button',
        { class: cn(buttonVariants(props)) },
        { default: () => slots.default?.() },
      )
  },
})

export { Button, buttonVariants }

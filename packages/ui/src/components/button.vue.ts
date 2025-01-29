import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

import type { ButtonProps } from '@yuki/ui/components/button'
import { cn } from '@yuki/ui/utils'

import { buttonVariants } from './button'

const Button = defineComponent({
  name: 'Button',
  props: {
    variant: String as PropType<ButtonProps['variant']>,
    size: String as PropType<ButtonProps['size']>,
    as: { type: String, default: 'button' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        { class: cn(buttonVariants(props)) },
        { default: () => slots.default?.() },
      )
  },
})

export { Button }

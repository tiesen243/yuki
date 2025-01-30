import { cva } from 'class-variance-authority'
import { Label as LabelPrimitive } from 'radix-vue'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const labelVariants = cva(
  'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = defineComponent({
  name: 'Label',
  setup(props, { slots }) {
    return () =>
      h(
        LabelPrimitive,
        { class: cn(labelVariants(props)) },
        { default: () => slots.default?.() },
      )
  },
})

export { Label }

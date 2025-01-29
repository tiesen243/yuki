import { Label as LabelPrimitive } from 'radix-vue'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

import { labelVariants } from './label'

const Label = defineComponent({
  name: 'Label',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        LabelPrimitive,
        { class: cn(labelVariants(), props.class) },
        { default: () => slots.default?.() },
      )
  },
})

export { Label }

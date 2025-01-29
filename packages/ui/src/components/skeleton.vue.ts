import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const Skeleton = defineComponent({
  name: 'Skeleton',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: cn('bg-primary/10 animate-pulse rounded-md', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

export { Skeleton }

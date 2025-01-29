import type { InputHTMLAttributes } from 'vue'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const Input = defineComponent({
  name: 'Input',
  props: ['modelValue', 'class'],
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'input',
        {
          value: props.modelValue,
          onInput: (e: Event) => {
            emit('update:modelValue', (e.target as InputHTMLAttributes).value)
          },
          class: cn(
            'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            props.class as string,
          ),
        },
        { default: () => slots.default?.() },
      )
  },
})

export { Input }

import type { InputHTMLAttributes } from 'vue'
import * as React from 'react'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

const VueTextarea = defineComponent({
  name: 'Textarea',
  props: ['modelValue', 'class'],
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'textarea',
        {
          value: props.modelValue,
          onInput: (e: Event) => {
            emit('update:modelValue', (e.target as InputHTMLAttributes).value)
          },
          class: cn(
            'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            props.class as string,
          ),
        },
        slots.default?.(),
      )
  },
})

export { Textarea, VueTextarea }

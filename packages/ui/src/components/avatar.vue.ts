import * as VueAvatarPrimitive from 'radix-vue'
import { defineComponent, h } from 'vue'

import { cn } from '@yuki/ui/utils'

const Avatar = defineComponent({
  name: 'Avatar',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        VueAvatarPrimitive.AvatarRoot,
        {
          class: cn(
            'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
            props.class,
          ),
        },
        { default: () => slots.default?.() },
      )
  },
})

const AvatarImage = defineComponent({
  name: 'AvatarImage',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        VueAvatarPrimitive.AvatarImage,
        // @ts-expect-error - `class` is reserved in Vue
        { class: cn('aspect-square h-full w-full', props.class) },
        { default: () => slots.default?.() },
      )
  },
})

const AvatarFallback = defineComponent({
  name: 'AvatarFallback',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        VueAvatarPrimitive.AvatarFallback,
        {
          class: cn(
            'bg-muted flex h-full w-full items-center justify-center rounded-full',
            props.class,
          ),
        },
        { default: () => slots.default?.() },
      )
  },
})

export { Avatar, AvatarImage, AvatarFallback }

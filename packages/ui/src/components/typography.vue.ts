import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

import type { TypographyProps } from '@yuki/ui/components/typography'
import { cn } from '@yuki/ui/utils'

import { typographyVariants } from './typography'

const Typography = defineComponent({
  name: 'Typography',
  props: {
    level: { type: String as PropType<TypographyProps['level']>, default: 'p' },
    color: { type: String as PropType<TypographyProps['color']>, default: 'primary' },
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.level as string,
        {
          class: cn(
            typographyVariants({
              level: props.level,
              color: props.color,
              className: props.class,
            }),
          ),
        },
        { default: () => slots.default?.() },
      )
  },
})

export { Typography }

<script setup lang="ts">
import type { AsTag, PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import type { TypographyVariants } from './variants'
import { typographyVariants } from './variants'

interface Props extends PrimitiveProps {
  level?: TypographyVariants['level']
  color?: TypographyVariants['color']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  level: 'p',
  color: 'primary',
  class: '',
})
</script>

<template>
  <Primitive
    :as="level as AsTag"
    :as-child="asChild"
    :class="cn(typographyVariants({ level, color }), props.class)"
  >
    <slot />
  </Primitive>
</template>

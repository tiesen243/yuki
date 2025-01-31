<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import type { CardVariants } from './variants'
import { cardVariants } from './variants'

interface Props extends PrimitiveProps {
  variant?: CardVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  as: 'div',
  class: '',
})
</script>

<template>
  <Primitive :as="as" :class="cn(cardVariants({ variant, class: props.class }))">
    <slot />
  </Primitive>
</template>

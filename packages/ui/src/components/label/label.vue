<script setup lang="ts">
import type { LabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Label } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import { labelVariants } from './variants'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="cn(labelVariants({ class: props.class }))"
  >
    <slot />
  </Label>
</template>

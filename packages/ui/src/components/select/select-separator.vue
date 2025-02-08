<script setup lang="ts">
import type { SelectSeparatorProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { SelectSeparator } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import { selectSeparatorVariants } from './variants'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="cn(selectSeparatorVariants, props.class)"
  />
</template>

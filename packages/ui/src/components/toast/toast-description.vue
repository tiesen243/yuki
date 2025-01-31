<script setup lang="ts">
import type { ToastDescriptionProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { ToastDescription } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import { toastDescriptionVariants } from './variants'

const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastDescription
    :class="cn(toastDescriptionVariants({ class: props.class }))"
    v-bind="delegatedProps"
  >
    <slot />
  </ToastDescription>
</template>

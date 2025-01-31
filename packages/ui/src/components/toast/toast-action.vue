<script setup lang="ts">
import type { ToastActionProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { ToastAction } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import { toastActionVariants } from './variants'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastAction
    v-bind="delegatedProps"
    :class="cn(toastActionVariants({ class: props.class }))"
  >
    <slot />
  </ToastAction>
</template>

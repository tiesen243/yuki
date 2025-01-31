<script setup lang="ts">
import type { ToastViewportProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { ToastViewport } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import { toastViewportVariants } from './variants'

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="cn(toastViewportVariants({ class: props.class }))"
  />
</template>

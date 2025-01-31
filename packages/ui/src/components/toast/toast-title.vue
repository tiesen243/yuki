<script setup lang="ts">
import type { ToastTitleProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { ToastTitle } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import { toastTitleVariants } from './variants'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastTitle
    v-bind="delegatedProps"
    :class="cn(toastTitleVariants({ class: props.class }))"
  >
    <slot />
  </ToastTitle>
</template>

<script setup lang="ts">
import type { ToastCloseProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { X } from 'lucide-vue-next'
import { ToastClose } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import { toastCloseVariants } from './variants'

const props = defineProps<ToastCloseProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastClose
    v-bind="delegatedProps"
    :class="cn(toastCloseVariants({ class: props.class }))"
  >
    <X class="h-4 w-4" />
  </ToastClose>
</template>

<script setup lang="ts">
import type { ToastRootEmits, ToastRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { ToastRoot, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import type { ToastVariants } from './variants'
import { toastVariants } from './variants'

interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>

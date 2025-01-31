<script setup lang="ts">
import type { ToastRootEmits } from 'radix-vue'
import { ToastRoot, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'

import { cn } from '@yuki/ui/utils'

import type { ToastProps } from './index.vue'
import { toastVariants } from './variants'

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

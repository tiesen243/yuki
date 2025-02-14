<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import { indicatorVariants, rootVariants } from './variants'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cn(rootVariants(props.class))">
    <CheckboxIndicator :class="cn(indicatorVariants(props))">
      <slot>
        <Check class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

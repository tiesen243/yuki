<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import {
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import { SelectScrollDownButton, SelectScrollUpButton } from '.'
import { selectContentVariants, selectViewportVariants } from './variants'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    position: 'popper',
    class: '',
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(selectContentVariants({ position, class: props.class }))"
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn(selectViewportVariants({ position }))">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>

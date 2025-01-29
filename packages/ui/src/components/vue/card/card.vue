<script setup lang="ts">
import { cn } from '@yuki/ui/utils'

interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    :class="
      cn('bg-card text-card-foreground rounded-xl border shadow-sm', $attrs.class ?? '')
    "
  >
    <slot />
  </component>
</template>

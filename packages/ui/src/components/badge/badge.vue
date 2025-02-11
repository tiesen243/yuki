<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@yuki/ui/utils'

import type { BadgeVariants } from './variants'
import { badgeVariants } from './variants'

interface Props {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'NEW',
  class: '',
})
</script>

<template>
  <span :class="cn(badgeVariants({ variant, class: props.class }))">
    <slot />
  </span>
</template>

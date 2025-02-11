<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@yuki/ui/utils'

import { tableHeaderVariants } from './variants'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead :class="cn(tableHeaderVariants(props))">
    <slot />
  </thead>
</template>

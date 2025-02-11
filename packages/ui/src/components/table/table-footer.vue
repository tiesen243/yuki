<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@yuki/ui/utils'

import { tableFooterVariants } from './variants'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tfoot :class="cn(tableFooterVariants(props))">
    <slot />
  </tfoot>
</template>

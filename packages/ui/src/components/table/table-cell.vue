<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@yuki/ui/utils'

import { tableCellVariants } from './variants'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <td :class="cn(tableCellVariants(props))">
    <slot />
  </td>
</template>

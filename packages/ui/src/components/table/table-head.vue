<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@yuki/ui/utils'

import { tableHeadVariants } from './variants'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <th :class="cn(tableHeadVariants(props))">
    <slot />
  </th>
</template>

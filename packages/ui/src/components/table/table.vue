<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@yuki/ui/utils'

import { tableVariants } from './variants'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <table :class="cn(tableVariants(props))">
    <slot />
  </table>
</template>

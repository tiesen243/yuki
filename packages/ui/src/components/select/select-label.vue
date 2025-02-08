<script setup lang="ts">
import type { SelectLabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { SelectLabel } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import { selectLabelVariants } from './variants'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SelectLabel :class="cn(selectLabelVariants, props.class)">
    <slot />
  </SelectLabel>
</template>

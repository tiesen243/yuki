<script setup lang="ts">
import { AvatarRoot } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

const defaultStyle = 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'
</script>

<template>
  <AvatarRoot :class="cn(defaultStyle, $attrs.class ?? '')">
    <slot />
  </AvatarRoot>
</template>

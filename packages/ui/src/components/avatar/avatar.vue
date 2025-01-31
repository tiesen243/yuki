<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AvatarRoot } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import type { AvatarVariants } from './variants'
import { avatarVariants } from './variants'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    shape?: AvatarVariants['shape']
  }>(),
  {
    shape: 'circle',
    class: '',
  },
)
</script>

<template>
  <AvatarRoot :class="cn(avatarVariants({ shape, class: props.class }))">
    <slot />
  </AvatarRoot>
</template>

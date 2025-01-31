<script setup lang="ts">
import type { AvatarFallbackProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { AvatarFallback } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import type { AvatarFallbackVariants } from './variants'
import { avatarFallbackVariants } from './variants'

const props = withDefaults(
  defineProps<
    AvatarFallbackProps & {
      class?: HTMLAttributes['class']
      shape?: AvatarFallbackVariants['shape']
    }
  >(),
  {
    shape: 'circle',
    class: '',
  },
)
</script>

<template>
  <AvatarFallback
    v-bind="props"
    :class="cn(avatarFallbackVariants({ shape: props.shape, class: props.class }))"
  >
    <slot />
  </AvatarFallback>
</template>

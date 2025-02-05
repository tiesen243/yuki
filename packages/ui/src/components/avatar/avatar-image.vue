<script setup lang="ts">
import type { AvatarImageProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { AvatarImage } from 'radix-vue'

import { cn } from '@yuki/ui/utils'

import { avatarImageVariants } from './variants'

const props = withDefaults(
  defineProps<
    AvatarImageProps & {
      class?: HTMLAttributes['class']
    }
  >(),
  {
    class: '',
  },
)
</script>

<template>
  <AvatarImage
    v-bind="props"
    :class="cn(avatarImageVariants({ class: props.class }))"
  />
</template>

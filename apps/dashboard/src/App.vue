<template>
  <RouterView />
  <Toaster :theme="isDark ? 'dark' : 'light'" rich-colors />
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

import { Toaster } from '@yuki/ui/vue/toast'

const isDark = useDark()
</script>

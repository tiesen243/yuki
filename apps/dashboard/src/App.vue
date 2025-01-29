<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Toaster } from '@yuki/ui/vue/toast'

import Header from '@/components/header.vue'

const mode = useColorMode()
</script>

<template>
  <Header />
  <RouterView />
  <Toaster rich-colors :theme="mode === 'dark' ? 'dark' : 'light'" />
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'

import { Toaster } from '@yuki/ui/vue/toast'

import Header from '@/components/header.vue'

const isDark = useDark()
</script>

<template>
  <Header />
  <RouterView />
  <Toaster :theme="isDark ? 'dark' : 'light'" rich-colors />
</template>

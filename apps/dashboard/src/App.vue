<script setup lang="ts">
import { RouterView } from 'vue-router'

import { Toaster } from '@yuki/ui/vue/toast'

import Header from '@/components/header.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Toaster />
</template>

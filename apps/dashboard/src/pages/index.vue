<template>
  <main class="container py-4">
    <p v-if="isLoading">Loading...</p>
    <pre class="max-h-[500px] overflow-y-auto">{{
      JSON.stringify(products, null, 2)
    }}</pre>

    <Button
      variant="outline"
      size="icon"
      class="fixed right-4 bottom-4"
      @click="toggle()"
    >
      <MoonIcon v-if="isDark" />
      <SunIcon v-else />
    </Button>
  </main>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import { Button } from '@yuki/ui/vue/button'
import { MoonIcon, SunIcon } from '@yuki/ui/vue/icons'

import { useProducts } from '@/hooks/use-products'

const isDark = useDark()
const toggle = useToggle(isDark)

const { products = [], isLoading } = useProducts({ limit: 10 })
</script>

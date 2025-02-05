<template>
  <div>
    <header
      class="bg-background/70 sticky inset-0 border-b py-2 backdrop-blur-xl backdrop-saturate-150"
    >
      <div class="container flex items-center justify-between gap-4">
        <img src="https://tiesen.id.vn/assets/logo.svg" class="size-10 dark:invert" />
        <Button variant="outline" size="icon" @click="toggle()">
          <MoonIcon v-if="isDark" />
          <SunIcon v-else />
        </Button>
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import { Button } from '@yuki/ui/vue/button'
import { MoonIcon, SunIcon } from '@yuki/ui/vue/icons'

const isDark = useDark()
const toggle = useToggle(isDark)
</script>

<template>
  <main class="container py-4">
    <article>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis iste non qui
      laudantium explicabo, enim beatae molestias aliquid tempore autem repellendus
      consectetur eos amet iure sapiente animi quasi impedit natus!
    </article>

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

const isDark = useDark()
const toggle = useToggle(isDark)
</script>

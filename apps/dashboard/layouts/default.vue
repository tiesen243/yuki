<template>
  <div>
    <header
      className="bg-background/70 sticky inset-0 z-50 flex h-20 items-center border-b shadow-md backdrop-blur-xl backdrop-saturate-150"
    >
      <div class="container flex items-center justify-between gap-4">
        <RouterLink to="/" class="flex items-center gap-4 text-xl font-bold">
          <img src="https://tiesen.id.vn/assets/logo.svg" class="size-9 dark:invert" />
          <span class="sr-only md:not-sr-only">Dashboard</span>
        </RouterLink>

        <nav
          class="*:text-muted-foreground *:hover:text-foreground flex grow items-center gap-2 transition-colors"
        >
          <RouterLink v-for="link in navLinks" :key="link.href" :to="link.href">
            {{ link.name }}
          </RouterLink>
        </nav>

        <Button variant="outline" size="icon" @click="toggleTheme">
          <SunIcon v-if="colorMode.preference === 'light'" />
          <MoonIcon v-else />
        </Button>
      </div>
    </header>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Button } from '@yuki/ui/vue/button'
import { MoonIcon, SunIcon } from '@yuki/ui/vue/icons'

const navLinks = [
  { name: 'Product', href: '/product' },
  { name: 'Category', href: '/category' },
  { name: 'Orders', href: '/orders' },
  { name: 'Customers', href: '/customers' },
]

const colorMode = useColorMode()
const toggleTheme = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  )
  document.head.appendChild(css)
  if (colorMode.preference === 'dark') colorMode.preference = 'light'
  else colorMode.preference = 'dark'
  return () => {
    ;(() => window.getComputedStyle(document.body))()
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}
</script>

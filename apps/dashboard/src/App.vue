<template>
  <header class="bg-background border-b shadow-sm">
    <nav class="container flex h-16 justify-between">
      <div class="flex items-center">
        <h1 class="text-xl font-bold">Yuki Dashboard</h1>

        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <component :is="item.icon" class="size-4" /> {{ item.name }}
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center">
        <Button variant="outline" size="icon" @click="toggleTheme()">
          <component :is="isDark ? SunIcon : MoonIcon" class="size-4" />
        </Button>
      </div>
    </nav>
  </header>

  <RouterView />

  <Toaster :theme="isDark ? 'dark' : 'light'" rich-colors />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

import { Button } from '@yuki/ui/vue/button'
import {
  ClipboardListIcon,
  LayoutPanelTopIcon,
  MoonIcon,
  PackageIcon,
  SunIcon,
  UsersIcon,
} from '@yuki/ui/vue/icons'
import { Toaster } from '@yuki/ui/vue/toast'

const isDark = useDark()
const toggleTheme = useToggle(isDark)

const navItems = [
  { name: 'Categories', href: '/categories', icon: LayoutPanelTopIcon },
  { name: 'Products', href: '/products', icon: PackageIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Orders', href: '/orders', icon: ClipboardListIcon },
]
</script>

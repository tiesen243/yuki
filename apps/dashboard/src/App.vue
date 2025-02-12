<template>
  <header class="bg-background border-b shadow-sm">
    <div class="container flex h-16 items-center justify-between">
      <div class="flex items-center justify-between gap-6">
        <RouterLink to="/">
          <img :src="logo" alt="logo" class="size-9 dark:invert" />
          <h1 class="sr-only text-xl font-bold md:block">Yuki Dashboard</h1>
        </RouterLink>

        <nav class="flex items-center gap-4">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="text-muted-foreground hover:text-foreground textxs aria-[current=page]:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <component :is="item.icon" class="size-4" />
            <span class="md::block hidden">
              {{ item.name }}
            </span>
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <div v-if="isLoading" class="size-9 animate-pulse rounded-full bg-current" />
        <Button v-else-if="!session?.user" :as="RouterLink" to="/sign-in" size="sm">
          Sign in
        </Button>
        <Avatar v-else class="ring-ring size-9 hover:ring-2" @click="handleLogout">
          <AvatarImage :src="session?.user?.image ?? ''" />
          <AvatarFallback>{{ session?.user?.name.at(0) }}</AvatarFallback>
        </Avatar>

        <Button variant="outline" size="icon" @click="toggleTheme()">
          <component :is="isDark ? SunIcon : MoonIcon" class="size-4" />
        </Button>
      </div>
    </div>
  </header>

  <RouterView />

  <Toaster :theme="isDark ? 'dark' : 'light'" rich-colors />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/vue/avatar'
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

import { env } from '@/env'
import { useSession } from '@/hooks/use-session'

const logo = `${env.VUE_PUBLIC_WEB_URL}/assets/logo.svg`

const isDark = useDark()
const toggleTheme = useToggle(isDark)

const navItems = [
  { name: 'Categories', href: '/categories', icon: LayoutPanelTopIcon },
  { name: 'Products', href: '/products', icon: PackageIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Orders', href: '/orders', icon: ClipboardListIcon },
]

const { session, isLoading, signOut } = useSession()

const handleLogout = () => {
  if (window.confirm('Are you sure you want to log out?')) signOut()
}
</script>

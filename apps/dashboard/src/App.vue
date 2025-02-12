<template>
  <header class="bg-background border-b shadow-sm">
    <div class="container flex h-16 justify-between">
      <div class="flex items-center">
        <RouterLink to="/">
          <h1 class="text-xl font-bold">Yuki Dashboard</h1>
        </RouterLink>

        <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <component :is="item.icon" class="size-4" /> {{ item.name }}
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

import { useSession } from './hooks/use-session'

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

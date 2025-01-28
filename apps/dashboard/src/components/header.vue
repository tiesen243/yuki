<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  MoonIcon,
  Skeleton,
  SunIcon,
} from '@yuki/ui/vue'

import { useSession } from '@/hooks/use-session'
import { getAppUrl } from '@/lib/utils'

const { session, isLoading } = useSession()
const mode = useColorMode()

const logoUrl = `${getAppUrl()}/assets/logo.svg`

const navLinks = [
  { label: 'Categories', href: '/categories' },
  { label: 'Products', href: '/products' },
  { label: 'Orders', href: '/orders' },
  { label: 'Customers', href: '/customers' },
]
</script>

<template>
  <header
    class="bg-background/70 sticky inset-0 z-50 border-b py-4 shadow-md backdrop-blur-xl backdrop-saturate-150"
  >
    <div class="container flex items-center justify-between gap-4">
      <RouterLink to="/" class="flex items-center gap-2 text-2xl font-bold">
        <img class="size-9 dark:invert" :src="logoUrl" alt="Logo" />
        <span class="sr-only not-sr-only">Dashboard</span>
      </RouterLink>

      <nav class="hidden grow gap-2 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="text-muted-foreground hover:text-foreground"
          :class="{ 'text-primary': $route.path.startsWith(link.href) }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <Skeleton v-if="isLoading" class="size-9 rounded-full" />
      <Button v-else-if="!session?.user"> Login </Button>
      <Avatar v-else class="ring-ring size-9 hover:ring-2">
        <AvatarFallback>{session.user.name[0]}</AvatarFallback>
        <AvatarImage :src="session.user.image" :alt="session.user.name" />
      </Avatar>

      <Button
        variant="ghost"
        size="icon"
        @click="mode = mode === 'dark' ? 'light' : 'dark'"
      >
        <SunIcon v-if="mode === 'light'" />
        <MoonIcon v-else />
      </Button>
    </div>
  </header>
</template>

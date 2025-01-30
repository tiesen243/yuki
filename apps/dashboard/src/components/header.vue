<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/vue/avatar'
import { Button, buttonVariants } from '@yuki/ui/vue/button'
import { LogOutIcon, MoonIcon, SunIcon } from '@yuki/ui/vue/icons'

import { useSession } from '@/hooks/use-session'
import { getWebUrl } from '@/lib/utils'

const { session, isLoading, signOut, isSigningOut } = useSession()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const logoUrl = `${getWebUrl()}/assets/logo.svg`

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
      <RouterLink
        to="/"
        class="flex grow items-center gap-2 text-2xl font-bold md:grow-0"
      >
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

      <div v-if="isLoading" class="size-9 animate-pulse rounded-full" />
      <RouterLink
        v-else-if="!session?.user"
        to="/sign-in"
        :class="buttonVariants({ variant: 'ghost' })"
      >
        Login
      </RouterLink>
      <Avatar v-else class="ring-ring size-9 hover:ring-2">
        <AvatarFallback>{session.user.name[0]}</AvatarFallback>
        <AvatarImage :src="session.user.image" :alt="session.user.name" />
      </Avatar>

      <Button
        v-if="session?.user"
        variant="ghost"
        size="icon"
        :disabled="isSigningOut"
        @click="signOut()"
      >
        <LogOutIcon />
      </Button>

      <Button variant="ghost" size="icon" @click="toggleDark()">
        <MoonIcon v-if="isDark" />
        <SunIcon v-else />
      </Button>
    </div>
  </header>
</template>

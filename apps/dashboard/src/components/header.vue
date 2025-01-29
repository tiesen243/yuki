<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { buttonVariants } from '@yuki/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/vue/avatar'
import { Button } from '@yuki/ui/vue/button'
import { LogOutIcon, MoonIcon, SunIcon } from '@yuki/ui/vue/icons'
import { Skeleton } from '@yuki/ui/vue/skeleton'

import { useSession } from '@/hooks/use-session'
import { getWebUrl } from '@/lib/utils'

const { session, isLoading, signOut, isSigningOut } = useSession()
const mode = useColorMode()

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
        <img class="size-9 dark:invert" :src="logoUrl" alt="Logo">
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
      <RouterLink
        v-else-if="!session?.user"
        to="/auth/sign-in"
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

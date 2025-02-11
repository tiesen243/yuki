<template>
  <main class="container flex min-h-[90dvh] flex-col items-center justify-center">
    <div class="space-y-6 text-center">
      <Typography level="h1">404</Typography>
      <Typography level="h2" class="border-none">Page Not Found</Typography>
      <Typography>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Typography } from '@yuki/ui/vue/typography'
</script>

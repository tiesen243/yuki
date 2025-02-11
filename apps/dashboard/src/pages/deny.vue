<template>
  <main class="container flex min-h-[90dvh] flex-col items-center justify-center">
    <div class="space-y-6 text-center">
      <Typography level="h1">403</Typography>
      <Typography level="h2" class="border-none">Access Denied</Typography>
      <Typography>
        Sorry, you don't have permission to access this page. Please contact your
        administrator if you believe this is an error.
      </Typography>
    </div>
  </main>
</template>

<script setup>
import { Typography } from '@yuki/ui/vue/typography'
</script>

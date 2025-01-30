<script setup lang="ts">
import { Button } from '@yuki/ui/vue/button'
import { Typography } from '@yuki/ui/vue/typography'
</script>
<template>
  <main class="flex min-h-[90dvh] flex-col items-center justify-center">
    <Typography level="h1">
      Access Denied
    </Typography>
    <Typography> You do not have permission to access this page. ᗜ˰ᗜ </Typography>

    <Button as="a" href="https://youtu.be/dQw4w9WgXcQ" class="mt-4">
      Request Access
    </Button>
  </main>
</template>

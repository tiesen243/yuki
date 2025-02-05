<template>
  <main class="container py-4">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nostrum tempore
    sunt. Rem iusto doloribus sapiente et atque ipsam, modi consectetur ullam animi
    dolorum cum dignissimos incidunt dolores aut? Vitae!

    <pre>
      {{ JSON.stringify(data, null, 2) }}
    </pre>
  </main>
</template>

<script setup lang="ts">
import { api } from '@/lib/api'

const data = await api.product.getAll.query({ limit: 10 })
</script>

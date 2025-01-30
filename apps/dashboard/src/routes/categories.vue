<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import type { Category } from '@yuki/db'
import { Button } from '@yuki/ui/vue/button'

const headers = ref(['Name', 'Number of Products', 'Actions'])
const categories: Ref<(Category & { NoP: number })[]> = ref([
  { id: '1', name: 'Fiction', NoP: 25 },
  { id: '2', name: 'Non-Fiction', NoP: 18 },
  { id: '3', name: 'Mystery', NoP: 22 },
  { id: '4', name: 'Science Fiction', NoP: 15 },
  { id: '5', name: 'Romance', NoP: 30 },
  { id: '6', name: 'Biography', NoP: 12 },
  { id: '7', name: 'Fantasy', NoP: 20 },
  { id: '8', name: 'Self-Help', NoP: 16 },
  { id: '9', name: 'Historical Fiction', NoP: 14 },
  { id: '10', name: 'Children Literature', NoP: 19 },
])
</script>

<template>
  <main class="container py-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Categories
    </h1>

    <table class="mt-4 w-full">
      <thead>
        <tr class="even:bg-muted m-0 border-t p-0">
          <th
            v-for="header in headers"
            :key="header"
            class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
          class="even:bg-muted/40 m-0 border-t p-0"
        >
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ category.name }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ category.NoP }}
          </td>
          <td
            class="grid grid-cols-2 gap-2 border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            <Button size="sm"> Edit </Button>
            <Button variant="destructive" size="sm"> Delete </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

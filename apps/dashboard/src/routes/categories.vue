<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@yuki/ui/vue/button'
import { Loader2Icon } from '@yuki/ui/vue/icons'

import { useCategories } from '@/hooks/use-categories'

const headers = ref(['Name', 'Number of Products', 'Actions'])
const { categories, isLoading } = useCategories({})
</script>

<template>
  <main class="container py-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Categories
    </h1>

    <div v-if="isLoading" class="flex h-64 items-center justify-center">
      <Loader2Icon class="h-8 w-8" />
    </div>

    <table v-else class="mt-4 w-full">
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
            {{ category.numberOfProducts }}
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

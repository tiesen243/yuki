<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@yuki/ui/vue/button'
import { Loader2Icon } from '@yuki/ui/vue/icons'

import { useProducts } from '@/hooks/use-products'

const headers = ref(['Name', 'Category', 'Price', 'Stock', 'Updated At', 'Actions'])
const { products, isLoading } = useProducts({})
</script>

<template>
  <main class="container py-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Products
    </h1>

    <div v-if="isLoading" class="flex h-64 items-center justify-center">
      <Loader2Icon class="h-12 w-12 animate-spin" />
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
          v-for="product in products"
          :key="product.id"
          class="even:bg-muted/40 m-0 border-t p-0"
        >
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ product.name }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ product.category.name }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ product.price }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ product.stock }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ product.updatedAt.toDateString() }}
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

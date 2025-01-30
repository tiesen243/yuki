<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import type { Category, Product } from '@yuki/db'
import { Button } from '@yuki/ui/vue/button'

const headers = ref(['Name', 'Category', 'Price', 'Stock', 'Updated At', 'Actions'])
const products: Ref<(Partial<Product> & { updatedAt: Date; category: Category })[]> = ref(
  [
    {
      id: '1',
      name: 'The Midnight Library',
      category: { id: '1', name: 'Fiction' },
      price: 14.99,
      stock: 45,
      updatedAt: new Date('2023-11-15'),
    },
    {
      id: '2',
      name: 'Atomic Habits',
      category: { id: '8', name: 'Self-Help' },
      price: 19.99,
      stock: 32,
      updatedAt: new Date('2023-11-14'),
    },
    {
      id: '3',
      name: 'Dune',
      category: { id: '4', name: 'Science Fiction' },
      price: 16.99,
      stock: 28,
      updatedAt: new Date('2023-11-13'),
    },
    {
      id: '4',
      name: 'Pride and Prejudice',
      category: { id: '5', name: 'Romance' },
      price: 12.99,
      stock: 50,
      updatedAt: new Date('2023-11-12'),
    },
    {
      id: '5',
      name: 'Steve Jobs Biography',
      category: { id: '6', name: 'Biography' },
      price: 24.99,
      stock: 15,
      updatedAt: new Date('2023-11-11'),
    },
    {
      id: '6',
      name: 'Harry Potter',
      category: { id: '7', name: 'Fantasy' },
      price: 21.99,
      stock: 60,
      updatedAt: new Date('2023-11-10'),
    },
    {
      id: '7',
      name: 'The Da Vinci Code',
      category: { id: '3', name: 'Mystery' },
      price: 15.99,
      stock: 25,
      updatedAt: new Date('2023-11-16'),
    },
    {
      id: '8',
      name: 'A Brief History of Time',
      category: { id: '2', name: 'Non-Fiction' },
      price: 18.99,
      stock: 20,
      updatedAt: new Date('2023-11-17'),
    },
    {
      id: '9',
      name: 'The Book Thief',
      category: { id: '9', name: 'Historical Fiction' },
      price: 13.99,
      stock: 30,
      updatedAt: new Date('2023-11-18'),
    },
    {
      id: '10',
      name: 'Where the Wild Things Are',
      category: { id: '10', name: 'Children Literature' },
      price: 11.99,
      stock: 40,
      updatedAt: new Date('2023-11-19'),
    },
  ],
)
</script>

<template>
  <main class="container py-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Products
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

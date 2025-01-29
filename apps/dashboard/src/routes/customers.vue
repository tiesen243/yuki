<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import type { User } from '@yuki/db'
import { Button } from '@yuki/ui/vue/button'

const headers = ref(['Name', 'Role', 'Number of Orders', 'Actions'])
const customers: Ref<(Partial<User> & { orderCount: number })[]> = ref([
  { id: '001', name: 'John Smith', role: 'USER', orderCount: 5 },
  { id: '002', name: 'Sarah Johnson', role: 'ADMIN', orderCount: 15 },
  { id: '003', name: 'Michael Brown', role: 'USER', orderCount: 3 },
  { id: '004', name: 'Emily Davis', role: 'ADMIN', orderCount: 12 },
  { id: '005', name: 'James Wilson', role: 'USER', orderCount: 7 },
  { id: '006', name: 'Lisa Anderson', role: 'USER', orderCount: 4 },
  { id: '007', name: 'Robert Taylor', role: 'ADMIN', orderCount: 20 },
  { id: '008', name: 'Maria Garcia', role: 'USER', orderCount: 6 },
  { id: '009', name: 'David Martinez', role: 'USER', orderCount: 8 },
  { id: '010', name: 'Jennifer Lee', role: 'ADMIN', orderCount: 18 },
])
</script>
<template>
  <main class="container py-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Customers
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
          v-for="customer in customers"
          :key="customer.id"
          class="even:bg-muted/40 m-0 border-t p-0"
        >
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ customer.name }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ customer.role }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ customer.orderCount }}
          </td>
          <td
            class="grid grid-cols-2 gap-2 border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            <Button size="sm">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

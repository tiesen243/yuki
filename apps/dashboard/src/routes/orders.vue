<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import type { Order, User } from '@yuki/db'

const headers = ref(['Order ID', 'Customer', 'Total', 'Status'])
const orders: Ref<(Partial<Order> & { customer: Partial<User> })[]> = ref([
  { id: '001', customer: { name: 'John Smith' }, total: 100, status: 'PENDING' },
  { id: '002', customer: { name: 'Sarah Johnson' }, total: 150, status: 'DELIVERED' },
  { id: '003', customer: { name: 'Michael Brown' }, total: 200, status: 'DELIVERED' },
  { id: '004', customer: { name: 'Emily Davis' }, total: 250, status: 'PENDING' },
  { id: '005', customer: { name: 'James Wilson' }, total: 300, status: 'CANCELED' },
  { id: '006', customer: { name: 'Lisa Anderson' }, total: 350, status: 'DELIVERED' },
  { id: '007', customer: { name: 'Robert Taylor' }, total: 400, status: 'PENDING' },
  { id: '008', customer: { name: 'Maria Garcia' }, total: 450, status: 'CANCELED' },
  { id: '009', customer: { name: 'David Martinez' }, total: 500, status: 'DELIVERED' },
  { id: '010', customer: { name: 'Jennifer Lee' }, total: 550, status: 'PENDING' },
])
</script>

<template>
  <main class="container py-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Orders</h1>

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
          v-for="order in orders"
          :key="order.id"
          class="even:bg-muted/40 m-0 border-t p-0"
        >
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ order.id }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ order.customer.name }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ order.total }}
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ order.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

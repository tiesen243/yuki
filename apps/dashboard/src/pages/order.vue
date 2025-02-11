<template>
  <main class="container py-4">
    <div class="mb-6">
      <h2 class="mb-4 text-2xl font-semibold">Customer Details</h2>
      <div class="grid grid-cols-2 gap-4 rounded-lg border p-4">
        <template v-if="isLoading">
          <div v-for="i in 4" :key="i">
            <div class="mb-2 h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div class="h-6 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </template>

        <template v-else>
          <div>
            <p class="text-muted-foreground">Name</p>
            <p class="font-medium">{{ data?.address?.name }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Phone</p>
            <p class="font-medium">{{ data?.address?.phone }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Street</p>
            <p class="font-medium">{{ data?.address?.street }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">State</p>
            <p class="font-medium">{{ data?.address?.state }}</p>
          </div>
        </template>
      </div>
    </div>

    <div class="mb-6">
      <h2 class="mb-4 text-2xl font-semibold">Order Status</h2>
      <div class="flex items-center space-x-4 rounded-lg border p-4">
        <template v-if="isLoading">
          <div class="h-6 w-20 animate-pulse rounded bg-gray-200" />
          <div class="h-6 w-48 animate-pulse rounded bg-gray-200" />
        </template>
        <template v-else>
          <Badge :variant="data?.status">
            {{ data?.status }}
          </Badge>
          <p class="text-muted-foreground">
            Order #{{ data?.id }} • {{ new Date(String(data?.updatedAt)).toDateString() }}
          </p>
        </template>
      </div>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="head in headers" :key="head">{{ head }}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="isLoading">
          <TableRow v-for="i in 5" :key="i">
            <TableCell v-for="j in headers.length" :key="j">
              <div class="h-4 w-full animate-pulse rounded bg-gray-200" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow v-for="row in data?.items" :key="row.productId">
            <TableCell>{{ row.product.id }}</TableCell>
            <TableCell>{{ row.product.name }}</TableCell>
            <TableCell>${{ row.product.price }}</TableCell>
            <TableCell>{{ row.quantity }}</TableCell>
            <TableCell>${{ row.quantity * row.product.price }}</TableCell>
          </TableRow>
        </template>
      </TableBody>
      <TableFooter>
        <TableRow>
          <!-- eslint-disable-next-line vue/attribute-hyphenation -->
          <TableCell colSpan="4" class="font-semibold">Total</TableCell>
          <TableCell>${{ data?.total }}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import { Badge } from '@yuki/ui/vue/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/vue/table'

import { api } from '@/lib/api'

const headers = ['Product ID', 'Product Name', 'Price', 'Quantity', 'Total']

const route = useRoute()
const router = useRouter()

const id = String(route.params.id ?? '')

const { data, isLoading } = useQuery({
  queryKey: ['order', 'getDetails', id],
  queryFn: async () => {
    try {
      return await api.order.getDetails.query({ id })
    } catch {
      await router.push('/403')
    }
  },
})
</script>

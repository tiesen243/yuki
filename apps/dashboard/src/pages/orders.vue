<template>
  <main class="container py-4">
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
          <TableRow v-for="row in data?.orders" :key="row.id">
            <TableCell>{{ row.id }}</TableCell>
            <TableCell>{{ row.user.name }}</TableCell>
            <TableCell>{{ new Date(row.updatedAt).toDateString() }}</TableCell>
            <TableCell>{{ row.total }}</TableCell>
            <TableCell>
              <Badge :variant="row.status">
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell>
              <Button :as="RouterLink" :to="`/orders/${row.id}`" size="sm"> View </Button>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <div class="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" :disabled="page === 1" @click="Math.max(1, page--)">
        Previous
      </Button>
      <div class="text-sm">Page {{ page }} of {{ data?.totalPage ?? 0 }}</div>
      <Button
        variant="outline"
        :disabled="page === data?.totalPage"
        @click="Math.min(data?.totalPage ?? 0, page++)"
      >
        Next
      </Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

import { Badge } from '@yuki/ui/vue/badge'
import { Button } from '@yuki/ui/vue/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/vue/table'

import { api } from '@/lib/api'

const router = useRouter()

const headers = ['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Actions']

const page = ref(1)
const { data, isLoading } = useQuery({
  queryKey: ['order', 'getAllOrders', page],
  queryFn: async () => {
    try {
      return await api.order.getAllOrders.query({ page: page.value })
    } catch {
      await router.push('/403')
    }
  },
  placeholderData: keepPreviousData,
})
</script>

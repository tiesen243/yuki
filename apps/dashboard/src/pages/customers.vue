<template>
  <main class="container py-4">
    <div class="overflow-x-auto">
      <Table class="**:whitespace-nowrap">
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
            <TableRow v-for="row in data?.users" :key="row.id">
              <TableCell>{{ row.id }}</TableCell>
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>{{ row.role }}</TableCell>
              <TableCell>{{ row.numberOfOrders }}</TableCell>
              <TableCell>{{ new Date(row.createdAt).toDateString() }}</TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

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
import { useRouter } from 'vue-router'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

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

const headers = ['ID', 'Name', 'Role', 'Number of Orders', 'Created At']

const router = useRouter()
const page = ref(1)
const query = ref('')
const { data, isLoading } = useQuery({
  queryKey: ['user', 'getAll', { page, query }],
  queryFn: async () => {
    try {
      return await api.user.getAll.query({
        page: page.value,
        query: query.value,
      })
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'UNAUTHORIZED') await router.push('/sign-in')
        if (e.message === 'FORBIDDEN') await router.push('/403')
      }
    }
  },
  placeholderData: keepPreviousData,
})
console.log(data.value)
</script>

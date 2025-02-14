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
            <TableRow v-for="row in data" :key="row.id">
              <TableCell>{{ row.id }}</TableCell>
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>{{ row.numberOfProducts }}</TableCell>
              <TableCell class="space-x-4">
                <Button size="sm"> Edit </Button>
                <Button variant="destructive" size="sm"> Delete </Button>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
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

const router = useRouter()

const headers = ['Category ID', 'Name', 'Number of Products', 'Actions']

const page = ref(1)
const { data, isLoading } = useQuery({
  queryKey: ['category', 'getAll', page],
  queryFn: async () => {
    try {
      return await api.category.getAll.query({ page: page.value })
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'UNAUTHORIZED') await router.push('/sign-in')
        if (e.message === 'FORBIDDEN') await router.push('/403')
      }
    }
  },
  placeholderData: keepPreviousData,
})
</script>

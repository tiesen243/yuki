<template>
  <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h2 class="mb-6 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
        Overview
      </h2>

      <!-- Key Metrics -->
      <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="metric in metrics"
          :key="metric.name"
          class="overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-800"
        >
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <component
                  :is="metric.icon"
                  class="h-6 w-6 text-neutral-400 dark:text-neutral-300"
                />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt
                    class="truncate text-sm font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    {{ metric.name }}
                  </dt>
                  <dd class="flex items-baseline">
                    <div
                      class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
                    >
                      {{ metric.value }}
                    </div>
                    <div
                      :class="[
                        metric.change.type === 'increase'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400',
                        'ml-2 flex items-baseline text-sm font-semibold',
                      ]"
                    >
                      <component
                        :is="
                          metric.change.type === 'increase' ? ArrowUpIcon : ArrowDownIcon
                        "
                        class="h-5 w-5 flex-shrink-0 self-center text-current"
                      />
                      <span class="sr-only">
                        {{
                          metric.change.type === 'increase' ? 'Increased' : 'Decreased'
                        }}
                        by
                      </span>
                      {{ metric.change.value }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="mb-8 rounded-lg bg-white shadow dark:bg-neutral-800">
        <div class="px-4 py-5 sm:px-6">
          <h3
            class="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-100"
          >
            Recent Orders
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead class="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th
                  v-for="header in orderHeaders"
                  :key="header"
                  class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-300"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800"
            >
              <tr v-for="order in recentOrders" :key="order.id">
                <td
                  class="px-6 py-4 text-sm font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100"
                >
                  {{ order.id }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ order.customer }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ order.date }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ order.total }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  <span
                    :class="[
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
                        : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'
                          : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
                      'inline-flex rounded-full px-2 text-xs leading-5 font-semibold',
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Selling Products -->
      <div class="rounded-lg bg-white shadow dark:bg-neutral-800">
        <div class="px-4 py-5 sm:px-6">
          <h3
            class="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-100"
          >
            Top Selling Products
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead class="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th
                  v-for="header in productHeaders"
                  :key="header"
                  class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-300"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800"
            >
              <tr v-for="product in topProducts" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="img"
                        :alt="product.name"
                      />
                    </div>
                    <div class="ml-4">
                      <div
                        class="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                      >
                        {{ product.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ product.category }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ product.price }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ product.sold }}
                </td>
                <td
                  class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-300"
                >
                  {{ product.revenue }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from '@yuki/ui/vue/icons'

const metrics = ref([
  {
    name: 'Total Revenue',
    value: '$54,763',
    change: { type: 'increase', value: '12%' },
    icon: DollarSign,
  },
  {
    name: 'Orders',
    value: '1,432',
    change: { type: 'decrease', value: '3%' },
    icon: ShoppingCart,
  },
  {
    name: 'Customers',
    value: '3,845',
    change: { type: 'increase', value: '7%' },
    icon: Users,
  },
  {
    name: 'Conversion Rate',
    value: '3.6%',
    change: { type: 'increase', value: '2%' },
    icon: TrendingUp,
  },
])

const orderHeaders = ['Order ID', 'Customer', 'Date', 'Total', 'Status']
const recentOrders = ref([
  {
    id: '#1234',
    customer: 'John Doe',
    date: '2023-04-15',
    total: '$156.00',
    status: 'Completed',
  },
  {
    id: '#1235',
    customer: 'Jane Smith',
    date: '2023-04-16',
    total: '$237.50',
    status: 'Processing',
  },
  {
    id: '#1236',
    customer: 'Bob Johnson',
    date: '2023-04-16',
    total: '$98.20',
    status: 'Pending',
  },
  {
    id: '#1237',
    customer: 'Alice Brown',
    date: '2023-04-17',
    total: '$432.10',
    status: 'Completed',
  },
  {
    id: '#1238',
    customer: 'Charlie Davis',
    date: '2023-04-17',
    total: '$75.00',
    status: 'Processing',
  },
])

const img = `${import.meta.env.VITE_WEB_URL}/assets/logo.svg`
const productHeaders = ['Product', 'Category', 'Price', 'Sold', 'Revenue']
const topProducts = ref([
  {
    id: 1,
    name: 'Wireless Earbuds',
    category: 'Electronics',
    price: '$79.99',
    sold: 1245,
    revenue: '$99,587.55',
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: '$199.99',
    sold: 952,
    revenue: '$190,390.48',
  },
  {
    id: 3,
    name: 'Running Shoes',
    category: 'Sports',
    price: '$89.99',
    sold: 1023,
    revenue: '$92,059.77',
  },
  {
    id: 4,
    name: 'Coffee Maker',
    category: 'Home & Kitchen',
    price: '$59.99',
    sold: 876,
    revenue: '$52,551.24',
  },
  {
    id: 5,
    name: 'Backpack',
    category: 'Fashion',
    price: '$49.99',
    sold: 1532,
    revenue: '$76,584.68',
  },
])
</script>

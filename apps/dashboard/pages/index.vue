<template>
  <main class="container py-4">
    <div v-if="isLoading">Loading</div>

    <table v-else>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            {{ product.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup lang="ts">
import { useProducts } from '@/hooks/use-products'

const { isLoading, products } = useProducts({})
</script>

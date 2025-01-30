<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/vue/card'
import { DollarSign, Package, ShoppingCart, Users } from '@yuki/ui/vue/icons'
</script>

<template>
  <main class="container py-4">
    <div class="space-y-6">
      <header class="mb-8">
        <h1 class="text-3xl font-bold">Yuki Dashboard</h1>
      </header>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle> Total Users </CardTitle>
            <Users class="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <CardTitle class="text-3xl"> 2,451 </CardTitle>
            <CardDescription> +12.5% from last month </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle> Total Products </CardTitle>
            <Package class="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <CardTitle class="text-3xl"> 847 </CardTitle>
            <CardDescription> +4.2% from last month </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle> Total Orders </CardTitle>
            <ShoppingCart class="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <CardTitle> 1,234 </CardTitle>
            <CardDescription> +28.4% from last month </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle> Revenue </CardTitle>
            <DollarSign class="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <CardTitle class="text-3xl"> $52,432 </CardTitle>
            <CardDescription> +15.3% from last month </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="i in 3"
                :key="i"
                class="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p class="font-medium">Order #{{ 1000 + i }}</p>
                  <p class="text-muted-foreground text-sm">2 items • Processing</p>
                </div>
                <p class="font-medium">${{ 99 + i * 10 }}.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="i in 3"
                :key="i"
                class="flex items-center justify-between border-b pb-4"
              >
                <div class="flex items-center space-x-3">
                  <div class="bg-muted h-12 w-12 rounded-lg" />
                  <div>
                    <p class="font-medium">Product {{ i }}</p>
                    <p class="text-muted-foreground text-sm">
                      {{ 20 + i * 10 }} units sold
                    </p>
                  </div>
                </div>
                <p class="font-medium">${{ 49 + i * 10 }}.99</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>
